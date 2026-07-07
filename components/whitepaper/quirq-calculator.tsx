"use client";

/* ────────────────────────────────────────────────────────────────
   The quirq calculator.

   Every formula from the paper, computed live on your numbers:
   minting (Q = V x B), the all-in cost model, unit economics
   (cost per quirq, margin, multiple), portfolio metrics (QER, QV,
   IR), the savings against a human baseline, the energy bridge
   (quirqs per kWh, per tonne CO2), and the trajectory that falls
   out when checks harden month over month. Defaults land on the
   paper's Table 1 April headline ratios (QER 3.1x, IR 18.1%, cost
   per quirq $0.32); the dollar components agree within about 2%,
   so the arithmetic is auditable against the paper itself.
──────────────────────────────────────────────────────────────── */

import { useMemo, useState } from "react";

const LIME = "#83d63a";

/* ── inputs ───────────────────────────────────────────────────── */

type Params = {
  units: number; // units of work per month
  budget: number; // avg budget B per unit, $
  score: number; // avg completion V in [0,1]
  ktokens: number; // thousand tokens per unit
  tokenPrice: number; // $ per million tokens
  computePerUnit: number; // compute + API + storage per unit, $
  ir: number; // intervention rate, fraction
  rescueMinutes: number; // minutes per rescue
  rescueRate: number; // $ per hour for rescues
  humanMinutes: number; // baseline human minutes per unit
  humanRate: number; // baseline human $ per hour
  joulesPerToken: number; // energy assumption
  gridCO2: number; // gCO2 per kWh
  irStep: number; // IR improvement, percentage points per month
  vStep: number; // V improvement, percentage points per month
};

/** Defaults chosen to land on the paper's April ledger row. */
const PAPER_APRIL: Params = {
  units: 2100,
  budget: 8.75,
  score: 0.86,
  ktokens: 240,
  tokenPrice: 3.0,
  computePerUnit: 0.2,
  ir: 0.181,
  rescueMinutes: 50,
  rescueRate: 10,
  humanMinutes: 30,
  humanRate: 40,
  joulesPerToken: 2.0,
  gridCO2: 400,
  irStep: 3,
  vStep: 1,
};

/* ── the paper's calculus, as one pure function ───────────────── */

function compute(p: Params) {
  const potential = p.units * p.budget; // sum of budgets B
  const minted = potential * p.score; // Q = V x B, summed
  const inference = (p.units * p.ktokens * p.tokenPrice) / 1000;
  const computeApi = p.units * p.computePerUnit;
  const rescues = p.units * p.ir;
  const rescueCost = rescues * (p.rescueMinutes / 60) * p.rescueRate;
  const costTotal = inference + computeApi + rescueCost;

  const qer = minted / costTotal;
  const costPerQuirq = costTotal / minted;
  const margin = minted - costTotal;
  const multiple = minted / costTotal;

  const humanCost = p.units * (p.humanMinutes / 60) * p.humanRate;
  const saved = humanCost - costTotal;
  const savedPct = humanCost > 0 ? saved / humanCost : 0;

  const kwh = (p.units * p.ktokens * 1000 * p.joulesPerToken) / 3.6e6;
  const quirqsPerKwh = kwh > 0 ? minted / kwh : 0;
  const tonnesCO2 = (kwh * p.gridCO2) / 1e6;
  const quirqsPerTonne = tonnesCO2 > 0 ? minted / tonnesCO2 : 0;
  const whPerQuirq = minted > 0 ? (kwh * 1000) / minted : 0;

  return {
    potential,
    minted,
    inference,
    computeApi,
    rescues,
    rescueCost,
    costTotal,
    qer,
    costPerQuirq,
    margin,
    multiple,
    humanCost,
    saved,
    savedPct,
    kwh,
    quirqsPerKwh,
    tonnesCO2,
    quirqsPerTonne,
    whPerQuirq,
  };
}

/** Six months of the same program while checks harden and scopes sharpen. */
function trajectory(p: Params) {
  return Array.from({ length: 6 }, (_, m) => {
    const stepped: Params = {
      ...p,
      /* floor the decrement only: month 1 must equal the live headline */
      ir: Math.max(p.ir - (m * p.irStep) / 100, Math.min(p.ir, 0.02)),
      score: Math.min(p.score + (m * p.vStep) / 100, 1),
    };
    const r = compute(stepped);
    return { month: m + 1, qer: r.qer, costPerQuirq: r.costPerQuirq, ir: stepped.ir };
  });
}

/* ── formatting ───────────────────────────────────────────────── */

const usd = (n: number, digits = 0) =>
  `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })}`;
const num = (n: number, digits = 0) =>
  n.toLocaleString(undefined, { maximumFractionDigits: digits });
/** Adaptive digits so small quantities never round to a bare 0. */
const fmt = (n: number) => {
  const a = Math.abs(n);
  const digits = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3;
  return n.toLocaleString(undefined, { maximumFractionDigits: digits });
};

/* ── small building blocks ────────────────────────────────────── */

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
  assumption,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  assumption?: boolean;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs text-white/60">
          {label}
          {assumption && (
            <span className="ml-2 font-mono text-[9px] uppercase tracking-widest text-white/30">
              assumption
            </span>
          )}
        </span>
        <span className="font-mono text-xs text-white">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#83d63a]"
        aria-label={label}
      />
    </label>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-3">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

/** A formula, shown as the paper writes it, then with live numbers. */
function Formula({
  title,
  equation,
  substitution,
  result,
  note,
}: {
  title: string;
  equation: string;
  substitution: string;
  result: string;
  note?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-3">{title}</p>
      <p className="font-mono text-sm text-white/70">{equation}</p>
      <p className="font-mono text-xs text-white/40 mt-2 break-words leading-relaxed">
        = {substitution}
      </p>
      <p className="font-mono text-xl text-[#83d63a] mt-3">{result}</p>
      {note && <p className="text-xs text-white/40 mt-2 leading-relaxed">{note}</p>}
    </div>
  );
}

function Headline({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-2">{label}</p>
      <p className="font-display text-4xl tracking-tight text-[#83d63a]">{value}</p>
      <p className="font-mono text-[11px] text-white/40 mt-1.5">{sub}</p>
    </div>
  );
}

/** Budget vs spend, drawn: the gap is the efficiency. */
function GapBar({ minted, cost }: { minted: number; cost: number }) {
  const underwater = cost > minted;
  /* when cost exceeds value, the VALUE bar shrinks instead, so the
     chart never pretends break-even at a saturated 100% */
  const costPct = underwater ? 100 : Math.max(2, (cost / minted) * 100);
  const valuePct = underwater ? Math.max(2, (minted / cost) * 100) : 100;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-4">
        The gap is your efficiency
      </p>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between font-mono text-[11px] text-white/50 mb-1">
            <span>Value minted</span>
            <span className="text-[#83d63a]">{num(minted)} quirqs</span>
          </div>
          <div className="h-3 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full rounded-full bg-[#83d63a]/90" style={{ width: `${valuePct}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between font-mono text-[11px] text-white/50 mb-1">
            <span>All-in cost</span>
            <span className={underwater ? "text-[#d68a5a]" : undefined}>{usd(cost)}</span>
          </div>
          <div className="h-3 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className={`h-full rounded-full ${underwater ? "bg-[#d68a5a]/80" : "bg-white/40"}`}
              style={{ width: `${costPct}%` }}
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-white/40 mt-4 leading-relaxed">
        {underwater
          ? "Cost exceeds minted value here: the margin is negative and this program burns money at these settings."
          : "Both bars share one scale: a quirq is a budget-denominated dollar of verified work, so the uncovered lime is margin."}
      </p>
    </div>
  );
}

/** Hand-rolled trajectory chart: QER up, cost per quirq down. */
function TrajectoryChart({ points }: { points: { month: number; qer: number; costPerQuirq: number }[] }) {
  const W = 560;
  const H = 210;
  const PAD = { l: 44, r: 60, t: 18, b: 28 };
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;
  const maxQer = Math.max(...points.map((p) => p.qer)) * 1.15;
  const maxCq = Math.max(...points.map((p) => p.costPerQuirq)) * 1.15;
  const x = (i: number) => PAD.l + (i / (points.length - 1)) * iw;
  const yQ = (v: number) => PAD.t + ih - (v / maxQer) * ih;
  const yC = (v: number) => PAD.t + ih - (v / maxCq) * ih;
  const qerPath = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${yQ(p.qer)}`).join(" ");
  const cqPath = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${yC(p.costPerQuirq)}`).join(" ");
  const last = points[points.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Six month projection of QER and cost per quirq">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={PAD.l}
          x2={W - PAD.r}
          y1={PAD.t + ih * (1 - f)}
          y2={PAD.t + ih * (1 - f)}
          stroke="rgba(255,255,255,0.06)"
        />
      ))}
      {points.map((p, i) => (
        <text
          key={p.month}
          x={x(i)}
          y={H - 8}
          textAnchor="middle"
          className="fill-white/30"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
        >
          M{p.month}
        </text>
      ))}
      <path d={qerPath} fill="none" stroke={LIME} strokeWidth="2" strokeLinecap="round" />
      <path
        d={cqPath}
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
      {points.map((p, i) => (
        <circle key={i} cx={x(i)} cy={yQ(p.qer)} r="3" fill={LIME} />
      ))}
      <text x={x(points.length - 1) + 8} y={yQ(last.qer) + 4} fontSize="11" fontFamily="ui-monospace, monospace" fill={LIME}>
        {last.qer.toFixed(1)}x
      </text>
      <text
        x={x(points.length - 1) + 8}
        y={yC(last.costPerQuirq) + 4}
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        fill="rgba(255,255,255,0.55)"
      >
        ${last.costPerQuirq.toFixed(2)}
      </text>
      <text x={PAD.l} y={12} fontSize="10" fontFamily="ui-monospace, monospace" fill={LIME}>
        QER (quirqs per dollar)
      </text>
      <text x={PAD.l + 170} y={12} fontSize="10" fontFamily="ui-monospace, monospace" fill="rgba(255,255,255,0.45)">
        cost per quirq (dashed)
      </text>
    </svg>
  );
}

/* ── the calculator ───────────────────────────────────────────── */

export function QuirqCalculator() {
  const [p, setP] = useState<Params>(PAPER_APRIL);
  const set = (key: keyof Params) => (v: number) => setP((prev) => ({ ...prev, [key]: v }));
  const r = useMemo(() => compute(p), [p]);
  const path = useMemo(() => trajectory(p), [p]);

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-6 items-start">
      {/* ── inputs ─────────────────────────────────────────── */}
      <aside className="lg:sticky lg:top-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xs text-white/40 uppercase tracking-widest">
            Your program
          </h2>
          <button
            onClick={() => setP(PAPER_APRIL)}
            className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-white hover:border-white/30 transition-colors"
          >
            Reset to paper
          </button>
        </div>

        <Group title="The work">
          <Slider label="Units of work per month" value={p.units} onChange={set("units")} min={100} max={20000} step={100} format={(v) => num(v)} />
          <Slider label="Average budget B per unit" value={p.budget} onChange={set("budget")} min={1} max={100} step={0.25} format={(v) => usd(v, 2)} />
          <Slider label="Average completion V" value={p.score} onChange={set("score")} min={0.5} max={1} step={0.01} format={(v) => v.toFixed(2)} />
        </Group>

        <Group title="Machine costs">
          <Slider label="Tokens per unit" value={p.ktokens} onChange={set("ktokens")} min={10} max={2000} step={10} format={(v) => `${num(v)}k`} />
          <Slider label="Price per million tokens" value={p.tokenPrice} onChange={set("tokenPrice")} min={0.25} max={30} step={0.25} format={(v) => usd(v, 2)} />
          <Slider label="Overhead per unit (compute, API, storage, amortization)" value={p.computePerUnit} onChange={set("computePerUnit")} min={0} max={5} step={0.05} format={(v) => usd(v, 2)} />
        </Group>

        <Group title="Human rescue">
          <Slider label="Intervention rate IR" value={p.ir} onChange={set("ir")} min={0} max={0.4} step={0.001} format={(v) => `${(v * 100).toFixed(1)}%`} />
          <Slider label="Minutes per rescue" value={p.rescueMinutes} onChange={set("rescueMinutes")} min={5} max={180} step={5} format={(v) => `${v} min`} />
          <Slider label="Rescue rate" value={p.rescueRate} onChange={set("rescueRate")} min={5} max={150} step={5} format={(v) => `${usd(v)}/h`} />
        </Group>

        <Group title="Human baseline">
          <Slider label="Human minutes per unit" value={p.humanMinutes} onChange={set("humanMinutes")} min={5} max={240} step={5} format={(v) => `${v} min`} assumption />
          <Slider label="Human rate" value={p.humanRate} onChange={set("humanRate")} min={10} max={200} step={5} format={(v) => `${usd(v)}/h`} assumption />
        </Group>

        <Group title="Energy bridge">
          <Slider label="Joules per token" value={p.joulesPerToken} onChange={set("joulesPerToken")} min={0.3} max={10} step={0.1} format={(v) => `${v.toFixed(1)} J`} assumption />
          <Slider label="Grid intensity" value={p.gridCO2} onChange={set("gridCO2")} min={50} max={900} step={10} format={(v) => `${num(v)} g/kWh`} assumption />
        </Group>

        <Group title="Trajectory dials">
          <Slider label="Checks harden: IR falls per month" value={p.irStep} onChange={set("irStep")} min={0} max={6} step={0.5} format={(v) => `${v.toFixed(1)} pp`} />
          <Slider label="Scopes sharpen: V rises per month" value={p.vStep} onChange={set("vStep")} min={0} max={4} step={0.5} format={(v) => `${v.toFixed(1)} pp`} />
        </Group>
      </aside>

      {/* ── outputs ────────────────────────────────────────── */}
      <div className="space-y-6 min-w-0">
        {/* headlines */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
          <Headline label="QER" value={`${r.qer.toFixed(1)}x`} sub="quirqs per all-in dollar" />
          <Headline label="Saved per month" value={usd(r.saved)} sub={`${(r.savedPct * 100).toFixed(0)}% vs the human baseline`} />
          <Headline label="Quirq margin" value={usd(r.margin)} sub="minted value minus all-in cost" />
          <Headline label="Energy per quirq" value={`${r.whPerQuirq.toFixed(1)} Wh`} sub={`${fmt(r.quirqsPerKwh)} quirqs per kWh`} />
        </div>

        {/* minting + cost */}
        <div className="grid md:grid-cols-2 gap-3">
          <Formula
            title="Minting · Section 3"
            equation="Q = V x B, summed over units"
            substitution={`${p.score.toFixed(2)} x ${usd(p.budget, 2)} x ${num(p.units)} units`}
            result={`${num(r.minted)} quirqs / month`}
            note={`Potential was ${num(r.potential)} quirqs: minted, never self-reported, only what verification scores.`}
          />
          <Formula
            title="All-in cost · Eq. 3, Section 4.2"
            equation="C = inference + overhead + rescue"
            substitution={`${usd(r.inference)} + ${usd(r.computeApi)} + ${usd(r.rescueCost)} (${num(r.rescues)} rescues x ${p.rescueMinutes} min at ${usd(p.rescueRate)}/h)`}
            result={`${usd(r.costTotal)} / month`}
            note="Overhead bundles Eq. 3's compute, API, storage, and environment amortization terms into one dial. The token bill is only one line: the meter runs on everything production consumed."
          />
        </div>

        {/* unit economics */}
        <div className="grid md:grid-cols-3 gap-3">
          <Formula
            title="Cost per quirq · Eq. 4"
            equation="c_q = C / Q"
            substitution={`${usd(r.costTotal)} / ${num(r.minted)}`}
            result={`$${r.costPerQuirq.toFixed(3)}`}
            note="The price of a dollar of verified work."
          />
          <Formula
            title="Quirq margin · Eq. 4"
            equation="margin = Q - C"
            substitution={`${num(r.minted)} - ${usd(r.costTotal)}`}
            result={usd(r.margin)}
          />
          <Formula
            title="Multiple · Eq. 4"
            equation="x = Q / C"
            substitution={`${num(r.minted)} / ${usd(r.costTotal)}`}
            result={`${r.multiple.toFixed(1)}x`}
          />
        </div>

        {/* the gap + portfolio */}
        <div className="grid md:grid-cols-2 gap-3">
          <GapBar minted={r.minted} cost={r.costTotal} />
          <div className="grid gap-3">
            <Formula
              title="Quirq velocity · Eq. 6"
              equation="QV = sum(Q) / window"
              substitution={`${num(r.minted)} quirqs / 1 month`}
              result={`${num(r.minted)} / mo`}
              note="Throughput in value terms: it cannot be inflated by shipping confetti."
            />
            <Formula
              title="Intervention rate · Eq. 7"
              equation="IR = failed units / units"
              substitution={`${num(r.rescues)} rescues / ${num(p.units)} units`}
              result={`${(p.ir * 100).toFixed(1)}%`}
              note="The trust signal, measured for free, arriving with its diagnosis attached."
            />
          </div>
        </div>

        {/* savings */}
        <div className="rounded-2xl border border-[#83d63a]/25 bg-[#83d63a]/[0.04] p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">
            Money · against your human baseline
          </p>
          <p className="font-mono text-sm text-white/70">
            saved = units x human time x rate - C
          </p>
          <p className="font-mono text-xs text-white/40 mt-2 leading-relaxed">
            = {num(p.units)} x {p.humanMinutes} min x {usd(p.humanRate)}/h - {usd(r.costTotal)} ={" "}
            {usd(r.humanCost)} - {usd(r.costTotal)}
          </p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <span className="font-display text-5xl tracking-tight text-[#83d63a]">
              {usd(r.saved)}
            </span>
            <span className="font-mono text-sm text-white/55">
              per month · {(r.savedPct * 100).toFixed(0)}% below the baseline ·{" "}
              {num(p.units * p.humanMinutes / 60)} human hours redirected
            </span>
          </div>
          <p className="text-xs text-white/40 mt-3 leading-relaxed">
            The baseline is your assumption, not the paper&apos;s claim: set it honestly and the
            ledger does the rest.
          </p>
        </div>

        {/* energy bridge */}
        <div className="grid md:grid-cols-3 gap-3">
          <Formula
            title="Energy · bridge metric"
            equation="kWh = tokens x J/token / 3.6e6"
            substitution={`${num(p.units * p.ktokens)}k tokens x ${p.joulesPerToken.toFixed(1)} J / 3.6e6`}
            result={`${fmt(r.kwh)} kWh / mo`}
            note="Tokens scale nearly linearly with energy drawn: the input meter, read in joules."
          />
          <Formula
            title="Quirqs per kWh · Eq. 11"
            equation="Q / kWh"
            substitution={`${num(r.minted)} / ${fmt(r.kwh)}`}
            result={`${fmt(r.quirqsPerKwh)} quirqs`}
            note="Verified value per kilowatt-hour: AI's energy accounting meets its economic justification."
          />
          <Formula
            title="Quirqs per tonne CO2 · Eq. 11"
            equation="Q / tCO2"
            substitution={`${num(r.minted)} / ${fmt(r.tonnesCO2)} t`}
            result={`${fmt(r.quirqsPerTonne)} quirqs`}
            note={`At ${num(p.gridCO2)} gCO2/kWh, your assumption dial.`}
          />
        </div>

        {/* trajectory */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              The trajectory · Eq. 5 over time · read the trend, not the snapshot
            </p>
            <p className="font-mono text-[11px] text-white/40">
              QER {path[0].qer.toFixed(1)}x &rarr; {path[5].qer.toFixed(1)}x in 6 months
            </p>
          </div>
          <TrajectoryChart points={path} />
          <p className="text-xs text-white/40 mt-3 leading-relaxed max-w-[80ch]">
            Same program, while your checks harden (IR falls {p.irStep.toFixed(1)} pp/month) and
            scopes sharpen (V rises {p.vStep.toFixed(1)} pp/month). This projection assumes
            audits keep passing: the paper&apos;s Eq. 10 further discounts QER by the audit gap
            A, and its test for a program worth keeping is audit-corrected QER rising while IR
            falls.
          </p>
        </div>
      </div>
    </div>
  );
}
