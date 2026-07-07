import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { getCommunityPost } from "@/lib/blog-store";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCommunityPost(slug);
  if (!post) return { title: "XO Blog" };
  return { title: `${post.title} | XO Blog`, description: post.summary };
}

export default async function CommunityPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getCommunityPost(slug);
  if (!post) notFound();

  const byline =
    post.authorType === "company" && post.companyName
      ? post.companyName
      : post.authorName;

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      <article className="relative pt-28 lg:pt-36 pb-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
            maskImage: "radial-gradient(ellipse 80% 40% at 50% 0%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 40% at 50% 0%, black, transparent)",
          }}
        />

        <div className="relative z-10 max-w-[760px] mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white transition-colors mb-8"
          >
            <span aria-hidden="true">&larr;</span> Back to the blog
          </Link>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
            <span className="font-mono text-xs text-[#83d63a]">{post.tag}</span>
            <span className="font-mono text-xs text-white/40">
              {formatDate(post.createdAt)}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl tracking-tight text-balance">
            {post.title}
          </h1>

          <div className="mt-6 pb-8 border-b border-white/10">
            <p className="text-sm text-white/60">
              By <span className="text-white">{byline}</span>
              {post.authorType === "company" && (
                <span className="ml-2 font-mono text-xs text-white/40 border border-white/15 rounded-full px-2 py-0.5">
                  Company
                </span>
              )}
            </p>
          </div>

          <p className="mt-8 text-lg text-white/80 leading-relaxed">
            {post.summary}
          </p>

          <div className="mt-8 space-y-6">
            {post.body.map((paragraph, i) => (
              <p key={i} className="text-white/60 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      <FooterSection />
    </main>
  );
}
