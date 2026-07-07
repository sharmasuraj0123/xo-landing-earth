"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, FileText } from "lucide-react";

/* The whitepaper section: a teaser card for the Quirq paper.
   Clicking it opens /whitepaper, where the paper renders in the
   browser with a download option. */

export function WhitepaperSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="whitepaper" ref={sectionRef} className="relative py-10 lg:py-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: pitch */}
          <div
            className={`lg:col-span-7 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-12 h-px bg-foreground/30" />
              The research
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-[72px] font-display tracking-tight leading-[0.9]">
              The <span className="text-[#83d63a]">quirq.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Tokens meter what AI consumes. The quirq meters what it delivers, including the
              review time your token bill never sees.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
              <a
                href="/whitepaper"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90 h-12 px-8 text-sm font-medium transition-colors group"
              >
                Read the whitepaper
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/whitepaper/the-quirq.pdf"
                download="XO-The-quirq.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5 h-12 px-8 text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          </div>

          {/* Right: the paper, as an object */}
          <a
            href="/whitepaper"
            aria-label="Open the whitepaper"
            className={`lg:col-span-5 group block transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative max-w-[340px] mx-auto border border-foreground/15 bg-[#0b0d0a] p-8 aspect-[3/4] flex flex-col transition-all duration-300 group-hover:border-[#83d63a]/50 group-hover:-translate-y-1">
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#83d63a]/50"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#83d63a]/50"
              />
              <FileText className="w-6 h-6 text-[#83d63a] mb-6" aria-hidden="true" />
              <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
                Whitepaper · Draft v3
              </p>
              <p className="mt-3 font-display text-2xl leading-snug text-foreground">
                The quirq: a unit of measurement for the business impact of an agentic workforce
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-4">
                A quirq is minted, never self-reported: an owner budgets an outcome, the
                environment snapshots before and after, and verification mints delivered work.
              </p>
              <p className="mt-auto pt-6 font-mono text-xs text-muted-foreground">
                Suraj Sharma · XO Labs · 2026
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
