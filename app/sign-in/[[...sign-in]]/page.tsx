import { SignIn } from "@clerk/nextjs";

export const metadata = { title: "Sign in | XO" };

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8 px-6 py-24">
      <a
        href="/blog"
        className="font-mono text-xs text-white/40 hover:text-white transition-colors"
      >
        &larr; Back to the blog
      </a>
      <SignIn />
    </main>
  );
}
