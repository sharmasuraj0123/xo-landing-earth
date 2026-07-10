import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { PaperViews } from "@/components/whitepaper/paper-views";

export const metadata: Metadata = {
  title: "quirq: A Unit of Work for Intelligence | XO Whitepaper",
  description:
    "quirq: a unit of work for intelligence. One paper, two readers: read it as a human here, or as a machine at /ai.",
};

export default async function WhitepaperPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  /* the AI view has its own address now */
  if (view === "ai") redirect("/ai");
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <PaperViews />
      <FooterSection />
    </main>
  );
}
