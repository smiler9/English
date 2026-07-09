#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${SSH_TARGET:-}" ]]; then
  echo "Missing SSH_TARGET. Example:"
  echo "  SSH_TARGET=ubuntu@YOUR_ORACLE_PUBLIC_IP npm run setup:oracle"
  exit 1
fi

REMOTE_DIR="${REMOTE_DIR:-/srv/english-training}"
SSH_HOST="${SSH_TARGET#*@}"
SITE_URL="${SITE_URL:-http://$SSH_HOST}"
SSH_ARGS=()

if [[ -n "${SSH_KEY:-}" ]]; then
  SSH_ARGS=(-i "$SSH_KEY")
fi

ssh "${SSH_ARGS[@]}" "$SSH_TARGET" "REMOTE_DIR='$REMOTE_DIR' SITE_URL='$SITE_URL' bash -s" <<'REMOTE'
set -euo pipefail

if ! command -v caddy >/dev/null 2>&1; then
  echo "Caddy is not installed on this server. Install Caddy first, then rerun setup."
  exit 1
fi

sudo mkdir -p "$REMOTE_DIR"
stamp=$(date +%Y%m%d-%H%M%S)
sudo cp /etc/caddy/Caddyfile "/etc/caddy/Caddyfile.bak-$stamp"

if ! sudo grep -qF "$SITE_URL {" /etc/caddy/Caddyfile; then
  sudo tee -a /etc/caddy/Caddyfile >/dev/null <<EOF

# English Training web app: $SITE_URL
$SITE_URL {
    encode gzip
    root * $REMOTE_DIR
    try_files {path} {path}/ /index.html
    file_server

    header /_expo/static/* Cache-Control "public, max-age=31536000, immutable"
    header /assets/* Cache-Control "public, max-age=31536000, immutable"
}
EOF
fi

sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
REMOTE

echo
echo "Caddy is configured on $SSH_TARGET for $SITE_URL"
