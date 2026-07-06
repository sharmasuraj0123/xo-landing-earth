"use client";

import { useEffect, useState, useRef } from "react";

const metrics = [
  {
    value: 54396,
    suffix: "",
    prefix: "",
    label: "Tokens metered daily",
    sublabel: "volume across your projects",
  },
  {
    value: 806,
    suffix: "ms",
    prefix: "",
    label: "Latency tracked",
    sublabel: "min / avg / p95 / max over time",
  },
  {
    value: 100,
    suffix: "%",
    prefix: "",
    label: "Spend visibility",
    sublabel: "actual cost per day, per project",
  },
];

function AnimatedNumber({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [isScrambling, setIsScrambling] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2500;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * end));
            setIsScrambling(progress < 0.8);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  const displayValue = count.toLocaleString();

  return (
    <div ref={ref} className="inline-flex items-baseline">
      <span className="text-muted-foreground mr-1">{prefix}</span>
      <span className="tabular-nums">
        {displayValue.split("").map((char, i) => (
          <span
            key={i}
            className={`inline-block transition-all duration-150 ${
              isScrambling && char !== "," ? "blur-[1px]" : ""
            }`}
          >
            {char}
          </span>
        ))}
      </span>
      <span className="text-muted-foreground">{suffix}</span>
    </div>
  );
}

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

function DotGraph({
  color = "white",
  height = 32,
  freq1 = 0.35,
  freq2 = 0.12,
  freqT = 0.7,
  speed = 0.025,
  baseline = 0.3,
  amplitude = 0.5,
}: {
  color?: string;
  height?: number;
  freq1?: number;
  freq2?: number;
  freqT?: number;
  speed?: number;
  baseline?: number;
  amplitude?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const timeRef = useRef(Math.random() * 100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.offsetWidth || 300;
    const H = height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      const t = timeRef.current;
      const cols = Math.floor(W / 8);

      for (let i = 0; i < cols; i++) {
        const raw = baseline + amplitude * Math.sin(i * freq1 + t) * Math.cos(i * freq2 + t * freqT);
        const v = Math.max(0, Math.min(1, raw));
        const dotY = H - 4 - v * (H - 8);
        const x = i * 8 + 4;
        const alpha = 0.15 + v * 0.55;
        const r = 1.5 + v * 1.2;

        ctx.beginPath();
        ctx.arc(x, dotY, r, 0, Math.PI * 2);
        ctx.fillStyle = color === "green"
          ? `rgba(131, 214, 58, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      timeRef.current += speed;
      frameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameRef.current);
  }, [color, height, freq1, freq2, freqT, speed, baseline, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: `${height}px`, display: "block" }}
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
    <section ref={sectionRef} className="relative py-16 lg:py-20 overflow-hidden">
      <GridBackground />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-8 lg:col-start-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                <span className="w-12 h-px bg-foreground/20" />
                Measure the unit of work
              </span>
            </div>

            <h2 className={`text-6xl md:text-7xl lg:text-[84px] font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Impact,
              <br />
              <span className="text-muted-foreground">measured.</span>
            </h2>
            <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}>
              XO measures agents the way you measure employees: by what they deliver. Did the state change? What did it cost? That's the whole calculation.
            </p>
          </div>
        </div>

        {/* Organic graph image */}
        <div className={`w-full mb-0 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/real-time-graph-INFmn3u0MlUwvNPynoIhwxtPaPjxM5.png"
            alt=""
            aria-hidden="true"
            className="w-full h-auto max-h-[140px] object-cover grayscale"
          />
        </div>

        {/* The Calculation panel */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Did the state change? */}
          <div className={`bg-foreground/[0.02] border border-foreground/10 p-6 lg:p-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            <div className="text-sm text-muted-foreground font-mono uppercase tracking-widest mb-6">
              Did the state change?
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 border border-dashed border-foreground/25 p-4">
                <span className="block text-sm text-foreground">State before</span>
                <span className="block mt-1 text-sm text-muted-foreground font-mono">
                  ticket open · unassigned
                </span>
              </div>
              <span className="text-[#83d63a] text-2xl shrink-0" aria-hidden="true">&rarr;</span>
              <div className="flex-1 border border-[#83d63a]/50 bg-[#83d63a]/[0.04] p-4">
                <span className="block text-sm text-foreground">State after</span>
                <span className="block mt-1 text-sm text-[#83d63a] font-mono">
                  ticket closed · verified
                </span>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              The same check a manager makes today. If the world moved the way you asked, the work is done.
            </p>
          </div>

          {/* What did it cost? */}
          <div className={`bg-foreground/[0.02] border border-foreground/10 p-6 lg:p-8 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            <div className="text-sm text-muted-foreground font-mono uppercase tracking-widest mb-6">
              What did it cost?
            </div>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground">Budget</span>
                  <span className="text-muted-foreground font-mono">the price of the outcome</span>
                </div>
                <div className="h-2.5 rounded-sm bg-foreground/20 w-full" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground">AI spend</span>
                  <span className="text-muted-foreground font-mono">metered as it happens, BYOM</span>
                </div>
                <div className="relative h-2.5 rounded-sm bg-[#83d63a]/15 w-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-sm bg-foreground/35 transition-all duration-1000 delay-500 ${
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
              Budget minus spend, per unit, per session. XO only enables the tracking; the gap is yours to widen.
            </p>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className={`mt-8 pt-6 border-t border-foreground/10 flex flex-wrap items-center gap-x-12 gap-y-4 text-sm font-mono text-muted-foreground transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <span>Cowork</span>
          <span>OpenClaw</span>
          <span>Hermes</span>
          <span>Claude Code</span>
          <span className="text-foreground">every project measured the same way</span>
          <a
            href="https://app.xo.builders"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-2 text-[#83d63a] hover:text-foreground transition-colors"
          >
            See your own numbers
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
