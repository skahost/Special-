# SK Host

A customized theme for Pterodactyl (Blueprint extension) with:

- **Idle Server Shutdown (Auto-Sleep)** — a per-minute scheduled command that stops empty
  servers and marks them as `sleeping`. Configurable timeout, egg exemptions and admin
  exemption. Empty servers are detected via Minecraft player count with a CPU-usage fallback
  for other games.
- **Sleeping dashboard state** — a purple/blue "🌙 Sleeping" badge on server cards and a
  "Server was stopped due to inactivity" banner in the server view.
- **Interface changes** — remove the default Pterodactyl copyright footer, a permanent
  `EXTENSIONS` sidebar list (no 3-dots dropdown), a red **Kill** button in the server console
  and an optional custom server-card background image.
- **12 module toggles** — Plugin Installer, Player Manager, Mod Installer, Version Changer
  (Java), Bedrock Addon Installer, Subdomain Manager, Bedrock Version Changer, Server
  Splitters, Properties Manager, World Manager, World Installer and Auto Suspension. Enabled
  modules render as tabs only when turned on.
- **Active player count** — an optional live player count shown below each dashboard server
  card, refreshed every minute by the scheduled command.

All settings live in **Admin → Extensions → SK Host → SK Host Designer → Miscellaneous**.

## One-line install

Run on your panel VPS as root:

```bash
curl -sSL https://raw.githubusercontent.com/skahost/Special-/main/install.sh | bash
```

The installer downloads this repository, packages and installs the SK Host extension via
Blueprint, rebuilds the panel frontend and brings the panel back online. Override the panel
path with `PANEL_DIR=/path/to/pterodactyl` if needed.

> The Blueprint extension identifier remains `nebula` internally (asset paths, database keys)
> for compatibility; only user-facing branding is presented as **SK Host**.
