# Deployment checklist – Sartawi Properties

Use this before deploying (Vercel, Netlify, or any Node host).

## Pre-deploy

- [x] **Build** – `npm run build` completes with no errors
- [x] **Lint** – `npm run lint` passes
- [ ] **Env** – No secrets required for static/data from `public/`; add any API keys to your host’s env vars if you add server features later
- [ ] **Data** – `public/data/all_data.json` and `public/data/project-descriptions.json` are committed and will be deployed (they are served as static files)

## Required on server

- **Node** – 18.x or 20.x (or host’s recommended LTS)
- **Commands** – `npm install` then `npm run build` then `npm run start` (or host’s equivalent)
- **Output** – Use the default Next.js output (no custom `output: 'export'`)

## Assets

- **Images** – `public/` (logo, bgimg, founder, team, etc.) are included in the repo and deployed as-is
- **External images** – `next.config.mjs` allows `files.alnair.ae` for remote images
- **Favicon** – Set in layout metadata to `/logos/sartavilogo.svg`

## After deploy

- Check home, /developers, /featured-properties, /about, /contact, and one property and one developer detail page
- Confirm map loads on featured section and featured-properties page (Leaflet is client-only and dynamic)
- Test one property with images from `files.alnair.ae` to confirm remote image config

## Scroll & performance

- Smooth scroll and GPU-friendly marquee are enabled in `globals.css`
- Framer Motion and dynamic map are loaded client-side to avoid hydration issues
