# MG FESTAS project guide

## Project

A lightweight, mobile-first Next.js and TypeScript catalog for MG FESTAS, hosted as static assets on Cloudflare Workers. Storefront copy is in Brazilian Portuguese. Keep application code and comments in English; preserve visible brand spelling as `MG FESTAS`.

## Commands

- `npm run dev` starts the local site at http://127.0.0.1:3100.
- `npm run lint` checks ESLint.
- `npm run typecheck` checks TypeScript.
- `npm run check:store` checks catalog, quantity, totals, and WhatsApp URL logic without sending a message.
- `npm run check:browser` checks the storefront in Chromium at mobile, tablet, and desktop widths.
- `npm run build` exports the static site to `out/`.
- `npm run preview` serves the Cloudflare Workers static-assets build locally.
- `npm run deploy` deploys the built site to the configured Cloudflare Worker.

## Architecture

- Keep catalog and cart rules in typed modules under `src/lib/`.
- Use CSS Modules for page and component styles.
- Keep all image assets local under `public/images/`; avoid external asset URLs.
- Do not commit `.env.local`, secrets, or generated build output.
- WhatsApp orders must remain an explicit user action; never send messages automatically.
- Preserve the `mgfesta` Worker name and its `out/` assets directory in `wrangler.json`.
