"use client";

/* ────────────────────────────────────────────────────────────────
   The quirq calculator page.

   The paper's proposed formulas as a live visual instrument: set
   your own program's numbers and watch the minting equation, the
   all-in cost model, the unit economics, the savings against a
   human baseline, the energy bridge, and the six-month trajectory
   recompute in place. Defaults reproduce Table 1's April column.
──────────────────────────────────────────────────────────────── */

import Link from "next/link";
import { Download } from "lucide-react";
import { caveat } from "@/lib/quirq-data";
import { QuirqCalculator } from "./quirq-calculator";

export function QuirqVisualization() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* ── masthead ─────────────────────────────────────────── */}
      <header className="relative pt-16 pb-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between gap-4 mb-10">
            <Link
              href="/whitepaper"
              className="inline-flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white transition-colors"
            >
              <span aria-hidden="true">&larr;</span> The paper
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white/50">
              Paper · The quirq · Draft v3
            </span>
          </div>
          <p className="flex items-center gap-3 text-sm font-mono text-[#83d63a] mb-4">
            <span className="w-8 h-px bg-[#83d63a]/60" />
            The quirq calculator
          </p>
          <h1 className="font-display text-4xl lg:text-6xl tracking-tight leading-[0.95] max-w-3xl text-balance">
            Run the paper&apos;s math on your own work.
          </h1>
          <p className="mt-5 text-lg text-white/55 leading-relaxed max-w-[64ch]">
            Every formula the paper proposes, computed live: what your agentic program mints,
            what it burns in dollars and kilowatt-hours, what it saves against a human
            baseline, and where the trajectory goes when your checks harden. The defaults
            reproduce the paper&apos;s own Table 1, so you can audit the arithmetic before you
            trust it with yours.
          </p>
        </div>
      </header>

      {/* ── the calculator ───────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-12 pb-16">
        <QuirqCalculator />
      </section>

      {/* ── honesty coda ─────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-12 pb-20">
        <div className="rounded-2xl border border-white/10 p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {["Sourced", "Derived", "Measured", "Open"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white/50"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-sm text-white/55 leading-relaxed max-w-[80ch]">
            {caveat}{" "}
            Inputs marked as assumptions (the human baseline, joules per token, grid
            intensity) are yours to defend, not the paper&apos;s claims.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/whitepaper"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black h-11 px-6 text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Read the paper
            </Link>
            <a
              href="/whitepaper/the-quirq.pdf"
              download="XO-The-quirq.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white h-11 px-6 text-sm hover:bg-white/10 transition-colors"
            >
              <Download className="w-4 h-4" /> PDF
            </a>
            <span className="font-mono text-[11px] text-white/35">
              This instrument is data-driven: the same calculator can price any paper that
              supplies its formulas.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
