import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { JourneyExplorer } from "@/components/blog/journey-explorer";
import type { Journey } from "@/lib/journeys";

/* Shared shell for every XO × Partner journey page.
   Same idea for every company; only the articles differ. */

export function JourneyPage({ journey }: { journey: Journey }) {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* ── Header ──────────────────────────────────────────── */}
      <header className="relative pt-40 lg:pt-52 pb-14 lg:pb-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[760px] h-[440px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(closest-side, rgba(131,214,58,0.14), transparent)" }}
        />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white transition-colors mb-14"
          >
            <span aria-hidden="true">&larr;</span> Back to XO
          </a>

          <p className="flex items-center gap-3 text-sm font-mono text-white/50 mb-8">
            <span className="w-8 h-px bg-[#83d63a]/60" />
            The journey · {journey.articles.length}{" "}
            {journey.articles.length === 1 ? "chapter" : "chapters"} and counting
          </p>

          <h1 className="text-[clamp(2.8rem,8vw,6.5rem)] font-display tracking-tight leading-[0.95]">
            XO <span className="text-[#83d63a]">&times;</span> {journey.partner}
          </h1>

          <p className="mt-8 text-xl text-white/55 leading-relaxed max-w-[52ch]">
            {journey.intro}
          </p>

          {/* Two strands converging: how the two companies evolved together */}
          <svg
            viewBox="0 0 900 150"
            className="w-full h-auto mt-12"
            role="img"
            aria-label={`Two paths, XO and ${journey.partner}, weaving together into one line`}
          >
            <defs>
              <linearGradient id="xoStrand" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(131,214,58,0.15)" />
                <stop offset="100%" stopColor="#83d63a" />
              </linearGradient>
              <linearGradient id="gStrand" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.85)" />
              </linearGradient>
            </defs>
            <path
              id="xoPath"
              d="M 40 30 C 220 30, 260 115, 450 115 C 600 115, 660 80, 860 78"
              fill="none"
              stroke="url(#xoStrand)"
              strokeWidth="1.6"
            />
            <path
              id="gPath"
              d="M 40 125 C 220 125, 260 40, 450 40 C 600 40, 660 74, 860 76"
              fill="none"
              stroke="url(#gStrand)"
              strokeWidth="1.6"
            />
            <text x="40" y="18" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fill="#83d63a">
              XO
            </text>
            <text x="40" y="146" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fill="rgba(255,255,255,0.6)">
              {journey.partner}
            </text>
            <circle cx="860" cy="77" r="3" fill="#83d63a" />
            <circle r="2.5" fill="#83d63a">
              <animateMotion dur="7s" repeatCount="indefinite">
                <mpath href="#xoPath" />
              </animateMotion>
            </circle>
            <circle r="2.5" fill="rgba(255,255,255,0.9)">
              <animateMotion dur="7s" begin="3.5s" repeatCount="indefinite">
                <mpath href="#gPath" />
              </animateMotion>
            </circle>
          </svg>
        </div>
      </header>

      {/* ── Article list + reader ───────────────────────────── */}
      <section className="relative max-w-[1100px] mx-auto px-6 lg:px-12 pb-8">
        <JourneyExplorer articles={journey.articles} />
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="relative max-w-[1100px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="relative border border-white/10 p-10 lg:p-14 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-[340px] h-[340px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(closest-side, rgba(131,214,58,0.12), transparent)" }}
          />
          <h2 className="text-3xl lg:text-4xl font-display tracking-tight relative z-10">
            Build on the same infrastructure.
          </h2>
          <p className="mt-4 text-white/50 relative z-10 max-w-[48ch]">
            The workspaces these partnerships fund are live today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 relative z-10">
            <a
              href="https://app.xo.builders"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white text-black hover:bg-white/90 h-12 px-8 text-sm font-medium transition-colors"
            >
              Sign up free
            </a>
            <a
              href="https://docs.xo.builders"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 h-12 px-8 text-sm font-medium transition-colors"
            >
              Read the docs
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
