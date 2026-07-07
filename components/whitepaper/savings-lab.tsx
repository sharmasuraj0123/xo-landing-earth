"use client";

import { useMemo, useState } from "react";

/* The savings lab: play with the paper's calculus.

   Model (straight from the paper's units):
   - Each unit of work is budgeted at B dollars and verified at score V,
     so every completed unit mints V·B quirqs (a quirq = $1 of verified outcome).
   - The all-in cost of producing a unit starts at C0 and declines as the
     environment compounds (memory, records, a sharper definition of done):
     C(w) = C0 · (w + 1)^(-alpha), a standard learning curve.
   - Weekly margin = N · (V·B - C(w)). QER = quirqs per all-in dollar. */

const WEEKS = 26;

function fmt(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${Math.round(n / 1000)}K`;
  return `$${Math.round(n)}`;
}

export function SavingsLab() {
  const [units, setUnits] = useState(50); // units of work per week
  const [budget, setBudget] = useState(120); // B, dollars per unit
  const [score, setScore] = useState(0.9); // V
  const [startCost, setStartCost] = useState(80); // C0
  const [alpha, setAlpha] = useState(0.25); // compounding strength

  const model = useMemo(() => {
    const weeks = Array.from({ length: WEEKS + 1 }, (_, w) => {
      const cost = startCost * Math.pow(w + 1, -alpha);
      const minted = score * budget; // quirqs per unit
      return { w, cost, minted, margin: units * (minted - cost) };
    });
    const cumulative = weeks.reduce((s, x) => s + Math.max(0, x.margin), 0);
    const last = weeks[WEEKS];
    return {
      weeks,
      cumulative,
      qerStart: (score * budget) / weeks[0].cost,
      qerEnd: (score * budget) / last.cost,
      costDrop: 1 - last.cost / weeks[0].cost,
    };
  }, [units, budget, score, startCost, alpha]);

  // Chart geometry
  const CW = 560;
  const CH = 240;
  const PAD = 34;
  const maxY = Math.max(score * budget, startCost) * 1.15;
  const px = (w: number) => PAD + (w / WEEKS) * (CW - PAD * 2);
  const y = (v: number) => CH - PAD - (v / maxY) * (CH - PAD * 2);

  const costPath = model.weeks.map((p, i) => `${i === 0 ? "M" : "L"} ${px(p.w).toFixed(1)} ${y(p.cost).toFixed(1)}`).join(" ");
  const mintedY = y(score * budget);
  const areaPath =
    `M ${px(0)} ${mintedY} L ${px(WEEKS)} ${mintedY} ` +
    model.weeks.slice().reverse().map((p) => `L ${px(p.w).toFixed(1)} ${y(p.cost).toFixed(1)}`).join(" ") +
    " Z";

  const slider = "w-full accent-[#83d63a]";
  const label = "flex items-baseline justify-between text-sm mb-1";
  const mono = "font-mono text-xs text-muted-foreground";

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-8 lg:gap-12 items-start">
      {/* Controls */}
      <div className="space-y-6">
        <div>
          <div className={label}>
            <span className="text-foreground">Units of work per week</span>
            <span className="font-mono text-[#83d63a]">{units}</span>
          </div>
          <input aria-label="Units of work per week" type="range" min={5} max={500} step={5} value={units} onChange={(e) => setUnits(+e.target.value)} className={slider} />
          <p className={mono}>tickets closed, briefs drafted, reports shipped</p>
        </div>

        <div>
          <div className={label}>
            <span className="text-foreground">Budget per unit · B</span>
            <span className="font-mono text-[#83d63a]">${budget}</span>
          </div>
          <input aria-label="Budget per unit" type="range" min={10} max={500} step={5} value={budget} onChange={(e) => setBudget(+e.target.value)} className={slider} />
          <p className={mono}>what the outcome is worth to you</p>
        </div>

        <div>
          <div className={label}>
            <span className="text-foreground">Verification score · V</span>
            <span className="font-mono text-[#83d63a]">{score.toFixed(2)}</span>
          </div>
          <input aria-label="Verification score" type="range" min={0.5} max={1} step={0.01} value={score} onChange={(e) => setScore(+e.target.value)} className={slider} />
          <p className={mono}>scored against the definition of done</p>
        </div>

        <div>
          <div className={label}>
            <span className="text-foreground">Starting all-in cost · C&#8320;</span>
            <span className="font-mono text-[#83d63a]">${startCost}</span>
          </div>
          <input aria-label="Starting all-in cost" type="range" min={5} max={300} step={5} value={startCost} onChange={(e) => setStartCost(+e.target.value)} className={slider} />
          <p className={mono}>tokens + compute + human interventions</p>
        </div>

        <div>
          <div className={label}>
            <span className="text-foreground">Environment compounding</span>
            <span className="font-mono text-[#83d63a]">{alpha.toFixed(2)}</span>
          </div>
          <input aria-label="Environment compounding" type="range" min={0} max={0.5} step={0.01} value={alpha} onChange={(e) => setAlpha(+e.target.value)} className={slider} />
          <p className={mono}>memory + records make the next run cheaper</p>
        </div>
      </div>

      {/* Chart + readouts */}
      <div>
        <div className="border border-foreground/10 bg-black p-4 lg:p-6">
          <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Cost per unit falling below the value minted per unit, the gap is the margin">
            {/* margin area */}
            <path d={areaPath} fill="rgba(131,214,58,0.08)" />
            {/* minted value line */}
            <line x1={px(0)} y1={mintedY} x2={px(WEEKS)} y2={mintedY} stroke="#83d63a" strokeWidth="1.4" strokeDasharray="5 4" />
            <text x={px(WEEKS)} y={mintedY - 7} textAnchor="end" fontSize="10" fill="#83d63a" fontFamily="var(--font-jetbrains), monospace">
              quirqs minted per unit · V·B = ${Math.round(score * budget)}
            </text>
            {/* cost curve */}
            <path d={costPath} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" />
            <text x={px(WEEKS)} y={y(model.weeks[WEEKS].cost) + 14} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="var(--font-jetbrains), monospace">
              all-in cost per unit · ${Math.round(model.weeks[WEEKS].cost)}
            </text>
            {/* axes */}
            <line x1={PAD} y1={CH - PAD} x2={CW - PAD} y2={CH - PAD} stroke="rgba(255,255,255,0.15)" />
            <text x={PAD} y={CH - 12} fontSize="10" fill="rgba(255,255,255,0.35)" fontFamily="var(--font-jetbrains), monospace">week 0</text>
            <text x={CW - PAD} y={CH - 12} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.35)" fontFamily="var(--font-jetbrains), monospace">week {WEEKS}</text>
            <text x={PAD} y={16} fontSize="10" fill="rgba(255,255,255,0.35)" fontFamily="var(--font-jetbrains), monospace">$ per unit of work</text>
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 border border-foreground/10 divide-x divide-foreground/10">
          <div className="p-4">
            <span className="block text-2xl lg:text-3xl font-display text-[#83d63a]">{fmt(model.cumulative)}</span>
            <span className="block mt-1 text-[11px] font-mono text-muted-foreground">quirq margin over {WEEKS} weeks</span>
          </div>
          <div className="p-4">
            <span className="block text-2xl lg:text-3xl font-display">{Math.round(model.costDrop * 100)}%</span>
            <span className="block mt-1 text-[11px] font-mono text-muted-foreground">cost per unit drop by week {WEEKS}</span>
          </div>
          <div className="p-4">
            <span className="block text-2xl lg:text-3xl font-display">{model.qerStart.toFixed(1)}&rarr;{model.qerEnd.toFixed(1)}</span>
            <span className="block mt-1 text-[11px] font-mono text-muted-foreground">QER: quirqs per all-in dollar</span>
          </div>
          <div className="p-4">
            <span className="block text-2xl lg:text-3xl font-display">{Math.round(units * score * budget).toLocaleString()}</span>
            <span className="block mt-1 text-[11px] font-mono text-muted-foreground">quirqs minted per week</span>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-[70ch]">
          The white line is what a unit of work costs, all-in. The lime line is what it mints.
          The gap is the argument: measurement makes the gap visible, and the environment&apos;s
          memory widens it every week. Sections 3 and 4 of the paper develop this arithmetic.
        </p>
      </div>
    </div>
  );
}
