import type { Metadata } from "next";
import { TokenNetwork } from "@/components/whitepaper/token-network";

export const metadata: Metadata = {
  title: "The paper, tokenised | XO",
  description:
    "The quirq whitepaper as a 3D galaxy: every meaningful term a star in a simulated vector sky, with llm.txt and the token vectors ready for any model.",
};

export default function AiPage() {
  return (
    <main className="bg-[#050310]">
      <TokenNetwork />
    </main>
  );
}
