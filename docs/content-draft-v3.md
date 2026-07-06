# Content Draft V3: "The Environment"

Anchor: XO is the workspace where agents do real work. Voice: plain, declarative.
Layout unchanged; every line below maps to an existing slot.

Narrative arc: What it is (Hero) → What's inside (Features) → How you use it (How It Works) → Where it runs (Infrastructure) → What it connects to (Integrations) → Why you can trust it (Security) → How you script it (Developers) → What it costs (Pricing) → Go (CTA).

## navigation

- Links: Environment, Process, Hosts, Integrations, Security (was: Thesis, Process, Environments, ...)
- Buttons: unchanged ("Learn More", "Try Now")

## hero

- Eyebrow: "Workspaces for AI agents · XO"
- Cycling phrases (line1 / line2 with green word):
  1. "Workspaces for" / "AI **agents**."
  2. "Runtime, memory, tools." / "One **environment**."
  3. "Build once." / "Run **anywhere**."
- Sub: "The environment where your agents do real work, and keep a record of all of it."
- Stats (NEED REAL NUMBERS, current ones are fiction):
  - "1T+" / "tokens processed monthly"
  - "1000+" / "builders on XO"
  - "1" / "image, any host"

## features

- Eyebrow: "The Environment" (keep)
- H2: "More than Memory." (keep, it fits the anchor)
- Sub: "An XO environment is where agents do real work: runtime, memory, tools, and a full record of everything that happened. Runs on XO, on your laptop, or on any cloud."
- Cards (keep titles, tighten copy):
  - Runtime: "A live execution context. The agent reads files, calls tools, and persists state between steps." Stat: "1 / environment per agent"
  - Memory: "Context that survives the session. The environment remembers what the agent did and what comes next." Stat: "0 / context lost between runs"
  - Tools: "Every integration wired in at start. Linear, GitHub, Slack, your APIs. All inside the environment." Stat: "100+ / integrations via MCP" (align with integrations section, was 12+)
  - Measurement: "Token spend, time, cost per run. Tracked automatically, so you can compare agents and models." Stat: "100% / observable spend"

## how-it-works

- Eyebrow: "Process" (keep)
- H2: "Create. Execute. Share." (keep)
- Steps (reframe around the environment):
  - 01 Create an environment: "Spin one up with a purpose. Runtime, memory, and tools included from the first second. No engineering required."
  - 02 Execute with your team: "Agents, humans, and tools work inside the same environment. Everything they do is recorded."
  - 03 Share or connect: "Hand the environment to anyone, human or agent, with full context intact. Or connect to one already running."
- Code snippets: keep as is (they already say this)

## infrastructure

- Eyebrow: "One image, any host" (keep)
- H2: "Run it anywhere." (keep)
- Sub (rewrite, fixes grammar): "One workspace image. The same environment runs on your laptop, on XO Platform, on Google Cloud, or on any Docker host. The trust boundary follows wherever you run it."
- Main stat + hosts: keep
- Stat cards: keep only if real; otherwise swap to "1 / image" and "4+ / host types"

## integrations

- Keep everything. Already on-anchor.
- Optional sub tweak: "Bring your own model. Connect your own tools. XO wires both into every environment through MCP."

## security

- Eyebrow: "Security" (keep)
- H2: "Isolated by default." (was "Verifiable, & Secure.")
- Sub: "Every environment is sandboxed, encrypted, and fully auditable."
- Feature cards: keep all four
- REMOVE unless verifiable: "0 security incidents this year", SOC 2 / ISO 27001 / HIPAA / GDPR badges

## developers

- Eyebrow: "Developer SDK" (keep)
- H2: "Define the work. The environment runs it." (was "...Environments settle it.")
- Sub: "An SDK to create, execute, and share environments from code."
- Features:
  - "Environments in code" / "Create and configure workspaces programmatically."
  - "Streaming execution" / "Watch the work and the spend as it runs."
  - "Full record" / "Snapshot before and after every run."
  - "Local to production" / "Same contract on any host."

## pricing

- H2: "Pay only for Compute." (keep, fits the anchor)
- Plans: keep structure and prices
- Fix: trial is 14 days everywhere
- Replace "BYOM - bring your own model" bullets with "Bring your own model, no markup" (no dashes)

## cta

- H2: "Ready to put your agents to work?" (was "Ready for the future of work?")
- Sub: "Spin up an environment in under a minute." (was "Settle on outcomes. Not on prompts.")
- CTAs: keep. Note: "14-day free trial" (was 15)

## footer

- Tagline: "Workspaces for AI agents." (was "Hire the skill, not the hours.")
- Product column: rename "Unit of work" link to "The environment"

## Dropped from this pass

- All settlement language (settle, units of work, outcomes vs prompts)
- Cost-intelligence hero framing (survives as the Measurement card)
- Fictional stats and unverified compliance badges (pending real numbers from suraj)
