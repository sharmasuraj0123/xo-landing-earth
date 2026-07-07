/* ────────────────────────────────────────────────────────────────
   The Quirq whitepaper, as data.

   Every number here is lifted from "The Quirq" (Draft v3, July
   2026). The quarterly ledger is the paper's Table 1: illustrative
   arithmetic exhibiting the full calculation chain, not measured
   production data. Keep that caveat wherever these render.
──────────────────────────────────────────────────────────────── */

/** One priced, verified unit of work: the paper's worked example. */
export const workedUnit = {
  name: "The support ticket",
  /** Budget B: what the owner would pay for the outcome to exist. */
  budget: 4.0,
  /** Completion score V in [0,1], scored against the definition of done. */
  score: 1.0,
  /** Minted quirqs Q = V * B. */
  minted: 4.0,
  costs: [
    { key: "inference", label: "Inference tokens", amount: 0.077 },
    { key: "sandbox", label: "Sandbox time (90 CPU-s)", amount: 0.001 },
    { key: "api", label: "CRM API calls (2)", amount: 0.02 },
    { key: "amortization", label: "Environment amortization", amount: 0.03 },
    { key: "intervention", label: "Human intervention", amount: 0 },
  ],
  costTotal: 0.128,
  costPerQuirq: 0.032,
  margin: 3.87,
  multiple: 31,
  /** The paper's counterfactual: settle divisibly at V = 0.8. */
  atPartialScore: { score: 0.8, minted: 3.2, costPerQuirq: 0.04 },
};

export type LedgerMonth = {
  month: string;
  /** Units of work run. */
  units: number;
  /** Potential quirqs: sum of budgets B. */
  potential: number;
  /** Minted quirqs: sum of V * B. */
  minted: number;
  /** All-in cost components, USD. */
  inference: number;
  computeApi: number;
  intervention: number;
  costTotal: number;
  /** Quirq Efficiency Ratio: minted / costTotal. */
  qer: number;
  /** Intervention rate, where the paper states it. */
  ir?: number;
  /** Human hours spent rescuing failed checks. */
  interventionHours?: number;
};

/** Table 1: the worked quarterly quirq ledger (illustrative). */
export const ledger: LedgerMonth[] = [
  {
    month: "April",
    units: 2100,
    potential: 18400,
    minted: 15770,
    inference: 1490,
    computeApi: 410,
    intervention: 3120,
    interventionHours: 312,
    costTotal: 5020,
    qer: 3.1,
    ir: 0.181,
  },
  {
    month: "May",
    units: 3400,
    potential: 29900,
    minted: 26310,
    inference: 2210,
    computeApi: 630,
    intervention: 3640,
    costTotal: 6480,
    qer: 4.1,
  },
  {
    month: "June",
    units: 4800,
    potential: 41300,
    minted: 38000,
    inference: 2730,
    computeApi: 820,
    intervention: 3280,
    costTotal: 6830,
    qer: 5.6,
    ir: 0.114,
  },
];

/** The trend the paper reads off Table 1. */
export const trend = {
  qer: { from: 3.1, to: 5.6, deltaPct: 81 },
  interventionRate: { from: 0.181, to: 0.114 },
  costPerQuirq: { from: 0.32, to: 0.18 },
  velocityDeltaPct: 141,
  tokenSpendAlone: { from: 1490, to: 2730, deltaPct: 83 },
};

/** The two meters: the paper's framing of the token/quirq duality. */
export const duality = {
  token: {
    name: "Token",
    role: "the input meter",
    meters: ["compute consumed", "energy and carbon", "inference cost"],
    reading: "what the machine drew",
  },
  quirq: {
    name: "quirq",
    role: "the output meter",
    meters: ["outcomes verified", "budget-denominated value", "minted, never self-reported"],
    reading: "what the machine delivered",
  },
  bridges: ["cost per quirq", "quirqs per kWh", "quirqs per tonne CO2"],
};

/** Lifecycle stages that mint a quirq. */
export const lifecycle = [
  { key: "budget", label: "Budget", detail: "An owner prices the outcome at B" },
  { key: "before", label: "Snapshot", detail: "The environment captures state before" },
  { key: "execute", label: "Execute", detail: "The agent works; every cost is metered" },
  { key: "after", label: "Snapshot", detail: "The environment captures state after" },
  { key: "score", label: "Score", detail: "Completion V in [0,1] against the definition of done" },
  { key: "mint", label: "Mint", detail: "V x B quirqs recorded in a tamper-evident ledger" },
] as const;

export const caveat =
  "Illustrative arithmetic from the paper's Table 1: it exhibits the full calculation chain, not measured production data. Every claim in the paper is tiered (sourced, derived, measured, open).";
