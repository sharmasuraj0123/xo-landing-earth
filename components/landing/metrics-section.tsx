"use client";

import { useEffect, useState, useRef } from "react";
import { ImpactCalculator } from "./impact-calculator";

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);
      const gridSize = 80;
      const time = timeRef.current;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const wave = Math.sin(x * 0.01 + y * 0.01 + time) * 0.5 + 0.5;
          const size = 1 + wave * 2;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
          ctx.fill();
        }
      }
      const pulseY = (time * 30) % height;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(width, pulseY);
      ctx.stroke();
      timeRef.current += 0.02;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function MetricsSection() {
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
    <section ref={sectionRef} className="relative py-8 lg:py-10 overflow-hidden">
      <GridBackground />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-6">
          <div className="lg:col-span-8 lg:col-start-1">
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                <span className="w-12 h-px bg-foreground/20" />
                Measure the unit of work
              </span>
            </div>

            <h2 className={`text-5xl md:text-6xl lg:text-6xl font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Impact,
              <br />
              <span className="text-muted-foreground">measured.</span>
            </h2>
            <p className={`mt-5 text-xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}>
              Your AI has an electricity bill. XO gives it a P&amp;L.
            </p>
          </div>
        </div>

        {/* The Calculation panel */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Cost per run, over time: the computable tenure curve */}
          <div className={`rounded-xl bg-foreground/[0.02] border border-foreground/10 p-6 lg:p-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            <ImpactCalculator active={isVisible} />
          </div>

          {/* What did it cost? */}
          <div className={`rounded-xl bg-foreground/[0.02] border border-foreground/10 p-6 lg:p-8 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            <div className="text-sm text-muted-foreground font-mono uppercase tracking-widest mb-5">
              What did it cost?
            </div>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground">Budget</span>
                  <span className="text-muted-foreground font-mono">the price of the outcome</span>
                </div>
                <div className="h-2.5 rounded-full bg-foreground/20 w-full" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground">AI spend</span>
                  <span className="text-muted-foreground font-mono">metered as it happens, on your own model</span>
                </div>
                <div className="relative h-2.5 rounded-full bg-[#83d63a]/15 w-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full bg-foreground/35 transition-all duration-1000 delay-500 ${
                      isVisible ? "w-[58%]" : "w-0"
                    }`}
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <span className="text-xs font-mono text-[#83d63a]">
                    &larr; the gap is your efficiency
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Budget minus spend, tracked for every unit of work, every session. The gap is yours to widen.
            </p>
          </div>
        </div>

        {/* The ledger, in one line */}
        <p className={`mt-5 text-sm text-muted-foreground transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          The whitepaper's worked ledger: efficiency <span className="text-[#83d63a]">3.1&times; &rarr; 5.6&times;</span> in a quarter. The token bill alone read <span className="text-foreground">+83%</span>. <span className="font-mono text-xs text-muted-foreground/70">Illustrative.</span>
        </p>

        {/* Bottom ticker */}
        <div className={`mt-5 pt-5 border-t border-foreground/10 flex flex-wrap items-center gap-x-12 gap-y-3 text-sm font-mono text-muted-foreground transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <span className="text-foreground/40">Templates</span>
          <span>Cowork</span>
          <span>OpenClaw</span>
          <span>Hermes</span>
          <span>Claude Code</span>
          <span className="text-foreground">every project measured the same way</span>
          <a
            href="/whitepaper/visualize"
            className="ml-auto inline-flex items-center gap-2 text-[#83d63a] hover:text-foreground transition-colors"
          >
            See your own numbers
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes exampleIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-example-in {
          animation: exampleIn 0.4s ease-out;
        }
      `}</style>
    </section>
  );
}
