"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import { sceneTarget } from "@/lib/sceneStore";

const LERP = 0.06;

function Rig({ lowPower }: { lowPower: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });

  useFrame(({ camera, pointer: p }) => {
    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, p.x, 0.03);
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, p.y, 0.03);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.current.x * 0.5, LERP);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.current.y * 0.3, LERP);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, sceneTarget.cameraZ, LERP);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Centerpiece({ lowPower }: { lowPower: boolean }) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<any>(null);
  const color = useMemo(() => new THREE.Color(sceneTarget.color), []);
  const wireframe = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!group.current) return;

    const targetColor = tmpColor.set(sceneTarget.color);
    color.lerp(targetColor, 0.05);

    if (material.current) {
      material.current.color = color;
      material.current.distort = THREE.MathUtils.lerp(
        material.current.distort ?? 0.3,
        sceneTarget.distort,
        0.04
      );
    }

    const speed = sceneTarget.speed;
    group.current.rotation.y += delta * 0.18 * speed;
    group.current.rotation.x += delta * 0.06 * speed;

    if (wireframe.current) {
      wireframe.current.rotation.y -= delta * 0.09 * speed;
      wireframe.current.rotation.z += delta * 0.05 * speed;
    }
  });

  return (
    <group ref={group}>
      <Icosahedron args={[1.6, lowPower ? 2 : 4]}>
        <MeshDistortMaterial
          ref={material}
          color="#a78bfa"
          distort={0.32}
          speed={1.4}
          roughness={0.25}
          metalness={0.1}
          emissive="#a78bfa"
          emissiveIntensity={0.85}
        />
      </Icosahedron>
      <mesh ref={wireframe} scale={2.05}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#e9e7e1" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

const tmpColor = new THREE.Color();

function Orbiters({ lowPower }: { lowPower: boolean }) {
  const count = lowPower ? 4 : 7;
  const items = useMemo(
    () =>
      new Array(count).fill(0).map((_, i) => ({
        radius: 2.8 + Math.random() * 1.6,
        offset: (i / count) * Math.PI * 2,
        speed: 0.15 + Math.random() * 0.2,
        y: (Math.random() - 0.5) * 2.2,
        scale: 0.08 + Math.random() * 0.14,
      })),
    [count]
  );

  return (
    <>
      {items.map((it, i) => (
        <Orbiter key={i} {...it} />
      ))}
    </>
  );
}

function Orbiter({
  radius,
  offset,
  speed,
  y,
  scale,
}: {
  radius: number;
  offset: number;
  speed: number;
  y: number;
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const t = useRef(offset);

  useFrame((_, delta) => {
    t.current += delta * speed * sceneTarget.speed;
    if (ref.current) {
      ref.current.position.set(Math.cos(t.current) * radius, y, Math.sin(t.current) * radius);
      ref.current.rotation.x += delta * 0.4;
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={ref} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#e9e7e1" roughness={0.3} metalness={0.6} />
      </mesh>
    </Float>
  );
}

function Lights() {
  const light = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (light.current) {
      light.current.color.lerp(tmpColor.set(sceneTarget.color), 0.05);
    }
  });
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#ffffff" />
      <pointLight ref={light} position={[4, 3, 5]} intensity={450} color="#a78bfa" />
      <pointLight position={[-5, -3, -4]} intensity={220} color="#5eead4" />
    </>
  );
}

export default function Scene({ lowPower = false }: { lowPower?: boolean }) {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={lowPower ? 1 : [1, 1.8]}
        gl={{ antialias: !lowPower, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6.2], fov: 38 }}
      >
        <Rig lowPower={lowPower} />
        <Lights />
        <Centerpiece lowPower={lowPower} />
        <Orbiters lowPower={lowPower} />
        {!lowPower && (
          <Sparkles count={80} scale={9} size={1.4} speed={0.25} color="#e9e7e1" opacity={0.35} />
        )}
        <fog attach="fog" args={["#050507", 8, 16]} />
      </Canvas>
    </div>
  );
}
