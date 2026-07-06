import type { Metadata } from "next";
import { journeys } from "@/lib/journeys";
import { JourneyPage } from "@/components/blog/journey-page";

// Static route kept for existing links; renders the same shared journey page.
const journey = journeys["xo-google"];

export const metadata: Metadata = {
  title: `XO × ${journey.partner}: The Journey | XO Blog`,
  description: journey.intro,
};

export default function XoGoogleJourney() {
  return <JourneyPage journey={journey} />;
}
