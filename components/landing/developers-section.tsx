"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AsciiScene } from "@/components/landing/ascii-scene";
import { DnaVisualization } from "@/components/landing/dna-visualization";

export function DevelopersSection() {
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
    <section id="developers" ref={sectionRef} className="relative py-14 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <AsciiScene />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div
            className={`flex-1 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Work that compounds
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-[84px] font-display tracking-tight leading-[0.9] mb-8">
              Give your work
              <br />
              <span className="text-[#83d63a]">DNA.</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Each project deserves its own conditions, so each gets its own environment. The work it produces carries its DNA: memory, records, and a sharper definition of done, compounding run after run.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                asChild
                size="lg"
                className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group"
              >
                <a href="https://app.xo.builders" target="_blank" rel="noopener noreferrer">
                  Sign up free
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5"
              >
                <a href="https://docs.xo.builders" target="_blank" rel="noopener noreferrer">
                  Read the docs
                </a>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-8 font-mono">
              14-day free trial on paid tiers
            </p>
          </div>

          {/* Right visual: rotating DNA helix */}
          <div
            className={`hidden lg:block relative w-[420px] h-[440px] transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <DnaVisualization />
          </div>
        </div>
      </div>
    </section>
  );
}
