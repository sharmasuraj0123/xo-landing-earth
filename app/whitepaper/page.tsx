import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { DnaVisualization } from "@/components/landing/dna-visualization";
import { Download, Orbit } from "lucide-react";

export const metadata: Metadata = {
  title: "The quirq: XO Whitepaper",
  description:
    "A unit of measurement for the business impact of an agentic workforce. Read the XO whitepaper in the browser or download the PDF.",
};

const PDF_PATH = "/whitepaper/the-quirq.pdf";

export default function WhitepaperPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* Header */}
      <header className="relative pt-28 lg:pt-36 pb-8">
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white transition-colors mb-8"
          >
            <span aria-hidden="true">&larr;</span> Back to XO
          </a>

          <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-center">
            <div>
              <p className="flex items-center gap-3 text-sm font-mono text-white/50 mb-4">
                <span className="w-8 h-px bg-[#83d63a]/60" />
                 quirq · Draft v3
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight leading-[0.95]">
                Give your work
                <br />
                <span className="text-[#83d63a]">DNA.</span>
              </h1>
              <p className="mt-5 text-lg text-white/55 leading-relaxed max-w-[52ch]">
                The quirq: a unit of measurement for the business impact of an agentic
                workforce. New way to measure output of AI.
                Suraj Sharma, XO Labs.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/whitepaper/visualize"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#83d63a] text-black h-12 px-6 text-sm font-medium hover:bg-[#93e64a] hover:shadow-[0_0_28px_rgba(131,214,58,0.35)] transition-all duration-300"
              >
                <Orbit
                  className="w-4 h-4 transition-transform duration-500 group-hover:rotate-90"
                  aria-hidden="true"
                />
                Visualize
              </a>
              <a
                href={PDF_PATH}
                download="XO-The-quirq.pdf"
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
                  PDF · 0.5 MB · v3
                </span>
              </a>
              </div>
            </div>

            {/* The DNA helix, moved home from the landing page */}
            <div className="relative h-[240px] sm:h-[300px] lg:h-[420px]" aria-hidden="true">
              <DnaVisualization />
            </div>
          </div>
        </div>
      </header>

      {/* The paper, rendered in the browser */}
      <section className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pb-16">
        <div className="rounded-2xl border border-white/15 bg-[#0b0d0a] overflow-hidden">
          <object
            data={PDF_PATH}
            type="application/pdf"
            className="w-full h-[65vh] lg:h-[85vh]"
            aria-label="The quirq whitepaper, rendered as a PDF"
          >
            {/* Fallback for browsers without an inline PDF viewer */}
            <div className="p-10 text-center">
              <p className="text-white/60">
                Your browser can&apos;t display the PDF inline.
              </p>
              <a
                href={PDF_PATH}
                download="XO-The-quirq.pdf"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white hover:bg-white/10 h-12 px-8 text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Download the whitepaper
              </a>
            </div>
          </object>
        </div>

        <p className="mt-6 text-sm text-white/40 leading-relaxed max-w-[70ch]">
          Every claim in the paper is tiered (sourced, derived, measured, open) with a public
          validation program in the docs. Questions or corrections:{" "}
          <a href="mailto:suraj@xo.builders" className="text-white/70 hover:text-white underline underline-offset-4 decoration-[#83d63a]/50">
            suraj@xo.builders
          </a>
          .
        </p>
      </section>

      <FooterSection />
    </main>
  );
}
