"use client";

import { useEffect, useRef } from "react";

/* The quirq field: particles drift up as dim work-in-progress, flash
   at the moment of verification, and float on as minted quirqs. Some
   carry fragments of the paper's own arithmetic. */

const LABELS = ["V·B", "quirq", "V=0.94", "B=$120", "Q=112.8", "QER 3.1", "done"];

type Particle = {
  x: number;
  y: number;
  vy: number;
  drift: number;
  phase: number;
  r: number;
  mintAt: number; // 0..1 fraction of height where it mints
  label?: string;
};

export function QuirqField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 46;
    const particles: Particle[] = Array.from({ length: COUNT }, (_, i) => {
      const seed = i * 2.399963; // golden angle spreads positions
      return {
        x: (seed % 1),
        y: Math.random(),
        vy: 0.00045 + (seed % 0.0009),
        drift: ((seed * 7) % 1) * 0.0006 - 0.0003,
        phase: seed,
        r: 1.6 + ((seed * 13) % 2.4),
        mintAt: 0.35 + ((seed * 17) % 0.3),
        label: i % 6 === 0 ? LABELS[(i / 6) % LABELS.length | 0] : undefined,
      };
    });

    let t = 0;
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.y -= p.vy;
        p.x += p.drift + Math.sin(t * 0.6 + p.phase) * 0.00018;
        if (p.y < -0.06) {
          p.y = 1.05;
          p.x = Math.random();
        }

        const x = p.x * w;
        const y = p.y * h;
        const minted = p.y < p.mintAt;

        // Mint flash: a brief expanding ring right as it crosses the line
        const sinceMint = p.mintAt - p.y;
        if (minted && sinceMint < 0.045) {
          const k = sinceMint / 0.045; // 0..1
          ctx.beginPath();
          ctx.arc(x, y, p.r + k * 16, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(131, 214, 58, ${0.5 * (1 - k)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        const pulse = Math.sin(t * 1.4 + p.phase) * 0.5 + 0.5;
        const alpha = minted ? 0.35 + pulse * 0.45 : 0.08 + pulse * 0.08;
        ctx.beginPath();
        ctx.arc(x, y, p.r + (minted ? pulse * 0.7 : 0), 0, Math.PI * 2);
        ctx.fillStyle = minted
          ? `rgba(131, 214, 58, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        if (p.label && minted) {
          ctx.font = "10px var(--font-jetbrains), ui-monospace, monospace";
          ctx.fillStyle = `rgba(131, 214, 58, ${0.25 + pulse * 0.3})`;
          ctx.fillText(p.label, x + p.r + 5, y + 3);
        }
      });

      t += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
