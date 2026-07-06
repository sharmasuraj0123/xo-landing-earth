# Landing Page Content Inventory

Extracted 2026-07-06. Copy-only brainstorm; layout stays as is.

## Page order

Navigation → Hero → Features → How It Works → Infrastructure → Integrations → Security → Developers → Pricing → CTA → Footer. Hidden: Metrics, Testimonials.

## navigation

- Links: Thesis, Process, Environments, Integrations, Security
- Buttons: "Learn More", "Try Now"

## hero-section

- Eyebrow: "Agent intelligence · XO"
- H1 (cycling): "Quantify agent impact." / "Compare agent cost." / "Justify your AI spend."
- Sub: "The environment that shows you what your agents are actually worth."
- CTAs: "Try Now", "Learn More"
- Stats: "1000+ active environments" / "100B+ monthly optimization" / "~42% cost drop by run 50"

## features-section

- Eyebrow: "The Environment"
- H2: "More than Memory."
- Sub: "An XO environment is where agents do real work: runtime, memory, tools, and a full record of everything it did and what it cost. Runs on XO, locally, or on GCP or any cloud."
- Cards:
  - Runtime: "A live execution context. The agent runs here, reads files, calls tools, and persists state between steps." Stat: 1 environment per unit of work
  - Memory: "Context that survives the session. The environment remembers what the agent did, what it cost, and what came next." Stat: 0 context lost between runs
  - Tools: "Every integration wired in at start. Linear, GitHub, Slack, your APIs, all available to the agent inside the environment." Stat: 12+ integrations via MCP
  - Measurement: "Token spend, time, cost per outcome. The environment tracks it all so you can compare agents, models, and runs." Stat: 100% observable spend

## how-it-works-section

- Eyebrow: "Process"
- H2: "Create. Execute. Share."
- Steps:
  - 01 Create a project: "Define the project and its purpose. Any business owner can do it, no engineering required." (code: xo.create)
  - 02 Execute with your team: "Set up agents, humans, tools, and fleets. They work together inside a single shared workspace." (code: project.setup)
  - 03 Share or connect: "Share the work so any human or agent can take over. Or connect directly to a project already running." (code: project.share / xo.connect)

## infrastructure-section

- Eyebrow: "One image, any host"
- H2: "Run it anywhere."
- Sub: "XO Project is lightweight script that can connect to any device and allow you to collaborate . Same workspace on your laptop, on XO Platform, on Google Cloud, or any Docker host. The trust boundary follows wherever you run it." (note: grammar issues in source)
- Main stat: "1 image, any host"
- Stat cards: "99.99% workspace uptime", "<50ms workspace connect time"
- Hosts: XO Platform (managed, always-on), Local machine (dev and test), Google Cloud (GCP, US or India), Any cloud (AWS, Azure, Docker)

## integrations-section

- Eyebrow: "Integrations"
- H2: "Your tools, your models."
- Sub: "Bring your own model. Connect your own tools. XO wires them into every workspace through MCP."
- Icons: Codex (Agent), Claude (Agent), Slack (Comms), Vercel (Deploy)
- Stats: "100+ Integrations", "BYOM", "MCP custom tool protocol"
- Link: "Browse all connectors"

## security-section

- Eyebrow: "Security"
- H2: "Verifiable, & Secure."
- Sub: "RBAC, budget caps, full record before settlement."
- Stat: "0 security incidents this year"
- Certs: SOC 2, ISO 27001, HIPAA, GDPR
- Features: Environment isolation / Encrypted memory / Full audit trails / Permission boundaries

## developers-section

- Eyebrow: "Developer SDK"
- H2: "Define the work. Environments settle it."
- Sub: "An SDK for define, budget, execute, verify, settle."
- Features: "Define units in code" / "Streaming execution: live cost metering as work runs" / "Verification hooks: snapshot before and after" / "Local to production: same contract, any environment"

## pricing-section

- Eyebrow: "Pricing"
- H2: "Pay only for Compute."
- Starter $10/mo: 1 workspace (2 CPU / 8 GB), runs 24/7, SDK + tools, basic templates, community support, BYOM. 14-day trial. CTA "Start free trial"
- Pro $20/mo (Most Popular): 3 workspaces, full template library, MCP integrations, spend tracking per run, compare agents, BYOM. CTA "Get started"
- Business $500/mo: 100 workspaces, dedicated VM 24/7, white-label, SSO/SAML, audit trails, email + Slack support, custom templates, enterprise SLA. CTA "Contact sales"
- Notes: per-workspace billing (active only), BYOM no markup, overage $20/ws (Standard $40/ws)

## cta-section

- H2: "Ready for the future of work?"
- Sub: "Settle on outcomes. Not on prompts."
- CTAs: "Start free", "Book a demo"
- Note: "15 days free trial" (inconsistent with 14-day elsewhere)

## footer-section

- Tagline: "Hire the skill, not the hours."
- Columns: Product / Developers / Company / Legal

## Hidden sections

- Metrics: "12,847,392 units settled today", "99.9% verification pass rate", "~42% cost reduction"
- Testimonials: 4 fictional customers (Crestline AI, Lattice Works, Forma Labs, Sora Systems)

## Known issues to resolve in brainstorm

1. Four competing narratives: cost intelligence (hero), the environment (features/infra), team collaboration (how-it-works), outcome settlement (developers/CTA/footer)
2. Trial length inconsistent: 14 days (pricing) vs 15 days (CTA)
3. Infrastructure subhead has grammar errors
4. Stats are unverified/fictional: "1000+ environments", "0 security incidents", SOC 2 / ISO / HIPAA badges
5. Developers subhead is not a sentence: "An SDK for define, budget, execute, verify, settle"
