"use client";

import { useEffect, useState } from "react";

/* Intent in, outcome out. The environment is what turns a business
   intent into a verified, priced outcome: not prompts, not sessions,
   not API calls. Cycles through real examples so the unit of work
   is concrete, not abstract. */

const LIME = "#83d63a";

// Real examples: intent in plain language, the unit it becomes,
// and the verified outcome that comes out the other side.
const EXAMPLES = [
  {
    intent: ["“Clear the support", "backlog.”"],
    unit: "support ticket",
    outcome: "Backlog cleared.",
  },
  {
    intent: ["“Close the month’s", "books.”"],
    unit: "month-end close",
    outcome: "Ledger balanced.",
  },
  {
    intent: ["“Fix the checkout", "bug.”"],
    unit: "bug fix",
    outcome: "Tests green, shipped.",
  },
  {
    intent: ["“Send the weekly", "report.”"],
    unit: "weekly report",
    outcome: "Report delivered.",
  },
];
const MONO = "var(--font-jetbrains), ui-monospace, monospace";
const SANS = "var(--font-instrument), system-ui, sans-serif";

function Chevron({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x - 7} ${y - 4.5} L ${x} ${y} L ${x - 7} ${y + 4.5}`}
      fill="none"
      stroke={LIME}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.9"
    />
  );
}

function CornerTicks({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const L = 14;
  const x0 = x + 2;
  const y0 = y + 2;
  const x1 = x + w - 2;
  const y1 = y + h - 2;
  const d = [
    `M ${x0} ${y0 + L} L ${x0} ${y0} L ${x0 + L} ${y0}`,
    `M ${x1 - L} ${y0} L ${x1} ${y0} L ${x1} ${y0 + L}`,
    `M ${x1} ${y1 - L} L ${x1} ${y1} L ${x1 - L} ${y1}`,
    `M ${x0 + L} ${y1} L ${x0} ${y1} L ${x0} ${y1 - L}`,
  ].join(" ");
  return (
    <path
      d={d}
      fill="none"
      stroke={LIME}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.9"
    />
  );
}

export function EnvironmentDiagram() {
  const [exIdx, setExIdx] = useState(0);
  const ex = EXAMPLES[exIdx];

  useEffect(() => {
    const interval = setInterval(() => {
      setExIdx((prev) => (prev + 1) % EXAMPLES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // What the environment holds, in business terms
  const chips = [
    { label: "definition of done", w: 150 },
    { label: "budget", w: 92 },
    { label: "record", w: 92 },
  ];
  const chipGap = 10;
  const chipsTotal = chips.reduce((s, c) => s + c.w, 0) + (chips.length - 1) * chipGap;
  let chipX = 480 - chipsTotal / 2;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 960 300"
        className="w-full h-auto min-w-[600px] block"
        role="img"
        aria-label="You state an intent, agents work inside the environment against a definition of done and a budget, and you get a verified, priced outcome. The unit is the work, not the prompt."
      >
        <defs>
          <style>{`
            @keyframes envFlow { to { stroke-dashoffset: -20; } }
            .env-flow { stroke-dasharray: 1 9; stroke-linecap: round; animation: envFlow 2.4s linear infinite; }
            @keyframes envBreathe { 0%, 100% { opacity: .25; } 50% { opacity: .6; } }
            .env-glow { animation: envBreathe 3.6s ease-in-out infinite; }
            @keyframes envSwap { from { opacity: 0; } to { opacity: 1; } }
            .env-swap { animation: envSwap .5s ease-out; }
          `}</style>
        </defs>

        {/* ── your intent ── */}
        <text x="108" y="88" textAnchor="middle" fontFamily={MONO} fontSize="9.5" letterSpacing="2" fill="rgba(255,255,255,0.4)">
          YOUR INTENT
        </text>
        <rect x="24" y="98" width="168" height="86" rx={8} fill="none" stroke="rgba(255,255,255,0.22)" strokeDasharray="4 5" />
        <g key={`intent-${exIdx}`} className="env-swap">
          <text x="108" y="134" textAnchor="middle" fontFamily={SANS} fontSize="13.5" fill="rgba(255,255,255,0.85)">
            {ex.intent[0]}
          </text>
          <text x="108" y="153" textAnchor="middle" fontFamily={SANS} fontSize="13.5" fill="rgba(255,255,255,0.85)">
            {ex.intent[1]}
          </text>
        </g>
        <text x="108" y="173" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="1.5" fill="rgba(255,255,255,0.32)">
          PLAIN LANGUAGE
        </text>

        {/* flow in */}
        <line x1="200" y1="141" x2="246" y2="141" stroke={LIME} strokeWidth="1.2" opacity="0.7" className="env-flow" />
        <Chevron x={252} y={141} />

        {/* ── the environment ── */}
        <rect x="262" y="34" width="436" height="214" rx={8} fill="rgba(131,214,58,0.025)" stroke="rgba(255,255,255,0.12)" />
        <CornerTicks x={262} y={34} w={436} h={214} />
        <text x="284" y="62" fontFamily={MONO} fontSize="10" letterSpacing="3" fill={LIME}>
          THE ENVIRONMENT
        </text>

        {/* agents at work */}
        <circle cx="480" cy="92" r="12" fill={LIME} opacity="0.25" className="env-glow" />
        <circle cx="480" cy="92" r="7" fill="none" stroke={LIME} strokeWidth="1" opacity="0.5" />
        <circle cx="480" cy="92" r="3.5" fill={LIME} />
        <text x="480" y="121" textAnchor="middle" fontFamily={SANS} fontSize="12.5" fill="rgba(255,255,255,0.7)">
          Your agents do the work
        </text>

        {/* the work itself: real units, the active example lit */}
        {(() => {
          const units = [
            { label: "support ticket", w: 102 },
            { label: "month-end close", w: 116 },
            { label: "bug fix", w: 64 },
            { label: "weekly report", w: 100 },
          ];
          const gap = 8;
          const total = units.reduce((s, u) => s + u.w, 0) + (units.length - 1) * gap;
          let x = 480 - total / 2;
          return units.map((u) => {
            const cur = x;
            x += u.w + gap;
            const active = u.label === ex.unit;
            return (
              <g key={u.label}>
                <rect
                  x={cur}
                  y="134"
                  width={u.w}
                  height="22"
                  rx={6}
                  fill={active ? "rgba(131,214,58,0.14)" : "rgba(131,214,58,0.04)"}
                  stroke={active ? LIME : "rgba(131,214,58,0.35)"}
                  strokeWidth={active ? 1.4 : 1}
                  style={{ transition: "all .5s ease" }}
                />
                <text
                  x={cur + u.w / 2}
                  y="148.5"
                  textAnchor="middle"
                  fontFamily={MONO}
                  fontSize="9.5"
                  letterSpacing="0.5"
                  fill={active ? "#ffffff" : "rgba(255,255,255,0.55)"}
                  style={{ transition: "fill .5s ease" }}
                >
                  {u.label}
                </text>
              </g>
            );
          });
        })()}

        {/* narrative hinge */}
        <text x="480" y="169" textAnchor="middle" fontFamily={MONO} fontSize="8.5" letterSpacing="2" fill="rgba(255,255,255,0.3)">
          EACH ONE SCOPED BY
        </text>

        {/* what every unit is scoped by */}
        {chips.map((chip) => {
          const x = chipX;
          chipX += chip.w + chipGap;
          return (
            <g key={chip.label}>
              <rect x={x} y="178" width={chip.w} height="26" rx={6} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" />
              <text
                x={x + chip.w / 2}
                y="195.5"
                textAnchor="middle"
                fontFamily={MONO}
                fontSize="10.5"
                letterSpacing="1"
                fill="rgba(255,255,255,0.6)"
              >
                {chip.label}
              </text>
            </g>
          );
        })}

        {/* meter baseline */}
        <line x1={480 - chipsTotal / 2} y1="220" x2={480 + chipsTotal / 2} y2="220" stroke={LIME} strokeWidth="1" opacity="0.55" className="env-flow" />
        <text x="480" y="237" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="1.5" fill="rgba(255,255,255,0.32)">
          SPEND METERED AGAINST THE OUTCOME, NOT THE HOURS
        </text>

        {/* flow out */}
        <line x1="706" y1="141" x2="752" y2="141" stroke={LIME} strokeWidth="1.2" opacity="0.7" className="env-flow" />
        <Chevron x={758} y={141} />

        {/* ── the outcome ── */}
        <text x="852" y="88" textAnchor="middle" fontFamily={MONO} fontSize="9.5" letterSpacing="2" fill={LIME}>
          THE OUTCOME
        </text>
        <rect x="768" y="98" width="168" height="86" rx={8} fill="rgba(131,214,58,0.04)" stroke="rgba(131,214,58,0.55)" />
        <g key={`outcome-${exIdx}`} className="env-swap">
          <text x="852" y="134" textAnchor="middle" fontFamily={SANS} fontSize="13.5" fill="rgba(255,255,255,0.9)">
            {ex.outcome}
          </text>
        </g>
        <text x="852" y="158" textAnchor="middle" fontFamily={MONO} fontSize="9.5" letterSpacing="1.5" fill={LIME}>
          VERIFIED · ON BUDGET
        </text>

        {/* the point, stated once */}
        <text x="480" y="286" textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="2" fill="rgba(255,255,255,0.45)">
          THE UNIT ISN&apos;T THE PROMPT, THE SESSION, OR THE API CALL. IT&apos;S THE WORK.
        </text>
      </svg>
    </div>
  );
}
