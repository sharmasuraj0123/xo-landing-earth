"use client";

/* The tenure curve, made computable: the same cost-per-run chart,
   dollar-scaled by two dials (AI spend, units of work) and
   scrubbable by pointer. Without an environment the cost per run
   stays flat; inside one it settles 42% lower by run 50. */

import { useMemo, useRef, useState } from "react";
import Link from "next/link";

const SAVE = 0.42;
const RUNS = 50;
const W = 560;
const H = 175;
const PAD = { l: 6, r: 92, t: 12, b: 10 };

const usd = (n: number) => `$${Math.round(n).toLocaleString()}`;

export function ImpactCalculator({ active }: { active: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [spend, setSpend] = useState(5000);
  const [units, setUnits] = useState(2000);
  const [run, setRun] = useState<number | null>(null);

  const perUnit = spend / units;
  const costAt = (r: number) => perUnit * (1 - SAVE + SAVE * Math.exp(-r / 9));
  const saved = spend * SAVE;

  const x = (r: number) => PAD.l + ((W - PAD.l - PAD.r) * r) / RUNS;
  const y = (c: number) => PAD.t + (H - PAD.t - PAD.b) * (1 - c / (perUnit * 1.12));

  const { curve, area } = useMemo(() => {
    const pts: string[] = [];
    for (let r = 0; r <= RUNS; r += 0.5) pts.push(`${x(r)},${y(costAt(r))}`);
    const curvePath = `M${pts.join(" L")}`;
    const areaPath = `M${x(0)},${y(perUnit)} L${x(RUNS)},${y(perUnit)} L${pts
      .slice()
      .reverse()
      .join(" L")} Z`;
    return { curve: curvePath, area: areaPath };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perUnit]);

  const scrub = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const fx = ((e.clientX - rect.left) / rect.width) * W;
    setRun(Math.max(0, Math.min(RUNS, Math.round(((fx - PAD.l) / (W - PAD.l - PAD.r)) * RUNS))));
  };
  const at = run ?? RUNS;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <span className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
          Cost per run, over time
        </span>
        <span className="text-sm font-mono text-[#83d63a] tabular-nums">
          {run === null
            ? `−${Math.round(SAVE * 100)}% by run ${RUNS}`
            : `run ${at} · $${costAt(at).toFixed(2)} vs $${perUnit.toFixed(2)}`}
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full cursor-crosshair select-none"
        onPointerMove={scrub}
        onPointerLeave={() => setRun(null)}
        role="img"
        aria-label={`Cost per run: flat at $${perUnit.toFixed(2)} without XO, settling at $${costAt(RUNS).toFixed(2)} with XO`}
      >
        <path d={area} fill="rgba(131,214,58,0.08)" className={active ? "opacity-100" : "opacity-0"} />
        <line
          x1={x(0)}
          y1={y(perUnit)}
          x2={x(RUNS)}
          y2={y(perUnit)}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.4"
          strokeDasharray="4 5"
        />
        <path d={curve} fill="none" stroke="#83d63a" strokeWidth="2" />
        {/* scrub marker */}
        <line
          x1={x(at)}
          y1={PAD.t}
          x2={x(at)}
          y2={H - PAD.b}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        <circle cx={x(at)} cy={y(costAt(at))} r="3.5" fill="#83d63a" />
        <circle cx={x(at)} cy={y(perUnit)} r="2.5" fill="rgba(255,255,255,0.45)" />
        {/* end labels, in dollars */}
        <text x={x(RUNS) + 8} y={y(perUnit) + 4} fontSize="11" fontFamily="var(--font-jetbrains), monospace" fill="rgba(255,255,255,0.5)">
          {`$${perUnit.toFixed(2)} without`}
        </text>
        <text x={x(RUNS) + 8} y={y(costAt(RUNS)) + 4} fontSize="11" fontFamily="var(--font-jetbrains), monospace" fill="#83d63a">
          {`$${costAt(RUNS).toFixed(2)} with XO`}
        </text>
      </svg>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <span className="font-display text-2xl tracking-tight text-[#83d63a]">
          keeps {usd(saved)} / month
        </span>
        <Link
          href="/whitepaper/visualize"
          className="font-mono text-xs text-[#83d63a] hover:text-foreground transition-colors"
        >
          validate with your own numbers <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-4">
        <label className="block">
          <span className="flex items-baseline justify-between mb-1.5 font-mono text-xs text-muted-foreground">
            <span>AI spend / mo</span>
            <span className="text-foreground tabular-nums">{usd(spend)}</span>
          </span>
          <input
            type="range"
            min={500}
            max={100000}
            step={500}
            value={spend}
            onChange={(e) => setSpend(Number(e.target.value))}
            className="w-full accent-[#83d63a]"
            aria-label="AI spend per month"
          />
        </label>
        <label className="block">
          <span className="flex items-baseline justify-between mb-1.5 font-mono text-xs text-muted-foreground">
            <span>units of work / mo</span>
            <span className="text-foreground tabular-nums">{units.toLocaleString()}</span>
          </span>
          <input
            type="range"
            min={100}
            max={20000}
            step={100}
            value={units}
            onChange={(e) => setUnits(Number(e.target.value))}
            className="w-full accent-[#83d63a]"
            aria-label="Units of work per month"
          />
        </label>
      </div>
    </div>
  );
}
