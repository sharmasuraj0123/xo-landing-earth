"use client";

import { useActionState, useState } from "react";
import { submitPost, type NewPostState } from "@/app/blog/actions";
import type { PostAuthorType } from "@/lib/blog-store";

const inputClass =
  "w-full rounded-lg bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#83d63a]/60 focus:ring-1 focus:ring-[#83d63a]/30 focus:outline-none transition-colors";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-[#ff7a7a]">{message}</p>;
}

export function NewPostForm({ authorName }: { authorName: string }) {
  const [state, formAction, isPending] = useActionState<NewPostState, FormData>(
    submitPost,
    {},
  );
  const [authorType, setAuthorType] = useState<PostAuthorType>("user");
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-8">
      {/* ── Who is publishing ─────────────────────────────────── */}
      <fieldset>
        <legend className="font-mono text-xs text-white/40 mb-3">
          Publish as
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { value: "user", label: "Myself", hint: authorName },
              { value: "company", label: "A company", hint: "Post on behalf of your team" },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer rounded-lg border px-4 py-3 transition-colors ${
                authorType === option.value
                  ? "border-[#83d63a]/60 bg-[#83d63a]/[0.06]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25"
              }`}
            >
              <input
                type="radio"
                name="authorType"
                value={option.value}
                checked={authorType === option.value}
                onChange={() => setAuthorType(option.value)}
                className="sr-only"
              />
              <span className="block text-sm text-white">{option.label}</span>
              <span className="block text-xs text-white/40 truncate">
                {option.hint}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {authorType === "company" && (
        <div>
          <label
            htmlFor="companyName"
            className="block font-mono text-xs text-white/40 mb-2"
          >
            Company name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            placeholder="Acme Robotics"
            className={inputClass}
          />
          <FieldError message={errors.companyName} />
        </div>
      )}

      {/* ── The post ──────────────────────────────────────────── */}
      <div>
        <label htmlFor="title" className="block font-mono text-xs text-white/40 mb-2">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="What we shipped with agent workspaces"
          className={inputClass}
        />
        <FieldError message={errors.title} />
      </div>

      <div>
        <label htmlFor="tag" className="block font-mono text-xs text-white/40 mb-2">
          Tag <span className="text-white/25">(optional)</span>
        </label>
        <input
          id="tag"
          name="tag"
          type="text"
          placeholder="Guide, Launch, Deep dive..."
          className={inputClass}
        />
        <FieldError message={errors.tag} />
      </div>

      <div>
        <label
          htmlFor="summary"
          className="block font-mono text-xs text-white/40 mb-2"
        >
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={3}
          placeholder="One or two sentences shown on the blog index."
          className={inputClass}
        />
        <FieldError message={errors.summary} />
      </div>

      <div>
        <label htmlFor="body" className="block font-mono text-xs text-white/40 mb-2">
          Post
        </label>
        <textarea
          id="body"
          name="body"
          rows={12}
          placeholder="Write the post here. Separate paragraphs with a blank line."
          className={inputClass}
        />
        <FieldError message={errors.body} />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-[#83d63a] text-black font-medium text-sm px-8 py-3 hover:bg-[#93e64a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Publishing..." : "Publish post"}
        </button>
        <a
          href="/blog"
          className="font-mono text-xs text-white/40 hover:text-white transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
