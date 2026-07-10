"use client";

/* Two referees for the paper: a model you already talk to (live
   today), and an autonomous agent (on its way). */

import { useState } from "react";
import { Bot, Workflow } from "lucide-react";
import posthog from "posthog-js";
import { AiReferee } from "@/components/whitepaper/ai-referee";

type Tab = "model" | "agent";

export function ValidateTabs() {
  const [tab, setTab] = useState<Tab>("model");

  const handleTabSwitch = (next: Tab) => {
    setTab(next);
    posthog.capture("whitepaper_validate_tab_switched", { tab: next });
  };

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-8">
        <div
          className="inline-flex items-center rounded-full border border-white/15 bg-black/40 p-1"
          role="tablist"
          aria-label="Choose a referee"
        >
          <button
            role="tab"
            aria-selected={tab === "model"}
            onClick={() => handleTabSwitch("model")}
            className={`inline-flex items-center gap-2 rounded-full px-5 h-10 text-sm font-medium transition-all duration-300 ${
              tab === "model" ? "bg-[#83d63a] text-black" : "text-white/50 hover:text-white"
            }`}
          >
            <Bot className="w-4 h-4" aria-hidden="true" />
            Model
          </button>
          <button
            role="tab"
            aria-selected={tab === "agent"}
            onClick={() => handleTabSwitch("agent")}
            className={`inline-flex items-center gap-2 rounded-full px-5 h-10 text-sm font-medium transition-all duration-300 ${
              tab === "agent" ? "bg-[#83d63a] text-black" : "text-white/50 hover:text-white"
            }`}
          >
            <Workflow className="w-4 h-4" aria-hidden="true" />
            Agent
            <span
              className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest ${
                tab === "agent"
                  ? "border-black/30 text-black/70"
                  : "border-white/20 text-white/40"
              }`}
            >
              soon
            </span>
          </button>
        </div>
      </div>

      {tab === "model" ? (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <AiReferee />
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="rounded-2xl border border-dashed border-white/15 p-12 lg:p-16 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#83d63a] mb-4">
              Coming soon
            </p>
            <p className="font-display text-2xl lg:text-3xl tracking-tight text-white max-w-[36ch] mx-auto">
              An autonomous referee.
            </p>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-[52ch] mx-auto">
              An agent that reads the paper on its own, runs the quirq ledger against real
              repositories, and files its receipt into the discussion: no copy, no paste, no
              human in the loop except you reading the verdict.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
