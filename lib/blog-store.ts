/* ────────────────────────────────────────────────────────────────
   Community blog posts.

   Community posts written by users or companies.
   Stored as JSON on disk under data/, the single integration point
   to swap for a hosted database (Neon, Turso) when deploying.
──────────────────────────────────────────────────────────────── */

import { promises as fs } from "node:fs";
import path from "node:path";

export type PostAuthorType = "user" | "company";

export type CommunityPost = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  /** Paragraphs, split from the submitted body on blank lines. */
  body: string[];
  authorType: PostAuthorType;
  /** Display name of the signed-in user who wrote the post. */
  authorName: string;
  /** Set when the post is published on behalf of a company. */
  companyName?: string;
  /** Id of the authoring user. */
  userId: string;
  /** ISO timestamp. */
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "community-posts.json");

async function readAll(): Promise<CommunityPost[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(posts: CommunityPost[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DATA_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(posts, null, 2), "utf8");
  await fs.rename(tmp, DATA_FILE);
}

/** Newest first. */
export async function listCommunityPosts(): Promise<CommunityPost[]> {
  const posts = await readAll();
  return posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getCommunityPost(
  slug: string,
): Promise<CommunityPost | null> {
  const posts = await readAll();
  return posts.find((p) => p.slug === slug) ?? null;
}

function slugify(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
  return slug || "post";
}

export async function createCommunityPost(
  input: Omit<CommunityPost, "slug" | "createdAt">,
): Promise<CommunityPost> {
  const posts = await readAll();
  let slug = slugify(input.title);
  if (posts.some((p) => p.slug === slug)) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }
  const post: CommunityPost = {
    ...input,
    slug,
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  await writeAll(posts);
  return post;
}
