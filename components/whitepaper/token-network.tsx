"use client";

/* ────────────────────────────────────────────────────────────────
   The paper as a galaxy, in true 3D.

   Every meaningful token in the whitepaper is a star placed in a
   three-dimensional sky: constellations of meaning wrapped in
   nebula light, photons riding the threads between related terms.
   Drag to orbit the space in three dimensions, scroll or pinch to
   fly closer, click a star and it blooms into the token behind
   it. Tokens and counts are real, mined from the paper; the
   geometry is simulated for wonder.
──────────────────────────────────────────────────────────────── */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Braces, Download, FileText } from "lucide-react";
import {
  clusterLabels,
  paperTokens,
  type ClusterKey,
  type PaperToken,
} from "@/lib/quirq-tokens";
import { WHITEPAPER_PDF_DOWNLOAD_PATH } from "@/lib/whitepaper-pdf";

/* nebula spectrum: jewel hues on deep indigo space */
const HUES: Record<ClusterKey, string> = {
  minting: "#22d3ee",
  verification: "#a78bfa",
  cost: "#fbbf24",
  metrics: "#e2e8f0",
  energy: "#fb7185",
  economics: "#38bdf8",
  gaming: "#f97316",
  numbers: "#86efac",
};

const CLUSTER_KEYS = Object.keys(clusterLabels) as ClusterKey[];
const BASE_DIST = 3.1;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashToken(t: string) {
  let h = 2166136261;
  for (let i = 0; i < t.length; i++) {
    h ^= t.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function toyVector(t: string) {
  const rand = mulberry32(hashToken(t));
  return Array.from({ length: 12 }, () => rand() * 2 - 1);
}
function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/* ── the sky, in world space ──────────────────────────────────── */

/* constellation centers on a sphere, via the golden spiral */
const CENTERS = new Map<ClusterKey, { x: number; y: number; z: number }>(
  CLUSTER_KEYS.map((key, i) => {
    const y = 1 - (2 * (i + 0.5)) / CLUSTER_KEYS.length;
    const rad = Math.sqrt(1 - y * y);
    const a = i * 2.39996;
    return [key, { x: Math.cos(a) * rad * 0.85, y: y * 0.72, z: Math.sin(a) * rad * 0.85 }];
  }),
);

type Star = {
  token: PaperToken;
  wx: number;
  wy: number;
  wz: number;
  r: number;
  phase: number;
  speed: number;
};

function buildStars(): Star[] {
  const rand = mulberry32(20260710);
  const gauss = () => {
    const u1 = Math.max(rand(), 1e-6);
    const u2 = rand();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  };
  return paperTokens.map((token) => {
    const c = CENTERS.get(token.c)!;
    return {
      token,
      wx: c.x + gauss() * 0.21,
      wy: c.y + gauss() * 0.18,
      wz: c.z + gauss() * 0.21,
      r: 1.8 + Math.min(6.5, Math.sqrt(token.n) * 0.95),
      phase: rand() * Math.PI * 2,
      speed: 0.2 + rand() * 0.5,
    };
  });
}

function nearest(stars: Star[], from: Star, k: number, sameCluster: boolean) {
  return stars
    .filter((s) => s !== from && (!sameCluster || s.token.c === from.token.c))
    .map((s) => ({
      s,
      d: (s.wx - from.wx) ** 2 + (s.wy - from.wy) ** 2 + (s.wz - from.wz) ** 2,
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k)
    .map((e) => e.s);
}

/* ── the sentence that enters the model ───────────────────────── */

const SENTENCES = [
  "A human owner budgets an outcome at value B; verification then mints V x B quirqs of delivered work.",
  "Tokens meter the machine's draw on the world; quirqs meter the world's change by the machine.",
  "Dividing the two meters yields cost per quirq, quirqs per kilowatt-hour, and a company's trajectory.",
];
const wordCluster = new Map<string, ClusterKey>(
  paperTokens.map((p) => [p.t.toLowerCase(), p.c]),
);
function fakeBpe(word: string): string[] {
  if (word.length <= 5) return [word];
  const cut = Math.min(4 + (hashToken(word) % 3), word.length - 2);
  const head = word.slice(0, cut);
  const tail = word.slice(cut);
  return tail.length > 6 ? [head, ...fakeBpe(tail)] : [head, tail];
}

function TokenizerBar() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % SENTENCES.length), 6400);
    return () => clearInterval(id);
  }, []);
  const chips = useMemo(() => {
    const out: { text: string; hue?: string }[] = [];
    for (const word of SENTENCES[idx].split(" ")) {
      const bare = word.replace(/[^a-zA-Z0-9%$.,-]/g, "").replace(/[.,;]$/, "").toLowerCase();
      const c = wordCluster.get(bare);
      for (const piece of fakeBpe(word)) out.push({ text: piece, hue: c && HUES[c] });
    }
    return out;
  }, [idx]);

  return (
    <div key={idx} className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
      {chips.map((chip, i) => (
        <span
          key={i}
          className="inline-block rounded-lg border px-1.5 py-0.5 font-mono text-[10.5px] leading-none opacity-0"
          style={{
            animation: "starTokenIn 0.45s cubic-bezier(0.2,0.8,0.2,1) forwards",
            animationDelay: `${i * 34}ms`,
            borderColor: chip.hue ? rgba(chip.hue, 0.45) : "rgba(180,190,255,0.14)",
            background: chip.hue ? rgba(chip.hue, 0.1) : "rgba(160,170,255,0.05)",
            color: chip.hue ?? "rgba(200,210,255,0.6)",
            textShadow: chip.hue ? `0 0 12px ${rgba(chip.hue, 0.6)}` : "none",
          }}
        >
          {chip.text}
        </span>
      ))}
      <span className="ml-1 font-mono text-[10px] tracking-widest text-indigo-200/40">
        &rarr; {chips.length} TOKENS
      </span>
    </div>
  );
}

/* ── the galaxy ───────────────────────────────────────────────── */

export function TokenNetwork({
  embedded = false,
  onBackToHuman,
}: {
  /** When embedded inside the whitepaper page, the top-left control
      switches back to the human view instead of navigating away. */
  embedded?: boolean;
  onBackToHuman?: () => void;
} = {}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stars = useMemo(buildStars, []);
  const edges = useMemo(() => {
    const within = stars.flatMap((s) => nearest(stars, s, 2, true).map((m) => [s, m] as const));
    const rand = mulberry32(7);
    const related: [ClusterKey, ClusterKey][] = [
      ["minting", "verification"],
      ["minting", "metrics"],
      ["cost", "metrics"],
      ["cost", "energy"],
      ["economics", "minting"],
      ["gaming", "verification"],
      ["numbers", "metrics"],
    ];
    const cross: (readonly [Star, Star])[] = [];
    for (const [a, b] of related) {
      const as = stars.filter((s) => s.token.c === a);
      const bs = stars.filter((s) => s.token.c === b);
      for (let i = 0; i < 2; i++) {
        cross.push([as[Math.floor(rand() * as.length)], bs[Math.floor(rand() * bs.length)]]);
      }
    }
    return [...within, ...cross];
  }, [stars]);

  const dust = useMemo(() => {
    const rand = mulberry32(99);
    return Array.from({ length: 260 }, () => {
      const u = rand() * 2 - 1;
      const a = rand() * Math.PI * 2;
      const rad = Math.sqrt(1 - u * u);
      const R = 1.45 + rand() * 1.2;
      return {
        wx: Math.cos(a) * rad * R,
        wy: u * R * 0.85,
        wz: Math.sin(a) * rad * R,
        r: 0.3 + rand() * 0.85,
        phase: rand() * Math.PI * 2,
      };
    });
  }, []);

  const [selected, setSelected] = useState<Star | null>(null);
  const [focusCluster, setFocusCluster] = useState<ClusterKey | null>(null);
  const [grain, setGrain] = useState<string>("");

  const hoverRef = useRef<Star | null>(null);
  const burstRef = useRef<{ star: Star; t0: number } | null>(null);
  /* x, y, depth w, radius scale f per star, refreshed every frame */
  const projRef = useRef<Float32Array>(new Float32Array(stars.length * 4));
  const stateRef = useRef({ selected: null as Star | null, focus: null as ClusterKey | null });
  stateRef.current = { selected, focus: focusCluster };

  /* the camera: a true orbit in three dimensions. It wakes far out
     and glides in close, so the field greets you already spread
     wide across the frame. */
  const camRef = useRef({
    yaw: 0.7,
    pitch: 0.16,
    dist: 4.2,
    tYaw: 0.7,
    tPitch: 0.16,
    tDist: 2.35,
    vYaw: 0,
    vPitch: 0,
    lastInput: 0,
  });
  const dragRef = useRef({
    active: false,
    id: -1,
    x: 0,
    y: 0,
    moved: 0,
    pinch: 0,
    pointers: new Map<number, { x: number; y: number }>(),
  });

  /* film grain, generated once */
  useEffect(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 96;
    const g = c.getContext("2d")!;
    const img = g.createImageData(96, 96);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 26;
    }
    g.putImageData(img, 0, 0);
    setGrain(c.toDataURL());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const serif =
      getComputedStyle(document.body).getPropertyValue("--font-instrument-serif").trim() ||
      "Georgia, serif";

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    /* zoom must own the wheel on this single-screen page */
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const cam = camRef.current;
      cam.tDist = Math.min(5.4, Math.max(1.8, cam.tDist * (1 + e.deltaY * 0.0011)));
      cam.lastInput = performance.now();
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });

    const photonRand = mulberry32(41);
    const photons = Array.from({ length: 14 }, () => ({
      edge: Math.floor(photonRand() * edges.length),
      u: photonRand(),
      speed: 0.08 + photonRand() * 0.12,
    }));

    let raf = 0;
    let lastT = performance.now() / 1000;

    const render = (now: number) => {
      const t = now / 1000;
      const dt = Math.min(0.05, t - lastT);
      lastT = t;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* fly the camera */
      const cam = camRef.current;
      if (performance.now() - cam.lastInput > 4200 && !dragRef.current.active) {
        cam.tYaw += 0.045 * dt; /* idle: the sky keeps turning */
      }
      cam.tYaw += cam.vYaw * dt;
      cam.tPitch = Math.min(1.25, Math.max(-1.25, cam.tPitch + cam.vPitch * dt));
      cam.vYaw *= Math.exp(-2.4 * dt);
      cam.vPitch *= Math.exp(-2.4 * dt);
      const k = 1 - Math.exp(-7 * dt);
      cam.yaw += (cam.tYaw - cam.yaw) * k;
      cam.pitch += (cam.tPitch - cam.pitch) * k;
      cam.dist += (cam.tDist - cam.dist) * k;

      const cyaw = Math.cos(cam.yaw);
      const syaw = Math.sin(cam.yaw);
      const cpit = Math.cos(cam.pitch);
      const spit = Math.sin(cam.pitch);
      const fovPx = Math.min(w, h) * 0.62;
      const cx = w / 2;
      const cyy = h / 2;

      const project = (wx: number, wy: number, wz: number) => {
        const x1 = wx * cyaw - wz * syaw;
        const z1 = wx * syaw + wz * cyaw;
        const y2 = wy * cpit - z1 * spit;
        const z2 = wy * spit + z1 * cpit;
        const depth = cam.dist - z2;
        if (depth < 0.3) return null;
        const f = fovPx / depth;
        return { x: cx + x1 * f, y: cyy + y2 * f, depth, f };
      };
      /* brightness falls away with distance from the camera */
      const depthAlpha = (depth: number) =>
        Math.min(1, Math.max(0.14, 1.55 - depth / cam.dist));

      const { selected: sel, focus } = stateRef.current;
      const hover = hoverRef.current;

      /* deep space */
      const bg = ctx.createLinearGradient(0, 0, w * 0.3, h);
      bg.addColorStop(0, "#050310");
      bg.addColorStop(0.55, "#0a0620");
      bg.addColorStop(1, "#04030c");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";

      /* nebulas: each constellation wrapped in its own light */
      CLUSTER_KEYS.forEach((key, i) => {
        const c = CENTERS.get(key)!;
        const p = project(
          c.x + Math.sin(t * 0.07 + i) * 0.03,
          c.y + Math.cos(t * 0.06 + i * 2) * 0.03,
          c.z,
        );
        if (!p) return;
        const R = 0.62 * p.f;
        const alpha =
          (focus ? (focus === key ? 0.17 : 0.03) : 0.09) * depthAlpha(p.depth);
        const neb = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R);
        neb.addColorStop(0, rgba(HUES[key], alpha));
        neb.addColorStop(0.55, rgba(HUES[key], alpha * 0.35));
        neb.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = neb;
        ctx.fillRect(p.x - R, p.y - R, R * 2, R * 2);
      });

      /* star dust, drifting through depth */
      for (const d of dust) {
        const p = project(d.wx, d.wy, d.wz);
        if (!p) continue;
        const tw = 0.35 + 0.3 * Math.sin(t * 1.6 + d.phase);
        ctx.globalAlpha = tw * 0.5 * depthAlpha(p.depth);
        ctx.fillStyle = "#cdd6ff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, d.r * (p.f / fovPx) * BASE_DIST, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      /* project every star once per frame; picking reads the same numbers */
      stars.forEach((s, i) => {
        const p = project(
          s.wx + Math.sin(t * s.speed + s.phase) * 0.008,
          s.wy + Math.cos(t * s.speed * 0.8 + s.phase) * 0.008,
          s.wz + Math.sin(t * s.speed * 0.6 + s.phase * 2) * 0.008,
        );
        projRef.current[i * 4] = p ? p.x : -9999;
        projRef.current[i * 4 + 1] = p ? p.y : -9999;
        projRef.current[i * 4 + 2] = p ? p.depth : 9999;
        projRef.current[i * 4 + 3] = p ? p.f : 0;
      });
      const pos = (s: Star) => {
        const i = stars.indexOf(s);
        return {
          x: projRef.current[i * 4],
          y: projRef.current[i * 4 + 1],
          depth: projRef.current[i * 4 + 2],
          f: projRef.current[i * 4 + 3],
        };
      };

      /* constellation threads */
      const selSet = sel ? new Set([sel, ...nearest(stars, sel, 4, true)]) : null;
      edges.forEach(([a, b]) => {
        const pa = pos(a);
        const pb = pos(b);
        if (pa.f === 0 || pb.f === 0) return;
        const touchesSel = sel && (a === sel || b === sel);
        const da = Math.min(depthAlpha(pa.depth), depthAlpha(pb.depth));
        let alpha = 0.1 * da;
        if (sel) alpha = touchesSel ? 0.5 : 0.03 * da;
        else if (focus)
          alpha = a.token.c === focus && b.token.c === focus ? 0.22 * da : 0.025 * da;
        const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        grad.addColorStop(0, rgba(HUES[a.token.c], alpha));
        grad.addColorStop(1, rgba(HUES[b.token.c], alpha));
        ctx.strokeStyle = grad;
        ctx.lineWidth = touchesSel ? 1.1 : 0.6;
        const mx = (pa.x + pb.x) / 2 + (pa.y - pb.y) * 0.1;
        const my = (pa.y + pb.y) / 2 + (pb.x - pa.x) * 0.1;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.quadraticCurveTo(mx, my, pb.x, pb.y);
        ctx.stroke();
      });

      /* photons riding the threads */
      for (const ph of photons) {
        ph.u += ph.speed / 60;
        if (ph.u > 1) {
          ph.u = 0;
          ph.edge = Math.floor(Math.random() * edges.length);
        }
        const [a, b] = edges[ph.edge];
        const pa = pos(a);
        const pb = pos(b);
        if (pa.f === 0 || pb.f === 0) continue;
        const mx = (pa.x + pb.x) / 2 + (pa.y - pb.y) * 0.1;
        const my = (pa.y + pb.y) / 2 + (pb.x - pa.x) * 0.1;
        for (let k2 = 0; k2 < 3; k2++) {
          const u = Math.max(0, ph.u - k2 * 0.02);
          const ix = (1 - u) * (1 - u) * pa.x + 2 * (1 - u) * u * mx + u * u * pb.x;
          const iy = (1 - u) * (1 - u) * pa.y + 2 * (1 - u) * u * my + u * u * pb.y;
          ctx.globalAlpha = (0.5 - k2 * 0.15) * (sel || focus ? 0.35 : 1);
          ctx.fillStyle = "#e6ecff";
          ctx.beginPath();
          ctx.arc(ix, iy, 1.3 - k2 * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      /* the stars */
      stars.forEach((s) => {
        const p = pos(s);
        if (p.f === 0) return;
        const hue = HUES[s.token.c];
        const isSel = sel === s;
        const isKin = selSet?.has(s) ?? false;
        const isHover = hover === s;
        let vis = depthAlpha(p.depth);
        if (sel) vis *= isSel ? 1 : isKin ? 0.9 : 0.16;
        else if (focus) vis *= s.token.c === focus ? 1 : 0.12;

        const tw = 1 + 0.1 * Math.sin(t * 2.1 + s.phase);
        const scale = (p.f / fovPx) * BASE_DIST;
        const r = s.r * scale * tw * (isSel ? 2 : isHover ? 1.45 : 1);

        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 6);
        halo.addColorStop(0, rgba(hue, 0.5 * vis));
        halo.addColorStop(0.35, rgba(hue, 0.14 * vis));
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = halo;
        ctx.fillRect(p.x - r * 6, p.y - r * 6, r * 12, r * 12);

        if ((s.r > 4.6 || isSel) && vis > 0.4) {
          const L = r * (isSel ? 9 : 6);
          const flare = ctx.createLinearGradient(p.x - L, p.y, p.x + L, p.y);
          flare.addColorStop(0, "rgba(255,255,255,0)");
          flare.addColorStop(0.5, `rgba(255,255,255,${0.3 * vis})`);
          flare.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = flare;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x - L, p.y);
          ctx.lineTo(p.x + L, p.y);
          ctx.stroke();
          const flareV = ctx.createLinearGradient(p.x, p.y - L, p.x, p.y + L);
          flareV.addColorStop(0, "rgba(255,255,255,0)");
          flareV.addColorStop(0.5, `rgba(255,255,255,${0.22 * vis})`);
          flareV.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = flareV;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - L);
          ctx.lineTo(p.x, p.y + L);
          ctx.stroke();
        }

        ctx.globalAlpha = Math.min(1, vis * 1.2);
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.8, r * 0.42), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (isSel) {
          for (let k3 = 0; k3 < 3; k3++) {
            const a = t * 1.4 + (k3 * Math.PI * 2) / 3;
            ctx.fillStyle = rgba(hue, 0.9);
            ctx.beginPath();
            ctx.arc(p.x + Math.cos(a) * r * 2.6, p.y + Math.sin(a) * r * 1.7, 1.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (isHover || isSel || (s.r > 6 && !sel && !focus && p.depth < cam.dist)) {
          ctx.font = `italic 15px ${serif}`;
          ctx.shadowColor = rgba(hue, 0.9);
          ctx.shadowBlur = 12;
          ctx.fillStyle = isSel ? "#ffffff" : `rgba(226,232,255,${0.55 + 0.4 * vis})`;
          ctx.fillText(s.token.t, p.x + r + 10, p.y + 4);
          ctx.shadowBlur = 0;
        }
      });

      /* bloom shockwave on selection, pinned to its star */
      const burst = burstRef.current;
      if (burst) {
        /* rAF timestamps can trail the click's clock by a frame */
        const age = Math.max(0, t - burst.t0);
        const p = pos(burst.star);
        if (age < 1.1 && p.f > 0) {
          const R = age * 190 * ((p.f / fovPx) * BASE_DIST);
          ctx.strokeStyle = rgba(HUES[burst.star.token.c], 0.5 * (1 - age / 1.1));
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, R, 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeStyle = `rgba(255,255,255,${0.25 * (1 - age / 1.1)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, R * 0.72, 0, Math.PI * 2);
          ctx.stroke();
        } else if (age >= 1.1) {
          burstRef.current = null;
        }
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("wheel", onWheel);
      ro.disconnect();
    };
  }, [stars, edges, dust]);

  const pick = (clientX: number, clientY: number): Star | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    let best: Star | null = null;
    let bestScore = Infinity;
    stars.forEach((s, i) => {
      const dx = projRef.current[i * 4] - px;
      const dy = projRef.current[i * 4 + 1] - py;
      const d = dx * dx + dy * dy;
      if (d < 26 * 26) {
        /* prefer the closer star when two overlap on screen */
        const score = d + projRef.current[i * 4 + 2] * 40;
        if (score < bestScore) {
          bestScore = score;
          best = s;
        }
      }
    });
    return best;
  };

  const choose = (star: Star | null) => {
    setSelected((prev) => {
      const next = star === prev ? null : star;
      if (next) burstRef.current = { star: next, t0: performance.now() / 1000 };
      return next;
    });
  };

  /* ── orbit gestures: drag rotates, pinch zooms, tap selects ── */
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    drag.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
    if (drag.pointers.size === 1) {
      drag.active = true;
      drag.id = e.pointerId;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.moved = 0;
    } else if (drag.pointers.size === 2) {
      const [a, b] = [...drag.pointers.values()];
      drag.pinch = Math.hypot(a.x - b.x, a.y - b.y);
    }
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    const cam = camRef.current;
    if (drag.pointers.has(e.pointerId)) {
      drag.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }
    if (drag.pointers.size === 2) {
      const [a, b] = [...drag.pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (drag.pinch > 0) {
        cam.tDist = Math.min(5.4, Math.max(1.8, cam.tDist * (drag.pinch / Math.max(d, 1))));
      }
      drag.pinch = d;
      cam.lastInput = performance.now();
      return;
    }
    if (drag.active && e.pointerId === drag.id) {
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.moved += Math.abs(dx) + Math.abs(dy);
      cam.tYaw -= dx * 0.0052;
      cam.tPitch = Math.min(1.25, Math.max(-1.25, cam.tPitch + dy * 0.0042));
      cam.vYaw = -dx * 0.25;
      cam.vPitch = dy * 0.2;
      cam.lastInput = performance.now();
      hoverRef.current = null;
    } else {
      hoverRef.current = pick(e.clientX, e.clientY);
    }
  };
  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    drag.pointers.delete(e.pointerId);
    if (e.pointerId === drag.id) {
      drag.active = false;
      if (drag.moved < 7) {
        camRef.current.vYaw = 0;
        camRef.current.vPitch = 0;
        choose(pick(e.clientX, e.clientY));
      }
    }
    if (drag.pointers.size < 2) drag.pinch = 0;
  };

  const neighbors = useMemo(
    () => (selected ? nearest(stars, selected, 4, true) : []),
    [selected, stars],
  );
  const vector = useMemo(() => (selected ? toyVector(selected.token.t) : []), [selected]);
  const hue = selected ? HUES[selected.token.c] : "#a5b4fc";

  const spectrumPath = useMemo(() => {
    if (!vector.length) return "";
    const W = 232;
    const H = 56;
    return vector
      .map((v, i) => {
        const x = (i / (vector.length - 1)) * W;
        const y = H / 2 - v * (H / 2 - 6);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [vector]);

  return (
    <>
    <div ref={wrapRef} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[#050310]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={() => {
          hoverRef.current = null;
        }}
        role="img"
        aria-label="The whitepaper's tokens as a galaxy in 3D; drag to orbit, scroll to zoom, click a star to inspect a token"
      />

      {grain && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay"
          style={{ backgroundImage: `url(${grain})` }}
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 45%, transparent 55%, rgba(3,2,12,0.7) 100%)",
        }}
      />

      {/* top scrim so the title and downloads stay legible over the core */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[64%] sm:h-[52%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,3,16,0.88) 0%, rgba(5,3,16,0.55) 42%, transparent 100%)",
        }}
      />

      {/* ── overlays ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 flex flex-col">
        <div
          className={`flex items-center justify-between px-6 lg:px-12 ${
            embedded ? "pt-24 lg:pt-28" : "pt-6"
          }`}
        >
          {embedded && onBackToHuman ? (
            <button
              onClick={onBackToHuman}
              className="pointer-events-auto inline-flex items-center gap-2 text-sm text-indigo-200/50 hover:text-white transition-colors"
            >
              <span aria-hidden="true">&larr;</span> Human view
            </button>
          ) : (
            <Link
              href="/whitepaper"
              className="pointer-events-auto inline-flex items-center gap-2 text-sm text-indigo-200/50 hover:text-white transition-colors"
            >
              <span aria-hidden="true">&larr;</span> The paper
            </Link>
          )}
          <span className="rounded-full border border-indigo-200/15 bg-indigo-500/[0.06] backdrop-blur-sm px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-indigo-200/60">
            quirq · draft v3
          </span>
        </div>

        {/* on phones the sky comes first; this intro lives below the fold */}
        <div className="hidden md:block px-6 lg:px-12 pt-8 lg:pt-12 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-indigo-300/50 mb-4">
            The AI view · a simulation
          </p>
          <h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[0.95] text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(105deg, #f1f5ff 20%, #a5b4fc 55%, #22d3ee 90%)",
            }}
          >
            The paper,
            <br />
            tokenised.
          </h1>
          <p className="mt-4 sm:mt-5 text-sm sm:text-[15px] leading-relaxed text-indigo-100/55 max-w-[46ch]">
            What a model sees: every meaningful term in the whitepaper, a star in a vector sky,
            clustered by meaning and sized by how often it burns through the text.
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-indigo-300/45">
            drag to orbit · scroll to zoom · click a star
          </p>

          {/* the paper, ready to ingest: text and vectors for a model */}
          <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-2.5">
            <a
              href="/whitepaper/llm.txt"
              download="quirq-llm.txt"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black h-10 px-5 text-sm font-medium hover:bg-white/90 transition-colors"
            >
              <FileText className="w-4 h-4" aria-hidden="true" /> llm.txt
            </a>
            <a
              href="/whitepaper/vectors.json"
              download="quirq-vectors.json"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/[0.1] backdrop-blur-sm text-cyan-100 h-10 px-5 text-sm font-medium hover:bg-cyan-300/20 transition-colors"
            >
              <Braces className="w-4 h-4 text-cyan-300" aria-hidden="true" /> vectors.json
            </a>
            <a
              href={WHITEPAPER_PDF_DOWNLOAD_PATH}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-200/25 bg-[#0a0722]/50 backdrop-blur-sm text-indigo-100 h-10 px-5 text-sm hover:bg-white/10 transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" /> PDF
            </a>
          </div>
        </div>

        <div className="flex-1" />

        <div className="px-6 lg:px-12 pb-5 lg:pb-6 space-y-3 lg:space-y-4">
          <p className="md:hidden font-mono text-[9px] uppercase tracking-[0.24em] text-indigo-300/50">
            drag to orbit · pinch to zoom · tap a star · scroll for more
          </p>
          <div className="pointer-events-auto hidden sm:block max-w-[680px] rounded-2xl border border-indigo-200/10 bg-[#0a0722]/60 backdrop-blur-md px-4 py-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-indigo-300/45 mb-2.5">
              A sentence enters the model
            </p>
            <TokenizerBar />
          </div>
          <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto sm:flex-wrap sm:overflow-visible -mx-6 px-6 lg:-mx-12 lg:px-12 sm:mx-0 sm:px-0 pb-1 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CLUSTER_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => {
                  setFocusCluster((prev) => (prev === key ? null : key));
                  setSelected(null);
                }}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] backdrop-blur-sm transition-all ${
                  focusCluster === key
                    ? "border-white/40 text-white bg-white/[0.08]"
                    : "border-indigo-200/12 text-indigo-200/50 hover:text-white hover:border-indigo-200/30"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: HUES[key], boxShadow: `0 0 8px ${HUES[key]}` }}
                />
                {clusterLabels[key]}
              </button>
            ))}
            <span className="ml-auto hidden sm:block font-mono text-[10px] tracking-widest text-indigo-200/30">
              {paperTokens.length} TOKENS · REAL COUNTS · SIMULATED SKY
            </span>
          </div>
        </div>
      </div>

      {/* ── the chosen star ──────────────────────────────────── */}
      {selected && (
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 w-[300px] max-sm:inset-x-4 max-sm:bottom-4 max-sm:top-auto max-sm:translate-y-0 max-sm:w-auto rounded-3xl border bg-[#0a0722]/70 backdrop-blur-xl p-6"
          style={{
            borderColor: rgba(hue, 0.35),
            boxShadow: `0 0 60px ${rgba(hue, 0.16)}, inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-display italic text-3xl leading-none text-white break-all">
              {selected.token.t}
            </p>
            <button
              onClick={() => setSelected(null)}
              aria-label="Close token details"
              className="shrink-0 w-7 h-7 rounded-full border border-white/15 text-white/50 hover:text-white transition-colors leading-none"
            >
              &times;
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{ background: rgba(hue, 0.14), color: hue }}
            >
              <span className="w-1 h-1 rounded-full" style={{ background: hue }} />
              {clusterLabels[selected.token.c]}
            </span>
            <span className="font-mono text-[10px] text-indigo-200/40">
              token #{hashToken(selected.token.t) % 50257}
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-2xl" style={{ color: hue }}>
              {selected.token.n}&times;
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-indigo-200/45">
              luminosity · appearances in the paper
            </span>
          </div>

          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.24em] text-indigo-200/45">
            Spectrum · toy embedding
          </p>
          <svg viewBox="0 0 232 56" className="mt-2 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="spec" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor={hue} />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <line x1="0" y1="28" x2="232" y2="28" stroke="rgba(200,210,255,0.12)" strokeDasharray="2 4" />
            <path d={spectrumPath} fill="none" stroke={rgba(hue, 0.25)} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d={spectrumPath} fill="none" stroke="url(#spec)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            {vector.map((v, i) => (
              <circle
                key={i}
                cx={(i / (vector.length - 1)) * 232}
                cy={28 - v * 22}
                r="1.8"
                fill="#fff"
                opacity={0.35 + Math.abs(v) * 0.65}
              />
            ))}
          </svg>

          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.24em] text-indigo-200/45">
            Shares a constellation with
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {neighbors.map((n) => (
              <button
                key={n.token.t}
                onClick={() => choose(n)}
                className="rounded-full border border-indigo-200/15 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-indigo-100/70 hover:text-white transition-all"
                style={{ textShadow: `0 0 10px ${rgba(HUES[n.token.c], 0.7)}` }}
              >
                {n.token.t}
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes starTokenIn {
          from {
            opacity: 0;
            transform: translateY(5px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>

    {/* ── phones: the words arrive after the sky ─────────────── */}
    <section className="md:hidden bg-[#050310] px-6 pt-10 pb-14">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-indigo-300/50 mb-4">
        The AI view · a simulation
      </p>
      <h1
        className="font-display text-4xl tracking-tight leading-[0.95] text-transparent bg-clip-text"
        style={{
          backgroundImage: "linear-gradient(105deg, #f1f5ff 20%, #a5b4fc 55%, #22d3ee 90%)",
        }}
      >
        The paper, tokenised.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-indigo-100/55">
        What a model sees: every meaningful term in the whitepaper, a star in a vector sky,
        clustered by meaning and sized by how often it burns through the text. Tokens and
        counts are real; the geometry is simulated for wonder.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        <a
          href="/whitepaper/llm.txt"
          download="quirq-llm.txt"
          className="inline-flex items-center gap-2 rounded-full bg-white text-black h-10 px-5 text-sm font-medium hover:bg-white/90 transition-colors"
        >
          <FileText className="w-4 h-4" aria-hidden="true" /> llm.txt
        </a>
        <a
          href="/whitepaper/vectors.json"
          download="quirq-vectors.json"
          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/[0.1] text-cyan-100 h-10 px-5 text-sm font-medium hover:bg-cyan-300/20 transition-colors"
        >
          <Braces className="w-4 h-4 text-cyan-300" aria-hidden="true" /> vectors.json
        </a>
        <a
          href={WHITEPAPER_PDF_DOWNLOAD_PATH}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-200/25 bg-[#0a0722]/50 text-indigo-100 h-10 px-5 text-sm hover:bg-white/10 transition-colors"
        >
          <Download className="w-4 h-4" aria-hidden="true" /> PDF
        </a>
      </div>

      <div className="mt-8 rounded-2xl border border-indigo-200/10 bg-[#0a0722]/60 px-4 py-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-indigo-300/45 mb-2.5">
          A sentence enters the model
        </p>
        <TokenizerBar />
      </div>
    </section>
    </>
  );
}
