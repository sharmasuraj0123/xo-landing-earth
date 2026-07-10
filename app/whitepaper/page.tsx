import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { PaperViews } from "@/components/whitepaper/paper-views";

export const metadata: Metadata = {
  title: "quirq: A Unit of Work for Intelligence | XO Whitepaper",
  description:
    "quirq: a unit of work for intelligence. One paper, two readers: read it as a human (PDF) or as a machine (llm.txt and the token field as data).",
};

export default async function WhitepaperPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const initialView = view === "ai" ? "ai" : "human";
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <PaperViews initialView={initialView} />
      <FooterSection />
    </main>
  );
}
