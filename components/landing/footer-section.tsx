"use client";

import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const productLinks = [
  { name: "Why XO", href: "/#features" },
  { name: "How it works", href: "/#how-it-works" },
  { name: "Pricing", href: "/#pricing" },
];

const resourceLinks = [
  { name: "Whitepaper", href: "/whitepaper" },
  { name: "Documentation", href: "https://docs.xo.builders" },
  { name: "Blog", href: "/blog" },
  { name: "Get started", href: "https://app.xo.builders" },
];

const legalLinks = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms-of-service" },
];

const socialLinks = [
  { name: "Twitter", href: "https://x.com/xo_builders" },
  { name: "GitHub", href: "https://github.com/sharmasuraj0123" },
  { name: "LinkedIn", href: "https://linkedin.com/company/xo-builders" },
];

export function FooterSection() {
  return (
    <footer className="relative bg-black">
      <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png"
          alt="Bioluminescent landscape"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <div>
              <a href="/" className="inline-flex items-center mb-6">
                <BrandLogo variant="dark" className="h-8 w-8" />
              </a>

              <p className="text-white/50 leading-relaxed mb-8 max-w-xs text-sm">
                Hire the skill, not the hours.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-6">
                Product
              </h3>
              <ul className="space-y-4">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-6">
                Resources
              </h3>
              <ul className="space-y-4">
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-white/30 text-center md:text-left">
            &copy; 2026 XO. All rights reserved.
          </p>

          <div className="flex justify-center md:justify-end gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-white/30 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
