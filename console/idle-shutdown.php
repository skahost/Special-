<?php

/**
 * Nebula — Idle Server Shutdown (Auto-Sleep)
 *
 * This file is executed every minute by the Blueprint-generated Artisan command
 * `nebula:idle-shutdown` (see console/Console.yml). Inside this scope the
 * following variables are available:
 *   - $blueprint : BlueprintConsoleLibrary (dbGet/dbSet against the panel database)
 *   - $this      : the Illuminate\Console\Command instance (info()/line()/error())
 *
 * Behaviour:
 *   1. Skip entirely unless `enable_idle_shutdown` is turned on in Nebula Designer.
 *   2. Look at every active (non-suspended, installed) server that is currently
 *      running on Wings.
 *   3. Skip servers owned by admins (when `exempt_admin_servers` is enabled) and
 *      servers whose egg id is listed in `exempt_eggs`.
 *   4. Determine whether the server is "empty". We first try to read a real
 *      player count (Minecraft Server List Ping); if that is not available we
 *      fall back to CPU utilisation reported by Wings (near-zero CPU == empty).
 *      NOTE: Wings does not expose a generic "player count" API, so the CPU
 *      heuristic is the portable fallback for non-Minecraft games/bots.
 *   5. Once a server has been empty for longer than `idle_timeout_minutes` we
 *      send the `stop` power action and record it in the `idle_sleeping` map so
 *      the dashboard can show a "Sleeping" state instead of "Offline".
 *   6. As soon as a server is running again it is removed from the sleeping map.
 */

use Pterodactyl\Models\Server;
use Pterodactyl\Repositories\Wings\DaemonServerRepository;
use Pterodactyl\Repositories\Wings\DaemonPowerRepository;

/** CPU utilisation (percentage) below which a running server is treated as empty. */
if (!defined('NEBULA_IDLE_CPU_THRESHOLD')) {
    define('NEBULA_IDLE_CPU_THRESHOLD', 5.0);
}

/**
 * Best-effort active player count for a server.
 *
 * Returns an integer when a real player count could be determined, or null when
 * it is unknown (in which case the caller falls back to a CPU heuristic).
 *
 * The shipped implementation performs a Minecraft Server List Ping against the
 * server's primary allocation, which covers the most common Pterodactyl use
 * case. For other games you can extend this function with your own query logic.
 */
if (!function_exists('nebula_idle_player_count')) {
    function nebula_idle_player_count(Server $server): ?int
    {
        $allocation = $server->allocation;
        if (!$allocation) {
            return null;
        }

        $host = $allocation->ip;
        $port = (int) $allocation->port;
        if ($host === '' || $port <= 0) {
            return null;
        }

        $writeVarInt = function (int $value): string {
            $out = '';
            do {
                $temp = $value & 0x7F;
                $value = ($value >> 7) & (PHP_INT_MAX >> 6);
                if ($value !== 0) {
                    $temp |= 0x80;
                }
                $out .= chr($temp);
            } while ($value !== 0);

            return $out;
        };

        $fp = @fsockopen($host, $port, $errno, $errstr, 1.0);
        if (!$fp) {
            return null;
        }

        try {
            stream_set_timeout($fp, 1);

            $handshake = $writeVarInt(0x00)
                . $writeVarInt(-1)
                . $writeVarInt(strlen($host)) . $host
                . pack('n', $port)
                . $writeVarInt(1);
            @fwrite($fp, $writeVarInt(strlen($handshake)) . $handshake);

            $statusRequest = $writeVarInt(0x00);
            @fwrite($fp, $writeVarInt(strlen($statusRequest)) . $statusRequest);

            $readVarInt = function ($fp): ?int {
                $value = 0;
                $position = 0;
                while (true) {
                    $byte = @fgetc($fp);
                    if ($byte === false || $byte === '') {
                        return null;
                    }
                    $byte = ord($byte);
                    $value |= ($byte & 0x7F) << $position;
                    if (($byte & 0x80) === 0) {
                        break;
                    }
                    $position += 7;
                    if ($position >= 32) {
                        return null;
                    }
                }

                return $value;
            };

            if ($readVarInt($fp) === null) {
                return null;
            }
            if ($readVarInt($fp) === null) {
                return null;
            }
            $jsonLength = $readVarInt($fp);
            if ($jsonLength === null || $jsonLength <= 0 || $jsonLength > 65535) {
                return null;
            }

            $json = '';
            while (strlen($json) < $jsonLength) {
                $chunk = @fread($fp, $jsonLength - strlen($json));
                if ($chunk === false || $chunk === '') {
                    break;
                }
                $json .= $chunk;
            }

            $decoded = json_decode($json, true);
            if (is_array($decoded) && isset($decoded['players']['online'])) {
                return (int) $decoded['players']['online'];
            }
        } catch (\Throwable $e) {
            return null;
        } finally {
            @fclose($fp);
        }

        return null;
    }
}

if ((string) $blueprint->dbGet('nebula', 'enable_idle_shutdown') !== '1') {
    return;
}

$timeoutMinutes = (int) $blueprint->dbGet('nebula', 'idle_timeout_minutes');
if ($timeoutMinutes <= 0) {
    $timeoutMinutes = 10;
}
$exemptAdmin = (string) $blueprint->dbGet('nebula', 'exempt_admin_servers') === '1';

$exemptEggs = array_filter(array_map(
    'intval',
    array_map('trim', explode(',', (string) $blueprint->dbGet('nebula', 'exempt_eggs')))
), fn ($id) => $id > 0);

$tracking = json_decode((string) $blueprint->dbGet('nebula', 'idle_tracking'), true);
$sleeping = json_decode((string) $blueprint->dbGet('nebula', 'idle_sleeping'), true);
if (!is_array($tracking)) {
    $tracking = [];
}
if (!is_array($sleeping)) {
    $sleeping = [];
}

/** @var DaemonServerRepository $serverRepository */
$serverRepository = app()->make(DaemonServerRepository::class);
/** @var DaemonPowerRepository $powerRepository */
$powerRepository = app()->make(DaemonPowerRepository::class);

$now = time();
$timeout = $timeoutMinutes * 60;

Server::query()
    ->whereNull('status')
    ->with(['user', 'allocation'])
    ->each(function (Server $server) use (
        &$tracking,
        &$sleeping,
        $exemptAdmin,
        $exemptEggs,
        $serverRepository,
        $powerRepository,
        $now,
        $timeout,
        $blueprint
    ) {
        // Keyed by the short uuid because that is what the dashboard uses in URLs.
        $uuid = $server->uuidShort;

        if ($exemptAdmin && $server->user && $server->user->root_admin) {
            unset($tracking[$uuid]);

            return;
        }

        if (in_array((int) $server->egg_id, $exemptEggs, true)) {
            unset($tracking[$uuid]);

            return;
        }

        try {
            $details = $serverRepository->setServer($server)->getDetails();
        } catch (\Throwable $e) {
            return;
        }

        $state = $details['state'] ?? ($details['status'] ?? null);

        if ($state !== 'running') {
            unset($tracking[$uuid]);

            return;
        }

        // Server is running, so it is definitely awake.
        unset($sleeping[$uuid]);

        $players = nebula_idle_player_count($server);
        if ($players === null) {
            $cpu = (float) ($details['utilization']['cpu_absolute'] ?? 0.0);
            $empty = $cpu < NEBULA_IDLE_CPU_THRESHOLD;
        } else {
            $empty = $players === 0;
        }

        if (!$empty) {
            unset($tracking[$uuid]);

            return;
        }

        if (!isset($tracking[$uuid])) {
            $tracking[$uuid] = $now;

            return;
        }

        if (($now - (int) $tracking[$uuid]) < $timeout) {
            return;
        }

        try {
            $powerRepository->setServer($server)->send('stop');
            $sleeping[$uuid] = $now;
            unset($tracking[$uuid]);
        } catch (\Throwable $e) {
            // Leave tracking in place so we retry on the next run.
        }
    });

$blueprint->dbSet('nebula', 'idle_tracking', json_encode($tracking));
$blueprint->dbSet('nebula', 'idle_sleeping', json_encode($sleeping));
