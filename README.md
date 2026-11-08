# ahammadnafiz.com

Personal site of Ahammad Nafiz, machine learning engineer in Dhaka. Next.js, exported as static files and served by Caddy on my VPS.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # unit tests (cover generator, project lookup)
pnpm typecheck
```

## Where things live

| What | File |
|---|---|
| Name, links, experience, recognition | `lib/site.ts` |
| Projects (home cards and `/work/<slug>` pages) | `lib/projects.ts` |
| Project cover art (halftone dots, one colour pair per project) | `lib/covers.ts`, served from `app/covers/[file]/route.ts` |
| Colours for light and dark (follows the system setting) | `app/globals.css` |

To add a project: add an entry to `lib/projects.ts` and a cover with the same slug in `lib/covers.ts`.

## Publish

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX ./deploy/deploy.sh
```

This runs the tests, builds `out/`, checks the build (`pnpm test:build`), copies it to `~/sites/portfolio/site` on the `vps` SSH host, and starts or reloads the Caddy container in `deploy/compose.yml`. Caddy gets the HTTPS certificate for ahammadnafiz.com itself, so the domain's A record must point at the VPS (147.93.170.52).
