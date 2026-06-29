"use client";

import { useEffect, useState, useRef } from "react";

const logos: Record<string, React.ReactNode> = {
  Claude: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0h3.767L16.906 20.48h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 10.959L8.453 7.687 6.205 14.48H10.7z"/>
    </svg>
  ),
  Codex: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.843-3.372 2.02-1.163a.076.076 0 0 1 .071 0l4.83 2.786a4.49 4.49 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.402-.678zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
  Slack: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
    </svg>
  ),
  Linear: (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-6 h-6">
      <path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L39.3342 97.1782c.6889.6889.0915 1.8189-.857 1.5964C20.0515 94.4522 5.54779 79.9485 1.22541 61.5228ZM.00189135 46.8891c-.01764375.2833.08887775.5599.28957885.7606L52.3503 99.7085c.2007.2007.4773.3075.7606.2896 2.3692-.1476 4.6938-.46 6.9624-.9259.7645-.157 1.0301-1.0963.4782-1.6481L2.57595 39.4485c-.55186-.5519-1.49117-.2863-1.648174.4782-.465974 2.2686-.778557 4.5932-.926246 6.9624ZM4.21094 29.7054c-.16649.3738-.08169.8106.20765 1.1l64.77251 64.7725c.2894.2894.7262.3742 1.1.2077 1.7861-.7956 3.5171-1.6927 5.1855-2.684.5521-.328.6373-1.0867.1832-1.5408L7.89461 24.5199c-.45408-.4541-1.21271-.3689-1.54074.1832-.99132 1.6684-1.88843 3.3994-2.68397 5.1823ZM12.6955 18.3312c-.3996-.3996-.4478-.9837-.1182-1.4291A49.9827 49.9827 0 0 1 24.5199 7.89462c.4454-.33029 1.0295-.27805 1.4291.11802l65.166 65.166c.3996.3996.4478.9837.1182 1.4291A49.9827 49.9827 0 0 1 79.4801 86.1054c-.4454.3303-1.0295.2781-1.4291-.118L12.6955 18.3312ZM29.7054 4.21094c-.3738-.16649-.8106-.08169-1.1.20765L63.3979 39.2094c.2894.2894.3742.7262.2077 1.1l-1.0016 2.2469c-.1698.3808-.5491.6266-.9619.6266H55.6423c-.3396 0-.6659-.135-.9067-.3757L31.4932 19.542c-.5519-.5519-1.4912-.2863-1.6482.4782-.4659 2.2686-.7785 4.5932-.9261 6.9624-.0176.2833.0888.5599.2896.7606l52.0629 52.0629c.2007.2007.4773.3075.7606.2896 2.3692-.1476 4.6938-.46 6.9624-.9259.7645-.157 1.0301-1.0963.4782-1.6481L40.5251 28.5387c-.2408-.2407-.3757-.5671-.3757-.9067v-6.001c0-.4128.2458-.7921.6266-.9619l2.2469-1.0016c.3808-.1698.8176-.0817 1.1.2077l34.7882 34.7882c.3996.3996.9837.4478 1.4291.1182A49.9827 49.9827 0 0 0 92.1054 43.1c.3303-.4454.2781-1.0295-.118-1.4291L29.7054 4.21094Z"/>
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M24 22.525H0l12-21.05 12 21.05z"/>
    </svg>
  ),
  Stripe: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  ),
  Notion: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.047.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
    </svg>
  ),
  Coder: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M11.986 0C5.365 0 0 5.365 0 11.986c0 6.62 5.365 11.985 11.986 11.985 6.62 0 11.985-5.365 11.985-11.985C23.97 5.365 18.607 0 11.986 0zm-.522 6.4l1.18 1.18-4.38 4.38 4.38 4.38-1.18 1.18L6.2 11.96l5.264-5.56zm3.524 0L20.254 11.96l-5.266 5.56-1.18-1.18 4.38-4.38-4.38-4.38 1.18-1.18z"/>
    </svg>
  ),
  Clerk: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M21.47 20.829a1.166 1.166 0 0 1-.603-.167l-2.494-1.494a1.171 1.171 0 0 1-.349-1.664 6.036 6.036 0 0 0 0-6.985 1.171 1.171 0 0 1 .35-1.664l2.492-1.494a1.166 1.166 0 0 1 1.664.403A11.755 11.755 0 0 1 24 12.01a11.755 11.755 0 0 1-1.87 6.456 1.166 1.166 0 0 1-.986.536v-.173zm-9.523 3.159a11.824 11.824 0 0 1-5.937-1.6L3.517 21a1.166 1.166 0 0 1-.164-1.82l1.853-1.852a1.167 1.167 0 0 1 1.437-.146 6.023 6.023 0 0 0 6.198.152 1.166 1.166 0 0 1 1.587.349l1.487 2.477a1.17 1.17 0 0 1-.4 1.664 11.793 11.793 0 0 1-3.567 1.164zm-9.46-7.942A11.755 11.755 0 0 1 .8 8.27c.167-.586.4-1.155.688-1.693l.005-.011A1.166 1.166 0 0 1 3.157 6.2l2.497 1.5a1.166 1.166 0 0 1 .349 1.659 6.023 6.023 0 0 0-.152 6.192 1.166 1.166 0 0 1-.345 1.58l-2.477 1.488a1.168 1.168 0 0 1-1.542-.362zm9.46-15.04c1.313 0 2.616.264 3.836.778l.001.001a1.167 1.167 0 0 1 .467 1.741L14.77 5.97a1.166 1.166 0 0 1-1.587.35 6.036 6.036 0 0 0-6.2.151A1.166 1.166 0 0 1 5.546 6.3L4.056 3.83a1.166 1.166 0 0 1 .4-1.663A11.793 11.793 0 0 1 11.947 1.006z"/>
    </svg>
  ),
  MCP: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
    </svg>
  ),
};

type Integration = {
  name: string;
  category: string;
  /** position over the background image, in % of the image box — sits on a hand */
  x: number;
  y: number;
  /** float animation tuning, per icon, so nothing bobs in sync */
  dur: number;
  delay: number;
  amp: number;
};

// Placed to rest on the two mossy hands: two on the left hand, two on the right.
const integrations: Integration[] = [
  { name: "Codex", category: "Agent", x: 14, y: 40, dur: 6.5, delay: 0.0, amp: 5 },
  { name: "Claude", category: "Agent", x: 31, y: 50, dur: 7.2, delay: 0.8, amp: 4 },
  { name: "Slack", category: "Comms", x: 69, y: 47, dur: 6.8, delay: 0.4, amp: 5 },
  { name: "Vercel", category: "Deploy", x: 86, y: 33, dur: 7.5, delay: 1.0, amp: 4 },
];

// A glassy circular chip holding a tool logo, legible over any part of the image.
function IconChip({ name }: { name: string }) {
  return (
    <div className="relative flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16">
      {/* soft halo to lift the chip off the busy mossy background */}
      <span
        aria-hidden="true"
        className="absolute -inset-1.5 rounded-full bg-white/15 blur-xl opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div
        className="relative flex h-full w-full items-center justify-center rounded-full border border-white/35 bg-black/55 text-white backdrop-blur-md ring-1 ring-white/10 shadow-[0_0_22px_rgba(255,255,255,0.28),0_6px_20px_rgba(0,0,0,0.6)] transition-all duration-300 [&_svg]:h-7 [&_svg]:w-7 lg:[&_svg]:h-8 lg:[&_svg]:w-8 group-hover:scale-110 group-hover:border-white/70 group-hover:bg-black/70 group-hover:shadow-[0_0_34px_rgba(255,255,255,0.45),0_6px_20px_rgba(0,0,0,0.65)]"
      >
        {logos[name]}
      </div>
    </div>
  );
}

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="integrations" ref={sectionRef} className="relative overflow-hidden">

      {/* Header — centré verticalement sur l'image */}
      <div className="relative z-10 pt-32 lg:pt-40 text-center">
        <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <span className="w-12 h-px bg-foreground/20" />
          Integrations
          <span className="w-12 h-px bg-foreground/20" />
        </span>

        <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          Your tools,
          <br />
          <span className="text-muted-foreground">your models.</span>
        </h2>

        <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto transition-all duration-1000 delay-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          Bring your own model. Connect your own tools. XO wires them into every workspace through MCP.
        </p>
      </div>

      {/* Full-width image canvas with tools floating over it (md and up) */}
      <div className={`relative left-1/2 -translate-x-1/2 w-screen -mt-16 transition-all duration-1000 delay-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-cover"
        />

        {/* Tool icons resting on the hands */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {integrations.map((it, index) => (
            <div
              key={it.name}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-default transition-opacity duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: `${it.x}%`,
                top: `${it.y}%`,
                transitionDelay: `${index * 120 + 300}ms`,
              }}
            >
              {/* inner layer owns the float animation so it never fights the
                  centering / hover transforms on its parent and child */}
              <div
                className="animate-float"
                style={{
                  "--float-dur": `${it.dur}s`,
                  "--float-delay": `${it.delay}s`,
                  "--float-amp": `${it.amp}px`,
                } as React.CSSProperties}
              >
                <IconChip name={it.name} />

                {/* Hover label */}
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-full bg-black/80 px-2.5 py-1 text-[11px] font-mono text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {it.name} <span className="text-white/40">·</span> {it.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom stats row */}
      <div className="relative z-10 mt-16 lg:mt-24 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`flex flex-wrap items-center justify-between gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 pb-32 lg:pb-40 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-wrap gap-12">
            {[
              { value: "100+", label: "Integrations" },
              { value: "BYOM", label: "Bring your own model" },
              { value: "MCP", label: "Custom tool protocol" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span className="text-3xl font-display">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          <a href="#" className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
            Browse all connectors
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
