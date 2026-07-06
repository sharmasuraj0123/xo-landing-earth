"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Create",
    subtitle: "a project",
    description: "Pick a template: Cowork, OpenClaw, Hermes, or Claude Code. Your agent gets its own workspace, an ID, and a status the moment it exists.",
    code: `xo.create({
  template: 'claude-code',  // cowork | openclaw | hermes
  name:     'gcpt-e',
})
// -> project f6cf3515 · Ready`,
  },
  {
    number: "02",
    title: "Setup",
    subtitle: "the checklist",
    description: "Three steps to bring the agent online: connect a model, sync your data, add secrets. The checklist takes it from created to ready.",
    code: `project.setup({
  model:   'claude',           // model connected
  data:    ['knowledge/'],     // data synced
  secrets: ['LINEAR_API_KEY'], // secrets added
})`,
  },
  {
    number: "03",
    title: "Share",
    subtitle: "and measure",
    description: "Share the project with anyone by email. Then watch the work land: messages, sessions, cost, and latency, per project.",
    code: `project.share({ with: 'bob@company.com' })

// then measure what it delivers
project.usage()
// -> cost · tokens · messages · latency`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[oklch(0.09_0.01_260)] text-white overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - titre + image cerisier */}
        <div className="relative mb-0 lg:mb-0 grid lg:grid-cols-2 gap-4 lg:gap-12 items-end">
          {/* Titre colonne gauche */}
          <div className="overflow-hidden pb-0 lg:pb-32">
            <div className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-8">
                <span className="w-12 h-px bg-white/20" />
                Process
              </span>
            </div>
            
            <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.85] transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}>
              <span className="block">Create.</span>
              <span className="block text-white/30">Setup.</span>
              <span className="block text-white/10">Share.</span>

            </h2>
          </div>

          {/* Bridge shown normally with a mirrored reflection, the two arcs
              closing into a circle */}
          <div className={`relative h-[320px] lg:h-[640px] overflow-hidden transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Left half - mirrored reflection */}
              <img
                src="/images/bridge-vertical-mirror.png"
                alt=""
                aria-hidden="true"
                className="h-full w-1/2 object-contain object-right"
              />
              {/* Right half - normal */}
              <img
                src="/images/bridge-vertical.png"
                alt="Organic bridge mirrored into a circle"
                className="h-full w-1/2 object-contain object-left"
              />
            </div>
          </div>
        </div>

        {/* Horizontal Steps Layout */}
        <div className="grid lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`relative text-left p-8 lg:p-12 border transition-all duration-500 ${
                activeStep === index 
                  ? "bg-[#000000] border-white/60" 
                  : "bg-[#000000] border-white/25 hover:border-white/50"
              }`}
            >
              {/* Step number with animated line */}
              <div className="flex items-center gap-4 mb-8">
                <span className={`text-4xl font-display transition-colors duration-300 ${
                  activeStep === index ? "text-[#83d63a]" : "text-white/20"
                }`}>
                  {step.number}
                </span>
                <div className="flex-1 h-px bg-white/10 overflow-hidden">
                  {activeStep === index && (
                    <div className="h-full bg-[#83d63a]/50 animate-progress" />
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl lg:text-4xl font-display mb-2">
                {step.title}
              </h3>
              <span className="text-xl text-white/40 font-display block mb-6">
                {step.subtitle}
              </span>

              {/* Description */}
              <p className={`text-white/60 leading-relaxed transition-opacity duration-300 ${
                activeStep === index ? "opacity-100" : "opacity-60"
              }`}>
                {step.description}
              </p>

              {/* Active indicator */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-[#83d63a] transition-transform duration-500 origin-left ${
                activeStep === index ? "scale-x-100" : "scale-x-0"
              }`} />
            </button>
          ))}
        </div>

        {/* Product screenshots: export the app's project page and usage
            dashboard to public/images/app/project-setup.png and
            public/images/app/usage-dashboard.png, then uncomment.
        <div className="mt-6 grid lg:grid-cols-2 gap-4">
          <img src="/images/app/project-setup.png" alt="An XO project with its setup checklist" className="w-full border border-white/15" />
          <img src="/images/app/usage-dashboard.png" alt="The XO usage dashboard: cost, tokens, messages, latency" className="w-full border border-white/15" />
        </div>
        */}

        {/* Micro-CTA */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <p className="text-white/50">Create your first project in about a minute.</p>
          <a
            href="https://app.xo.builders"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#83d63a] hover:text-white transition-colors"
          >
            Sign up
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 6s linear forwards;
        }
      `}</style>
    </section>
  );
}
