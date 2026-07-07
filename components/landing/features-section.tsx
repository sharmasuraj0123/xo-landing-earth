"use client";

import { useEffect, useRef, useState } from "react";
import { EnvironmentDiagram } from "@/components/landing/environment-diagram";

const features: {
  number: string;
  title: string;
  description: string;
  stats?: { value: string; label: string };
}[] = [
  {
    number: "01",
    title: "A definition of done",
    description: "You say what finished and correct looks like before the agent starts.",
  },
  {
    number: "02",
    title: "A checkable result",
    description: "The environment snapshots state before and after. Comparing the two is the same check a manager makes.",
  },
  {
    number: "03",
    title: "One owner",
    description: "Scoped small enough for a single agent to be accountable: one name against the result, like a contractor.",
  },
  {
    number: "04",
    title: "A record it can't fake",
    description: "Before, after, and every action in between. The agent never grades its own homework.",
    stats: { value: "100%", label: "of actions recorded as they happen" },
  },
];

// Floating dot particles visualization
function ParticleVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const COUNT = 70;
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const seed = i * 1.618;
      return {
        bx: ((seed * 127.1) % 1),
        by: ((seed * 311.7) % 1),
        phase: seed * Math.PI * 2,
        speed: 0.4 + (seed % 0.4),
        radius: 1.2 + (seed % 2.2),
      };
    });

    let time = 0;
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        const flowX = Math.sin(time * p.speed * 0.4 + p.phase) * 38;
        const flowY = Math.cos(time * p.speed * 0.3 + p.phase * 0.7) * 24;

        const bx = p.bx * w;
        const by = p.by * h;
        const dx = p.bx - mx;
        const dy = p.by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist * 2.8);

        const x = bx + flowX + influence * Math.cos(time + p.phase) * 36;
        const y = by + flowY + influence * Math.sin(time + p.phase) * 36;

        const pulse = Math.sin(time * p.speed + p.phase) * 0.5 + 0.5;
        const alpha = 0.08 + pulse * 0.18 + influence * 0.3;

        ctx.beginPath();
        ctx.arc(x, y, p.radius + pulse * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      time += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section
      id="features"
      ref={sectionRef}
      className="relative py-7 lg:py-8 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Full width with diagonal layout */}
        <div className="relative mb-3">
          <div className="grid lg:grid-cols-12 gap-5 items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-3">
                <span className="w-12 h-px bg-foreground/30" />
                Why XO
              </span>
              <h2
                className={`text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                The unit is the <span className="text-[#83d63a]">work.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p className={`text-lg text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                Most AI pilots can't show a bottom-line effect. XO turns agent work into{" "}
                <a
                  href="https://docs.xo.builders/future-of-work/phase-1-agentic-workforce#what-is-a-unit-of-work"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4 decoration-[#83d63a]/50 hover:decoration-[#83d63a] transition-colors"
                >
                  units of work
                </a>{" "}
                you can check, price, and repeat.
              </p>
              <a
                href="https://docs.xo.builders/future-of-work"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-all duration-1000 delay-300 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                Read the research
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* The environment loop, drawn: capped to native size so it fits */}
        <div
          className={`mb-3 mx-auto max-w-[900px] rounded-2xl border border-foreground/10 bg-black p-3 lg:p-4 text-foreground transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <EnvironmentDiagram />
        </div>

        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Large feature card */}
          <div
            className={`lg:col-span-3 relative rounded-xl bg-black border border-foreground/10 overflow-hidden group transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <ParticleVisualization />
            <div className="relative z-10 p-4 lg:p-5">
              <span className="font-mono text-sm text-muted-foreground">{features[0].number}</span>
              <h3 className="text-xl lg:text-2xl font-display mt-1 mb-1 group-hover:translate-x-2 transition-transform duration-500">
                {features[0].title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {features[0].description}
              </p>
              {features[0].stats && (
                <div>
                  <span className="text-2xl lg:text-3xl font-display">{features[0].stats.value}</span>
                  <span className="block text-sm text-muted-foreground font-mono mt-0.5">{features[0].stats.label}</span>
                </div>
              )}
            </div>
          </div>

          {/* Remaining cards */}
          {features.slice(1).map((feature, index) => (
            <div
              key={feature.title}
              className={`lg:col-span-3 relative rounded-xl bg-black border border-foreground/10 p-4 lg:p-5 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <span className="font-mono text-sm text-muted-foreground">{feature.number}</span>
              <h3 className="text-xl lg:text-2xl font-display mt-1 mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{feature.description}</p>
              {feature.stats && (
                <div>
                  <span className="text-2xl lg:text-3xl font-display">{feature.stats.value}</span>
                  <span className="block text-sm text-muted-foreground font-mono mt-0.5">{feature.stats.label}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
