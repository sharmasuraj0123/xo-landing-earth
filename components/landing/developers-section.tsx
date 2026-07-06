"use client";

import { useState, useEffect, useRef } from "react";
import { AsciiScene } from "@/components/landing/ascii-scene";

const features = [
  {
    title: "Blank Canvas",
    description: "Start from scratch or import from GitHub."
  },
  {
    title: "Any runtime",
    description: "OpenClaw, Claude Code, Hermes, or your own."
  },
  {
    title: "Live logs",
    description: "Watch every run as it happens."
  },
  {
    title: "Local to production",
    description: "Same workspace on any host."
  },
];

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
    <section id="developers" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <AsciiScene />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Full width */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            For developers
          </span>
          <h2 className="text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9]">
            Bring your repo.
            <br />
            <span className="text-muted-foreground">Or start blank.</span>
          </h2>
        </div>

        {/* Description + Features - left half only */}
        <div
          className={`max-w-[50%] transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-md">
            Blank Canvas gives you a full dev workspace: import from GitHub, pick your runtime, watch it run.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 50 + 200}ms` }}
              >
                <h3 className="font-medium mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <a
            href="https://docs.xo.builders"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-8 h-12 text-sm font-medium text-foreground hover:border-foreground hover:bg-foreground/5 transition-all group"
          >
            Read the docs
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
