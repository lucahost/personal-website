#!/usr/bin/env bash
#
# One-time setup for the terminal telemetry proxy as a USER-level systemd service
# (no root needed for CI restarts). Run this AS THE DEPLOY USER (e.g. dp-ubuntu-16gb),
# not with sudo.
#
#   git clone https://github.com/lucahost/personal-website /tmp/pw
#   cd /tmp/pw/scripts/track-proxy
#   bash setup-vps.sh
#
# Two one-time ROOT steps are still required (printed at the end):
#   1. sudo loginctl enable-linger <this user>   # so the service survives logout
#   2. add the nginx snippet (nginx-track.conf) and reload nginx
#
# After that, GitHub Actions updates server.mjs + `systemctl --user restart track-proxy`
# with no root at all.
#
# Config (env, with defaults):
#   PROXY_DIR      $HOME/track-proxy
#   PORT           8787
#   ALLOW_ORIGIN   https://hostettler.io
#   OTLP_LOGS_URL  http://localhost:4318/v1/logs
set -euo pipefail

PROXY_DIR="${PROXY_DIR:-$HOME/track-proxy}"
PORT="${PORT:-8787}"
ALLOW_ORIGIN="${ALLOW_ORIGIN:-https://hostettler.io}"
OTLP_LOGS_URL="${OTLP_LOGS_URL:-http://localhost:4318/v1/logs}"
SERVICE_NAME="${SERVICE_NAME:-hostettler-io}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UNIT_DIR="$HOME/.config/systemd/user"
# `sudo -iu <user>` gives a login shell but does NOT set up a systemd/D-Bus session,
# so `systemctl --user` can't find the bus. Point it at the lingering user manager
# explicitly (linger must be enabled first — see the wait/check below).
export XDG_RUNTIME_DIR="${XDG_RUNTIME_DIR:-/run/user/$(id -u)}"
export DBUS_SESSION_BUS_ADDRESS="${DBUS_SESSION_BUS_ADDRESS:-unix:path=${XDG_RUNTIME_DIR}/bus}"

if [[ $EUID -eq 0 ]]; then
  echo "Run this as the deploy user, NOT root/sudo (it installs a --user service)." >&2
  exit 1
fi

NODE_BIN="$(command -v node || true)"
if [[ -z "$NODE_BIN" ]]; then
  echo "Node.js not found on PATH. Install Node 18+ first." >&2
  exit 1
fi
echo "→ node:      $NODE_BIN ($("$NODE_BIN" -v))"
echo "→ user:      $(whoami)"
echo "→ proxy dir: $PROXY_DIR"

# Preflight: wait for the user systemd bus. `sudo loginctl enable-linger` (one-time,
# root) starts the user manager and creates $XDG_RUNTIME_DIR/bus ASYNCHRONOUSLY, so
# this loop avoids a race when setup runs right after enabling linger.
BUS_SOCKET="${XDG_RUNTIME_DIR}/bus"
for _ in $(seq 1 10); do
  [[ -S "$BUS_SOCKET" ]] && break
  sleep 0.5
done
if ! systemctl --user show-environment >/dev/null 2>&1; then
  echo >&2
  echo "✖ Can't reach your user systemd manager (no socket at $BUS_SOCKET)." >&2
  echo "  Enable lingering first (one-time, needs root), then re-run this script:" >&2
  echo "      sudo loginctl enable-linger $(whoami)" >&2
  exit 1
fi

# 1. App dir (owned by this user → CI can scp into it without sudo)
mkdir -p "$PROXY_DIR"
install -m 0644 "$SCRIPT_DIR/server.mjs" "$PROXY_DIR/server.mjs"

# 2. User-level systemd unit (%h = this user's home)
mkdir -p "$UNIT_DIR"
cat > "$UNIT_DIR/track-proxy.service" <<UNIT
[Unit]
Description=hostettler.io terminal telemetry proxy
After=network.target

[Service]
Environment=PORT=$PORT
Environment=ALLOW_ORIGIN=$ALLOW_ORIGIN
Environment=OTLP_LOGS_URL=$OTLP_LOGS_URL
Environment=SERVICE_NAME=$SERVICE_NAME
ExecStart=$NODE_BIN %h/track-proxy/server.mjs
WorkingDirectory=%h/track-proxy
Restart=on-failure
RestartSec=3
NoNewPrivileges=true
ProtectSystem=strict
PrivateTmp=true

[Install]
WantedBy=default.target
UNIT

systemctl --user daemon-reload
systemctl --user enable --now track-proxy

echo
echo "✅ track-proxy (user service) installed. Status:"
systemctl --user --no-pager --lines=3 status track-proxy || true
echo
echo "── One-time ROOT step still needed: nginx route ─────────────────────────"
echo "     sudo cp $SCRIPT_DIR/nginx-track.conf /etc/nginx/snippets/track.conf"
echo "     # add  'include snippets/track.conf;'  inside the HTTPS (listen 443) server"
echo "     # block — the one with 'location /' — NOT the :80 'return 301' redirect block."
echo "     sudo nginx -t && sudo systemctl reload nginx"
echo
echo "Then set GitHub repo Variables: TRACK_ENDPOINT=$ALLOW_ORIGIN/track  DEPLOY_TRACK_PROXY=true"
