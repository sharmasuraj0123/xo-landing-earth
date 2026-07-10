import { z } from "zod";
import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";

/* ────────────────────────────────────────────────────────────────
   Discussion entries — AI referee receipts.

   When someone hands the whitepaper to their own AI for review,
   the chat ends with a structured receipt. That receipt (plus
   the human's optional name and typed thoughts) lands here.

   Zod gates all writes; the receipt is stored as JSONB so you
   can query inside it (e.g. "find every 'disputed' verdict").
──────────────────────────────────────────────────────────────── */

/* ── Zod schemas ───────────────────────────────────────────────── */

export const receiptSchema = z.object({
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

export const discussionEntrySchema = z.object({
  name: z.string().trim().max(60).nullable(),
  comment: z.string().trim().max(20000).nullable(),
  receipt: receiptSchema,
});

export type DiscussionEntryInput = z.infer<typeof discussionEntrySchema>;
export type Receipt = z.infer<typeof receiptSchema>;

/* ── Drizzle table ─────────────────────────────────────────────── */

export const discussionEntries = pgTable("discussion_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  comment: text("comment"),
  receipt: jsonb("receipt").notNull().$type<Receipt>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
