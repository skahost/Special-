#!/usr/bin/env bash
#
# SK Host — one-line installer for Pterodactyl + Blueprint
# ------------------------------------------------------------------
# Downloads this repository's main branch, installs/updates the SK Host
# Blueprint extension (idle server shutdown, module toggles & UI changes),
# rebuilds the panel frontend and brings the panel back online.
#
# Usage (as root):
#   curl -sSL https://raw.githubusercontent.com/skahost/Special-/main/install.sh | bash
#
# Optional overrides:
#   PANEL_DIR=/var/www/pterodactyl   (panel installation directory)
#   REPO_BRANCH=main                 (branch to install from)

set -Eeuo pipefail

# ---- Configuration ---------------------------------------------------------
PANEL_DIR="${PANEL_DIR:-/var/www/pterodactyl}"
REPO_OWNER="skahost"
REPO_NAME="Special-"
REPO_BRANCH="${REPO_BRANCH:-main}"
REPO_TARBALL="https://codeload.github.com/${REPO_OWNER}/${REPO_NAME}/tar.gz/refs/heads/${REPO_BRANCH}"
EXTENSION_ID="nebula"

# ---- Colored output --------------------------------------------------------
if [[ -t 1 ]]; then
  RED="$(printf '\033[0;31m')"
  GREEN="$(printf '\033[0;32m')"
  YELLOW="$(printf '\033[1;33m')"
  RESET="$(printf '\033[0m')"
else
  RED=""; GREEN=""; YELLOW=""; RESET=""
fi

info()    { echo -e "${YELLOW}[*]${RESET} $*"; }
success() { echo -e "${GREEN}[✓]${RESET} $*"; }
error()   { echo -e "${RED}[✗]${RESET} $*" >&2; }

TMP_DIR=""
MAINTENANCE_ON="false"

cleanup() {
  local exit_code=$?
  if [[ -n "$TMP_DIR" && -d "$TMP_DIR" ]]; then
    rm -rf "$TMP_DIR"
  fi
  if [[ "$exit_code" -ne 0 ]]; then
    error "Installation failed (exit code ${exit_code})."
    if [[ "$MAINTENANCE_ON" == "true" ]]; then
      info "Attempting to bring the panel out of maintenance mode..."
      (cd "$PANEL_DIR" && php artisan up) || error "Could not disable maintenance mode. Run 'php artisan up' manually."
    fi
  fi
  exit "$exit_code"
}
trap cleanup EXIT
trap 'error "Aborted on line ${LINENO}."' ERR

# ---- Pre-flight checks -----------------------------------------------------
if [[ "${EUID}" -ne 0 ]]; then
  error "This script must be run as root. Try: sudo bash install.sh"
  exit 1
fi

if [[ ! -d "$PANEL_DIR" ]]; then
  error "Pterodactyl directory '${PANEL_DIR}' does not exist. Set PANEL_DIR to your panel path."
  exit 1
fi

if [[ ! -f "${PANEL_DIR}/artisan" ]]; then
  error "'${PANEL_DIR}' does not look like a Pterodactyl installation (no artisan file)."
  exit 1
fi

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    error "Required command '$1' is not installed."
    exit 1
  fi
}

require_cmd php
require_cmd curl
require_cmd tar

# Blueprint may be exposed as the global `blueprint` command or a local script.
BLUEPRINT_CMD=""
if command -v blueprint >/dev/null 2>&1; then
  BLUEPRINT_CMD="blueprint"
elif [[ -f "${PANEL_DIR}/blueprint.sh" ]]; then
  BLUEPRINT_CMD="bash blueprint.sh"
else
  error "Blueprint CLI not found. Install Blueprint before running this script."
  exit 1
fi

# ---- Download --------------------------------------------------------------
cd "$PANEL_DIR"
info "Installing the modified SK Host theme into ${PANEL_DIR}"

TMP_DIR="$(mktemp -d)"
info "Downloading ${REPO_OWNER}/${REPO_NAME} (${REPO_BRANCH})..."
curl -sSL "$REPO_TARBALL" -o "${TMP_DIR}/repo.tar.gz"
tar -xzf "${TMP_DIR}/repo.tar.gz" -C "$TMP_DIR"

SRC_DIR="$(find "$TMP_DIR" -maxdepth 1 -type d -name "${REPO_NAME}-*" | head -n 1)"
if [[ -z "$SRC_DIR" || ! -f "${SRC_DIR}/conf.yml" ]]; then
  error "Downloaded archive does not contain the SK Host source (conf.yml missing)."
  exit 1
fi
success "Repository downloaded and extracted."

# ---- Package the extension into a .blueprint file --------------------------
info "Packaging the SK Host extension..."
require_cmd zip
BLUEPRINT_PACKAGE="${PANEL_DIR}/${EXTENSION_ID}.blueprint"
( cd "$SRC_DIR" && zip -qr "$BLUEPRINT_PACKAGE" . -x "install.sh" "README.md" "*.git*" )
success "Created ${BLUEPRINT_PACKAGE}"

# ---- Maintenance mode ------------------------------------------------------
info "Enabling maintenance mode (php artisan down)..."
php artisan down
MAINTENANCE_ON="true"

# ---- Install / update the extension ----------------------------------------
info "Installing the SK Host extension via Blueprint..."
# shellcheck disable=SC2086
$BLUEPRINT_CMD -install "$EXTENSION_ID"
success "Blueprint installed the SK Host extension."

# ---- Frontend build --------------------------------------------------------
if command -v yarn >/dev/null 2>&1; then
  info "Installing frontend dependencies (yarn install)..."
  yarn install
  info "Building the panel frontend (yarn build:production)..."
  yarn build:production
  success "Frontend build complete."
else
  info "yarn not found — skipping explicit frontend build (Blueprint already built the panel)."
fi

# ---- Backend optimization + final rebuild ----------------------------------
info "Clearing caches (php artisan optimize:clear)..."
php artisan optimize:clear

info "Rebuilding Blueprint extensions (blueprint -build)..."
# shellcheck disable=SC2086
$BLUEPRINT_CMD -build

# ---- Bring panel back online -----------------------------------------------
info "Disabling maintenance mode (php artisan up)..."
php artisan up
MAINTENANCE_ON="false"

success "SK Host installed successfully! Open Admin → Extensions → SK Host to configure it."
