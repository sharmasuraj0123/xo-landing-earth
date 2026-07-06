# Content Draft V4: Restructure for Conversion

Goal: the page is a marketing surface AND an on-ramp. Every scroll position should answer "what is this, why should I care, what do I do next", and every section ends pointing at one of two doors: **Sign up** (app.xo.builders) or **Read the docs** (docs.xo.builders).

## The flaws in the current page

1. **Concept before product.** Hero and "More than a runtime" are two abstract sections in a row. A visitor scrolls 40 percent of the page before seeing anything they could click in real life. The product (which looks great and matches the brand) is never shown.
2. **Measurement is said five times, progressed zero times.** Hero sub, features card 04, step 03, metrics section, pricing bullet. Repetition without escalation reads as padding.
3. **The thesis is unnamed.** The page explains pieces of the unit of work (record, quantify, compound) but never says "unit of work", never says "definition of done" prominently, and lost "budget caps" entirely. A visitor who later reads the docs won't connect the two.
4. **One door, hidden.** The only conversion moments are the hero buttons and pricing. Mid-page readers (the majority who bounce) never see a CTA. The closing section's buttons literally have no hrefs. Footer is dead links.
5. **Persona whiplash.** "No engineering required" sits next to code snippets. Business owners and developers are interleaved instead of routed.
6. **Trust theater.** The LIVE badge over invented numbers, and unverifiable claims, are the only dishonest notes on an otherwise honest page.
7. **Section voice drift.** "More than a runtime." / "Every token, every cent." / "The agent is not the work." / "Give your work DNA." are each good, but nothing announces they are one argument.

## The fix: one argument, told in order

The page becomes a single sentence stretched across sections:

> Agents need workspaces (1), here's ours in three steps (2), it makes AI work quantifiable, that bundle is the unit of work (3), here's what you see (4), agents are reusable, work is permanent (5), it connects to your stack safely (6), developers get a code path (7), pricing is per workspace (8), give your work DNA (9).

## New section order

Current: Hero → Runtime → TrustedBy → Steps → Metrics → Agent≠Work → Integrations → Security → Developers → Pricing → DNA CTA
**New: Hero → TrustedBy → Steps (+screenshots) → Unit of Work → Metrics → Agent≠Work → Integrations+Security → Developers (docs door) → Pricing → DNA CTA → Footer (fixed)**

Two moves: TrustedBy jumps to position 2 (credibility while attention is highest), Steps jump above the concept section (show before explain). "More than a runtime" becomes the named thesis section.

## Section drafts

### 1 · Nav
- Links: How it works (#how-it-works), Why XO (#features), Agents (#infra), Pricing (#pricing), Docs (docs.xo.builders, external)
- Buttons: "Docs" (outline) · "Sign up" (filled) → app.xo.builders
- Change: "Learn More/Try Now" are generic; name the doors.

### 2 · Hero
- Keep: "Workspaces for / [AI agents. | teammates. | partners. | coworkers.]"
- Sub: "The environment where your agents do real work, and you see exactly what that work costs and delivers."
- CTAs: "Sign up free" → app.xo.builders · "Read the docs" → docs.xo.builders
- Stats (only what we can defend): "1T+ tokens metered monthly" · "100% of spend tracked to the cent" · "1000+ builders"

### 3 · Trusted by (moved up)
- Unchanged carousel. Upgrade NVIDIA, OKX, MagicPath to real SVGs when available; mixed text/logo weakens the row.

### 4 · How it works (moved up, gets the product)
- Eyebrow: "Process" · H2: "Create. Setup. Share."
- THE upgrade: replace or accompany each step card with a real product screenshot (project page with Ready badge for 01, setup checklist for 02, usage dashboard for 03). The app is dark and lime; it will look native to the page. Delete the never-rendered code snippets or render them; don't ship dead copy.
- Step copy: keep current (template lineup, checklist, share and measure).
- Micro-CTA under the steps: "Create your first project in about a minute. → Sign up"

### 5 · The thesis, named (was "More than a runtime")
- Eyebrow: "Why XO"
- H2: "More than a runtime." (keep)
- Sub: "An environment is a runtime plus memory, tools, and the record. It snapshots the state before and after, meters every token in between, and scores the result against a definition of done. **That bundle is the unit of work: AI work you can check, price, and repeat.**"
- Render ALL FOUR cards (currently 3 of 4 are hidden): A place to act · Memory that compounds · Tools to reach your systems · A record it can't fake.
- Footnote link: "Read the research → docs.xo.builders/future-of-work"

### 6 · Metrics (honesty fix)
- Drop the LIVE badge and UTC clock, or relabel the block "Your usage dashboard".
- Eyebrow: "What you see" · H2: "Every token, every cent." (keep)
- Frame the three numbers as what every project ships with, not platform telemetry: "Tokens over time · Daily cost · Latency, min to p95. Per project, per day, from day one."
- Micro-CTA: "See your own numbers → Sign up"

### 7 · Agent ≠ work (keep, sharpen)
- H2: "The agent is not the work." (keep, best line on the page)
- Sub: add the budget beat that was lost: "Set up an agent once: model, data, secrets, budget. Point it at any project. The work stays in the project: tracked, capped, shared, yours."
- Template cards: fill Hermes' real description.

### 8 · Integrations + Security (tighten)
- Integrations: icons must match copy. Swap floating icons to WhatsApp, Slack, GitHub, Linear (SVGs exist in docs/brand). Keep "19+ · BYOM · MCP".
- Security sub gains the budget word back: "Every environment is sandboxed, encrypted, budget-capped, and fully auditable."
- These two could visually share one "connects safely to your stack" chapter; no layout surgery required, just consistent eyebrows: "Connect" and "Trust".

### 9 · Developers (the docs door)
- Eyebrow: "For developers" · H2: "Bring your repo. Or start blank." (keep)
- Sub: "Blank Canvas is a full dev workspace: import from GitHub, pick your runtime, watch it run."
- CTA (new, this section's whole job): "Read the docs → docs.xo.builders" as a visible button, not a text link.

### 10 · Pricing (keep V3 tiers, one fix)
- Free / Starter $10 / Pro $20 / Max $100 / Enterprise custom, all "Sign up" → app.
- Fix the ladder honesty: Max at $100 for 500 ws makes Pro the worst deal per workspace above Starter. Either state it proudly ("volume gets cheaper") or adjust counts. Suggested framing bullet on Max: "$0.20 per workspace, the volume price."
- Keep: unlimited seats on every plan, per-workspace billing note.

### 11 · Close (DNA + working buttons)
- H2: "Give your work DNA." (keep)
- Sub: keep the compounding line.
- CTAs, with real hrefs this time: "Sign up free" → app.xo.builders · "Read the docs" → docs.xo.builders. Note: "14-day free trial on paid tiers".

### 12 · Footer (from dead to useful)
- Tagline: "Workspaces for AI agents."
- Product links → page anchors. Developers links → real docs URLs (Documentation → docs.xo.builders, API/SDK → docs pages, Status → real or remove). Company → xo.builders pages or remove. GitHub → org account, not personal.

## Conversion map (the point of all this)

| Scroll depth | Reader state | Door offered |
|---|---|---|
| Hero | curious | Sign up + Docs |
| Steps | "looks easy" | Sign up (micro-CTA) |
| Thesis | "makes sense" | Docs (research link) |
| Metrics | "I want to see mine" | Sign up (micro-CTA) |
| Developers | technical evaluator | Docs (button) |
| Pricing | ready | Sign up ×5 |
| Close | convinced | Sign up + Docs |

Seven offers, two doors, zero dead buttons.

## Implementation checklist (in order of impact)

1. Product screenshots into Steps (need exports from suraj, or crops of the two already shared)
2. All four thesis cards rendered; thesis named with docs link
3. Every CTA gets a real href (hero, close, micro-CTAs, footer)
4. Metrics LIVE badge removed / reframed
5. TrustedBy moved to position 2; Steps to position 3
6. Integrations icons matched to copy; budget caps restored in security + agent section
7. Nav renamed; Docs button added
8. Footer links fixed
9. Pink #eca8d6 → lime everywhere (pricing checks, metrics dots, infra lines)
