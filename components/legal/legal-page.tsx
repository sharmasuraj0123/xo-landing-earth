import type { ReactNode } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

/* Shared chrome for the long-form legal documents (/privacy, /terms-of-service). */

export function LegalPage({
  eyebrow,
  title,
  intro,
  effective,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  effective: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      <article className="relative pt-28 lg:pt-36 pb-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
            maskImage: "radial-gradient(ellipse 80% 40% at 50% 0%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 40% at 50% 0%, black, transparent)",
          }}
        />

        <div className="relative z-10 max-w-[820px] mx-auto px-6">
          <p className="font-mono text-xs text-[#83d63a] mb-4">{eyebrow}</p>

          <h1 className="font-display text-4xl md:text-6xl tracking-tight text-balance">
            {title}
          </h1>

          <div className="mt-6 pb-8 border-b border-white/10">
            <p className="font-mono text-xs text-white/40">
              Effective {effective} &nbsp;·&nbsp; Last updated {updated}
            </p>
          </div>

          {intro && (
            <p className="mt-8 text-lg text-white/80 leading-relaxed">{intro}</p>
          )}

          <div className="mt-8 text-white/60 leading-relaxed space-y-6">
            {children}
          </div>
        </div>
      </article>

      <FooterSection />
    </main>
  );
}

export function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="pt-8">
      <h2 className="font-display text-2xl md:text-3xl tracking-tight text-white mb-5">
        <span className="font-mono text-sm text-[#83d63a] mr-3">
          {String(number).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function Subheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-lg font-semibold text-white mt-8 mb-3">{children}</h3>
  );
}

export function List({ children }: { children: ReactNode }) {
  return (
    <ul className="space-y-3 pl-5 list-disc marker:text-white/25">{children}</ul>
  );
}

/** Lead-in label inside a list item. */
export function Term({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}

/** Same, in the brand accent — used for defined terms and key labels. */
export function KeyTerm({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[#83d63a]">{children}</strong>;
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 p-5 rounded-lg border border-[#83d63a]/25 bg-[#83d63a]/[0.06] text-white text-sm leading-relaxed">
      {children}
    </p>
  );
}

export function ContactCard() {
  return (
    <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02] space-y-1">
      <p className="font-semibold text-white">XO Labs Inc</p>
      <p className="text-white/50">
        2093 Philadelphia Pike, Claymont Delaware 19703
      </p>
      <p>
        Email:{" "}
        <a
          href="mailto:hello@xo.builders"
          className="text-[#83d63a] hover:underline"
        >
          hello@xo.builders
        </a>
      </p>
    </div>
  );
}
