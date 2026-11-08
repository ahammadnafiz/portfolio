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
| Project screenshots (1600×1000 WebP, 16:10) | `public/projects/<slug>.webp` |
| Colours for light and dark (follows the system setting) | `app/globals.css` |

To add a project: add an entry to `lib/projects.ts` and a screenshot with the same slug at `public/projects/<slug>.webp`.

## Write a blog post

`pnpm new-post "Title"`, write it in `content/writing/`, then publish as below. Full guide: [docs/writing.md](docs/writing.md).

## Publish

```bash
./deploy/deploy.sh
```

This runs the tests, builds `out/`, checks the build (`pnpm test:build`), copies it to `~/sites/portfolio/site` on the `vps` SSH host, and starts or reloads the Caddy container in `deploy/compose.yml`. Caddy gets the HTTPS certificate for ahammadnafiz.com itself, so the domain's A record must point at the VPS (147.93.170.52).
