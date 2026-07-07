"use client";

/* ────────────────────────────────────────────────────────────────
   Spend bends the space. Value climbs out.

   The whitepaper's Table 1 as general relativity: the fabric is
   the space where work happens, every cost source is a mass that
   bends it into a gravity well (depth = dollars), units of work
   ride the curvature as geodesic particles, and the minted quirqs
   escape as a lime beam (height = verified value). Month to month
   the same energy bends less space per quirq: that falling
   curvature-per-quirq IS the optimization the paper measures.
──────────────────────────────────────────────────────────────── */

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mulberry32, OrbitRig, TextSprite, type OrbitApi } from "./three-helpers";
import type { LedgerMonth } from "@/lib/quirq-data";

const LIME = "#83d63a";
/** Declared scales: well depth $1,000 per unit; beam 5,000 quirqs per unit. */
export const DOLLARS_PER_DEPTH = 1000;
export const QUIRQS_PER_HEIGHT = 5000;

const FABRIC_X = 15;
const FABRIC_Z = 10;
const BEAM = new THREE.Vector3(8.2, 0, 1.0);

/** The three energy sources and where their masses sit on the fabric.
    labelY staggers the floating captions so they never collide. */
const MASSES = [
  { key: "inference", label: "inference", color: "#9aa096", x: -7, z: -2.2, labelY: 2.1 },
  { key: "computeApi", label: "compute + API", color: "#565b52", x: -3.4, z: 4.4, labelY: 1.0 },
  { key: "intervention", label: "human intervention", color: "#8a7a58", x: 2.6, z: -2.8, labelY: 1.65 },
] as const;

type WellState = { depth: number; radius: number };
type Animated = {
  wells: [WellState, WellState, WellState];
  beamH: number;
};

function monthTargets(m: LedgerMonth): Animated {
  const spend = [m.inference, m.computeApi, m.intervention];
  return {
    wells: spend.map((s) => ({
      depth: s / DOLLARS_PER_DEPTH,
      radius: 1.35 + Math.sqrt(s) / 34,
    })) as Animated["wells"],
    beamH: m.minted / QUIRQS_PER_HEIGHT,
  };
}

function fabricDepthAt(x: number, z: number, anim: Animated, t: number) {
  let y = 0;
  for (let i = 0; i < MASSES.length; i++) {
    const dx = x - MASSES[i].x;
    const dz = z - MASSES[i].z;
    const w = anim.wells[i];
    const q = 1 + (dx * dx + dz * dz) / (w.radius * w.radius);
    y -= w.depth / (q * Math.sqrt(q));
  }
  /* the value column lifts the fabric slightly: curvature spent well */
  const bx = x - BEAM.x;
  const bz = z - BEAM.z;
  y += 0.35 * (anim.beamH / 7.6) * Math.exp(-(bx * bx + bz * bz) / 3.2);
  /* faint breathing so the fabric reads as alive, not a chart */
  y += 0.045 * Math.sin(x * 0.7 + t * 0.6) * Math.sin(z * 0.9 + t * 0.45);
  return y;
}

/* ── the fabric: a displaced line grid with depth-tinted colors ── */
function Fabric({ anim }: { anim: React.MutableRefObject<Animated> }) {
  const lineStep = 0.6;
  const sampleStep = 0.3;

  const { geometry, basePts } = useMemo(() => {
    const pts: number[] = [];
    /* lines along x (constant z) */
    for (let z = -FABRIC_Z; z <= FABRIC_Z + 1e-6; z += lineStep) {
      for (let x = -FABRIC_X; x < FABRIC_X - 1e-6; x += sampleStep) {
        pts.push(x, 0, z, x + sampleStep, 0, z);
      }
    }
    /* lines along z (constant x) */
    for (let x = -FABRIC_X; x <= FABRIC_X + 1e-6; x += lineStep) {
      for (let z = -FABRIC_Z; z < FABRIC_Z - 1e-6; z += sampleStep) {
        pts.push(x, 0, z, x, 0, z + sampleStep);
      }
    }
    const base = new Float32Array(pts);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(base), 3));
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(base.length), 3));
    return { geometry: g, basePts: base };
  }, []);

  const deep = new THREE.Color("#a8834a");
  const flat = new THREE.Color("#3c423a");
  const lime = new THREE.Color(LIME);
  const tint = new THREE.Color();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const a = anim.current;
    const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
    const col = geometry.getAttribute("color") as THREE.BufferAttribute;
    const maxDepth = Math.max(a.wells[0].depth, a.wells[1].depth, a.wells[2].depth, 0.001);
    for (let i = 0; i < pos.count; i++) {
      const x = basePts[i * 3];
      const z = basePts[i * 3 + 2];
      const y = fabricDepthAt(x, z, a, t);
      pos.setY(i, y);
      const depthFrac = THREE.MathUtils.clamp(-y / maxDepth, 0, 1);
      tint.copy(flat).lerp(deep, Math.pow(depthFrac, 1.4));
      const bx = x - BEAM.x;
      const bz = z - BEAM.z;
      const nearBeam = Math.exp(-(bx * bx + bz * bz) / 5);
      tint.lerp(lime, nearBeam * 0.55);
      col.setXYZ(i, tint.r, tint.g, tint.b);
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;
  });

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
    </lineSegments>
  );
}

/* ── the masses that do the bending ───────────────────────────── */
function Masses({ anim, month }: { anim: React.MutableRefObject<Animated>; month: LedgerMonth }) {
  const refs = useRef<(THREE.Group | null)[]>([null, null, null]);
  const spend = [month.inference, month.computeApi, month.intervention];

  useFrame(() => {
    const a = anim.current;
    refs.current.forEach((g, i) => {
      if (!g) return;
      const w = a.wells[i];
      g.position.y = -w.depth + 0.12;
      const s = 0.34 + w.depth * 0.14;
      g.scale.setScalar(s);
    });
  });

  return (
    <group>
      {MASSES.map((m, i) => (
        <group key={m.key}>
          <group ref={(el) => void (refs.current[i] = el)} position={[m.x, 0, m.z]}>
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial
                color={m.color}
                emissive={m.color}
                emissiveIntensity={0.45}
                roughness={0.35}
                metalness={0.4}
              />
            </mesh>
          </group>
          <TextSprite
            text={`${m.label} · $${spend[i].toLocaleString()}`}
            position={[m.x, m.labelY, m.z]}
            height={0.4}
            color="rgba(255,255,255,0.7)"
          />
        </group>
      ))}
    </group>
  );
}

/* ── the value beam: minted quirqs escaping the wells ─────────── */
function ValueBeam({ anim, month }: { anim: React.MutableRefObject<Animated>; month: LedgerMonth }) {
  const halo = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const points = useRef<THREE.Points>(null);

  const COUNT = 46;
  const { geometry, seeds } = useMemo(() => {
    const rand = mulberry32(77);
    const s = new Float32Array(COUNT * 3); /* angle, radius, phase */
    const p = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      s[i * 3] = rand() * Math.PI * 2;
      s[i * 3 + 1] = 0.1 + rand() * 0.42;
      s[i * 3 + 2] = rand();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    return { geometry: g, seeds: s };
  }, []);

  /* unit-height cylinders anchored at the floor, scaled to beamH */
  const haloGeom = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.5, 0.62, 1, 24, 1, true);
    g.translate(0, 0.5, 0);
    return g;
  }, []);
  const coreGeom = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.1, 0.1, 1, 12, 1, true);
    g.translate(0, 0.5, 0);
    return g;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const h = anim.current.beamH;
    if (halo.current) halo.current.scale.set(1, h, 1);
    if (core.current) core.current.scale.set(1, h, 1);
    const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      const angle = seeds[i * 3] + t * 0.5;
      const radius = seeds[i * 3 + 1];
      const phase = seeds[i * 3 + 2];
      const y = ((t * 0.22 + phase) % 1) * h;
      pos.setXYZ(i, Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    }
    pos.needsUpdate = true;
  });

  return (
    <group position={[BEAM.x, 0, BEAM.z]}>
      <mesh ref={halo} geometry={haloGeom}>
        <meshBasicMaterial
          color={LIME}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={core} geometry={coreGeom}>
        <meshBasicMaterial
          color={LIME}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <points ref={points} geometry={geometry}>
        <pointsMaterial
          color={LIME}
          size={0.09}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
      <BeamLabel month={month} />
    </group>
  );
}

function BeamLabel({ month }: { month: LedgerMonth }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (group.current) {
      /* hug the beam top, but never leave the frame on tall months */
      group.current.position.y = Math.min(month.minted / QUIRQS_PER_HEIGHT + 0.8, 6.6);
    }
  });
  return (
    <group ref={group}>
      <TextSprite
        text={`Q minted · ${month.minted.toLocaleString()} quirqs`}
        position={[0, 0, 0]}
        height={0.46}
        color="rgba(131,214,58,0.95)"
      />
      <TextSprite
        text={`QER ${month.qer.toFixed(1)}x`}
        position={[0, -0.55, 0]}
        height={0.34}
        color="rgba(131,214,58,0.6)"
      />
    </group>
  );
}

/* ── geodesics: units of work riding the curvature to the beam ── */
function Geodesics({ anim }: { anim: React.MutableRefObject<Animated> }) {
  const COUNT = 64;
  const { geometry, curves, meta } = useMemo(() => {
    const rand = mulberry32(20260708);
    const paths: THREE.CatmullRomCurve3[] = [];
    for (let c = 0; c < 12; c++) {
      const side = rand();
      const start = new THREE.Vector3(
        side < 0.5 ? -FABRIC_X : -FABRIC_X + rand() * 8,
        0,
        side < 0.5 ? (rand() * 2 - 1) * FABRIC_Z : rand() < 0.5 ? -FABRIC_Z : FABRIC_Z,
      );
      const well = MASSES[Math.floor(rand() * MASSES.length)];
      const wellPos = new THREE.Vector3(well.x, 0, well.z);
      const mid1 = start.clone().lerp(wellPos, 0.55);
      mid1.x += (rand() - 0.5) * 2;
      mid1.z += (rand() - 0.5) * 2;
      /* swing past the well, then out to the beam: the gravity assist */
      const tangent = new THREE.Vector3(-(wellPos.z - mid1.z), 0, wellPos.x - mid1.x)
        .normalize()
        .multiplyScalar(1.4 + rand() * 1.2);
      const mid2 = wellPos.clone().add(tangent);
      const mid3 = mid2.clone().lerp(BEAM, 0.6);
      paths.push(
        new THREE.CatmullRomCurve3([start, mid1, mid2, mid3, BEAM.clone()], false, "catmullrom", 0.6),
      );
    }
    const m = new Float32Array(COUNT * 3); /* curveIndex, speed, phase */
    for (let i = 0; i < COUNT; i++) {
      m[i * 3] = Math.floor(rand() * paths.length);
      m[i * 3 + 1] = 0.045 + rand() * 0.05;
      m[i * 3 + 2] = rand();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
    return { geometry: g, curves: paths, meta: m };
  }, []);

  const v = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const a = anim.current;
    const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      const curve = curves[meta[i * 3]];
      const u = (t * meta[i * 3 + 1] + meta[i * 3 + 2]) % 1;
      curve.getPointAt(u, v);
      /* ride the fabric: sample the same displacement the grid uses */
      const y = fabricDepthAt(v.x, v.z, a, t) + 0.09;
      pos.setXYZ(i, v.x, y, v.z);
    }
    pos.needsUpdate = true;
  });

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color="#ffffff"
        size={0.11}
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/** Lerps the animated well/beam state toward the selected month. */
function TargetsRig({
  anim,
  month,
}: {
  anim: React.MutableRefObject<Animated>;
  month: LedgerMonth;
}) {
  const target = monthTargets(month);
  useFrame((_, dt) => {
    const k = 1 - Math.exp(-3 * dt);
    const a = anim.current;
    for (let i = 0; i < 3; i++) {
      a.wells[i].depth += (target.wells[i].depth - a.wells[i].depth) * k;
      a.wells[i].radius += (target.wells[i].radius - a.wells[i].radius) * k;
    }
    a.beamH += (target.beamH - a.beamH) * k;
  });
  return null;
}

export function SpacetimeScene({
  month,
  orbitApi,
}: {
  month: LedgerMonth;
  orbitApi: React.MutableRefObject<OrbitApi | null>;
}) {
  const anim = useRef<Animated>(monthTargets(month));

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 39, near: 0.1, far: 140 }}
      gl={{ antialias: true, alpha: false }}
      style={{ touchAction: "pan-y" }}
    >
      <color attach="background" args={["#000000"]} />
      <fogExp2 attach="fog" args={["#000000", 0.016]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 12, 6]} intensity={0.9} />
      <directionalLight position={[-8, 5, -10]} intensity={0.3} color={LIME} />

      <OrbitRig
        target={[1.6, 0.4, 0]}
        radius={21.5}
        api={orbitApi}
        azimuth={0.42}
        polar={1.04}
        minPolar={0.35}
        maxPolar={1.32}
      />
      <TargetsRig anim={anim} month={month} />

      <Fabric anim={anim} />
      <Masses anim={anim} month={month} />
      <ValueBeam anim={anim} month={month} />
      <Geodesics anim={anim} />

      {/* declared scales, in the scene where the shapes are */}
      <TextSprite
        text="well depth: $1,000 per unit"
        position={[-11.5, -3.4, 8]}
        height={0.34}
        color="rgba(255,255,255,0.3)"
      />
      <TextSprite
        text="beam: 5,000 quirqs per unit"
        position={[6.2, 0.75, 4.2]}
        height={0.3}
        color="rgba(131,214,58,0.45)"
      />
    </Canvas>
  );
}
