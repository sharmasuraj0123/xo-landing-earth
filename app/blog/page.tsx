import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { journeys } from "@/lib/journeys";
import { listCommunityPosts } from "@/lib/blog-store";

export const metadata: Metadata = {
  title: "Blog | XO",
  description:
    "Partner journeys, customer chapters, and posts from the builders and companies shipping on XO.",
};

/* Posts are runtime data; keep the page fresh. */
export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogIndex() {
  const posts = await listCommunityPosts();
  const partnerJourneys = Object.values(journeys);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* ── Header ────────────────────────────────────────────── */}
      <header className="relative pt-28 lg:pt-36 pb-14 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
          }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12">
          <p className="font-mono text-xs text-[#83d63a] mb-4">The XO blog</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight max-w-3xl text-balance">
            Stories from the people building with agents
          </h1>
          <p className="mt-5 text-white/60 max-w-2xl leading-relaxed">
            Partner journeys, customer chapters, and posts from the builders and
            companies shipping on XO.
          </p>
        </div>
      </header>

      {/* ── Community posts ───────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="relative max-w-[1200px] mx-auto px-6 lg:px-12 pb-20">
          <h2 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6">
            From the community
          </h2>
          <div className="rounded-xl overflow-hidden border border-white/10 divide-y divide-white/10">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/post/${post.slug}`}
                className="block p-6 hover:bg-white/[0.03] transition-colors group"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <span className="font-mono text-xs text-[#83d63a]">{post.tag}</span>
                  <span className="font-mono text-xs text-white/40">
                    {formatDate(post.createdAt)}
                  </span>
                  <span className="font-mono text-xs text-white/40">
                    by{" "}
                    {post.authorType === "company" && post.companyName
                      ? post.companyName
                      : post.authorName}
                  </span>
                </div>
                <h3 className="font-display text-2xl tracking-tight group-hover:text-[#83d63a] transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-3xl">
                  {post.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Partner journeys ──────────────────────────────────── */}
      <section className="relative max-w-[1200px] mx-auto px-6 lg:px-12 pb-24">
        <h2 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6">
          Partner journeys
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partnerJourneys.map((journey) => (
            <Link
              key={journey.slug}
              href={`/blog/${journey.slug}`}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#83d63a]/40 transition-colors group"
            >
              <p className="font-display text-xl tracking-tight mb-2">
                XO <span className="text-[#83d63a]">&times;</span> {journey.partner}
              </p>
              <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
                {journey.intro}
              </p>
              <p className="mt-4 font-mono text-xs text-white/40 group-hover:text-white/70 transition-colors">
                {journey.articles.length}{" "}
                {journey.articles.length === 1 ? "chapter" : "chapters"} &rarr;
              </p>
            </Link>
          ))}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
