import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { WorkResults } from "@/components/blog/work-results";
import { PartnerLockup } from "@/components/blog/partner-lockup";
import { journeys, type Journey } from "@/lib/journeys";

/* Shared shell for every XO × Partner journey page.

   Reads like a search results page for the partnership: full-width
   lockup banner, the work as expandable results on the left, and a
   sticky profile panel (the knowledge card) on the right. */

export function JourneyPage({ journey }: { journey: Journey }) {
  const chapters = journey.articles;
  const latest = chapters[0];
  const first = chapters[chapters.length - 1];
  const links = chapters.filter((a) => a.sourceUrl).slice(0, 4);
  const related = Object.values(journeys).filter((j) => j.slug !== journey.slug);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* ── Banner: full-width lockup right under the nav ─────── */}
      <header className="relative pt-28 lg:pt-36 pb-10 overflow-hidden">
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

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white transition-colors mb-6"
          >
            <span aria-hidden="true">&larr;</span> Back to XO
          </a>

          <h1 className="sr-only">XO and {journey.partner}: everything built together</h1>
          <PartnerLockup partner={journey.partner} logo={journey.logo} />
        </div>
      </header>

      {/* ── Results + profile panel ───────────────────────────── */}
      <section className="relative max-w-[1200px] mx-auto px-6 lg:px-12 pb-16">
        <div className="grid lg:grid-cols-[1fr_330px] gap-10 lg:gap-14 items-start">
          {/* Left: the work, as results */}
          <WorkResults articles={chapters} slug={journey.slug} partner={journey.partner} />

          {/* Right: sticky profile card */}
          <aside className="lg:sticky lg:top-28 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-white/[0.02]">
              <p className="font-mono text-xs text-white/40 mb-1">Partnership profile</p>
              <p className="font-display text-2xl tracking-tight">
                XO <span className="text-[#83d63a]">&times;</span> {journey.partner}
              </p>
            </div>

            <div className="p-6 border-b border-white/10">
              <p className="text-sm text-white/60 leading-relaxed">{journey.intro}</p>
            </div>

            <dl className="p-6 space-y-3 text-sm border-b border-white/10">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="font-mono text-white/40">Chapters</dt>
                <dd className="text-white">{chapters.length}</dd>
              </div>
              {first && (
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-white/40">Since</dt>
                  <dd className="text-white text-right">{first.date}</dd>
                </div>
              )}
              {latest && (
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-white/40">Latest</dt>
                  <dd className="text-white text-right">{latest.tag} · {latest.date}</dd>
                </div>
              )}
            </dl>

            {links.length > 0 && (
              <div className="p-6 border-b border-white/10">
                <p className="font-mono text-xs text-white/40 mb-3">Links</p>
                <ul className="space-y-2">
                  {links.map((a) => (
                    <li key={a.id}>
                      <a
                        href={a.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                      >
                        <span className="text-[#83d63a]" aria-hidden="true">&#8599;</span>
                        <span className="truncate max-w-[30ch]">{a.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-6">
              <p className="font-mono text-xs text-white/40 mb-3">More journeys</p>
              <ul className="space-y-2">
                {related.slice(0, 6).map((j) => (
                  <li key={j.slug}>
                    <a
                      href={`/blog/${j.slug}`}
                      className="group flex items-baseline justify-between gap-3 text-sm text-white/60 hover:text-white transition-colors"
                    >
                      <span>
                        XO <span className="text-[#83d63a]">&times;</span> {j.partner}
                      </span>
                      <span className="font-mono text-xs text-white/30 group-hover:text-white/60 shrink-0">
                        {j.articles.length} ch.
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="relative max-w-[1200px] mx-auto px-6 lg:px-12 pb-24">
        <div className="relative border border-white/10 rounded-2xl p-10 lg:p-14 overflow-hidden">
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
