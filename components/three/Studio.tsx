"use client";

import { useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { CHAT, TESTS } from "@/lib/demo";
import { IPhone } from "./IPhone";
import { CODE_CHARS, PRETYPED_CHARS, drawChat, drawCode, drawDeploy, drawTests } from "./screens";

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutBack = (t: number) => 1 + 2.15 * Math.pow(t - 1, 3) + 1.15 * Math.pow(t - 1, 2);

/*
 * Scroll timeline (0–1): listen → code → test → deliver.
 * The captions in Showcase.tsx switch at the same points.
 */
const T = {
  chat: [0.02, 0.16],
  phoneOut: [0.19, 0.27],
  turn: [0.18, 0.3],
  power: [0.22, 0.28],
  typing: [0.31, 0.43],
  toTests: [0.46, 0.51],
  tests: [0.51, 0.6],
  toDeploy: [0.63, 0.68],
  deploy: [0.68, 0.75],
  phoneBack: [0.76, 0.88],
} as const;

const FOV = 30;
const SCREEN = { w: 0.87, h: 0.54375, y: 0.12 };
const WIDE = { w: 1.25, h: 1.08, y: -0.02 };
const PHONE_SCALE = 1.3;
const PHONE_FRONT = new THREE.Vector3(0, 0.06, 0.5);

type Shot = { p: number; kind: "phone" | "screen" | "wide"; zoom: number; x?: number; lift?: number; lookX?: number };
const SHOTS: Shot[] = [
  { p: 0, kind: "phone", zoom: 1.1 },
  { p: 0.15, kind: "phone", zoom: 1.0 },
  { p: 0.24, kind: "wide", zoom: 1.05, lift: 0.1 },
  { p: 0.31, kind: "screen", zoom: 1.08 },
  { p: 0.43, kind: "screen", zoom: 1.0 },
  { p: 0.62, kind: "screen", zoom: 1.02 },
  { p: 0.74, kind: "screen", zoom: 1.04 },
  { p: 0.82, kind: "wide", zoom: 0.94, x: 0.05, lift: 0.06 },
  { p: 0.92, kind: "wide", zoom: 0.9, x: 0.3, lift: 0.08, lookX: 0.04 },
  { p: 1, kind: "wide", zoom: 0.88, x: 0.36, lift: 0.09, lookX: 0.04 },
];

function useCanvasTexture(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    draw(ctx);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    const shown = { value: NaN };
    /* Redraw only when the value shown on screen changes. */
    const show = (value: number, fn: (ctx: CanvasRenderingContext2D, v: number) => void) => {
      if (value === shown.value) return;
      shown.value = value;
      fn(ctx, value);
      tex.needsUpdate = true;
    };
    /* Show only the left `r` (0–1) of the texture, for wipe transitions. */
    const reveal = (r: number) => {
      tex.repeat.x = Math.max(0.0001, r);
    };
    return { tex, show, reveal };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);
}

function CameraRig({ progress }: { progress: MotionValue<number> }) {
  const { camera, size } = useThree();
  const pos = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const cur = useRef(PHONE_FRONT.clone());

  useFrame((_, dt) => {
    const p = progress.get();
    const aspect = size.width / size.height;
    const t = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const fit = (w: number, h: number) => Math.max(w / (2 * t * aspect), h / (2 * t));
    // Portrait: a little more room on the wide shots so the phone is never cut off, and the
    // screen shots go edge to edge (only the aluminium bezel is cropped) so the code is bigger.
    const dWide = fit(aspect < 1 ? WIDE.w * 1.2 : WIDE.w, WIDE.h);
    const dScreen = aspect < 1 ? fit(SCREEN.w, SCREEN.h) : fit(SCREEN.w * 1.06, SCREEN.h * 1.06);
    const dPhone = fit(0.164 * PHONE_SCALE * 1.5, 0.334 * PHONE_SCALE * 1.25);
    const orbit = aspect < 1 ? 0.4 : 1;

    const shotLook = (s: Shot) => {
      if (s.kind === "phone") return PHONE_FRONT.clone();
      if (s.kind === "screen") return new THREE.Vector3(0, SCREEN.y, 0);
      return new THREE.Vector3((s.lookX ?? 0) * orbit, WIDE.y, 0);
    };
    const shotPos = (s: Shot) => {
      if (s.kind === "phone") return PHONE_FRONT.clone().add(new THREE.Vector3(0, 0.02, dPhone * s.zoom));
      if (s.kind === "screen") return new THREE.Vector3(0, SCREEN.y, dScreen * s.zoom);
      return new THREE.Vector3((s.x ?? 0) * orbit, WIDE.y + (s.lift ?? 0), dWide * s.zoom);
    };

    let i = SHOTS.findIndex((s) => s.p > p);
    if (i === -1) i = SHOTS.length - 1;
    const a = SHOTS[Math.max(0, i - 1)];
    const b = SHOTS[i];
    const k = b.p === a.p ? 1 : smooth(a.p, b.p, p);
    pos.lerpVectors(shotPos(a), shotPos(b), k);
    look.lerpVectors(shotLook(a), shotLook(b), k);

    const damp = 1 - Math.exp(-dt * 12);
    camera.position.lerp(pos, damp);
    cur.current.lerp(look, damp);
    camera.lookAt(cur.current);
  });
  return null;
}

const alu = { color: "#e2e2e6", metalness: 0.7, roughness: 0.32 } as const;

type WipeRefs = { mesh: RefObject<THREE.Mesh | null>; line: RefObject<THREE.Mesh | null> };

/* A full-screen layer on the monitor that wipes in from the left over the one below it. */
function WipeLayer({
  tex,
  z,
  meshRef,
  lineRef,
}: {
  tex: THREE.Texture;
  z: number;
  meshRef: RefObject<THREE.Mesh | null>;
  lineRef: RefObject<THREE.Mesh | null>;
}) {
  return (
    <>
      <mesh ref={meshRef} position={[0, 0, z]} visible={false}>
        <planeGeometry args={[SCREEN.w, SCREEN.h]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <mesh ref={lineRef} position={[0, 0, z + 0.0004]} visible={false}>
        <planeGeometry args={[0.006, SCREEN.h]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
    </>
  );
}

function applyWipe(r: number, layer: { reveal: (r: number) => void }, refs: WipeRefs) {
  layer.reveal(r);
  const mesh = refs.mesh.current;
  const line = refs.line.current;
  if (mesh) {
    mesh.visible = r > 0.001;
    mesh.scale.x = Math.max(0.0001, r);
    mesh.position.x = -SCREEN.w / 2 + (SCREEN.w * r) / 2;
  }
  if (line) {
    line.visible = r > 0.001 && r < 0.999;
    line.position.x = -SCREEN.w / 2 + SCREEN.w * r;
  }
}

function Monitor({ progress }: { progress: MotionValue<number> }) {
  const { size } = useThree();
  const portrait = size.width < size.height;
  const group = useRef<THREE.Group>(null);
  const codeMat = useRef<THREE.MeshBasicMaterial>(null);
  const testsMesh = useRef<THREE.Mesh>(null);
  const testsLine = useRef<THREE.Mesh>(null);
  const deployMesh = useRef<THREE.Mesh>(null);
  const deployLine = useRef<THREE.Mesh>(null);
  const code = useCanvasTexture(1280, 800, (ctx) => drawCode(ctx, PRETYPED_CHARS));
  const testsTex = useCanvasTexture(1280, 800, (ctx) => drawTests(ctx, 0));
  const deployTex = useCanvasTexture(1280, 800, (ctx) => drawDeploy(ctx, 0));

  useFrame(({ clock }) => {
    const p = progress.get();

    code.show(
      Math.round(PRETYPED_CHARS + (CODE_CHARS - PRETYPED_CHARS) * smooth(T.typing[0], T.typing[1], p)),
      drawCode,
    );
    testsTex.show(
      Math.floor(clamp01((p - T.tests[0]) / (T.tests[1] - T.tests[0])) * (TESTS.length + 0.999)),
      drawTests,
    );
    deployTex.show(Math.round(clamp01((p - T.deploy[0]) / (T.deploy[1] - T.deploy[0])) * 50) / 50, drawDeploy);

    codeMat.current?.color.setScalar(smooth(T.power[0], T.power[1], p));
    applyWipe(smooth(T.toTests[0], T.toTests[1], p), testsTex, { mesh: testsMesh, line: testsLine });
    applyWipe(smooth(T.toDeploy[0], T.toDeploy[1], p), deployTex, { mesh: deployMesh, line: deployLine });

    const g = group.current;
    if (!g) return;
    // Off-stage while the phone has the scene to itself, then slides in from the left
    // as the phone leaves to the right.
    const turn = smooth(T.turn[0], T.turn[1], p);
    const aside = smooth(T.phoneBack[0], T.phoneBack[1], p);
    const idle = Math.sin(clock.elapsedTime * 0.5) * 0.012;
    g.visible = turn > 0.001;
    g.rotation.set(lerp(-0.06, 0, turn), lerp(0.6, 0, turn) + aside * 0.12 + idle, 0);
    g.position.set(lerp(-1.5, 0, turn) - aside * (portrait ? 0.06 : 0.13), 0, lerp(-0.3, 0, turn));
    g.scale.setScalar(lerp(0.92, 1, turn));
  });

  return (
    <group ref={group}>
      <group position={[0, SCREEN.y, 0]}>
        <RoundedBox args={[0.905, 0.575, 0.024]} radius={0.016} smoothness={5} position={[0, 0, -0.015]}>
          <meshStandardMaterial {...alu} />
        </RoundedBox>
        <RoundedBox args={[0.9, 0.57, 0.004]} radius={0.004} position={[0, 0, -0.0025]}>
          <meshPhysicalMaterial color="#050506" roughness={0.06} clearcoat={1} clearcoatRoughness={0.04} />
        </RoundedBox>
        <mesh position={[0, 0, 0.0005]}>
          <planeGeometry args={[SCREEN.w, SCREEN.h]} />
          <meshBasicMaterial ref={codeMat} map={code.tex} toneMapped={false} color="#000000" />
        </mesh>
        <WipeLayer tex={testsTex.tex} z={0.001} meshRef={testsMesh} lineRef={testsLine} />
        <WipeLayer tex={deployTex.tex} z={0.002} meshRef={deployMesh} lineRef={deployLine} />
        <RoundedBox args={[0.16, 0.44, 0.012]} radius={0.005} position={[0, -0.3, -0.085]} rotation={[-0.24, 0, 0]}>
          <meshStandardMaterial {...alu} />
        </RoundedBox>
        <RoundedBox args={[0.24, 0.008, 0.2]} radius={0.004} position={[0, -0.508, -0.05]}>
          <meshStandardMaterial {...alu} />
        </RoundedBox>
      </group>
    </group>
  );
}

/* Messages visible on the phone: the brief at the start, the delivery at the end. */
const chatCount = (p: number) => {
  if (p < T.phoneBack[0]) return 1 + Math.floor(clamp01((p - T.chat[0]) / (T.chat[1] - T.chat[0])) * 3.999);
  if (p < 0.84) return 4;
  return p < 0.9 ? 5 : CHAT.length;
};

function PhoneModel({ progress }: { progress: MotionValue<number> }) {
  const chat = useCanvasTexture(780, 1688, (ctx) => drawChat(ctx, 1));
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();
  const restX = size.width < size.height ? 0.37 : 0.43;

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const p = progress.get();
    chat.show(chatCount(p), drawChat);
    g.scale.setScalar(PHONE_SCALE);
    const sway = Math.sin(clock.elapsedTime * 0.8);

    if (p < T.phoneBack[0]) {
      // Front and centre for the conversation, then out to the right.
      const out = smooth(T.phoneOut[0], T.phoneOut[1], p);
      g.visible = out < 0.999;
      g.position.set(
        lerp(PHONE_FRONT.x, 1.7, out),
        lerp(PHONE_FRONT.y, -0.15, out) + sway * 0.004,
        lerp(PHONE_FRONT.z, 0.3, out),
      );
      g.rotation.set(lerp(0, 0.2, out), lerp(sway * 0.05, -1.5, out), lerp(0, 0.3, out));
      return;
    }
    // Back in, beside the monitor, for the client's reply.
    const s = smooth(T.phoneBack[0], T.phoneBack[1], p);
    const m = easeOutBack(s);
    g.visible = s > 0.001;
    g.position.set(lerp(1.5, restX, m), lerp(-0.55, -0.155, m) + sway * 0.006 * s, lerp(0.6, 0.3, s));
    g.rotation.set(lerp(0.5, -0.04, s), lerp(-2.7, -0.3, s), lerp(0.45, 0.02, s));
  });

  return (
    <group ref={group}>
      <IPhone screen={chat.tex} />
    </group>
  );
}

export default function Studio({
  progress,
  active,
  fallback,
}: {
  progress: MotionValue<number>;
  active: boolean;
  fallback: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  return (
    <div className={`h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
      <Canvas
        dpr={[1, 1.75]}
        frameloop={active ? "always" : "never"}
        camera={{ fov: FOV, near: 0.05, far: 20, position: [0, 0.08, 2] }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NeutralToneMapping;
          requestAnimationFrame(() => setReady(true));
        }}
        fallback={fallback}
        aria-label="Un iPhone con la conversación con un cliente y un monitor donde se programa, se prueba y se publica el proyecto"
      >
        <color attach="background" args={["#f5f5f7"]} />
        <CameraRig progress={progress} />
        <hemisphereLight args={["#ffffff", "#e6e6ea", 0.9]} />
        <directionalLight position={[2, 3, 3]} intensity={1.6} />
        <directionalLight position={[-3, 1.5, 2]} intensity={0.5} />
        <Environment resolution={128} frames={1}>
          <Lightformer intensity={1.6} position={[0, 4, 3]} rotation-x={Math.PI / 2} scale={[8, 3, 1]} />
          <Lightformer intensity={1} position={[-4, 1, 2]} rotation-y={Math.PI / 2} scale={[4, 3, 1]} />
          <Lightformer intensity={1} position={[4, 1, 2]} rotation-y={-Math.PI / 2} scale={[4, 3, 1]} />
          <Lightformer intensity={0.6} position={[0, 0, -4]} scale={[8, 3, 1]} />
        </Environment>

        <Monitor progress={progress} />
        <PhoneModel progress={progress} />

        <ContactShadows position={[0, -0.395, 0]} opacity={0.32} scale={4} blur={2.4} far={0.9} resolution={256} />
      </Canvas>
    </div>
  );
}
