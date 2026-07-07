"use client";

type Partner = {
  name: string;
  src?: string;
  sizeClass?: string;
};

const partners: Partner[] = [
  { name: "NVIDIA" },
  { name: "Microsoft", src: "/images/logos/microsoft.svg", sizeClass: "h-10 lg:h-12" },
  { name: "AWS", src: "/images/logos/aws.svg", sizeClass: "h-8 lg:h-10" },
  { name: "Google", src: "/images/logos/google.webp", sizeClass: "h-7 lg:h-9" },
  { name: "OKX" },
  { name: "MagicPath" },
  { name: "Nebius" },
  { name: "Gaia" },
  { name: "EVM Capital" },
  { name: "Hysolwin Green Energy" },
  { name: "PPAI Innovations" },
  { name: "EnviroEdge" },
];

export function TrustedBySection() {
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
        <div className="absolute inset-y-0 left-0 w-24 lg:w-40 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 lg:w-40 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

        <div className="marquee flex items-center gap-20 lg:gap-28 whitespace-nowrap w-max">
          {items.map((partner, i) => (
            <span key={`${partner.name}-${i}`} className="shrink-0 pointer-events-none">
              {partner.src ? (
                <img
                  src={partner.src}
                  alt={partner.name}
                  className={`${partner.sizeClass ?? "h-7 lg:h-9"} w-auto grayscale opacity-50 select-none`}
                  draggable={false}
                />
              ) : (
                <span className="text-xl lg:text-3xl font-display font-semibold tracking-tight text-foreground/50 select-none">
                  {partner.name}
                </span>
              )}
            </span>
          ))}
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
