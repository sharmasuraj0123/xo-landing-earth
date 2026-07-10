import type { Metadata } from "next";
import { TokenNetwork } from "@/components/whitepaper/token-network";

export const metadata: Metadata = {
  title: "The paper, tokenised | XO",
  description:
    "The quirq whitepaper as a galaxy: every meaningful term a star in a simulated vector sky. Click a token to see what the model sees.",
};

export default function WhitepaperAiPage() {
  return (
    <main className="bg-[#050310]">
      <TokenNetwork />
    </main>
  );
}
