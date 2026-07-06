"use client";

type Partner = {
  name: string;
  /** Path under /public. Falls back to a text wordmark when missing. */
  src?: string;
  /** Height classes, to optically match logos with different aspect ratios. */
  sizeClass?: string;
  /** Optional link, e.g. to a related announcement. */
  href?: string;
};

// Drop nvidia.svg and okx.svg into public/images/logos/ and add src here
// to replace the text wordmarks with real logos.
const partners: Partner[] = [
  { name: "NVIDIA", href: "/blog/xo-nvidia" },
  // Square icon mark: needs a taller box to optically match wide wordmarks
  { name: "Microsoft", src: "/images/logos/microsoft.svg", sizeClass: "h-10 lg:h-12", href: "/blog/xo-microsoft" },
  { name: "AWS", src: "/images/logos/aws.svg", sizeClass: "h-8 lg:h-10", href: "/blog/xo-aws" },
  { name: "Google", src: "/images/logos/google.webp", sizeClass: "h-7 lg:h-9", href: "/blog/xo-google" },
  { name: "OKX", href: "/blog/xo-okx" },
  { name: "MagicPath", href: "/blog/xo-magicpath" },
  { name: "Nebius", href: "/blog/xo-nebius" },
];

export function TrustedBySection() {
  // Triple the list so the marquee loops seamlessly
  const items = [...partners, ...partners, ...partners];

  return (
    <section className="relative py-14 lg:py-16 border-b border-foreground/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-10">
        <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
          <span className="w-8 h-px bg-foreground/30" />
          Trusted by
        </span>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 lg:w-40 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 lg:w-40 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

        <div className="marquee flex items-center gap-20 lg:gap-28 whitespace-nowrap w-max">
          {items.map((partner, i) => {
            const visual = partner.src ? (
              <img
                src={partner.src}
                alt={partner.name}
                className={`${partner.sizeClass ?? "h-7 lg:h-9"} w-auto grayscale opacity-50 hover:opacity-90 transition-opacity duration-300 select-none`}
                draggable={false}
              />
            ) : (
              <span className="text-xl lg:text-3xl font-display font-semibold tracking-tight text-foreground/50 hover:text-foreground/90 transition-colors duration-300 select-none">
                {partner.name}
              </span>
            );
            return partner.href ? (
              <a
                key={`${partner.name}-${i}`}
                href={partner.href}
                aria-label={`${partner.name}: read the announcement`}
                className="shrink-0"
              >
                {visual}
              </a>
            ) : (
              <span key={`${partner.name}-${i}`} className="shrink-0">
                {visual}
              </span>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        .marquee {
          animation: marquee 30s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
