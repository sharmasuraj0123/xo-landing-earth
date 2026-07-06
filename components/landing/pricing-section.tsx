"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Start at zero. Researchers get 10 workspaces on us.",
    price: { monthly: 0, annual: 0 },
    trial: "Free forever",
    features: [
      "1 workspace to start",
      "10 workspaces if you're doing research",
      "Unlimited seats, share with anyone",
      "Full SDK + usage dashboards",
      "Bring your own model, no markup",
    ],
    cta: "Sign up",
    highlight: false,
  },
  {
    name: "Starter",
    description: "10 workspaces to put agents to work.",
    price: { monthly: 10, annual: 10 },
    trial: "14-day free trial",
    features: [
      "10 workspaces",
      "Unlimited seats, share with anyone",
      "Core templates: Cowork, OpenClaw, Hermes, Claude Code",
      "Community support",
      "Bring your own model, no markup",
    ],
    cta: "Sign up",
    highlight: false,
  },
  {
    name: "Pro",
    description: "30 workspaces for teams shipping with agents.",
    price: { monthly: 20, annual: 20 },
    trial: null,
    features: [
      "30 workspaces",
      "Unlimited seats, share with anyone",
      "Full template library (n8n, Gaia, and more)",
      "MCP integrations",
      "Spend tracking per run",
      "Compare agents across environments",
    ],
    cta: "Sign up",
    highlight: true,
  },
  {
    name: "Max",
    description: "500 workspaces. White-label. For fleets.",
    price: { monthly: 100, annual: 100 },
    trial: null,
    features: [
      "500 workspaces",
      "Unlimited seats, share with anyone",
      "White-label",
      "SSO / SAML",
      "Full audit trails per environment",
      "Email + Slack support",
      "Custom templates",
    ],
    cta: "Sign up",
    highlight: false,
  },
  {
    name: "Enterprise",
    description: "Beyond Max: pay as you go, custom pricing.",
    price: null,
    trial: null,
    features: [
      "Pay as you go",
      "Unlimited seats, share with anyone",
      "Custom pricing and allocation",
      "SLA + dedicated support",
      "Deploy in your own cloud",
    ],
    cta: "Sign up",
    highlight: false,
  },
];

export function PricingSection() {
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
    <section id="pricing" ref={sectionRef} className="relative py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Dramatic offset */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
              <span className="w-12 h-px bg-foreground/30" />
              Pricing
            </span>
            <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Pay only for
              <br />
              <span className="text-stroke">Compute.</span>
            </h2>
          </div>
          
          <div className="lg:col-span-5 relative p-0 h-96 lg:h-auto">
            {/* Tree image */}
            <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}>
              <img
                src="/images/tree-green.png"
                alt="Organic tree"
                className="w-full h-full object-contain object-bottom"
              />
            </div>

          </div>
        </div>

        {/* Pricing cards - Horizontal layout with overlap */}
        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-background border transition-all duration-700 ${
                  plan.highlight 
                    ? "border-foreground lg:-mx-2 lg:z-10 lg:scale-105" 
                    : "border-foreground/10 lg:first:-mr-2 lg:last:-ml-2"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Popular badge */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-8 right-8 flex justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs font-mono uppercase tracking-widest">
                      <Zap className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6 lg:p-8">
                  {/* Plan header */}
                  <div className="mb-8 pb-8 border-b border-foreground/10">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-display mt-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      {plan.price ? (
                        <>
                          <span className="text-5xl lg:text-6xl font-display">
                            ${plan.price.monthly}
                          </span>
                          <span className="text-muted-foreground text-sm">/month</span>
                        </>
                      ) : (
                        <span className="text-5xl lg:text-6xl font-display">Custom</span>
                      )}
                    </div>
                    {plan.trial && (
                      <p className="text-xs text-[#83d63a] mt-2 font-mono">{plan.trial}</p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-10">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#eca8d6] mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="https://app.xo.builders"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                      plan.highlight
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note with icons */}
        <div className={`mt-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#83d63a]" />
              Per-workspace billing, active only
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#83d63a]" />
              Bring your own model, no markup
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#83d63a]" />
              Unlimited seats: priced per workspace, never per person
            </span>
          </div>
          <a
            href="https://xo.builders"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4 hover:text-foreground transition-colors"
          >
            xo.builders
          </a>
        </div>
      </div>

      <style jsx>{`
        .text-stroke {
          -webkit-text-stroke: 1.5px currentColor;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
}
