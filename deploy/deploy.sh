#!/usr/bin/env bash
# Build the site on this machine and publish it to the VPS.
#   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX ./deploy/deploy.sh
# First run also copies the Caddy config and starts the web server.
set -euo pipefail

HOST="${DEPLOY_HOST:-vps}"
DIR="${DEPLOY_DIR:-~/sites/portfolio}"
cd "$(dirname "$0")/.."

if [[ -z "${NEXT_PUBLIC_GA_ID:-}" ]]; then
  echo "NEXT_PUBLIC_GA_ID is not set; the site would ship without analytics." >&2
  exit 1
fi

pnpm test
pnpm build
pnpm test:build

ssh "$HOST" "mkdir -p $DIR/site"
rsync -az deploy/Caddyfile deploy/compose.yml "$HOST:$DIR/"
# --delay-updates moves every new file into place at the very end, so visitors don't see a half-copied site.
rsync -az --delete-delay --delay-updates out/ "$HOST:$DIR/site/"
ssh "$HOST" "cd $DIR && docker compose up -d && docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile"

echo "Published to https://ahammadnafiz.com"
