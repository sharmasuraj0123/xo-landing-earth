"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const cyclingWords = [
  "AI agents.",
  "teammates.",
  "partners.",
  "coworkers.",
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phraseVisible, setPhraseVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseVisible(false);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % cyclingWords.length);
        setPhraseVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-black">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-80"
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_22%,rgba(0,0,0,0.45)_38%,rgba(25,45,18,0.28)_50%,rgba(70,130,38,0.42)_62%,rgba(131,214,58,0.52)_78%,rgba(55,95,30,0.68)_90%,rgba(18,32,10,0.82)_100%)]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40 pointer-events-none" />
      </div>

      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-white/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="lg:max-w-[55%]">
        <div 
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60">
            <span className="w-8 h-px bg-white/30" />
            Workspaces for AI agents · XO
          </span>
        </div>
        
        <div className="mb-12">
          <h1 
            className={`text-left text-[clamp(2rem,6vw,7rem)] font-display leading-[0.92] tracking-tight text-white transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Workspaces for</span>
            <span
              className="block text-[#83d63a] transition-all duration-300"
              style={{
                opacity: phraseVisible ? 1 : 0,
                transform: phraseVisible ? "translateY(0)" : "translateY(10px)",
              }}
            >
              {cyclingWords[phraseIndex]}
            </span>
            <span className="block text-white/50 mt-4 text-[clamp(0.9rem,1.8vw,1.75rem)] font-sans font-normal tracking-normal leading-snug max-w-[28ch]">
              The environment where your agents do real work, and you see exactly what that work costs and delivers.
            </span>
          </h1>
        </div>

        <div
          className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white hover:bg-white/90 text-black h-12 px-8"
          >
            <a href="https://app.xo.builders" target="_blank" rel="noopener noreferrer">Sign up free</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/30 text-white hover:bg-white/10 bg-transparent h-12 px-8"
          >
            <a href="https://docs.xo.builders" target="_blank" rel="noopener noreferrer">Read the docs</a>
          </Button>
        </div>
        </div>
      </div>
      
      <div 
        className={`absolute bottom-12 left-0 right-0 px-6 lg:px-12 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-start gap-10 lg:gap-20">
          {[
            { value: "10,000+", label: "agents launched on platform" },
            { value: "100B+", label: "monthly tokens" },
            { value: "5000+", label: "builders with XO" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="text-3xl lg:text-4xl font-display text-white">{stat.value}</span>
              <span className="text-xs text-white/50 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
