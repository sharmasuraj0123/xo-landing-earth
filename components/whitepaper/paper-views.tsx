"use client";

/* ────────────────────────────────────────────────────────────────
   One paper, two readers.

   The human view lives here in the site's earth: green light, the
   DNA helix, the PDF read in your language. The AI view is a
   different world at a different address (/ai, via the nav's
   AI-view button): the galaxy has a real URL of its own.
──────────────────────────────────────────────────────────────── */

import { Download, FlaskConical, Presentation } from "lucide-react";
import { DnaVisualization } from "@/components/landing/dna-visualization";
import {
  WHITEPAPER_PDF_DOWNLOAD_PATH,
  WHITEPAPER_PDF_PATH,
  WHITEPAPER_PDF_VERSION,
} from "@/lib/whitepaper-pdf";

const HUMAN_BG = [
  "radial-gradient(55% 45% at 12% 0%, rgba(131,214,58,0.14), transparent 62%)",
  "radial-gradient(45% 40% at 88% 18%, rgba(34,120,60,0.16), transparent 65%)",
  "radial-gradient(70% 55% at 50% 105%, rgba(16,60,28,0.35), transparent 70%)",
  "linear-gradient(180deg, #030906 0%, #020604 100%)",
].join(", ");

export function PaperViews() {
  return (
    <div className="relative overflow-hidden">
      {/* human earth, behind everything */}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: HUMAN_BG }} />

      <div className="relative z-10">
        {/* ── hero ───────────────────────────────────────── */}
        <header className="view-in relative pt-28 lg:pt-32 pb-8 lg:pb-10">
          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-10 items-center">
              <div>
                <p className="flex items-center gap-3 text-sm font-mono text-white/50 mb-4">
                  <span className="w-8 h-px" style={{ background: "rgba(131,214,58,0.6)" }} />
                  For humans · quirq · Draft v3
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight leading-[0.95]">
                  Give your work
                  <br />
                  <span className="text-[#83d63a]">DNA.</span>
                </h1>
                <p className="mt-5 text-lg leading-relaxed max-w-[52ch] text-white/55">
                  quirq: a unit of work for intelligence. A new way to measure the output
                  of AI. Suraj Sharma, XO Labs.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="/whitepaper/validate"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#83d63a] text-black h-12 px-6 text-sm font-medium hover:bg-[#93e64a] hover:shadow-[0_0_28px_rgba(131,214,58,0.35)] transition-all duration-300"
                  >
                    <FlaskConical
                      className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-12"
                      aria-hidden="true"
                    />
                    Validate the paper
                  </a>
                  <a
                    href="/unit-of-work-slides.html"
                    className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.03] text-white h-12 px-6 text-sm font-medium hover:border-[#83d63a]/60 hover:bg-[#83d63a]/[0.08] hover:shadow-[0_0_24px_rgba(131,214,58,0.2)] transition-all duration-300"
                  >
                    <Presentation
                      className="w-4 h-4 text-[#83d63a] transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    Slides
                  </a>
                  <a
                    href={WHITEPAPER_PDF_DOWNLOAD_PATH}
                    className="group relative inline-flex items-center gap-4 rounded-full border border-[#83d63a]/40 bg-[#83d63a]/[0.06] hover:border-[#83d63a] hover:bg-[#83d63a]/[0.12] hover:shadow-[0_0_28px_rgba(131,214,58,0.25)] h-12 pl-6 pr-1.5 transition-all duration-300"
                  >
                    <span className="inline-flex items-center gap-2.5 text-sm font-medium text-white">
                      <Download
                        className="w-4 h-4 text-[#83d63a] transition-transform duration-300 group-hover:translate-y-0.5"
                        aria-hidden="true"
                      />
                      Download the paper
                    </span>
                    <span className="hidden sm:inline-flex items-center h-9 rounded-full bg-black/60 border border-white/10 px-3.5 font-mono text-[11px] tracking-wide text-white/50 group-hover:text-white/80 transition-colors">
                      PDF · 0.5 MB · {WHITEPAPER_PDF_VERSION}
                    </span>
                  </a>
                </div>
              </div>

              {/* the reader's totem */}
              <div className="relative h-[180px] sm:h-[260px] lg:h-[420px]" aria-hidden="true">
                <DnaVisualization />
              </div>
            </div>
          </div>
        </header>

        {/* ── the paper, in your language ────────────────── */}
        <section className="view-in relative max-w-[1400px] mx-auto px-6 lg:px-12 pb-16">
          <div className="rounded-2xl border border-white/15 bg-[#0b0d0a] overflow-hidden">
            <object
              data={WHITEPAPER_PDF_PATH}
              type="application/pdf"
              className="w-full h-[65vh] lg:h-[85vh]"
              aria-label="The quirq whitepaper, rendered as a PDF"
            >
              <div className="p-10 text-center">
                <p className="text-white/60">Your browser can&apos;t display the PDF inline.</p>
                <a
                  href={WHITEPAPER_PDF_DOWNLOAD_PATH}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white hover:bg-white/10 h-12 px-8 text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download the whitepaper
                </a>
              </div>
            </object>
          </div>

          <p className="mt-6 text-sm leading-relaxed max-w-[70ch] text-white/40">
            Every claim in the paper is tiered (sourced, derived, measured, open) with a
            public validation program in the docs. Questions or corrections:{" "}
            <a
              href="mailto:suraj@xo.builders"
              className="text-white/70 hover:text-white underline underline-offset-4 decoration-[#83d63a]/50"
            >
              suraj@xo.builders
            </a>
            .
          </p>
        </section>
      </div>

      <style jsx global>{`
        .view-in {
          animation: viewIn 0.65s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes viewIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
