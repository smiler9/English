#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${SSH_TARGET:-}" ]]; then
  echo "Missing SSH_TARGET. Example:"
  echo "  SSH_TARGET=ubuntu@YOUR_ORACLE_PUBLIC_IP npm run deploy:oracle-api"
  exit 1
fi

REMOTE_API_DIR="${REMOTE_API_DIR:-/srv/english-training-api}"
API_PORT="${API_PORT:-8798}"
ENGLISH_SITE="${ENGLISH_SITE:-https://english.smiler9.ai.kr}"
HTTP_SITE="${HTTP_SITE:-http://168.110.101.18}"
SSH_ARGS=()
RSYNC_SSH="ssh"

if [[ -n "${SSH_KEY:-}" ]]; then
  SSH_ARGS=(-i "$SSH_KEY")
  RSYNC_SSH="ssh -i $SSH_KEY"
fi

ssh "${SSH_ARGS[@]}" "$SSH_TARGET" "sudo mkdir -p '$REMOTE_API_DIR/data' && sudo chown -R \$USER:\$USER '$REMOTE_API_DIR'"
rsync -avz --exclude '__pycache__/' --exclude '*.pyc' -e "$RSYNC_SSH" server/ "$SSH_TARGET:$REMOTE_API_DIR/"

ssh "${SSH_ARGS[@]}" "$SSH_TARGET" \
  "REMOTE_API_DIR='$REMOTE_API_DIR' API_PORT='$API_PORT' ENGLISH_SITE='$ENGLISH_SITE' HTTP_SITE='$HTTP_SITE' bash -s" <<'REMOTE'
set -euo pipefail

sudo tee /etc/systemd/system/english-training-api.service >/dev/null <<EOF
[Unit]
Description=English Training API
After=network.target

[Service]
Type=simple
WorkingDirectory=$REMOTE_API_DIR
ExecStart=/usr/bin/python3 $REMOTE_API_DIR/english_training_api.py --host 127.0.0.1 --port $API_PORT --db $REMOTE_API_DIR/data/app.db
Restart=always
RestartSec=2
User=ubuntu
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable english-training-api >/dev/null
sudo systemctl restart english-training-api

stamp=$(date +%Y%m%d-%H%M%S)
sudo cp /etc/caddy/Caddyfile "/etc/caddy/Caddyfile.bak-english-api-$stamp"

sudo ENGLISH_SITE="$ENGLISH_SITE" HTTP_SITE="$HTTP_SITE" API_PORT="$API_PORT" python3 - <<'PY'
import os
from pathlib import Path

path = Path("/etc/caddy/Caddyfile")
text = path.read_text()
sites = [os.environ["ENGLISH_SITE"], os.environ["HTTP_SITE"]]
api_port = os.environ["API_PORT"]


def find_block(source, site):
  start = source.find(site + " {")
  if start < 0:
    return None
  brace = source.find("{", start)
  depth = 0
  for index in range(brace, len(source)):
    char = source[index]
    if char == "{":
      depth += 1
    elif char == "}":
      depth -= 1
      if depth == 0:
        return start, index + 1
  raise RuntimeError(f"Unclosed Caddy block for {site}")


def replace_block(source, site):
  found = find_block(source, site)
  if not found:
    raise RuntimeError(f"Caddy site block not found: {site}")

  start, end = found
  old = source[start:end]
  if f"127.0.0.1:{api_port}" in old and "handle_path /api/*" in old:
    return source

  new = f"""{site} {{
\tencode gzip

\thandle_path /api/* {{
\t\treverse_proxy 127.0.0.1:{api_port}
\t}}

\thandle {{
\t\troot * /srv/english-training
\t\ttry_files {{path}} {{path}}/ /index.html
\t\tfile_server

\t\theader /_expo/static/* Cache-Control "public, max-age=31536000, immutable"
\t\theader /assets/* Cache-Control "public, max-age=31536000, immutable"
\t}}
}}"""
  return source[:start] + new + source[end:]


for site in sites:
  text = replace_block(text, site)

path.write_text(text)
PY

sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy

curl -fsS "http://127.0.0.1:$API_PORT/health" >/dev/null
REMOTE

echo
echo "English Training API deployed to $SSH_TARGET:$REMOTE_API_DIR"
