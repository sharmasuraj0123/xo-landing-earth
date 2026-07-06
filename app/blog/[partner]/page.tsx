import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { journeys } from "@/lib/journeys";
import { JourneyPage } from "@/components/blog/journey-page";

export function generateStaticParams() {
  return Object.keys(journeys).map((partner) => ({ partner }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ partner: string }>;
}): Promise<Metadata> {
  const { partner } = await params;
  const journey = journeys[partner];
  if (!journey) return { title: "XO Blog" };
  return {
    title: `XO × ${journey.partner}: The Journey | XO Blog`,
    description: journey.intro,
  };
}

export default async function PartnerJourney({
  params,
}: {
  params: Promise<{ partner: string }>;
}) {
  const { partner } = await params;
  const journey = journeys[partner];
  if (!journey) notFound();
  return <JourneyPage journey={journey} />;
}
