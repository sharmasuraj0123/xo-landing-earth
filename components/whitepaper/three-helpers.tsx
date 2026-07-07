"use client";

/* Shared three.js helpers for the whitepaper visualizations:
   seeded rng, canvas-texture text sprites (no drei), and the
   hand-rolled damped orbit rig. */

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Deterministic rng so scenes are stable frame to frame. */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeLabelTexture(text: string, color: string) {
  const font = `500 48px ui-monospace, "JetBrains Mono", Menlo, monospace`;
  const probe = document.createElement("canvas").getContext("2d")!;
  probe.font = font;
  const w = Math.ceil(probe.measureText(text).width) + 24;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = 72;
  const ctx = canvas.getContext("2d")!;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.fillText(text, 12, 38);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function TextSprite({
  text,
  position,
  height = 0.5,
  color = "rgba(255,255,255,0.55)",
}: {
  text: string;
  position: [number, number, number];
  height?: number;
  color?: string;
}) {
  const texture = useMemo(() => makeLabelTexture(text, color), [text, color]);
  const aspect = (texture.image as HTMLCanvasElement).width / 72;
  return (
    <sprite position={position} scale={[height * aspect, height, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  );
}

export type OrbitApi = { zoom: (delta: number) => void };

export function OrbitRig({
  target,
  radius,
  api,
  azimuth = 0.55,
  polar = 1.12,
  minPolar = 0.5,
  maxPolar = 1.45,
}: {
  target: [number, number, number];
  radius: number;
  api: React.MutableRefObject<OrbitApi | null>;
  azimuth?: number;
  polar?: number;
  minPolar?: number;
  maxPolar?: number;
}) {
  const { camera, gl } = useThree();
  const s = useRef({
    az: azimuth,
    pol: polar,
    r: radius,
    tAz: azimuth,
    tPol: polar,
    tR: radius,
    lastInput: 0,
  });

  useEffect(() => {
    api.current = {
      zoom: (delta: number) => {
        const st = s.current;
        st.tR = THREE.MathUtils.clamp(st.tR + delta, radius * 0.55, radius * 1.6);
        st.lastInput = performance.now();
      },
    };
  }, [api, radius]);

  useEffect(() => {
    const el = gl.domElement;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const st = s.current;
      st.tAz -= (e.clientX - lastX) * 0.005;
      st.tPol = THREE.MathUtils.clamp(
        st.tPol - (e.clientY - lastY) * 0.004,
        minPolar,
        maxPolar,
      );
      lastX = e.clientX;
      lastY = e.clientY;
      st.lastInput = performance.now();
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl, minPolar, maxPolar]);

  useFrame((_, dt) => {
    const st = s.current;
    if (performance.now() - st.lastInput > 4000) st.tAz += 0.03 * dt;
    const k = 1 - Math.exp(-6 * dt);
    st.az += (st.tAz - st.az) * k;
    st.pol += (st.tPol - st.pol) * k;
    st.r += (st.tR - st.r) * k;
    const sin = Math.sin(st.pol);
    camera.position.set(
      target[0] + st.r * sin * Math.sin(st.az),
      target[1] + st.r * Math.cos(st.pol),
      target[2] + st.r * sin * Math.cos(st.az),
    );
    camera.lookAt(target[0], target[1], target[2]);
  });
  return null;
}
