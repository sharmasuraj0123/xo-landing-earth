"use client";

import { useEffect, useState, useRef } from "react";

const hosts = [
  { name: "Cowork", detail: "your everyday coworker", status: "ready" },
  { name: "OpenClaw", detail: "agents on your channels", status: "ready" },
  { name: "Hermes", detail: "your fast responder", status: "ready" },
  { name: "Claude Code", detail: "the coding agent", status: "ready" },
];

const PROVIDERS = [
  { name: "Cowork",      color: "#83d63a" },
  { name: "OpenClaw",    color: "rgba(255,255,255,0.85)" },
  { name: "Hermes",      color: "#4285F4" },
  { name: "Claude Code", color: "#FF9900" },
];

// 20 dots (5 cols × 4 rows), each assigned a provider index 0-3
// Distributed so every provider appears 5× across the grid
const DOT_PROVIDERS = [
  0, 1, 2, 3, 0,
  2, 0, 3, 1, 2,
  3, 2, 1, 0, 3,
  1, 3, 0, 2, 1,
];

interface ActiveDot {
  i: number;
  xPct: number;
  yPct: number;
  providerIdx: number;
}

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRegion, setActiveRegion] = useState(0);
  const [activeDot, setActiveDot] = useState<ActiveDot | null>(null);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRegion((prev) => (prev + 1) % hosts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="infra" ref={sectionRef} className="relative py-16 lg:py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span className="w-12 h-px bg-foreground/20" />
            Composable by design
          </span>

          <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-stretch">
            {/* Globe image */}
            <div className={`w-32 lg:w-48 xl:w-56 shrink-0 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-3i68QNWJwmO7W19ztZWbevAwJQHzYL.png"
                alt="Global network sphere"
                className="w-full h-full object-contain object-center"
              />
            </div>

            {/* Title + description */}
            <div className="flex flex-col justify-center">
              <h2 className={`text-5xl md:text-6xl lg:text-[84px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}>
                Compose anything.
                <br />
                <span className="text-muted-foreground">It runs itself.</span>
              </h2>

              <p className={`mt-5 text-lg text-muted-foreground leading-relaxed max-w-lg transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}>
                Agents, tools, and humans snap together like parts. Swap any piece without losing the work. Agents are replaceable. The environment compounds.
              </p>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Large stat card */}
          <div
            className={`lg:col-span-2 relative border border-foreground/10 bg-foreground/[0.02] transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            onClick={() => setActiveDot(null)}
          >
            {/* Animation layer (overflow-hidden so lines clip to card) */}
            <div className="absolute inset-0 overflow-hidden opacity-70 pointer-events-none">
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <style>{`
                    @keyframes drawLine {
                      0%   { stroke-dashoffset: 1000; opacity: 0; }
                      15%  { opacity: 1; }
                      70%  { opacity: 0.7; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                    .connecting-line {
                      stroke: #83d63a;
                      stroke-width: 1.2;
                      fill: none;
                      stroke-dasharray: 1000;
                      animation: drawLine 3s ease-in-out infinite;
                    }
                  `}</style>
                </defs>
                {[...Array(19)].map((_, i) => {
                  const x1 = 10 + (i % 5) * 20;
                  const y1 = 10 + Math.floor(i / 5) * 25;
                  const x2 = 10 + ((i + 1) % 5) * 20;
                  const y2 = 10 + Math.floor((i + 1) / 5) * 25;
                  return (
                    <line
                      key={`line-${i}`}
                      x1={`${x1}%`} y1={`${y1}%`}
                      x2={`${x2}%`} y2={`${y2}%`}
                      className="connecting-line"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Interactive dots - above animation layer, below tooltip */}
            {[...Array(20)].map((_, i) => {
              const xPct = 10 + (i % 5) * 20;
              const yPct = 10 + Math.floor(i / 5) * 25;
              const providerIdx = DOT_PROVIDERS[i];
              const isActive = activeDot?.i === i;
              return (
                <div
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDot(isActive ? null : { i, xPct, yPct, providerIdx });
                  }}
                  className="absolute rounded-full transition-all duration-200 cursor-pointer"
                  style={{
                    left: `${xPct}%`,
                    top: `${yPct}%`,
                    width:  isActive ? "10px" : "6px",
                    height: isActive ? "10px" : "6px",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: isActive ? PROVIDERS[providerIdx].color : "#83d63a",
                    animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`,
                    zIndex: isActive ? 20 : 2,
                    boxShadow: isActive ? `0 0 8px 2px ${PROVIDERS[providerIdx].color}` : "none",
                  }}
                />
              );
            })}

            {/* Tooltip - rendered in card coordinate space, outside overflow-hidden */}
            {activeDot && (() => {
              const above = activeDot.yPct > 20;
              const provider = PROVIDERS[activeDot.providerIdx];
              return (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${activeDot.xPct}%`,
                    top: above
                      ? `calc(${activeDot.yPct}% - 14px)`
                      : `calc(${activeDot.yPct}% + 14px)`,
                    transform: above ? "translate(-50%, -100%)" : "translate(-50%, 0)",
                    zIndex: 30,
                  }}
                >
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono whitespace-nowrap"
                    style={{ background: "rgba(5,7,10,0.95)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: provider.color }}
                    />
                    <span className="text-white/85">{provider.name}</span>
                  </div>
                  {/* Arrow */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                      [above ? "top" : "bottom"]: "100%",
                      width: 0, height: 0,
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      ...(above
                        ? { borderTop: "5px solid rgba(255,255,255,0.12)" }
                        : { borderBottom: "5px solid rgba(255,255,255,0.12)" }),
                    }}
                  />
                </div>
              );
            })()}

            {/* Text content */}
            <div className="relative z-10 p-8 lg:p-12">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-6xl lg:text-8xl font-display leading-none">1</span>
                <span className="text-2xl text-muted-foreground">agent, many projects</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Set up an agent once, snap it into every project that needs it. The work keeps running, and its record stays with the project, whichever agent did it.
              </p>
            </div>
          </div>

          {/* Stacked stat cards */}
          <div className="flex flex-col gap-6">
            <div className={`p-6 border border-foreground/10 bg-foreground/[0.02] transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <span className="text-4xl lg:text-5xl font-display">3</span>
              <span className="block text-sm text-muted-foreground mt-2">Steps to set up an agent: model, data, secrets</span>
            </div>

            <div className={`p-6 border border-foreground/10 bg-foreground/[0.02] transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <span className="text-4xl lg:text-5xl font-display">&infin;</span>
              <span className="block text-sm text-muted-foreground mt-2">Agents on one project</span>
            </div>
          </div>
        </div>

        {/* Host list */}
        <div className={`mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          {hosts.map((host, index) => (
            <div
              key={host.name}
              className={`p-6 border transition-all duration-300 cursor-default ${
                activeRegion === index
                  ? "border-foreground/30 bg-foreground/[0.04]"
                  : "border-foreground/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full transition-colors ${
                  activeRegion === index ? "bg-[#83d63a]" : "bg-foreground/20"
                }`} />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  {host.status}
                </span>
              </div>
              <span className="font-medium block mb-1">{host.name}</span>
              <span className="text-sm text-muted-foreground">{host.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
