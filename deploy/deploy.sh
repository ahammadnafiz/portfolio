#!/usr/bin/env bash
# Build the site on this machine and publish it to the VPS.
#   ./deploy/deploy.sh   (GA ID comes from .env.production)
# First run also copies the Caddy config and starts the web server.
set -euo pipefail

HOST="${DEPLOY_HOST:-vps}"
DIR="${DEPLOY_DIR:-~/sites/portfolio}"
cd "$(dirname "$0")/.."

pnpm test
pnpm build
pnpm test:build

if ! grep -q "googletagmanager.com/gtag/js?id=G-" out/index.html; then
  echo "The build has no Google Analytics tag; check NEXT_PUBLIC_GA_ID in .env.production." >&2
  exit 1
fi

ssh "$HOST" "mkdir -p $DIR/site"
rsync -az deploy/Caddyfile deploy/compose.yml "$HOST:$DIR/"
# --delay-updates moves every new file into place at the very end, so visitors don't see a half-copied site.
rsync -az --delete-delay --delay-updates out/ "$HOST:$DIR/site/"
ssh "$HOST" "cd $DIR && docker compose up -d && docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile"

echo "Published to https://ahammadnafiz.com"
