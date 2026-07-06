"use client";

import { useEffect, useRef } from "react";

// Rotating 3D double-helix (DNA) visualization
export function DnaVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const FOCAL = 320;
    let time = 0;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      // Vertical helix when the box is taller than wide, horizontal otherwise
      const vertical = h > w;
      const span = vertical ? h : w;
      const cross = vertical ? w : h;
      const c = cross * 0.5;
      const radius = Math.min(cross * 0.3, 120);
      const turns = 2.6;
      const points = 90;
      const tilt = (mouseRef.current.y - 0.5) * 0.6;

      type P = { x: number; y: number; z: number; strand: number; idx: number };
      const pts: P[] = [];

      for (let i = 0; i <= points; i++) {
        const frac = i / points;
        const along = span * 0.06 + frac * span * 0.88;
        const angle = frac * Math.PI * 2 * turns + time;
        for (let s = 0; s < 2; s++) {
          const a = angle + s * Math.PI;
          const r3 = Math.cos(a) * radius;
          const z3 = Math.sin(a) * radius;
          const off = c + r3 * Math.cos(tilt) - z3 * Math.sin(tilt) * 0.4;
          const z = z3 * Math.cos(tilt) + r3 * Math.sin(tilt);
          pts.push(
            vertical
              ? { x: off, y: along, z, strand: s, idx: i }
              : { x: along, y: off, z, strand: s, idx: i }
          );
        }
      }

      // Base-pair rungs behind the strands
      for (let i = 0; i <= points; i += 6) {
        const a = pts.find((p) => p.idx === i && p.strand === 0);
        const b = pts.find((p) => p.idx === i && p.strand === 1);
        if (!a || !b) continue;
        const depth = (a.z + b.z) / 2 / radius;
        const alpha = 0.05 + (depth + 1) * 0.09;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(131, 214, 58, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Strand dots, far-to-near
      pts.sort((a, b) => a.z - b.z);
      pts.forEach((p) => {
        const scale = FOCAL / (FOCAL + p.z);
        const r = (p.strand === 0 ? 2.6 : 2.2) * scale;
        const depth = (p.z / radius + 1) / 2;
        const alpha = 0.1 + depth * 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.strand === 0
            ? `rgba(131, 214, 58, ${alpha})`
            : `rgba(255, 255, 255, ${alpha * 0.85})`;
        ctx.fill();
      });

      time += 0.012;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
