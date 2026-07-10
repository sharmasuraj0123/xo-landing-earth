/* ────────────────────────────────────────────────────────────────
   Validation receipts.

   When a reader asks their own AI to referee the whitepaper, the
   chat ends with a small structured receipt. Pasted back here, it
   lands in this store: a PUBLIC json file served at
   /whitepaper/receipts.json, next to llm.txt and vectors.json,
   so the record of verdicts is itself an open artifact.
──────────────────────────────────────────────────────────────── */

import { promises as fs } from "node:fs";
import path from "node:path";

export type ValidationReceipt = {
  kind: "validation-receipt";
  paper: string;
  model: string;
  date: string;
  verdict: "holds" | "holds-with-caveats" | "disputed";
  scores: {
    arithmetic: number;
    sources: number;
    logic: number;
    gaming_resistance: number;
  };
  confirmed: string[];
  issues: string[];
  one_line: string;
};

/** One voice in the public discussion: a person (named or
    anonymous), their own typed thoughts, and their AI's receipt. */
export type DiscussionEntry = {
  id: string;
  receivedAt: string;
  name: string | null;
  comment: string | null;
  receipt: ValidationReceipt;
};

const DATA_DIR = path.join(process.cwd(), "public", "whitepaper");
const DATA_FILE = path.join(DATA_DIR, "receipts.json");

async function readAll(): Promise<DiscussionEntry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(entries: DiscussionEntry[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DATA_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(entries, null, 2), "utf8");
  await fs.rename(tmp, DATA_FILE);
}

export async function listEntries(): Promise<DiscussionEntry[]> {
  const all = await readAll();
  return all.sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

export async function addEntry(input: {
  name: string | null;
  comment: string | null;
  receipt: ValidationReceipt;
}): Promise<DiscussionEntry> {
  const all = await readAll();
  const stored: DiscussionEntry = {
    ...input,
    id: Math.random().toString(36).slice(2, 10),
    receivedAt: new Date().toISOString(),
  };
  all.push(stored);
  await writeAll(all);
  return stored;
}
