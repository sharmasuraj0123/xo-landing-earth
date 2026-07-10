"use client";

/* ────────────────────────────────────────────────────────────────
   The AI referee.

   The fastest way to validate the paper: hand it to an AI you
   already trust. One click opens ChatGPT (or Claude) with the
   paper and the referee instructions preloaded; the chat ends
   with a small structured receipt; one paste brings the verdict
   home, where it is parsed, rendered, and logged.
──────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { toast } from "sonner";
import {
  Check,
  ClipboardCopy,
  FileUp,
  Gavel,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";

const LLM_TXT_URL = "https://xo.builders/whitepaper/llm.txt";

const RECEIPT_SCHEMA = `{"kind":"validation-receipt","paper":"quirq-draft-v3","model":"<your model name>","date":"<today, YYYY-MM-DD>","verdict":"holds" | "holds-with-caveats" | "disputed","scores":{"arithmetic":0-100,"sources":0-100,"logic":0-100,"gaming_resistance":0-100},"confirmed":["<claims that held>"],"issues":["<problems found>"],"one_line":"<one sentence verdict>"}`;

const INSTRUCTIONS = `You are an independent, adversarial reviewer. Referee the whitepaper "quirq: A Unit of Work for Intelligence" (XO Labs, Draft v3).

Validate it properly:
1. Recompute the worked arithmetic: the $4 support-ticket example and Table 1's monthly ledger. Flag any number that does not reproduce.
2. Judge whether the major claims are honestly tiered as sourced, derived, measured, or open.
3. Stress-test the unit against gaming: Goodhart pressure, budget inflation, check farming.
4. Say plainly what holds, what is weak, and what is wrong. Do not be polite about it.

Then end your reply with exactly one fenced json code block matching this schema, so I can file it back at xo.builders/whitepaper/validate:
${RECEIPT_SCHEMA}`;

const CHAT_PROMPT = `${INSTRUCTIONS}

The paper is at ${LLM_TXT_URL} - fetch and read it first. If you cannot browse the web, say so and I will paste the paper instead.`;

const chatgptUrl = `https://chatgpt.com/?hints=search&q=${encodeURIComponent(CHAT_PROMPT)}`;
const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(CHAT_PROMPT)}`;
const perplexityUrl = `https://www.perplexity.ai/search?q=${encodeURIComponent(CHAT_PROMPT)}`;

/* Brand marks for the open-in actions, from simple-icons (CC0). */
function BrandIcon({ d, className }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const OPENAI_PATH =
  "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z";

const CLAUDE_PATH =
  "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";

const PERPLEXITY_PATH =
  "M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z";

const ACTION_BTN =
  "inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] h-9 px-3.5 text-[13px] font-medium text-white/75 hover:text-white hover:bg-white/[0.08] hover:border-white/30 transition-colors";

/* ── receipt parsing: accept a paste of anything ──────────────── */

type Receipt = {
  kind: "validation-receipt";
  paper: string;
  model: string;
  date: string;
  verdict: "holds" | "holds-with-caveats" | "disputed";
  scores: { arithmetic: number; sources: number; logic: number; gaming_resistance: number };
  confirmed: string[];
  issues: string[];
  one_line: string;
};

function normalize(candidate: unknown): Receipt | null {
  if (!candidate || typeof candidate !== "object") return null;
  const o = candidate as Record<string, unknown>;
  const verdict = String(o.verdict ?? "");
  if (!["holds", "holds-with-caveats", "disputed"].includes(verdict)) return null;
  const rawScores = (o.scores ?? {}) as Record<string, unknown>;
  const score = (k: string) => {
    const n = Number(rawScores[k]);
    return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0;
  };
  const list = (v: unknown) =>
    Array.isArray(v) ? v.slice(0, 20).map((x) => String(x).slice(0, 400)) : [];
  return {
    kind: "validation-receipt",
    paper: String(o.paper ?? "quirq-draft-v3").slice(0, 80),
    model: String(o.model ?? "unknown model").slice(0, 120),
    date: String(o.date ?? "").slice(0, 40),
    verdict: verdict as Receipt["verdict"],
    scores: {
      arithmetic: score("arithmetic"),
      sources: score("sources"),
      logic: score("logic"),
      gaming_resistance: score("gaming_resistance"),
    },
    confirmed: list(o.confirmed),
    issues: list(o.issues),
    one_line: String(o.one_line ?? "").slice(0, 400) || "No summary line provided.",
  };
}

/** Pulls the receipt out of raw JSON, a fenced block, or a whole chat export. */
function extractReceipt(text: string): Receipt | null {
  const tryParse = (s: string): Receipt | null => {
    try {
      return normalize(JSON.parse(s));
    } catch {
      return null;
    }
  };
  const direct = tryParse(text.trim());
  if (direct) return direct;

  for (const m of text.matchAll(/```[a-zA-Z-]*\s*([\s\S]*?)```/g)) {
    const parsed = tryParse(m[1].trim());
    if (parsed) return parsed;
  }

  /* balanced-brace scan: find candidate objects that mention a verdict */
  let attempts = 0;
  for (let i = text.indexOf("{"); i !== -1 && attempts < 40; i = text.indexOf("{", i + 1)) {
    if (!text.slice(i, i + 2000).includes('"verdict"')) continue;
    attempts++;
    let depth = 0;
    for (let j = i; j < Math.min(text.length, i + 8000); j++) {
      if (text[j] === "{") depth++;
      else if (text[j] === "}") {
        depth--;
        if (depth === 0) {
          const parsed = tryParse(text.slice(i, j + 1));
          if (parsed) return parsed;
          break;
        }
      }
    }
  }
  return null;
}

/* ── the component ────────────────────────────────────────────── */

const VERDICT_STYLE: Record<
  Receipt["verdict"],
  { label: string; color: string; Icon: typeof ShieldCheck }
> = {
  holds: { label: "The paper holds", color: "#83d63a", Icon: ShieldCheck },
  "holds-with-caveats": { label: "Holds, with caveats", color: "#fbbf24", Icon: ShieldQuestion },
  disputed: { label: "Disputed", color: "#fb7185", Icon: ShieldAlert },
};

type DiscussionEntry = {
  id: string;
  name: string | null;
  comment: string | null;
  receivedAt: string;
  model: string;
  verdict: Receipt["verdict"];
  one_line: string;
  date: string;
  scores: Receipt["scores"];
};

export function AiReferee() {
  const [pasted, setPasted] = useState("");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [thoughts, setThoughts] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  const [filed, setFiled] = useState<DiscussionEntry[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const refreshFiled = () =>
    fetch("/api/validate/receipt")
      .then((r) => r.json())
      .then((d) => Array.isArray(d.entries) && setFiled(d.entries))
      .catch(() => {});

  useEffect(() => {
    refreshFiled();
  }, []);

  const handleText = (text: string) => {
    setPasted(text);
    setSending(false);
    if (!text.trim()) {
      setReceipt(null);
      setParseError(null);
      return;
    }
    const found = extractReceipt(text);
    setReceipt(found);
    if (found) {
      posthog.capture("whitepaper_validate_receipt_parsed", {
        model: found.model,
        verdict: found.verdict,
        source: "paste",
      });
    }
    setParseError(
      found
        ? null
        : "No receipt found yet. Paste the whole reply, or just its final json block.",
    );
  };

  const copyPaperAndPrompt = async () => {
    try {
      const res = await fetch("/whitepaper/llm.txt");
      const paper = await res.text();
      await navigator.clipboard.writeText(
        `${INSTRUCTIONS}\n\nThe paper follows below.\n\n---\n\n${paper}`,
      );
      setCopied(true);
      posthog.capture("whitepaper_validate_copy_paper");
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const logReceipt = async () => {
    if (!receipt || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/validate/receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          comment: thoughts.trim() || undefined,
          receipt,
        }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error);
      toast.success("Added to the discussion");
      setPasted("");
      setReceipt(null);
      setThoughts("");
      setName("");
      posthog.capture("whitepaper_validate_receipt_submitted", {
        verdict: receipt.verdict,
        model: receipt.model,
        has_thoughts: thoughts.trim().length > 0,
        has_name: name.trim().length > 0,
        source: pasted.length > 0 ? "paste" : "file",
      });
      await refreshFiled();
    } catch {
      toast.error("Could not add it; try again.");
      posthog.capture("whitepaper_validate_receipt_submit_error", {
        verdict: receipt.verdict,
        model: receipt.model,
      });
    } finally {
      setSending(false);
    }
  };

  const style = receipt ? VERDICT_STYLE[receipt.verdict] : null;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
        <h2 className="font-mono text-xs text-white/40 uppercase tracking-widest">
          Public discussion on quirq
        </h2>
        {filed.length > 0 && (
          <span className="font-mono text-[11px] text-white/35">
            {filed.length} {filed.length === 1 ? "comment" : "comments"} so far
          </span>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 items-start">
        {/* ── step one: send the paper out ─────────────────── */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#83d63a] mb-3">
            01 · Send the paper to your AI
          </p>
          <p className="text-sm text-white/55 leading-relaxed max-w-[52ch]">
            One click opens a chat with the paper and the referee brief preloaded: recompute the
            arithmetic, audit the claim tiers, try to break the unit. Use a model you trust; it
            does not work for us.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button onClick={copyPaperAndPrompt} className={ACTION_BTN}>
              {copied ? (
                <Check className="w-4 h-4 text-[#83d63a]" />
              ) : (
                <ClipboardCopy className="w-4 h-4" />
              )}
              {copied ? "Copied" : "Copy paper + brief"}
            </button>
            <a
              href={chatgptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={ACTION_BTN}
              onClick={() => posthog.capture("whitepaper_validate_open_model", { model: "chatgpt" })}
            >
              <BrandIcon d={OPENAI_PATH} className="w-4 h-4" />
              Open in ChatGPT
            </a>
            <a
              href={claudeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={ACTION_BTN}
              onClick={() => posthog.capture("whitepaper_validate_open_model", { model: "claude" })}
            >
              <BrandIcon d={CLAUDE_PATH} className="w-4 h-4" />
              Open in Claude
            </a>
            <a
              href={perplexityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={ACTION_BTN}
              onClick={() => posthog.capture("whitepaper_validate_open_model", { model: "perplexity" })}
            >
              <BrandIcon d={PERPLEXITY_PATH} className="w-4 h-4" />
              Open in Perplexity
            </a>
          </div>
          <p className="mt-5 text-xs text-white/35 leading-relaxed">
            Copy hands you the paper with the brief appended, for any model without browsing.
            The open-in buttons preload the brief; the model fetches the paper itself. Either
            way the chat ends with a small
            <span className="font-mono"> validation-receipt </span>
            json block: its verdict, in a form this page can read back.
          </p>
        </div>

        {/* ── step two: bring the verdict home ─────────────── */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#83d63a] mb-3">
            02 · Bring the verdict home
          </p>
          <p className="text-sm text-white/55 leading-relaxed max-w-[52ch]">
            When the chat ends, copy the reply (or just its final json block) and drop it here.
            Exported chat files work too.
          </p>
          <textarea
            value={pasted}
            onChange={(e) => handleText(e.target.value)}
            rows={5}
            placeholder='Paste the reply, or the {"kind":"validation-receipt"...} block'
            className="mt-4 w-full rounded-lg bg-white/[0.03] border border-white/10 px-4 py-3 font-mono text-xs text-white placeholder:text-white/25 focus:border-[#83d63a]/60 focus:outline-none transition-colors"
            aria-label="Paste the validation receipt"
          />
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 font-mono text-[11px] text-white/40 hover:text-white transition-colors"
            >
              <FileUp className="w-3.5 h-3.5" /> or upload the exported chat
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".txt,.md,.json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  posthog.capture("whitepaper_validate_file_uploaded", {
                    filename: f.name,
                    size: f.size,
                  });
                  f.text().then(handleText);
                }
              }}
            />
          </div>
          {parseError && <p className="mt-3 text-xs text-[#fb9a9a]">{parseError}</p>}

          {receipt && style && (
            <div
              className="mt-5 rounded-xl border p-5"
              style={{ borderColor: `${style.color}55`, background: `${style.color}0d` }}
            >
              <div className="flex items-center gap-2.5">
                <style.Icon className="w-5 h-5" style={{ color: style.color }} />
                <p className="font-display text-xl" style={{ color: style.color }}>
                  {style.label}
                </p>
              </div>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                &ldquo;{receipt.one_line}&rdquo;
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
                {(
                  [
                    ["arithmetic", receipt.scores.arithmetic],
                    ["sources", receipt.scores.sources],
                    ["logic", receipt.scores.logic],
                    ["gaming resistance", receipt.scores.gaming_resistance],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label}>
                    <div className="flex justify-between font-mono text-[10px] text-white/45 mb-1">
                      <span className="uppercase tracking-widest">{label}</span>
                      <span>{Math.round(value)}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${value}%`, background: style.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {(receipt.issues.length > 0 || receipt.confirmed.length > 0) && (
                <div className="mt-4 space-y-1.5">
                  {receipt.confirmed.slice(0, 3).map((c, i) => (
                    <p key={`c${i}`} className="text-xs text-white/50 leading-relaxed">
                      <span className="text-[#83d63a] mr-1.5">&#10003;</span>
                      {c}
                    </p>
                  ))}
                  {receipt.issues.slice(0, 3).map((c, i) => (
                    <p key={`i${i}`} className="text-xs text-white/50 leading-relaxed">
                      <span className="text-[#fb7185] mr-1.5">&#10007;</span>
                      {c}
                    </p>
                  ))}
                </div>
              )}
              <p className="mt-4 font-mono text-[11px] text-white/35">
                {receipt.model} · {receipt.date || "undated"}
              </p>
            </div>
          )}

          {/* the human half: typed thoughts, named or anonymous */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <label
              htmlFor="own-thoughts"
              className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2"
            >
              Your own thoughts · optional · typed
            </label>
            <textarea
              id="own-thoughts"
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              onPaste={(e) => e.preventDefault()}
              onDrop={(e) => e.preventDefault()}
              rows={4}
              placeholder="What do you make of the paper? As long as you like."
              className="w-full rounded-lg bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#83d63a]/60 focus:outline-none transition-colors"
            />
            <p className="mt-1.5 font-mono text-[10px] text-white/30">
              Paste is disabled here on purpose: the AI half arrives as a receipt, this half has
              to come from you.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                placeholder="Your name (or stay anonymous)"
                aria-label="Your name, optional"
                className="flex-1 min-w-[200px] rounded-lg bg-white/[0.03] border border-white/10 px-4 h-11 text-sm text-white placeholder:text-white/25 focus:border-[#83d63a]/60 focus:outline-none transition-colors"
              />
              <button
                onClick={logReceipt}
                disabled={!receipt || sending}
                className="inline-flex items-center gap-2 rounded-full bg-white text-black h-11 px-6 text-sm font-medium hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Gavel className="w-4 h-4" />
                {sending ? "Adding..." : "Add to the discussion"}
              </button>
            </div>
            {!receipt && (
              <p className="mt-2 font-mono text-[10px] text-white/30">
                The AI receipt above is the ticket in: paste it first, thoughts and name are
                yours to add.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── the discussion: comments from people, receipts from their AIs ── */}
      {filed.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              The discussion · comments from people, receipts from their AIs
            </h3>
            <a
              href="/api/validate/receipt"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-white/35 hover:text-white transition-colors"
            >
              raw: /api/validate/receipt &rarr;
            </a>
          </div>
          <div className="rounded-xl border border-white/10 overflow-hidden divide-y divide-white/10">
            {filed.map((e) => {
              const s = VERDICT_STYLE[e.verdict];
              return (
                <div key={e.id} className="px-5 py-4 bg-white/[0.02]">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="text-sm font-medium text-white">
                      {e.name || "Anonymous"}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest"
                      style={{ color: s.color, borderColor: `${s.color}44` }}
                    >
                      <s.Icon className="w-3 h-3" />
                      {s.label}
                    </span>
                    <span className="font-mono text-[10px] text-white/30">
                      via {e.model} · {e.date || "undated"}
                    </span>
                  </div>
                  {e.comment && (
                    <p className="mt-2.5 text-sm text-white/70 leading-relaxed whitespace-pre-wrap max-w-[90ch]">
                      {e.comment}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-white/40 leading-relaxed">
                    <span className="font-mono text-[10px] uppercase tracking-widest mr-2" style={{ color: `${s.color}aa` }}>
                      their AI said
                    </span>
                    &ldquo;{e.one_line}&rdquo;
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
