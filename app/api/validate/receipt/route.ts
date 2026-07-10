import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  insertDiscussionEntry,
  listDiscussionEntries,
  receiptSchema,
} from "@/db";

/* ────────────────────────────────────────────────────────────────
   The public discussion on quirq — DB-backed.

   GET  /api/validate/receipt        → list discussion entries
   POST /api/validate/receipt        → file a new entry
──────────────────────────────────────────────────────────────── */

export const runtime = "nodejs";

// GET must be dynamic — it returns live data from the database.
export const dynamic = "force-dynamic";

// Body schema: name & comment are optional (client may omit them);
// the receipt shape is the canonical one from db/schema.ts.
const bodySchema = z.object({
  name: z.string().trim().max(60).optional(),
  comment: z.string().trim().max(20000).optional(),
  receipt: receiptSchema,
});

/* ── GET /api/validate/receipt ────────────────────────────────── */

export async function GET() {
  try {
    const entries = await listDiscussionEntries(200);
    // receipt is typed as Receipt via Drizzle's jsonb().$type<>() —
    // no unsafe casts needed.
    const rows = entries.map((e) => ({
      id: e.id,
      name: e.name,
      comment: e.comment,
      receivedAt: e.createdAt.toISOString(),
      model: e.receipt.model,
      verdict: e.receipt.verdict,
      one_line: e.receipt.one_line,
      date: e.receipt.date,
      scores: e.receipt.scores,
    }));

    return NextResponse.json({ count: rows.length, entries: rows });
  } catch (err) {
    console.error("[receipt] GET failed:", err);
    return NextResponse.json(
      { error: "Database unavailable.", detail: String(err) },
      { status: 500 },
    );
  }
}

/* ── POST /api/validate/receipt ───────────────────────────────── */

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body must be JSON." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "That does not match the discussion-entry schema.",
        issues: parsed.error.issues.slice(0, 5),
      },
      { status: 422 },
    );
  }

  try {
    const row = await insertDiscussionEntry({
      // Convert optional → nullable for the DB layer (JSON omits undefined keys).
      name: parsed.data.name ?? null,
      comment: parsed.data.comment ?? null,
      receipt: parsed.data.receipt,
    });

    // Refresh any cached renders of the validate page so the discussion
    // list picks up the new entry immediately.
    revalidatePath("/whitepaper/validate");

    return NextResponse.json({ ok: true, id: row.id }, { status: 201 });
  } catch (err) {
    console.error("[receipt] POST failed:", err);
    return NextResponse.json(
      { error: "Database write failed.", detail: String(err) },
      { status: 500 },
    );
  }
}
