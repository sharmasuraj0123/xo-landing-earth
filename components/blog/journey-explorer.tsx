"use client";

import { useState } from "react";
import type { JourneyArticle } from "@/lib/journeys";

function Highlighted({ title, highlight }: { title: string; highlight?: string }) {
  if (!highlight || !title.includes(highlight)) return <>{title}</>;
  const [before, after] = title.split(highlight);
  return (
    <>
      {before}
      <span className="text-[#83d63a]">{highlight}</span>
      {after}
    </>
  );
}

export function JourneyExplorer({ articles }: { articles: JourneyArticle[] }) {
  const [selectedId, setSelectedId] = useState(articles[0]?.id);
  const selected = articles.find((a) => a.id === selectedId) ?? articles[0];

  if (!selected) return null;

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-start">
      {/* ── Article list (the timeline index) ── */}
      <ol className="relative lg:sticky lg:top-28">
        {/* spine */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-3 bottom-3 w-px"
          style={{
            background:
              "linear-gradient(to bottom, #83d63a 0%, rgba(131,214,58,0.3) 50%, rgba(255,255,255,0.1) 100%)",
          }}
        />
        {articles.map((a) => {
          const active = a.id === selected.id;
          return (
            <li key={a.id} className="relative">
              <button
                type="button"
                onClick={() => setSelectedId(a.id)}
                aria-current={active ? "true" : undefined}
                className={`group w-full text-left pl-9 pr-4 py-5 border transition-all duration-300 ${
                  active
                    ? "border-[#83d63a]/40 bg-[#83d63a]/[0.04]"
                    : "border-transparent hover:border-white/15 hover:bg-white/[0.02]"
                }`}
              >
                {/* node */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-[26px] w-[15px] h-[15px] rounded-full border-2 bg-black transition-colors duration-300 ${
                    active
                      ? "border-[#83d63a] shadow-[0_0_14px_rgba(131,214,58,0.55)]"
                      : "border-white/25 group-hover:border-white/50"
                  }`}
                >
                  {active && (
                    <span className="absolute inset-[2px] rounded-full bg-[#83d63a] animate-pulse" />
                  )}
                </span>

                <span className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest">
                  <span className={active ? "text-[#83d63a]" : "text-white/35"}>{a.tag}</span>
                  <span className="text-white/30 normal-case tracking-normal">{a.date}</span>
                  {a.draft && <span className="text-white/25">· soon</span>}
                </span>
                <span
                  className={`block mt-2 text-lg font-display tracking-tight leading-snug transition-colors ${
                    active ? "text-white" : "text-white/55 group-hover:text-white/85"
                  }`}
                >
                  {a.title}
                </span>
              </button>
            </li>
          );
        })}

        {/* open future slot */}
        <li className="relative pl-9 pr-4 py-5">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[26px] w-[15px] h-[15px] rounded-full border-2 border-dashed border-white/20 bg-black"
          />
          <span className="text-[11px] font-mono text-white/25 uppercase tracking-widest">Next</span>
          <span className="block mt-2 text-sm font-mono text-white/30">
            The next chapter lands here.
          </span>
        </li>
      </ol>

      {/* ── Selected article ── */}
      <article key={selected.id} className="min-w-0 animate-article-in">
        <p className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono uppercase tracking-widest border ${
              selected.latest
                ? "border-[#83d63a]/50 text-[#83d63a] bg-[#83d63a]/[0.06]"
                : "border-white/15 text-white/50"
            }`}
          >
            {selected.latest && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#83d63a] animate-pulse" />
            )}
            {selected.tag}
          </span>
          <span className="text-xs font-mono text-white/40">{selected.date}</span>
        </p>

        <h2 className="text-3xl lg:text-5xl font-display tracking-tight leading-[1.02]">
          <Highlighted title={selected.title} highlight={selected.highlight} />
        </h2>

        <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-[62ch]">
          {selected.summary}
        </p>

        {selected.stats && (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 border border-white/10 divide-x divide-y sm:divide-y-0 divide-white/10">
            {selected.stats.map((s) => (
              <div key={s.label} className="p-5">
                <span
                  className={`block text-2xl lg:text-3xl font-display tracking-tight ${
                    s.accent ? "text-[#83d63a]" : "text-white"
                  }`}
                >
                  {s.value}
                </span>
                <span className="block mt-1.5 text-[11px] font-mono text-white/40">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {selected.body?.map((para) => (
          <p key={para.slice(0, 32)} className="mt-6 text-white/55 leading-relaxed max-w-[62ch]">
            {para}
          </p>
        ))}

        {selected.points && (
          <div className="mt-10 grid sm:grid-cols-3 gap-3">
            {selected.points.map((p) => (
              <div
                key={p.title}
                className="group border border-white/10 p-5 transition-colors duration-300 hover:border-[#83d63a]/40 hover:bg-[#83d63a]/[0.03]"
              >
                <h3 className="text-sm font-medium mb-2 group-hover:text-[#83d63a] transition-colors">
                  {p.title}
                </h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        )}

        {selected.quote && (
          <blockquote className="mt-10 border-l-2 border-[#83d63a]/60 pl-6">
            <p className="text-xl font-display tracking-tight text-white/75 leading-snug max-w-[48ch]">
              {selected.quote}
            </p>
          </blockquote>
        )}

        {selected.draft && (
          <div className="mt-10 border border-dashed border-white/15 p-6 max-w-[62ch]">
            <p className="text-sm font-mono text-white/40">
              Full article in progress. It will appear here, same place, same journey.
            </p>
          </div>
        )}

        {selected.sourceUrl && (
          <a
            href={selected.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-mono text-white/40 hover:text-[#83d63a] transition-colors"
          >
            Read the full article
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
              &rarr;
            </span>
          </a>
        )}
      </article>

      <style jsx>{`
        @keyframes articleIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-article-in {
          animation: articleIn 0.35s ease-out;
        }
      `}</style>
    </div>
  );
}
