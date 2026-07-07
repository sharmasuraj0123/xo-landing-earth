/* Generalized XO × Partner lockup: logos only, no wordmark text.

   Partners with a logo file render the image; everyone else gets a
   monogram disc, so new partners need zero assets. Names live in the
   page copy, not in the lockup. */

type PartnerLockupProps = {
  partner: string;
  /** Optional logo path under /public, e.g. "/images/logos/google.webp". */
  logo?: string;
};

function PartnerMark({ partner, logo }: { partner: string; logo?: string }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={`${partner} logo`}
        className="h-9 lg:h-12 w-auto max-w-[170px] object-contain"
        draggable={false}
      />
    );
  }

  const initials = partner
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-label={`${partner} logo`}
      role="img"
      className="flex items-center justify-center w-11 h-11 lg:w-14 lg:h-14 rounded-full border border-white/25 bg-white/[0.04] font-display text-lg lg:text-xl text-white select-none"
    >
      {initials}
    </span>
  );
}

export function PartnerLockup({ partner, logo }: PartnerLockupProps) {
  return (
    <div className="relative flex w-full items-center justify-center gap-6 lg:gap-10 border border-white/12 bg-white/[0.02] px-8 py-10 lg:py-14 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[280px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(131,214,58,0.16), transparent)" }}
      />

      <img
        src="/xo-logo.svg"
        alt="XO logo"
        className="relative z-10 h-9 w-9 lg:h-12 lg:w-12"
        draggable={false}
      />

      <span
        aria-hidden="true"
        className="relative z-10 font-display text-2xl lg:text-4xl text-[#83d63a] leading-none select-none"
      >
        &times;
      </span>

      <span className="relative z-10">
        <PartnerMark partner={partner} logo={logo} />
      </span>

      <span aria-hidden="true" className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#83d63a]/50" />
      <span aria-hidden="true" className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#83d63a]/50" />
    </div>
  );
}
