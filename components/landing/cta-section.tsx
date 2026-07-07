"use client";

import { useEffect, useRef, useState } from "react";

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: "What exactly is an environment?",
    answer:
      "A workspace where your agent does real work: runtime, memory, tools, and a record of everything that happens. A desk, not a chat window. (Environment and workspace mean the same thing; pricing is per workspace.)",
  },
  {
    question: "What is a unit of work?",
    answer: (
      <>
        Runtime plus memory, tools, a record, and a definition of done. That bundle is what makes AI work checkable, priceable, and repeatable. The research behind it lives in{" "}
        <a
          href="https://docs.xo.builders/future-of-work"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/30 hover:decoration-white transition-colors"
        >
          our docs
        </a>
        .
      </>
    ),
  },
  {
    question: "What is a quirq?",
    answer: (
      <>
        The output meter for AI. You budget an outcome, the environment snapshots the world before and after, verifies completion, and mints quirqs of delivered work. A quirq is a dollar of verified work, never self-reported, comparable to payroll and vendor spend. The full calculus is in{" "}
        <a
          href="/whitepaper"
          className="underline decoration-white/30 hover:decoration-white transition-colors"
        >
          the whitepaper
        </a>
        .
      </>
    ),
  },
  {
    question: "How do I prove AI ROI to my CFO?",
    answer:
      "With a ledger, not a token bill. XO meters every unit of work all-in (inference, compute, APIs, human intervention) against what it delivered, so you report cost per verified outcome and its trend, the same way you'd report any other investment.",
  },
  {
    question: "Which agents can I run?",
    answer:
      "Cowork, OpenClaw, Hermes, and Claude Code today, or bring your own. Agents are separate from projects: set one up once and point it at any project, or put several agents on the same one.",
  },
  {
    question: "How is XO priced?",
    answer:
      "Per workspace, never per person, with unlimited seats on every plan. Current tiers and trials are in the pricing table above.",
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

  return (
    <section ref={sectionRef} className="relative py-10 lg:py-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative rounded-2xl border border-foreground/20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative z-10 px-8 lg:px-16 py-7 lg:py-9">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left: heading */}
              <div className="lg:col-span-5">
                <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
                  <span className="w-8 h-px bg-foreground/30" />
                  FAQ
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-[52px] font-display tracking-tight leading-[0.95]">
                  Questions,
                  <br />
                  <span className="text-muted-foreground">answered.</span>
                </h2>
                <div className="flex flex-col items-start">
                  <a
                    href="https://app.xo.builders"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-8 h-12 text-sm font-medium hover:bg-foreground/90 transition-all"
                  >
                    Sign up free
                  </a>
                  <a
                    href="https://docs.xo.builders"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-8 h-12 text-sm font-medium text-foreground hover:border-foreground hover:bg-foreground/5 transition-all group"
                  >
                    More answers in the docs
                    <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
                  </a>
                </div>
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
                        className="w-full py-3 flex items-center justify-between gap-6 text-left group"
                      >
                        <span className="text-lg lg:text-xl font-medium group-hover:text-foreground transition-colors">
                          {faq.question}
                        </span>
                        <span
                          className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-foreground/20 text-lg transition-all duration-300 ${
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
                          <p className="pb-3 text-muted-foreground leading-relaxed">
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
        </div>
      </div>
    </section>
  );
}
