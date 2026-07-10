import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  discussionEntries,
  discussionEntrySchema,
  type DiscussionEntryInput,
} from "./schema";

/* ────────────────────────────────────────────────────────────────
   Database connection + helpers.

   Connection is declared outside the handler function so it can be
   reused across warm invocations (Drizzle serverless best practice).
   postgres.js pools internally; `max: 1` is enough for serverless
   because each function invocation handles one request at a time.
   The connection is lazy — it only materializes on the first query,
   so `next build` doesn't crash when DATABASE_URL isn't set.
──────────────────────────────────────────────────────────────── */

let dbInstance: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (dbInstance) return dbInstance;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your .env.local file and restart.",
    );
  }

  const client = postgres(url, { max: 1 });
  dbInstance = drizzle({ client });
  return dbInstance;
}

// Re-export types and schemas for consumers (API routes, server actions).
export { type DiscussionEntryInput, receiptSchema } from "./schema";

/* ── discussion entries ────────────────────────────────────────── */

/** Insert a discussion entry (AI referee receipt).  Runs the Zod
    schema first — throws if the data doesn't match. */
export async function insertDiscussionEntry(input: DiscussionEntryInput) {
  const parsed = discussionEntrySchema.parse(input);
  const db = getDb();

  const [row] = await db
    .insert(discussionEntries)
    .values({
      name: parsed.name,
      comment: parsed.comment,
      receipt: parsed.receipt,
    })
    .returning({ id: discussionEntries.id });

  return row;
}

/** List recent discussion entries, newest first. */
export async function listDiscussionEntries(limit = 200) {
  const db = getDb();
  return db
    .select()
    .from(discussionEntries)
    .orderBy(desc(discussionEntries.createdAt))
    .limit(limit);
}
