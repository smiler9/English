#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${SSH_TARGET:-}" ]]; then
  echo "Missing SSH_TARGET. Example:"
  echo "  SSH_TARGET=ubuntu@YOUR_ORACLE_PUBLIC_IP npm run deploy:oracle"
  exit 1
fi

REMOTE_DIR="${REMOTE_DIR:-/srv/english-training}"
SSH_ARGS=()
RSYNC_SSH="ssh"

if [[ -n "${SSH_KEY:-}" ]]; then
  SSH_ARGS=(-i "$SSH_KEY")
  RSYNC_SSH="ssh -i $SSH_KEY"
fi

npm run typecheck
npm run export:web

ssh "${SSH_ARGS[@]}" "$SSH_TARGET" "sudo mkdir -p '$REMOTE_DIR' && sudo chown -R \$USER:\$USER '$REMOTE_DIR'"
rsync -avz --delete -e "$RSYNC_SSH" dist/ "$SSH_TARGET:$REMOTE_DIR/"

echo
echo "Uploaded dist/ to $SSH_TARGET:$REMOTE_DIR"
echo "If this is the first deploy, run: SSH_TARGET=$SSH_TARGET npm run setup:oracle"
