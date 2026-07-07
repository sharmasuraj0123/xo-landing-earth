import type { Metadata } from "next";
import { VisualizeShell } from "@/components/whitepaper/visualize-shell";

export const metadata: Metadata = {
  title: "Visualize: The quirq | XO",
  description:
    "The quirq whitepaper's data as an interactive 3D instrument: the minting lifecycle, the quarterly ledger, and the two meters of agentic work.",
};

export default function VisualizePage() {
  return <VisualizeShell />;
}
