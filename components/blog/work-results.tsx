"use client";

import { useState } from "react";
import type { JourneyArticle } from "@/lib/journeys";

/* Search-results treatment for a partner journey: every piece of work
   rendered like a result, expanding inline to the full chapter. */

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

export function WorkResults({
  articles,
  slug,
  partner,
}: {
  articles: JourneyArticle[];
  slug: string;
  partner: string;
}) {
  const [openId, setOpenId] = useState<string | null>(articles[0]?.id ?? null);

  return (
    <div>
      {/* The "search" that found all this */}
      <div className="flex items-center gap-3 border border-white/15 rounded-full px-5 py-3 mb-3 bg-white/[0.03]">
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/40 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="font-mono text-sm text-white/70 truncate">
          xo &times; {partner.toLowerCase()}: everything we&apos;ve built together
        </span>
      </div>
      <p className="font-mono text-xs text-white/35 mb-6 pl-5">
        About {articles.length} {articles.length === 1 ? "chapter" : "chapters"}, newest first
      </p>

      {/* Results */}
      <ol className="space-y-2">
        {articles.map((a) => {
          const open = a.id === openId;
          return (
            <li
              key={a.id}
              className={`border rounded-lg overflow-hidden transition-colors duration-300 ${
                open ? "border-[#83d63a]/35 bg-[#83d63a]/[0.03]" : "border-white/10 hover:border-white/25"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenId(open ? null : a.id)}
                aria-expanded={open}
                className="w-full text-left px-5 lg:px-7 py-5"
              >
                <p className="font-mono text-xs text-[#83d63a]/80 truncate">
                  xo.builders &rsaquo; {slug} &rsaquo; {a.id}
                </p>
                <p className="mt-1.5 text-xl lg:text-2xl font-display tracking-tight text-white leading-snug">
                  <Highlighted title={a.title} highlight={a.highlight} />
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className={a.latest ? "text-[#83d63a]" : "text-white/40"}>
                    {a.latest && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#83d63a] animate-pulse mr-1.5 align-middle" />}
                    {a.tag}
                  </span>
                  <span className="text-white/35">{a.date}</span>
                  {a.draft && <span className="text-white/30">· coming soon</span>}
                </p>
                {!open && (
                  <p className="mt-2 text-sm text-white/50 leading-relaxed line-clamp-2">
                    {a.summary}
                  </p>
                )}
              </button>

              {/* Expanded chapter */}
              <div
                className="grid transition-all duration-300"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <article className="px-5 lg:px-7 pb-7">
                    <p className="text-base lg:text-lg text-white/60 leading-relaxed max-w-[62ch]">
                      {a.summary}
                    </p>

                    {a.stats && (
                      <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 border border-white/10 rounded-xl overflow-hidden divide-x divide-y sm:divide-y-0 divide-white/10">
                        {a.stats.map((s) => (
                          <div key={s.label} className="p-4">
                            <span className={`block text-xl lg:text-2xl font-display tracking-tight ${s.accent ? "text-[#83d63a]" : "text-white"}`}>
                              {s.value}
                            </span>
                            <span className="block mt-1 text-[11px] font-mono text-white/40">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {a.body?.map((para) => (
                      <p key={para.slice(0, 32)} className="mt-5 text-white/55 leading-relaxed max-w-[62ch]">
                        {para}
                      </p>
                    ))}

                    {a.points && (
                      <div className="mt-7 grid sm:grid-cols-3 gap-3">
                        {a.points.map((p) => (
                          <div key={p.title} className="border border-white/10 rounded-lg p-4">
                            <h3 className="text-sm font-medium mb-1.5 text-white">{p.title}</h3>
                            <p className="text-[13px] text-white/50 leading-relaxed">{p.body}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {a.quote && (
                      <blockquote className="mt-7 border-l-2 border-[#83d63a]/60 pl-5">
                        <p className="text-lg font-display tracking-tight text-white/75 leading-snug max-w-[48ch]">
                          {a.quote}
                        </p>
                      </blockquote>
                    )}

                    {a.draft && (
                      <div className="mt-7 border border-dashed border-white/15 rounded-lg p-5 max-w-[62ch]">
                        <p className="text-sm font-mono text-white/40">
                          Full article in progress. It will appear here, same place, same journey.
                        </p>
                      </div>
                    )}

                    {a.sourceUrl && (
                      <a
                        href={a.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-7 inline-flex items-center gap-2 text-sm font-mono text-white/40 hover:text-[#83d63a] transition-colors"
                      >
                        Read the full article
                        <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
                      </a>
                    )}
                  </article>
                </div>
              </div>
            </li>
          );
        })}

        {/* Future slot */}
        <li className="border border-dashed border-white/15 rounded-lg px-5 lg:px-7 py-5">
          <p className="font-mono text-xs text-white/30">xo.builders &rsaquo; {slug} &rsaquo; next</p>
          <p className="mt-1.5 text-sm font-mono text-white/35">The next chapter lands here.</p>
        </li>
      </ol>
    </div>
  );
}
