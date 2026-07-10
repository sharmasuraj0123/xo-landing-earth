import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ValidateTabs } from "@/components/whitepaper/validate-tabs";

export const metadata: Metadata = {
  title: "Validate the paper | XO",
  description:
    "The public discussion on quirq: hand the paper to a model you trust and file the verdict. An autonomous agent referee is coming soon.",
};

export default function ValidatePage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* compact hero: everything useful stays near the fold */}
      <header className="relative pt-24 lg:pt-28 pb-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div>
              <a
                href="/whitepaper"
                className="inline-flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white transition-colors mb-5"
              >
                <span aria-hidden="true">&larr;</span> Back to the paper
              </a>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight leading-[0.95]">
                Validate it. <span className="text-[#83d63a]">Or invalidate it.</span>
              </h1>
            </div>
            <p className="text-white/55 leading-relaxed max-w-[52ch] pb-1">
              Work priced by its owner, verified by state, metered to the token. Test that
              claim with a model you trust today; hand it to an autonomous agent soon.
            </p>
          </div>
        </div>
      </header>

      <section className="relative pb-24">
        <ValidateTabs />
      </section>

      <FooterSection />
    </main>
  );
}
