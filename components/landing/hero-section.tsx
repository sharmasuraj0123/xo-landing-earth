"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const cyclingWords = [
  "AI agents.",
  "teammates.",
  "partners.",
  "coworkers.",
];

const stats = [
  { value: "10,000+", label: "agents launched" },
  { value: "100B+", label: "monthly tokens" },
  { value: "5,000+", label: "builders on XO" },
];

// Folded into the hero so the partner list is seen on landing.
const partners = [
  { name: "NVIDIA" },
  { name: "Microsoft", src: "/images/logos/microsoft.svg", sizeClass: "h-5 lg:h-6" },
  { name: "AWS", src: "/images/logos/aws.svg", sizeClass: "h-4 lg:h-5" },
  { name: "Google", src: "/images/logos/google.webp", sizeClass: "h-4 lg:h-5" },
  { name: "OKX" },
  { name: "MagicPath" },
  { name: "Nebius" },
  { name: "Gaia" },
  { name: "EVM Capital" },
  { name: "Hysolwin Green Energy" },
  { name: "PPAI Innovations" },
  { name: "EnviroEdge" },
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

  const marquee = [...partners, ...partners, ...partners];

  return (
    <section className="relative h-screen min-h-[640px] flex flex-col overflow-hidden bg-black">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none" />
      </div>

      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-white/10"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      {/* Pitch, centered in the space the nav and stats leave over */}
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 lg:pt-24 min-h-0">
        <div className="flex-1 flex flex-col justify-center py-6 lg:max-w-[58%]">
          <div
            className={`mb-5 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60">
              <span className="w-8 h-px bg-white/30" />
              XO · Hire the skill, not the hours
            </span>
          </div>

          <h1
            className={`text-left text-[clamp(2.5rem,5.5vw,6rem)] font-display leading-[0.92] tracking-tight text-white transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Environments for</span>
            <span
              className="block text-[#83d63a] transition-all duration-300"
              style={{
                opacity: phraseVisible ? 1 : 0,
                transform: phraseVisible ? "translateY(0)" : "translateY(10px)",
              }}
            >
              {cyclingWords[phraseIndex]}
            </span>
          </h1>
          <p className="mt-4 mb-8 text-white/50 text-[clamp(1rem,1.6vw,1.5rem)] font-sans font-normal tracking-normal leading-snug max-w-[30ch]">
            Launch in one click. Every outcome verified. Cost falls run after run.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white hover:bg-white/90 text-black h-12 px-8 w-full sm:w-auto"
            >
              <a href="https://app.xo.builders" target="_blank" rel="noopener noreferrer">Launch your Space</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 text-white hover:bg-white/10 bg-transparent h-12 px-8 w-full sm:w-auto"
            >
              <a href="https://docs.xo.builders" target="_blank" rel="noopener noreferrer">Read the docs</a>
            </Button>
          </div>

          <p
            className={`mt-4 font-mono text-xs text-white/40 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Free tier · no card · live in about a minute
          </p>
        </div>

        {/* Metric numbers: a divided band that anchors the bottom */}
        <div
          className={`shrink-0 border-t border-white/10 pt-5 lg:pt-6 pb-6 lg:pb-8 grid grid-cols-3 gap-x-4 lg:gap-x-20 lg:flex lg:items-end transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-display text-white leading-none">
                {stat.value}
              </span>
              <span className="text-[11px] lg:text-xs text-white/50 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trusted by: its own distinct strip, pinned to the bottom */}
      <div
        className={`relative z-10 shrink-0 border-t border-white/10 bg-black/40 backdrop-blur-sm transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center gap-6 py-4">
          <span className="shrink-0 pl-6 lg:pl-12 inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-white/45">
            <span className="w-6 h-px bg-white/25" />
            Trusted by
          </span>

          <div className="relative flex-1 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-12 lg:w-20 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />
            <div className="absolute inset-y-0 right-0 w-12 lg:w-20 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />
            <div className="hero-marquee flex items-center gap-12 lg:gap-16 whitespace-nowrap w-max pr-6 lg:pr-12">
              {marquee.map((partner, i) => (
                <span key={`${partner.name}-${i}`} className="shrink-0 pointer-events-none">
                  {partner.src ? (
                    <img
                      src={partner.src}
                      alt={partner.name}
                      className={`${partner.sizeClass ?? "h-4 lg:h-5"} w-auto grayscale opacity-45 select-none`}
                      draggable={false}
                    />
                  ) : (
                    <span className="text-sm lg:text-base font-display font-semibold tracking-tight text-white/45 select-none">
                      {partner.name}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes hero-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        .hero-marquee {
          animation: hero-marquee 36s linear infinite;
        }
        .hero-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
