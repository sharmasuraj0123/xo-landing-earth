# XO Marketing Site

Landing page for XO: distributed environments and unit-of-work pricing for AI agents. Next.js 16 App Router, React 19, Tailwind CSS 4.

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/) (lockfile is `pnpm-lock.yaml`)

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Other commands

```bash
pnpm build    # production build
pnpm start    # serve production build (run build first)
pnpm lint     # ESLint
```

## Project layout

```
app/                    # Next.js app router (layout, page, globals.css)
components/landing/     # landing page sections
public/                 # static assets (logo, images)
docs/                   # internal docs and brand assets (not served)
```

## Notes

- No `.env` is required for local dev. The hero background video loads from Vercel Blob CDN.
- Static images live in `public/images/`.
- Hidden sections (not on the page): testimonials, real-time metrics. Re-enable in `app/page.tsx` if needed.
