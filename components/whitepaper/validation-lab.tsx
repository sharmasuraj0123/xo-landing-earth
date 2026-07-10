"use client";

/* ────────────────────────────────────────────────────────────────
   The validation lab.

   Point it at a GitHub repository and it runs the paper's
   calculus on real work: every merged PR and closed issue is a
   settled unit of work, every open issue is unsettled backlog.
   You set the budget assumptions; it computes the ledger and
   returns a verdict — the paper's economics either hold on this
   repo, or they don't. Two verdicts, side by side:

   1. ECONOMICS  — Q = V·B minted against the all-in cost of the
      settled units. VALIDATED if QER > 1.
   2. FEASIBILITY — a total budget against the projected all-in
      cost of clearing the open backlog. FEASIBLE if it covers.
──────────────────────────────────────────────────────────────── */

import { useMemo, useState } from "react";

const LIME = "#83d63a";
const RED = "#e05252";

/* ── API payload ──────────────────────────────────────────────── */

type RepoData = {
  repo: {
    fullName: string;
    description: string | null;
    stars: number;
    language: string | null;
    createdAt: string;
    pushedAt: string;
    url: string;
  };
  units: {
    mergedPRs: number;
    closedIssues: number;
    settled: number;
    backlog: number;
  };
  sample: {
    prCount: number;
    medianCycleHours: number;
    recent: { number: number; title: string }[];
  };
  activity: {
    weeklyCommits: number[];
    totalYear: number;
  };
};

/* ── assumptions ──────────────────────────────────────────────── */

type Params = {
  budget: number; // B, $ per unit of work
  score: number; // V, avg completion in [0,1]
  ktokens: number; // thousand tokens per unit
  tokenPrice: number; // $ per million tokens
  computePerUnit: number; // compute + API + storage, $ per unit
  ir: number; // intervention rate, fraction
  rescueMinutes: number; // human minutes per rescue
  rescueRate: number; // $ / hr for rescues
  totalBudget: number; // $ committed to clear the open backlog
};

const DEFAULTS: Params = {
  budget: 25,
  score: 0.86,
  ktokens: 240,
  tokenPrice: 3.0,
  computePerUnit: 0.2,
  ir: 0.181,
  rescueMinutes: 50,
  rescueRate: 60,
  totalBudget: 5000,
};

/* ── the calculus (paper, section: The quirq calculus) ────────── */

function simulate(d: RepoData, p: Params) {
  const settled = d.units.settled;
  const backlog = d.units.backlog;

  // All-in cost per unit (eq. 3, agent-side terms + intervention).
  const inference = (p.ktokens * p.tokenPrice) / 1000;
  const rescue = p.ir * (p.rescueMinutes / 60) * p.rescueRate;
  const costPerUnit = inference + p.computePerUnit + rescue;

  // The mint (Q = V·B), applied to the settled history.
  const potential = settled * p.budget;
  const minted = potential * p.score;
  const costTotal = settled * costPerUnit;
  const qer = costTotal > 0 ? minted / costTotal : 0;
  const costPerQuirq = minted > 0 ? costTotal / minted : 0;
  const margin = minted - costTotal;

  // Feasibility: can the committed budget clear the open backlog?
  const backlogCost = backlog * costPerUnit;
  const coverage = backlogCost > 0 ? p.totalBudget / backlogCost : Infinity;
  const unitsAffordable = costPerUnit > 0 ? p.totalBudget / costPerUnit : 0;
  const impliedB = backlog > 0 ? p.totalBudget / backlog : 0;
  const backlogMint = backlog * impliedB * p.score; // if budget is spread as value
  const feasible = p.totalBudget >= backlogCost && impliedB * p.score > costPerUnit;

  return {
    settled,
    backlog,
    inference,
    rescue,
    costPerUnit,
    potential,
    minted,
    costTotal,
    qer,
    costPerQuirq,
    margin,
    validated: qer > 1,
    backlogCost,
    coverage,
    unitsAffordable,
    impliedB,
    backlogMint,
    feasible,
  };
}

/* ── formatting ───────────────────────────────────────────────── */

const usd = (n: number, digits = 0) =>
  `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })}`;
const num = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });
const fmt = (n: number) => {
  const a = Math.abs(n);
  const digits = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3;
  return n.toLocaleString(undefined, { maximumFractionDigits: digits });
};

/* ── building blocks ──────────────────────────────────────────── */

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs text-white/60">{label}</span>
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

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-1.5">
        {label}
      </p>
      <p className="font-display text-2xl tracking-tight text-white">{value}</p>
      {sub && <p className="font-mono text-[11px] text-white/40 mt-1">{sub}</p>}
    </div>
  );
}

function Verdict({
  kind,
  positive,
  headline,
  detail,
}: {
  kind: string;
  positive: boolean;
  headline: string;
  detail: string;
}) {
  const color = positive ? LIME : RED;
  return (
    <div
      className="rounded-2xl border p-6 relative overflow-hidden"
      style={{
        borderColor: `${color}66`,
        background: `linear-gradient(160deg, ${color}14, transparent 60%)`,
        boxShadow: `0 0 40px ${color}1f inset`,
      }}
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">{kind}</p>
      <p className="font-display text-3xl sm:text-4xl tracking-tight" style={{ color }}>
        {positive ? (kind.includes("Budget") ? "FEASIBLE" : "VALIDATED") : kind.includes("Budget") ? "INFEASIBLE" : "INVALIDATED"}
      </p>
      <p className="font-mono text-sm text-white/80 mt-3">{headline}</p>
      <p className="text-xs text-white/45 mt-2 leading-relaxed">{detail}</p>
    </div>
  );
}

/** Minted vs cost, one glance. */
function GapBar({ minted, cost }: { minted: number; cost: number }) {
  const max = Math.max(minted, cost, 1);
  return (
    <div className="space-y-3">
      {[
        { label: "Quirqs minted (V·B)", v: minted, color: LIME },
        { label: "All-in cost", v: cost, color: "#ffffff55" },
      ].map((r) => (
        <div key={r.label}>
          <div className="flex justify-between text-[11px] font-mono text-white/50 mb-1">
            <span>{r.label}</span>
            <span className="text-white/80">{usd(r.v)}</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(1.5, (r.v / max) * 100)}%`, background: r.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** 52 weeks of commits: the cadence of real work in this repo. */
function ActivityChart({ weeks }: { weeks: number[] }) {
  const W = 560;
  const H = 120;
  const max = Math.max(...weeks, 1);
  const bw = W / Math.max(weeks.length, 1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Weekly commits, last 52 weeks">
      {weeks.map((v, i) => {
        const h = Math.max(1, (v / max) * (H - 14));
        return (
          <rect
            key={i}
            x={i * bw + 1}
            y={H - h}
            width={Math.max(1, bw - 2)}
            height={h}
            rx={1.5}
            fill={LIME}
            opacity={0.25 + 0.75 * (v / max)}
          />
        );
      })}
    </svg>
  );
}

/* ── the lab ──────────────────────────────────────────────────── */

export function ValidationLab() {
  const [repoInput, setRepoInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RepoData | null>(null);
  const [p, setP] = useState<Params>(DEFAULTS);
  const set = (k: keyof Params) => (v: number) => setP((prev) => ({ ...prev, [k]: v }));

  async function analyze(e?: React.FormEvent) {
    e?.preventDefault();
    if (!repoInput.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/validate?repo=${encodeURIComponent(repoInput)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setData(json);
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const r = useMemo(() => (data ? simulate(data, p) : null), [data, p]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
      {/* Input */}
      <form onSubmit={analyze} className="max-w-2xl">
        <label className="font-mono text-[10px] uppercase tracking-widest text-white/35 block mb-3">
          Repository under test
        </label>
        <div className="flex gap-3">
          <input
            value={repoInput}
            onChange={(e) => setRepoInput(e.target.value)}
            placeholder="github.com/owner/repo — or just owner/repo"
            className="flex-1 h-12 rounded-full bg-white/[0.04] border border-white/15 px-5 text-sm text-white placeholder:text-white/25 font-mono focus:outline-none focus:border-[#83d63a]/60 focus:shadow-[0_0_20px_rgba(131,214,58,0.15)] transition-all"
            spellCheck={false}
          />
          <button
            type="submit"
            disabled={loading || !repoInput.trim()}
            className="h-12 px-6 rounded-full bg-[#83d63a] text-black text-sm font-medium hover:bg-[#93e64a] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Analyzing…" : "Run the numbers"}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-sm font-mono" style={{ color: RED }}>
            {error}
          </p>
        )}
        <p className="mt-3 text-xs text-white/35 leading-relaxed">
          Every merged PR and closed issue is treated as a settled unit of work; every open issue
          as unsettled backlog. Your assumptions below set B, V, and the cost model — the ledger
          and both verdicts recompute live.
        </p>
        {!data && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 mr-1">
              try
            </span>
            {["vercel/next.js", "facebook/react", "anthropics/claude-code"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRepoInput(s)}
                className="font-mono text-[11px] text-white/50 hover:text-[#83d63a] border border-white/10 hover:border-[#83d63a]/50 rounded-full px-3.5 py-1.5 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </form>

      {data && r && (
        <>
          {/* Repo header */}
          <div className="mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <a
              href={data.repo.url}
              target="_blank"
              rel="noreferrer"
              className="font-display text-2xl tracking-tight text-white hover:text-[#83d63a] transition-colors"
            >
              {data.repo.fullName}
            </a>
            <span className="font-mono text-xs text-white/40">
              {data.repo.language ?? "—"} · ★ {num(data.repo.stars)} · median cycle{" "}
              {fmt(data.sample.medianCycleHours)}h
            </span>
          </div>
          {data.repo.description && (
            <p className="mt-1 text-sm text-white/45 max-w-[70ch]">{data.repo.description}</p>
          )}

          {/* The raw units */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat label="Merged PRs" value={num(data.units.mergedPRs)} sub="settled units" />
            <Stat label="Closed issues" value={num(data.units.closedIssues)} sub="settled units" />
            <Stat label="Settled total" value={num(r.settled)} sub="the historical program" />
            <Stat label="Open backlog" value={num(r.backlog)} sub="unsettled units" />
          </div>

          {/* Assumptions + ledger */}
          <div className="mt-10 grid lg:grid-cols-[380px_1fr] gap-8">
            {/* Controls */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-7 h-fit">
              <fieldset className="space-y-4">
                <legend className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-3">
                  The mint — Q = V·B
                </legend>
                <Slider label="Budget B per unit" value={p.budget} onChange={set("budget")} min={1} max={500} step={1} format={(v) => usd(v)} />
                <Slider label="Avg completion score V" value={p.score} onChange={set("score")} min={0.3} max={1} step={0.01} format={(v) => v.toFixed(2)} />
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-3">
                  All-in cost per unit
                </legend>
                <Slider label="Tokens per unit (thousands)" value={p.ktokens} onChange={set("ktokens")} min={10} max={2000} step={10} format={(v) => `${num(v)}k`} />
                <Slider label="Token price ($/M)" value={p.tokenPrice} onChange={set("tokenPrice")} min={0.25} max={20} step={0.25} format={(v) => usd(v, 2)} />
                <Slider label="Compute + API + storage" value={p.computePerUnit} onChange={set("computePerUnit")} min={0} max={5} step={0.05} format={(v) => usd(v, 2)} />
                <Slider label="Intervention rate (IR)" value={p.ir} onChange={set("ir")} min={0} max={0.6} step={0.005} format={(v) => `${(v * 100).toFixed(1)}%`} />
                <Slider label="Minutes per rescue" value={p.rescueMinutes} onChange={set("rescueMinutes")} min={5} max={180} step={5} format={(v) => `${v}m`} />
                <Slider label="Rescuer rate ($/hr)" value={p.rescueRate} onChange={set("rescueRate")} min={10} max={300} step={5} format={(v) => usd(v)} />
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-3">
                  Backlog commitment
                </legend>
                <Slider label="Total budget for the open backlog" value={p.totalBudget} onChange={set("totalBudget")} min={100} max={100000} step={100} format={(v) => usd(v)} />
              </fieldset>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* The two verdicts, side by side */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Verdict
                  kind="Paper economics · settled history"
                  positive={r.validated}
                  headline={`QER ${fmt(r.qer)}× — ${usd(r.minted)} minted on ${usd(r.costTotal)} all-in`}
                  detail={
                    r.validated
                      ? `Every all-in dollar returned ${fmt(r.qer)} quirq-dollars of verified work across ${num(r.settled)} settled units. The paper's claim holds on this repo under these assumptions.`
                      : `Cost exceeded minted value (cost per quirq ${fmt(r.costPerQuirq)}). Under these assumptions the economics do not hold — raise B, raise V, or cut the cost side.`
                  }
                />
                <Verdict
                  kind="Budget feasibility · open backlog"
                  positive={r.feasible}
                  headline={`${usd(p.totalBudget)} vs ${usd(r.backlogCost)} projected cost for ${num(r.backlog)} open units`}
                  detail={
                    r.backlog === 0
                      ? "No open issues — nothing to clear. Any budget is feasible."
                      : r.feasible
                        ? `Coverage ${fmt(r.coverage)}×. Spread as value, that is ${usd(r.impliedB, 2)} per unit (B), minting ~${usd(r.backlogMint)} at V = ${p.score.toFixed(2)} — above its own cost.`
                        : `The budget covers ~${num(Math.floor(r.unitsAffordable))} of ${num(r.backlog)} units at ${usd(r.costPerUnit, 2)} all-in each. Commit more, or shrink the definition of done.`
                  }
                />
              </div>

              {/* Headline metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Stat label="Cost per quirq" value={fmt(r.costPerQuirq)} sub="$ per quirq-dollar" />
                <Stat label="Quirq margin" value={usd(r.margin)} sub="minted − cost" />
                <Stat label="All-in / unit" value={usd(r.costPerUnit, 2)} sub={`${usd(r.inference, 2)} inference + ${usd(r.rescue, 2)} rescue`} />
                <Stat label="Potential quirqs" value={usd(r.potential)} sub="Σ budgets B" />
              </div>

              {/* Minted vs cost */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-4">
                  The gap is the efficiency
                </p>
                <GapBar minted={r.minted} cost={r.costTotal} />
              </div>

              {/* Activity */}
              {data.activity.weeklyCommits.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-1">
                    Work cadence — commits, last 52 weeks
                  </p>
                  <p className="font-mono text-[11px] text-white/40 mb-4">
                    {num(data.activity.totalYear)} commits in the last year
                  </p>
                  <ActivityChart weeks={data.activity.weeklyCommits} />
                </div>
              )}

              {/* Sample units */}
              {data.sample.recent.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-4">
                    Recent settled units (merged PRs)
                  </p>
                  <ul className="space-y-2">
                    {data.sample.recent.map((pr) => (
                      <li key={pr.number} className="flex items-baseline gap-3 text-sm">
                        <span className="font-mono text-[11px] text-[#83d63a]/70 shrink-0">
                          #{pr.number}
                        </span>
                        <span className="text-white/60 truncate">{pr.title}</span>
                        <span className="ml-auto font-mono text-[10px] text-white/30 shrink-0">
                          Q = {p.score.toFixed(2)} × {usd(p.budget)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs text-white/35 leading-relaxed max-w-[75ch]">
                Method: settled units = merged PRs + closed issues; backlog = open issues. B, V,
                and the cost model are your assumptions — the repo supplies the unit counts and
                cadence, the paper supplies the calculus (Q = V·B; all-in cost per eq. 3; QER =
                Σ Q / Σ C). A verdict is a property of the assumptions as much as the repo:
                that is the point. Move the sliders until it flips, and you have found the
                break-even contract.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
