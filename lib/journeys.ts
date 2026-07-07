/* ────────────────────────────────────────────────────────────────
   Partner journeys.

   One idea, many companies: every partner gets the same page
   (XO × Partner, woven-strands header, clickable article list),
   only the articles differ. To add a company: add an entry here.
   To add an article: append to its `articles` array. Newest first.
──────────────────────────────────────────────────────────────── */

export type JourneyStat = { value: string; label: string; accent?: boolean };
export type JourneyPoint = { title: string; body: string };

export type JourneyArticle = {
  id: string;
  date: string;
  tag: string;
  title: string;
  /** Substring of title rendered in XO lime. */
  highlight?: string;
  summary: string;
  body?: string[];
  stats?: JourneyStat[];
  points?: JourneyPoint[];
  quote?: string;
  latest?: boolean;
  draft?: boolean;
  /** Link to the full original post, if one exists. */
  sourceUrl?: string;
};

export type Journey = {
  slug: string;
  partner: string;
  intro: string;
  /** Partner logo under /public. Falls back to a generated monogram. */
  logo?: string;
  articles: JourneyArticle[];
};

export const journeys: Record<string, Journey> = {
  "xo-google": {
    slug: "xo-google",
    partner: "Google",
    logo: "/images/logos/google.webp",
    intro:
      "From joining the Google Cloud startup ecosystem to a $375K commitment from Google for Startups. Milestone by milestone, the partnership powering XO's agentic infrastructure.",
    articles: [
      {
        id: "grant",
        date: "Feb 16, 2026",
        tag: "Grant",
        latest: true,
        title: "Google backs XO with a $375K commitment",
        highlight: "$375K",
        summary:
          "Google for Startups awards XO a grant to accelerate agentic AI infrastructure: cloud credits, AI credits, and follow-on funding toward the next generation of agent workspaces.",
        stats: [
          { value: "$200K", label: "Google Cloud credits" },
          { value: "$25K", label: "AI credits" },
          { value: "$150K", label: "follow-on funding" },
          { value: "$375K", label: "total commitment", accent: true },
        ],
        body: [
          "Google selected XO from a competitive pool of AI startups. That recognizes both the technical depth of the platform and the market opportunity in agentic infrastructure. It is one of the strongest signals yet that the industry's biggest players see agentic AI infrastructure as the next critical layer of the stack, and that XO is building it right.",
          "The cloud credits let us push harder on compute-intensive features: larger-scale agent orchestration, faster vector search, and more robust multi-tenant infrastructure. The AI credits unlock deeper experimentation with Vertex AI and Gemini models, which means more model choice inside every workspace.",
        ],
        points: [
          {
            title: "Enterprise-grade, scalable infra",
            body: "Fast, secure infrastructure so agents can run production workloads at any scale.",
          },
          {
            title: "One-click agent deployment",
            body: "Claude Code, OpenClaw, and Kimi-K2 as self-hosted setups. No expertise, no code.",
          },
          {
            title: "Longer trials for the community",
            body: "A 30-day risk-free trial. No commitment, no credit card, just build.",
          },
        ],
        quote:
          "A huge thank you to the Google Cloud team for believing in what we're building. The future of work is agentic, and XO is leading the charge.",
      },
      {
        id: "partnership",
        date: "Aug 19, 2025",
        tag: "Partnership",
        title: "XO joins the Google Cloud startup ecosystem",
        summary:
          "The chapter that started it all. Together with AWS, GCP support made XO multi-cloud by design: customer choice, data residency options, and resilience across providers.",
        body: [
          "Vertex AI, BigQuery, Cloud Run, and Pub/Sub map directly to XO's agentic workflows and analytics. A second major cloud backing the direction shows XO isn't a point tool; it's infrastructure for how teams will work with AI.",
          "Technical guidance and credits from GCP accelerate the roadmap and reinforce best-practice architecture.",
        ],
        points: [
          {
            title: "AI-first stack",
            body: "Vertex AI, BigQuery, Cloud Run, and Pub/Sub for agentic workflows and analytics.",
          },
          {
            title: "Multi-cloud by design",
            body: "Customer choice, data residency options, and resilience across providers.",
          },
          {
            title: "What it unlocked",
            body: "BigQuery-native workspace insights and smoother paths for teams already on Google Cloud.",
          },
        ],
        quote:
          "XO is built to scale, interoperable by default, and trusted by the platforms that power the modern internet.",
      },
    ],
  },

  "xo-aws": {
    slug: "xo-aws",
    partner: "AWS",
    logo: "/images/logos/aws.svg",
    intro:
      "XO's first cloud partnership. AWS for Startups made the workspace image cloud-native from day one.",
    articles: [
      {
        id: "startup-program",
        date: "2025",
        tag: "Partnership",
        latest: true,
        title: "XO joins the AWS Startup Program",
        summary:
          "XO's acceptance into the AWS Startup Program was the first major cloud validation, and the beginning of the multi-cloud design that now defines the platform.",
        body: [
          "Every XO workspace is one portable image, and AWS was the first cloud it called home. The Startup Program brought credits and architectural guidance that shaped how environments isolate, meter, and record agent work.",
        ],
        points: [
          {
            title: "First cloud home",
            body: "The workspace image ran on AWS before anywhere else.",
          },
          {
            title: "Multi-cloud foundation",
            body: "The AWS + GCP pair is what makes XO provider-agnostic today.",
          },
        ],
      },
    ],
  },

  "xo-nvidia": {
    slug: "xo-nvidia",
    partner: "NVIDIA",
    intro:
      "XO and the NVIDIA Inception Program. The story of putting serious compute behind agent workspaces.",
    articles: [
      {
        id: "inception",
        date: "2026",
        tag: "Program",
        latest: true,
        draft: true,
        title: "XO joins the NVIDIA Inception Program",
        summary:
          "Milestone article coming soon. This chapter will cover what Inception membership unlocks for GPU-backed agent workloads on XO.",
      },
    ],
  },

  "xo-microsoft": {
    slug: "xo-microsoft",
    partner: "Microsoft",
    logo: "/images/logos/microsoft.svg",
    intro: "XO and Microsoft. A chapter in progress.",
    articles: [
      {
        id: "first",
        date: "2026",
        tag: "Partnership",
        latest: true,
        draft: true,
        title: "XO × Microsoft: the first chapter",
        summary:
          "Milestone article coming soon. The full story of this partnership lands here.",
      },
    ],
  },

  "xo-okx": {
    slug: "xo-okx",
    partner: "OKX",
    intro: "XO and OKX. A chapter in progress.",
    articles: [
      {
        id: "first",
        date: "2026",
        tag: "Partnership",
        latest: true,
        draft: true,
        title: "XO × OKX: the first chapter",
        summary:
          "Milestone article coming soon. The full story of this partnership lands here.",
      },
    ],
  },

  "xo-community": {
    slug: "xo-community",
    partner: "the World",
    intro:
      "The public record: launches, competitions, and moments from @xo_builders, collected as they happened.",
    articles: [
      {
        id: "workspaces-launch",
        date: "Oct 15, 2025",
        tag: "Launch",
        latest: true,
        title: "XO Workspaces goes live",
        summary:
          "The launch of XO workspaces: a digital workspace for AI and human collaboration. Launch Claude Code, Clawdbot, or any agent in one click, with every agent in an isolated container, keys encrypted, and nothing leaving your environment.",
        body: [
          "Teased two days earlier with 'Game-changing? No more silos? Yeah, we meant every word. 48 hours till you see why.' The pitch was simple: it's not about replacing humans, it's about empowering them. The next leap in AI isn't just smarter tools, it's smarter collaboration.",
        ],
        points: [
          {
            title: "One-click agents",
            body: "Claude Code, Clawdbot, or any agent, live in a click.",
          },
          {
            title: "Isolated by default",
            body: "Every agent in its own container. Keys encrypted, workspaces private.",
          },
          {
            title: "No new apps",
            body: "Integrates with existing tools, so teams chat where they already are.",
          },
        ],
        sourceUrl: "https://x.com/xo_builders/status/1977779723171459539",
      },
      {
        id: "vibe-showdown",
        date: "Sep 20, 2025",
        tag: "Event",
        title: "Vibe Showdown: $5K on the line",
        summary:
          "Not your usual hackathon. A gamified solo competition where ideas go live: build with any tool, deploy on XO, climb the leaderboard. $5K prize pool, free registration, free deploys, and a shot to join XO as an AI researcher.",
        points: [
          {
            title: "Build with anything",
            body: "XO Vibe, Lovable, Bolt, or whatever you prefer. Deploy via XO.",
          },
          {
            title: "Points for shipping",
            body: "Activity streaks, submissions, and project engagement climb the leaderboard.",
          },
          {
            title: "More than prizes",
            body: "Top builders got a shot at joining XO as AI researchers.",
          },
        ],
        sourceUrl: "https://x.com/xo_builders/status/1969406129114620184",
      },
      {
        id: "brand-film",
        date: "Aug 25, 2025",
        tag: "Behind the scenes",
        title: "Two days on set: the XO story on film",
        summary:
          "It's a wrap. Two intense days with the Blockwee team, from early call times to late-night wrap-ups, bringing the XO story to life on camera.",
        sourceUrl: "https://x.com/xo_builders/status/1959993271645806776",
      },
    ],
  },

  "xo-anthropic": {
    slug: "xo-anthropic",
    partner: "Anthropic",
    intro:
      "Claude runs inside XO workspaces, and XO studies how Anthropic builds agents. Two chapters so far: one for everyone, one for developers.",
    articles: [
      {
        id: "cowork-deep-dive",
        date: "Jan 30, 2026",
        tag: "Deep dive",
        latest: true,
        title: "Inside Claude Cowork: architecture, SDK, and desktop agents",
        summary:
          "A technical dive into Claude Cowork's VM architecture, the Claude Agent SDK, MCP, and its security model. Anthropic's design validates the XO thesis: agents need secure workspaces, standard tool protocols, and humans in the loop.",
        body: [
          "Cowork runs inside a lightweight Linux VM with layered isolation: Apple's virtualization framework, Ubuntu, bubblewrap and seccomp, with network access through a domain allowlist. The agentic loop (observe, plan, act, reflect) is built on the Claude Agent SDK, and MCP is the extensibility backbone with more than a thousand community servers.",
          "What this means for XO: bounded autonomy that earns trust is the pattern winning across the industry. Secure workspaces, standardized tool protocols, human-in-the-loop by default. It is exactly the architecture XO environments are built on.",
        ],
        points: [
          {
            title: "VM isolation",
            body: "Defense in depth: hypervisor, sandboxed runtime, syscall isolation, network allowlist.",
          },
          {
            title: "MCP everywhere",
            body: "The USB-C for AI. The same protocol XO uses to wire tools into every environment.",
          },
          {
            title: "Bounded autonomy",
            body: "Three action tiers, from auto-proceed to prohibited. Trust is the product.",
          },
        ],
        quote:
          "Anthropic's architecture validates our thesis: the future isn't fully autonomous AI, it's bounded autonomy that earns trust.",
        sourceUrl: "https://www.xo.builders/blog/claude-cowork-technical-deep-dive",
      },
      {
        id: "cowork-guide",
        date: "Jan 30, 2026",
        tag: "Guide",
        title: "Meet Claude Cowork: an AI desktop assistant for everyday tasks",
        summary:
          "The plain-language companion piece: what Claude Cowork is, what it can do (documents, research, file organization, automation), and how to get started in four steps. Around 11 hours a week reclaimed from routine work.",
        points: [
          {
            title: "Action, not advice",
            body: "Ask for a spreadsheet, get an actual Excel file. Ask it to organize a folder, the files move.",
          },
          {
            title: "Real results",
            body: "Expense reports in 5 minutes instead of an hour. Notes to slide deck in 15 minutes instead of 3 hours.",
          },
          {
            title: "Four steps to start",
            body: "Download Claude, enable Cowork, select a folder, start chatting.",
          },
        ],
        sourceUrl: "https://www.xo.builders/blog/claude-cowork-productivity-guide",
      },
    ],
  },

  "xo-elevenlabs": {
    slug: "xo-elevenlabs",
    partner: "ElevenLabs",
    intro:
      "XO's research into the ElevenLabs Agents Platform: what it takes to manage user credentials programmatically when building multi-tenant voice-agent platforms.",
    articles: [
      {
        id: "credential-management",
        date: "Jan 17, 2026",
        tag: "Deep dive",
        latest: true,
        title: "Managing user credentials programmatically on the ElevenLabs Agents Platform",
        summary:
          "ElevenLabs is powerful for voice AI, but its secrets are workspace-scoped, not per-user. Building a multi-tenant agent platform means building your own credential vault. Here is the architecture that works.",
        body: [
          "The platform coordinates speech-to-text, an LLM orchestrator, text-to-speech, and a tools system, deployable to web, mobile, telephony, and WhatsApp. But there is no native distinction between one user's Slack token and another's, so per-user OAuth needs your own encrypted token store, refresh handling, and injection via secret-prefixed dynamic variables.",
          "The recommended pattern: one shared workspace, per-user tokens injected at conversation start, and the secret__ prefix so credentials never reach the LLM. It is the same lesson XO environments encode: secrets belong to the workspace layer, not the model.",
        ],
        points: [
          {
            title: "Workspace-scoped secrets",
            body: "The Secrets API handles app-level keys. Per-user tokens are yours to store and refresh.",
          },
          {
            title: "The secret__ prefix",
            body: "Dynamic variables injected into tool headers, never exposed to the LLM.",
          },
          {
            title: "Three tenancy options",
            body: "Shared workspace with injected tokens, per-user workspaces, or a hybrid by organization.",
          },
        ],
        sourceUrl: "https://www.xo.builders/blog/elevenlabs-agents-credential-management",
      },
    ],
  },

  "xo-openclaw": {
    slug: "xo-openclaw",
    partner: "OpenClaw",
    intro:
      "OpenClaw is the open-source agent framework that runs inside XO workspaces. The guides for building with it live here.",
    articles: [
      {
        id: "setup-guide",
        date: "Feb 3, 2026",
        tag: "Guide",
        latest: true,
        title: "A developer's guide to setting up OpenClaw in XO",
        summary:
          "The definitive step-by-step walkthrough: from the XO dashboard to a running OpenClaw project in eight steps, with screenshots, a video walkthrough, and a starter repository.",
        body: [
          "Create a project from the starter kit, open the chat interface, connect your IDE of choice, and run the installer. Troubleshooting for permissions, gateway ports, CLI paths, and the Coder extension is included. Everything starts at the XO dashboard.",
        ],
        points: [
          {
            title: "Eight steps",
            body: "Dashboard to running agent, with actual screenshots for every step.",
          },
          {
            title: "Starter kit",
            body: "Fork the openclaw-starterkit repo and skip the boilerplate.",
          },
          {
            title: "Any IDE",
            body: "VS Code, Cursor, or IntelliJ. The workspace connects to all of them.",
          },
        ],
        sourceUrl: "https://www.xo.builders/blog/open-claw-setup-guide",
      },
    ],
  },

  "xo-nebius": {
    slug: "xo-nebius",
    partner: "Nebius",
    intro: "XO and Nebius. A chapter in progress.",
    articles: [
      {
        id: "first",
        date: "2026",
        tag: "Partnership",
        latest: true,
        draft: true,
        title: "XO × Nebius: the first chapter",
        summary:
          "Milestone article coming soon. The full story of this partnership lands here.",
      },
    ],
  },

  "xo-magicpath": {
    slug: "xo-magicpath",
    partner: "MagicPath",
    intro:
      "XO and MagicPath: two takes on the same conviction, that humans and agents share a workspace.",
    articles: [
      {
        id: "first",
        date: "2026",
        tag: "Partnership",
        latest: true,
        draft: true,
        title: "XO × MagicPath: the first chapter",
        summary:
          "Milestone article coming soon. The full story of this partnership lands here.",
      },
    ],
  },

  "xo-gaia": {
    slug: "xo-gaia",
    partner: "Gaia",
    intro:
      "Gaia nodes run as a launchpad template on XO: your own LLM, zero configuration. The chapters of that collaboration live here.",
    articles: [
      {
        id: "first",
        date: "2026",
        tag: "Partnership",
        latest: true,
        draft: true,
        title: "XO × Gaia: the first chapter",
        summary:
          "Milestone article coming soon. The full story of this partnership lands here.",
      },
    ],
  },

  "xo-evm-capital": {
    slug: "xo-evm-capital",
    partner: "EVM Capital",
    intro: "XO and EVM Capital. A chapter in progress.",
    articles: [
      {
        id: "first",
        date: "2026",
        tag: "Partnership",
        latest: true,
        draft: true,
        title: "XO × EVM Capital: the first chapter",
        summary:
          "Milestone article coming soon. The full story of this partnership lands here.",
      },
    ],
  },

  "xo-hysolwin": {
    slug: "xo-hysolwin",
    partner: "Hysolwin Green Energy",
    intro:
      "Hysolwin Green Energy runs on XO. A green-energy team putting agent workspaces to work.",
    articles: [
      {
        id: "first",
        date: "2026",
        tag: "Customer",
        latest: true,
        title: "XO × Hysolwin Green Energy: the first chapter",
        summary:
          "The full story of this collaboration is coming. Until then, follow Hysolwin Green Energy on LinkedIn.",
        sourceUrl: "https://www.linkedin.com/company/hysolwin-green-energy/",
      },
    ],
  },

  "xo-ppai": {
    slug: "xo-ppai",
    partner: "PPAI Innovations",
    intro:
      "PPAI Innovations runs on XO. Building with agent workspaces, one project at a time.",
    articles: [
      {
        id: "first",
        date: "2026",
        tag: "Customer",
        latest: true,
        title: "XO × PPAI Innovations: the first chapter",
        summary:
          "The full story of this collaboration is coming. Until then, follow PPAI Innovations on LinkedIn.",
        sourceUrl: "https://www.linkedin.com/company/ppai-innovations-llp/",
      },
    ],
  },

  "xo-enviroedge": {
    slug: "xo-enviroedge",
    partner: "EnviroEdge Partner",
    intro:
      "EnviroEdge Partner runs on XO. Environmental work, measured the unit-of-work way.",
    articles: [
      {
        id: "first",
        date: "2026",
        tag: "Customer",
        latest: true,
        title: "XO × EnviroEdge Partner: the first chapter",
        summary:
          "The full story of this collaboration is coming. Until then, follow EnviroEdge Partner on LinkedIn.",
        sourceUrl: "https://www.linkedin.com/company/enviroedge-partner-pvt-ltd/",
      },
    ],
  },
};
