"use client";

/* The environment loop, drawn to match the site's visual language:
   hairline strokes, one lime accent, mono microcopy, square corners.
   The agent acts inside the environment; the environment captures the
   state before and after, and meters every action in between. */

const LIME = "#83d63a";
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
  const d = [
    `M ${x} ${y + L} L ${x} ${y} L ${x + L} ${y}`,
    `M ${x + w - L} ${y} L ${x + w} ${y} L ${x + w} ${y + L}`,
    `M ${x + w} ${y + h - L} L ${x + w} ${y + h} L ${x + w - L} ${y + h}`,
    `M ${x + L} ${y + h} L ${x} ${y + h} L ${x} ${y + h - L}`,
  ].join(" ");
  return <path d={d} fill="none" stroke={LIME} strokeWidth="1.4" opacity="0.9" />;
}

export function EnvironmentDiagram() {
  const chips = ["runtime", "memory", "tools", "record"];
  const chipW = 93;
  const chipGap = 10;
  const chipsStart = 480 - (chips.length * chipW + (chips.length - 1) * chipGap) / 2;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 960 280"
        className="w-full h-auto min-w-[600px] block"
        role="img"
        aria-label="The agent works inside the environment. The environment captures state before and after, and meters every action as it happens."
      >
        <defs>
          <style>{`
            @keyframes envFlow { to { stroke-dashoffset: -20; } }
            .env-flow { stroke-dasharray: 1 9; stroke-linecap: round; animation: envFlow 2.4s linear infinite; }
            @keyframes envBreathe { 0%, 100% { opacity: .25; } 50% { opacity: .6; } }
            .env-glow { animation: envBreathe 3.6s ease-in-out infinite; }
          `}</style>
        </defs>

        {/* ── state before ── */}
        <rect x="24" y="102" width="168" height="78" fill="none" stroke="rgba(255,255,255,0.22)" strokeDasharray="4 5" />
        <text x="108" y="136" textAnchor="middle" fontFamily={SANS} fontSize="14" fill="rgba(255,255,255,0.85)">
          State before
        </text>
        <text x="108" y="158" textAnchor="middle" fontFamily={MONO} fontSize="9.5" letterSpacing="1.5" fill="rgba(255,255,255,0.35)">
          SNAPSHOT
        </text>

        {/* flow in */}
        <line x1="200" y1="141" x2="246" y2="141" stroke={LIME} strokeWidth="1.2" opacity="0.7" className="env-flow" />
        <Chevron x={252} y={141} />

        {/* ── the environment ── */}
        <rect x="262" y="34" width="436" height="214" fill="rgba(131,214,58,0.025)" stroke="rgba(255,255,255,0.12)" />
        <CornerTicks x={262} y={34} w={436} h={214} />
        <text x="284" y="62" fontFamily={MONO} fontSize="10" letterSpacing="3" fill={LIME}>
          THE ENVIRONMENT
        </text>

        {/* agent */}
        <circle cx="480" cy="112" r="13" fill={LIME} opacity="0.25" className="env-glow" />
        <circle cx="480" cy="112" r="7.5" fill="none" stroke={LIME} strokeWidth="1" opacity="0.5" />
        <circle cx="480" cy="112" r="3.5" fill={LIME} />
        <text x="480" y="144" textAnchor="middle" fontFamily={SANS} fontSize="13" fill="rgba(255,255,255,0.7)">
          Your agent works here
        </text>

        {/* component chips */}
        {chips.map((label, i) => {
          const x = chipsStart + i * (chipW + chipGap);
          return (
            <g key={label}>
              <rect x={x} y="170" width={chipW} height="28" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" />
              <text
                x={x + chipW / 2}
                y="188.5"
                textAnchor="middle"
                fontFamily={MONO}
                fontSize="10.5"
                letterSpacing="1"
                fill="rgba(255,255,255,0.6)"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* meter baseline */}
        <line x1={chipsStart} y1="220" x2={chipsStart + chips.length * chipW + (chips.length - 1) * chipGap} y2="220" stroke={LIME} strokeWidth="1" opacity="0.55" className="env-flow" />
        <text x="480" y="238" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="1.5" fill="rgba(255,255,255,0.32)">
          EVERY ACTION AND TOKEN METERED AS IT HAPPENS
        </text>

        {/* flow out */}
        <line x1="706" y1="141" x2="752" y2="141" stroke={LIME} strokeWidth="1.2" opacity="0.7" className="env-flow" />
        <Chevron x={758} y={141} />

        {/* ── state after ── */}
        <rect x="768" y="102" width="168" height="78" fill="rgba(131,214,58,0.04)" stroke="rgba(131,214,58,0.55)" />
        <text x="852" y="136" textAnchor="middle" fontFamily={SANS} fontSize="14" fill="rgba(255,255,255,0.9)">
          State after
        </text>
        <text x="852" y="158" textAnchor="middle" fontFamily={MONO} fontSize="9.5" letterSpacing="1.5" fill={LIME}>
          CHECKED · PRICED
        </text>
      </svg>
    </div>
  );
}
