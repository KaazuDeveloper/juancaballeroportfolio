"use client";

import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* Flat rounded rectangle with UVs spanning 0–1, for the phone's glass, screen and back. */
function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ShapeGeometry(s, 16);
  const pos = g.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) - x) / w;
    uv[i * 2 + 1] = (pos.getY(i) - y) / h;
  }
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return g;
}

/* iPhone Pro–style: titanium frame, edge-to-edge glass with rounded screen, side buttons, triple camera. */
export function IPhone({ screen }: { screen: THREE.Texture }) {
  const W = 0.164;
  const H = 0.334;
  const D = 0.017;
  const geo = useMemo(
    () => ({
      glass: roundedRect(W - 0.004, H - 0.004, 0.024),
      display: roundedRect(0.148, 0.3203, 0.02),
      back: roundedRect(W - 0.004, H - 0.004, 0.024),
    }),
    [],
  );
  const titanium = { color: "#a6a39c", metalness: 0.92, roughness: 0.32 } as const;
  const lens = (x: number, y: number) => (
    <group key={`${x}${y}`} position={[x, y, -0.0035]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.0118, 0.0118, 0.004, 40]} />
        <meshStandardMaterial {...titanium} />
      </mesh>
      <mesh position={[0, -0.0021, 0]}>
        <cylinderGeometry args={[0.0088, 0.0088, 0.001, 40]} />
        <meshPhysicalMaterial color="#0b0d14" roughness={0.05} clearcoat={1} metalness={0.3} />
      </mesh>
    </group>
  );

  return (
    <group>
      {/* Titanium band */}
      <RoundedBox args={[W, H, D]} radius={0.026} smoothness={10}>
        <meshStandardMaterial {...titanium} />
      </RoundedBox>

      {/* Front: black glass, then the rounded display */}
      <mesh geometry={geo.glass} position={[0, 0, D / 2 + 0.0002]}>
        <meshPhysicalMaterial color="#050506" roughness={0.04} clearcoat={1} clearcoatRoughness={0.03} />
      </mesh>
      <mesh geometry={geo.display} position={[0, 0, D / 2 + 0.0004]}>
        <meshBasicMaterial map={screen} toneMapped={false} />
      </mesh>

      {/* Back: frosted glass with the camera plateau */}
      <mesh geometry={geo.back} position={[0, 0, -D / 2 - 0.0002]} rotation={[0, Math.PI, 0]}>
        <meshPhysicalMaterial color="#3a3936" roughness={0.45} clearcoat={0.4} />
      </mesh>
      <group position={[0.038, 0.118, -D / 2 - 0.0004]}>
        <RoundedBox args={[0.072, 0.072, 0.004]} radius={0.016} smoothness={6} position={[0, 0, -0.0016]}>
          <meshPhysicalMaterial color="#3f3e3a" roughness={0.3} clearcoat={0.6} />
        </RoundedBox>
        {lens(-0.016, 0.016)}
        {lens(-0.016, -0.016)}
        {lens(0.017, 0)}
        <mesh position={[0.018, 0.022, -0.0037]}>
          <circleGeometry args={[0.004, 24]} />
          <meshStandardMaterial color="#f4ead2" emissive="#3a3220" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Side buttons: action + volume on the left, power on the right */}
      <RoundedBox args={[0.003, 0.016, 0.006]} radius={0.0014} position={[-W / 2 - 0.0008, 0.098, 0]}>
        <meshStandardMaterial {...titanium} />
      </RoundedBox>
      <RoundedBox args={[0.003, 0.026, 0.006]} radius={0.0014} position={[-W / 2 - 0.0008, 0.062, 0]}>
        <meshStandardMaterial {...titanium} />
      </RoundedBox>
      <RoundedBox args={[0.003, 0.026, 0.006]} radius={0.0014} position={[-W / 2 - 0.0008, 0.03, 0]}>
        <meshStandardMaterial {...titanium} />
      </RoundedBox>
      <RoundedBox args={[0.003, 0.038, 0.006]} radius={0.0014} position={[W / 2 + 0.0008, 0.05, 0]}>
        <meshStandardMaterial {...titanium} />
      </RoundedBox>
    </group>
  );
}
