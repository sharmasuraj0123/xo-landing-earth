import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { NewPostForm } from "@/components/blog/new-post-form";

export const metadata: Metadata = { title: "Write a post | XO Blog" };

export default async function NewPostPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/blog/new");

  const user = await currentUser();
  const authorName =
    user?.fullName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    "XO builder";

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      <header className="relative pt-28 lg:pt-36 pb-10">
        <div className="max-w-[760px] mx-auto px-6">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white transition-colors mb-6"
          >
            <span aria-hidden="true">&larr;</span> Back to the blog
          </a>
          <p className="font-mono text-xs text-[#83d63a] mb-4">New post</p>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight">
            Write a post
          </h1>
          <p className="mt-4 text-white/60 leading-relaxed">
            Publish as yourself or on behalf of your company. Posts go live on
            the XO blog immediately.
          </p>
        </div>
      </header>

      <section className="max-w-[760px] mx-auto px-6 pb-24">
        <NewPostForm authorName={authorName} />
      </section>

      <FooterSection />
    </main>
  );
}
