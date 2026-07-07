"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Start at zero, upgrade when the work sticks.",
    price: { monthly: 0 },
    trial: "Free forever",
    features: [
      "1 workspace to start",
      "10 workspaces free for researchers",
      "Full SDK + usage dashboards",
    ],
    cta: "Sign up",
    highlight: false,
  },
  {
    name: "Starter",
    description: "10 workspaces to put agents to work.",
    price: { monthly: 10 },
    trial: "14-day free trial",
    features: [
      "10 workspaces",
      "All four templates: Cowork, OpenClaw, Hermes, Claude Code",
      "Community support",
    ],
    cta: "Sign up",
    highlight: false,
  },
  {
    name: "Pro",
    description: "30 workspaces for teams shipping with agents.",
    price: { monthly: 20 },
    trial: null,
    features: [
      "30 workspaces",
      "Custom templates",
      "MCP integrations",
      "Spend tracking + agent comparison",
    ],
    cta: "Sign up",
    highlight: true,
  },
  {
    name: "Max",
    description: "500 workspaces. White-label. For fleets.",
    price: { monthly: 100 },
    trial: null,
    features: [
      "500 workspaces included",
      "White-label + SSO / SAML",
      "Full audit trails per environment",
      "Email + Slack support",
    ],
    cta: "Sign up",
    highlight: false,
  },
];

const selfHostPlans = [
  {
    name: "Pilot",
    description: "The whitepaper's adoption path, run for you: our engineers deploy XO on your infra, end to end.",
    price: { monthly: 500 },
    priceSuffix: "to start",
    trial: "Setup included, end to end",
    features: [
      "Our engineers deploy the workspace image on your cloud",
      "Setup included: models, data, secrets, channels",
      "Direct support through the pilot",
    ],
    cta: "Contact us",
    highlight: true,
  },
  {
    name: "Enterprise",
    description: "Scale the pilot into a fleet on your own cloud.",
    price: null,
    trial: null,
    features: [
      "Everything in Pilot",
      "Pay as you go, custom pricing",
      "White-label + SSO / SAML",
      "SLA + managed updates",
      "Custom templates and integrations",
    ],
    cta: "Contact us",
    highlight: false,
  },
];

const CONTACT_URL = "mailto:team@xo.builders";
const SIGNUP_URL = "https://app.xo.builders";

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<"cloud" | "selfhost">("cloud");
  const sectionRef = useRef<HTMLElement>(null);
  const shownPlans = mode === "cloud" ? plans : selfHostPlans;

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
    <section id="pricing" ref={sectionRef} className="relative py-7 lg:py-9">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Dramatic offset */}
        <div className="grid lg:grid-cols-12 gap-6 mb-1">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-3">
              <span className="w-12 h-px bg-foreground/30" />
              Pricing
            </span>
            <h2 className={`text-4xl md:text-5xl lg:text-[56px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Pay per <span className="text-stroke">workspace.</span><br /><span className="text-muted-foreground">Never per seat.</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-[52ch] mt-3">
              Tokens price the machinery. Units of work price the result. A workspace is where both happen, and it&apos;s the only thing you pay for.
            </p>
          </div>

          <div className="lg:col-span-5 relative p-0 h-32 lg:h-auto">
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

        {/* Deployment toggle: Managed agents vs Self-host */}
        <div className="mb-4 inline-flex items-center border border-foreground/15 rounded-full p-1">
          <button
            type="button"
            onClick={() => setMode("cloud")}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
              mode === "cloud" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Managed agents
          </button>
          <button
            type="button"
            onClick={() => setMode("selfhost")}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
              mode === "selfhost" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Self-host
          </button>
          <span className="hidden lg:inline text-xs text-muted-foreground font-mono ml-4 mr-3">
            {mode === "cloud"
              ? "On XO Cloud: one click from template to ready"
              : "On your infra: forward-deployed, we set it up with you"}
          </span>
        </div>

        {/* Pricing cards - Horizontal layout with overlap */}
        <div className="relative">
          <div className={`grid gap-4 ${
            mode === "cloud" ? "md:grid-cols-2 lg:grid-cols-4 lg:gap-3" : "md:grid-cols-2 lg:gap-3 lg:max-w-3xl"
          }`}>
            {shownPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-background border rounded-2xl transition-all duration-700 ${
                  plan.highlight 
                    ? "border-foreground lg:-mx-2 lg:z-10 lg:scale-105" 
                    : "border-foreground/10"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Popular badge */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-8 right-8 flex justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs font-mono uppercase tracking-widest rounded-full">
                      <Zap className="w-3 h-3" />
                      {mode === "cloud" ? "Most Popular" : "Start here"}
                    </span>
                  </div>
                )}

                <div className="p-5 lg:p-5">
                  {/* Plan header */}
                  <div className="mb-3 pb-3 border-b border-foreground/10">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-display mt-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                      {plan.price ? (
                        <>
                          <span className="text-2xl lg:text-3xl font-display">
                            ${plan.price.monthly}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {"priceSuffix" in plan && plan.priceSuffix ? plan.priceSuffix : "/month"}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl lg:text-3xl font-display">Custom</span>
                      )}
                    </div>
                    {plan.trial && (
                      <p className="text-xs text-[#83d63a] mt-1.5 font-mono">{plan.trial}</p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#83d63a] mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={plan.cta === "Contact us" ? CONTACT_URL : SIGNUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 flex items-center justify-center gap-2 text-sm font-medium rounded-full transition-all group ${
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
        <div className={`mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-3 border-t border-foreground/10 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#83d63a]" />
              Billed only while a workspace is active
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#83d63a]" />
              Bring your own model, no markup
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#83d63a]" />
              Every workspace: unlimited units of work, unlimited seats
            </span>
          </div>
          <a
            href="mailto:team@xo.builders"
            className="text-sm underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Questions? team@xo.builders
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
