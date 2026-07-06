"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    question: "What exactly is an environment?",
    answer:
      "A workspace where your agent does real work: runtime, memory, tools, and a record of everything that happens. A desk, not a chat window.",
  },
  {
    question: "What is a unit of work?",
    answer:
      "Runtime plus memory, tools, a record, and a definition of done. That bundle is what makes AI work checkable, priceable, and repeatable. The research behind it lives in our docs.",
  },
  {
    question: "Which agents can I run?",
    answer:
      "Cowork, OpenClaw, Hermes, and Claude Code today, or bring your own. Agents are separate from projects: set one up once and point it at any project, or put several agents on the same one.",
  },
  {
    question: "How is XO priced?",
    answer:
      "Per workspace, never per person. Every plan has unlimited seats. Paid tiers start at $10 per month with a 14-day free trial, and researchers get 10 workspaces free.",
  },
  {
    question: "Can I bring my own model and tools?",
    answer:
      "Yes. Bring your own model with no markup, and connect the tools you already use (WhatsApp, Slack, GitHub, Linear, ClickUp) through MCP.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Every environment is sandboxed, encrypted, budget-capped, and fully auditable. The environment keeps the record, not the agent, so the agent never grades its own homework.",
  },
  {
    question: "I'm a developer. Can I start from code?",
    answer:
      "Yes. Blank Canvas gives you a full dev workspace: start from scratch or import from GitHub, pick your runtime, watch it run. The docs cover setup end to end.",
  },
];

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-14 lg:py-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`,
            }}
          />

          <div className="relative z-10 px-8 lg:px-16 py-10 lg:py-12">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left: heading */}
              <div className="lg:col-span-5">
                <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                  <span className="w-8 h-px bg-foreground/30" />
                  FAQ
                </span>
                <h2 className="text-6xl md:text-7xl lg:text-[56px] font-display tracking-tight leading-[0.95]">
                  Questions,
                  <br />
                  <span className="text-muted-foreground">answered.</span>
                </h2>
                <a
                  href="https://docs.xo.builders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-8 h-12 text-sm font-medium text-foreground hover:border-foreground hover:bg-foreground/5 transition-all group"
                >
                  More answers in the docs
                  <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
                </a>
              </div>

              {/* Right: FAQ list */}
              <div className="lg:col-span-7">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={faq.question}
                      className={`border-b border-foreground/10 transition-all duration-500 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${index * 60 + 150}ms` }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="w-full py-4 flex items-center justify-between gap-6 text-left group"
                      >
                        <span className="text-lg lg:text-xl font-medium group-hover:text-foreground transition-colors">
                          {faq.question}
                        </span>
                        <span
                          className={`shrink-0 w-8 h-8 flex items-center justify-center border border-foreground/20 text-lg transition-all duration-300 ${
                            isOpen ? "rotate-45 border-[#83d63a] text-[#83d63a]" : "text-muted-foreground"
                          }`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>
                      <div
                        className="grid transition-all duration-300"
                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-4 text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />
        </div>
      </div>
    </section>
  );
}
