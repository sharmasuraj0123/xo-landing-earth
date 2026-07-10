"use client";

/* A quiet nav button that opens the whitepaper's AI view. Styled
   like the Docs pill so it stays subtle: soft moonlight white on a
   thin outline, no icon. */

import Link from "next/link";

export function AiViewButton({
  compact = false,
  onClick,
  className = "",
}: {
  /** Matches the nav's scrolled state: smaller + light-on-light tone. */
  compact?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const size = compact ? "h-8 px-4 text-xs" : "h-9 px-5 text-sm";
  const tone = compact
    ? "border-foreground/30 text-foreground hover:bg-foreground/5"
    : "border-white/40 text-white hover:bg-white/10 bg-transparent";

  return (
    <Link
      href="/whitepaper?view=ai"
      onClick={onClick}
      aria-label="Open the AI view of the whitepaper"
      className={`inline-flex items-center rounded-full border font-medium transition-all duration-500 ${size} ${tone} ${className}`}
    >
      AI view
    </Link>
  );
}
