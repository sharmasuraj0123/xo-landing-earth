import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addEntry, listEntries } from "@/lib/receipt-store";

/* The public discussion on quirq: people (named or anonymous),
   their typed thoughts, and their AI referee's receipt. GET
   returns the discussion; POST files one entry. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const receiptSchema = z.object({
  kind: z.literal("validation-receipt"),
  paper: z.string().trim().min(1).max(80),
  model: z.string().trim().min(1).max(120),
  date: z.string().trim().max(40),
  verdict: z.enum(["holds", "holds-with-caveats", "disputed"]),
  scores: z.object({
    arithmetic: z.number().min(0).max(100),
    sources: z.number().min(0).max(100),
    logic: z.number().min(0).max(100),
    gaming_resistance: z.number().min(0).max(100),
  }),
  confirmed: z.array(z.string().max(400)).max(20),
  issues: z.array(z.string().max(400)).max(20),
  one_line: z.string().trim().min(1).max(400),
});

const entrySchema = z.object({
  name: z.string().trim().max(60).optional(),
  comment: z.string().trim().max(20000).optional(),
  receipt: receiptSchema,
});

export async function GET() {
  /* the file is public and hand-editable: skip anything malformed */
  const entries = (await listEntries()).filter(
    (e) => e && e.receipt && typeof e.receipt.verdict === "string",
  );
  return NextResponse.json({
    count: entries.length,
    entries: entries.slice(0, 200).map((e) => ({
      id: e.id,
      name: e.name,
      comment: e.comment,
      receivedAt: e.receivedAt,
      model: e.receipt.model,
      verdict: e.receipt.verdict,
      one_line: e.receipt.one_line,
      date: e.receipt.date,
      scores: e.receipt.scores,
    })),
  });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body must be JSON." }, { status: 400 });
  }
  const parsed = entrySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "That does not match the discussion-entry schema.", issues: parsed.error.issues.slice(0, 5) },
      { status: 422 },
    );
  }
  const stored = await addEntry({
    name: parsed.data.name || null,
    comment: parsed.data.comment || null,
    receipt: parsed.data.receipt,
  });
  const entries = await listEntries();
  return NextResponse.json({ ok: true, id: stored.id, count: entries.length });
}
