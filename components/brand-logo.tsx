type BrandLogoProps = {
  /** Use `dark` on dark backgrounds (white strokes). `light` on light backgrounds. */
  variant?: "dark" | "light";
  className?: string;
};

export function BrandLogo({ variant = "dark", className = "h-8 w-8" }: BrandLogoProps) {
  const src = variant === "dark" ? "/xo-logo.svg" : "/xo-logo-light.svg";

  return (
    <img src={src} alt="XO" className={className} width={32} height={32} />
  );
}
