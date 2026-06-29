# XO Branding Guide

This project stores XO brand assets under `docs/brand/xo` (not in `public/`, so they are not served by the Next.js app). Copy assets into `public/` when a page needs to serve them, for example `public/xo-logo.svg` at `/xo-logo.svg`.

## Asset Locations

- `docs/brand/xo/canonical/`: primary XO logo files copied from the root `brand` folder.
- `docs/brand/xo/by-brand/`: curated brand cuts, including logos, favicons, lime green SVG variants, and Open Graph banners.
- `docs/brand/xo/by-type/`: all public assets organized by format, including SVGs, PNGs, JPGs, WebPs, GIFs, videos, data, icons, and public runtime code.
- `docs/brand/xo/by-project/`: original public asset sets grouped by XO project, useful when a page needs to mirror a specific XO surface.

## Core Brand Decision

XO should feel like infrastructure for autonomous work: technical, compact, and alive. The brand is not trying to look like a generic AI SaaS dashboard. It leans toward terminal language, direct visual geometry, and a small amount of electric green to suggest active compute.

## Logo

The canonical XO mark is built from chevron-like strokes. White strokes carry the structural side of the mark, while lime green strokes carry the active XO signal. The mark works best on dark backgrounds where the contrast between white, green, and near-black remains crisp.

Primary logo assets:

- `docs/brand/xo/canonical/xo-logo.svg`
- `docs/brand/xo/canonical/xo-logo-512.png`
- `docs/brand/xo/canonical/favicon.ico`
- `docs/brand/xo/canonical/banner.png`

Use SVG for UI and navigation when possible. Use the 512 PNG for previews, avatars, app icons, and contexts where SVG support is unreliable.

## Color System

XO's strongest brand color is lime green:

- Lime green: `#83d63a`
- White: `#ffffff`
- Near-black UI base: deep blue-black / blackened slate

The lime green should behave as a signal color, not a full-page wash. Use it for the XO mark, small highlights, status cues, active states, and moments that imply "running", "connected", or "ready". Keep major surfaces dark and quiet so the green remains meaningful.

## Typography

The current app uses:

- Instrument Sans for primary interface copy.
- Instrument Serif for large display moments.
- JetBrains Mono for technical labels, metadata, and code-adjacent details.

This mix is a good fit for XO because it balances product clarity, editorial confidence, and developer credibility. Avoid making every label monospace; reserve mono for system-like information.

## Visual Style

The XO system should prefer:

- Dark backgrounds with high-contrast foreground text.
- Tight, precise spacing over oversized decorative sections.
- Thin strokes, borders, and grid-like composition.
- Rounded corners used sparingly and modestly.
- Product or infrastructure imagery that shows real states and workflows.

Avoid relying on generic AI gradients, oversized glowing blobs, or vague atmospheric imagery. When color motion or gradient accents appear, they should support a specific interaction or emphasis rather than become the brand itself.

## Messaging Tone

XO copy should be direct and operational. The product is about building, shipping, running, and coordinating AI agents, so language should emphasize:

- Agents that work continuously.
- Infrastructure that is understandable and observable.
- Human control over autonomous execution.
- Shipping workflows, not speculative AI magic.

Prefer concrete verbs such as build, ship, deploy, run, inspect, connect, recover, and coordinate.

## Usage Rules

- Keep the XO mark on dark or very high-contrast backgrounds.
- Preserve the white and lime green relationship in the logo unless creating a single-color system icon.
- Use `docs/brand/xo/by-brand/logos` for logo selection before reaching into project-specific folders.
- Use `docs/brand/xo/by-project` only when matching a specific existing XO product surface.
- Do not stretch, recolor casually, blur, or place the logo over busy imagery.
- Do not make lime green the dominant background color; it should stay sharp and intentional.

## Asset Inventory Notes

The copied asset library includes the full organized XO public asset set:

- Brand cuts: favicons, logos, lime green SVGs, and Open Graph banners.
- Type cuts: SVG, PNG, JPG, WebP, GIF, video, data, icons, and public code assets.
- Project cuts: public assets from XO surfaces including docs, landing, swarm, room, OS, coworker, pitch, and related projects.

When adding new XO assets, place them in the narrowest useful location first. A general-purpose logo belongs in `by-brand/logos`; a format-specific export belongs in `by-type`; a one-off project screenshot belongs in that project's folder under `by-project`.
