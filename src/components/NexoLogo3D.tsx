import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Sphere, Cylinder } from "@react-three/drei";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";

interface AssemblyPieceProps {
  finalPos: [number, number, number];
  finalRot?: [number, number, number];
  initialOffset: [number, number, number];
  delay: number;
  progress: number;
  children: React.ReactNode;
}

function AssemblyPiece({
  finalPos,
  finalRot = [0, 0, 0],
  initialOffset,
  delay,
  progress,
  children,
}: AssemblyPieceProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    const pieceProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay || 1)));
    // Smooth easeOutCubic
    const ease = 1 - Math.pow(1 - pieceProgress, 3);

    meshRef.current.position.x = finalPos[0] + initialOffset[0] * (1 - ease);
    meshRef.current.position.y = finalPos[1] + initialOffset[1] * (1 - ease);
    meshRef.current.position.z = finalPos[2] + initialOffset[2] * (1 - ease);

    meshRef.current.rotation.x = finalRot[0] * ease;
    meshRef.current.rotation.y = finalRot[1] * ease;
    meshRef.current.rotation.z = finalRot[2] * ease;

    const scale = Math.max(0.001, ease);
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={meshRef} position={finalPos}>
      {children}
    </group>
  );
}

function NexoLogoModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const [assembledTime, setAssembledTime] = useState(0);

  // Cyan brand palette
  const cyanGlow = "#00D2FF";
  const cyanCore = "#00A3FF";
  const cyanDeep = "#0284C7";
  const nodeColor = "#E0F7FE";

  // Assembly animation progress (0 to 1 over ~1.8 seconds)
  useFrame((_state, delta) => {
    setAssembledTime((prev) => Math.min(1, prev + delta * 0.7));

    if (groupRef.current) {
      // 1. Continuous smooth rotation on Y axis
      groupRef.current.rotation.y += delta * 0.55;

      // 2. Parallax mouse tracking (tilt on X and Z axis)
      const targetTiltX = -pointer.y * 0.35 + 0.1;
      const targetTiltZ = -pointer.x * 0.25;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetTiltX,
        delta * 3
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetTiltZ,
        delta * 3
      );
    }
  });

  // Circuit node connection coordinates for the Nexo X
  const nodes = useMemo(
    () => [
      // Top Left arm
      { pos: [-1.45, 1.45, 0.15] as [number, number, number], delay: 0.1 },
      { pos: [-0.95, 0.95, 0.15] as [number, number, number], delay: 0.2 },
      // Top Right arm
      { pos: [1.45, 1.45, 0.15] as [number, number, number], delay: 0.15 },
      { pos: [0.95, 0.95, 0.15] as [number, number, number], delay: 0.25 },
      // Center junction nodes
      { pos: [-0.35, 0.35, 0.2] as [number, number, number], delay: 0.35 },
      { pos: [0.35, 0.35, 0.2] as [number, number, number], delay: 0.35 },
      { pos: [-0.35, -0.35, 0.2] as [number, number, number], delay: 0.4 },
      { pos: [0.35, -0.35, 0.2] as [number, number, number], delay: 0.4 },
      // Bottom Left arm
      { pos: [-1.45, -1.45, 0.15] as [number, number, number], delay: 0.2 },
      { pos: [-0.95, -0.95, 0.15] as [number, number, number], delay: 0.3 },
      // Bottom Right arm
      { pos: [1.45, -1.45, 0.15] as [number, number, number], delay: 0.25 },
      { pos: [0.95, -0.95, 0.15] as [number, number, number], delay: 0.35 },
    ],
    []
  );

  return (
    <group ref={groupRef}>
      {/* --- DIAGONAL ARM 1 (Top-Left to Bottom-Right: \ ) --- */}
      <AssemblyPiece
        finalPos={[0, 0, 0]}
        finalRot={[0, 0, -Math.PI / 4]}
        initialOffset={[-3, 4, -2]}
        delay={0.05}
        progress={assembledTime}
      >
        {/* Main Sleek Outer Diagonal Beam */}
        <RoundedBox args={[3.6, 0.42, 0.24]} radius={0.08} smoothness={4}>
          <meshPhysicalMaterial
            color={cyanCore}
            emissive={cyanGlow}
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.8}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>

        {/* Inner Tech Circuit Channel (Emissive trace) */}
        <RoundedBox args={[3.2, 0.08, 0.28]} radius={0.03} smoothness={2} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={nodeColor}
            emissive={cyanGlow}
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </RoundedBox>
      </AssemblyPiece>

      {/* --- DIAGONAL ARM 2 (Top-Right to Bottom-Left: / ) --- */}
      <AssemblyPiece
        finalPos={[0, 0, 0]}
        finalRot={[0, 0, Math.PI / 4]}
        initialOffset={[3, 4, -2]}
        delay={0.12}
        progress={assembledTime}
      >
        {/* Main Sleek Outer Diagonal Beam */}
        <RoundedBox args={[3.6, 0.42, 0.24]} radius={0.08} smoothness={4}>
          <meshPhysicalMaterial
            color={cyanCore}
            emissive={cyanGlow}
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.8}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>

        {/* Inner Tech Circuit Channel (Emissive trace) */}
        <RoundedBox args={[3.2, 0.08, 0.28]} radius={0.03} smoothness={2} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={nodeColor}
            emissive={cyanGlow}
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </RoundedBox>
      </AssemblyPiece>

      {/* --- CIRCUIT INTERCONNECT BARS (Horizontal / Angle Bridges matching the logo) --- */}
      <AssemblyPiece
        finalPos={[0, 0.65, 0.12]}
        initialOffset={[0, 2, 2]}
        delay={0.25}
        progress={assembledTime}
      >
        <Cylinder args={[0.035, 0.035, 1.2, 16]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial
            color={cyanDeep}
            emissive={cyanGlow}
            emissiveIntensity={0.85}
            roughness={0.2}
          />
        </Cylinder>
      </AssemblyPiece>

      <AssemblyPiece
        finalPos={[0, -0.65, 0.12]}
        initialOffset={[0, -2, 2]}
        delay={0.28}
        progress={assembledTime}
      >
        <Cylinder args={[0.035, 0.035, 1.2, 16]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial
            color={cyanDeep}
            emissive={cyanGlow}
            emissiveIntensity={0.85}
            roughness={0.2}
          />
        </Cylinder>
      </AssemblyPiece>

      {/* --- GLOWING CIRCUIT NODES (Network spheres at endpoints and junctions) --- */}
      {nodes.map((node, idx) => (
        <AssemblyPiece
          key={idx}
          finalPos={node.pos}
          initialOffset={[
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
            Math.random() * 4 + 1,
          ]}
          delay={node.delay}
          progress={assembledTime}
        >
          {/* Node Core Sphere */}
          <Sphere args={[0.11, 24, 24]}>
            <meshPhysicalMaterial
              color="#FFFFFF"
              emissive={cyanGlow}
              emissiveIntensity={1.6}
              roughness={0.1}
              metalness={0.9}
            />
          </Sphere>
          {/* Node Metallic Outer Ring */}
          <Cylinder args={[0.16, 0.16, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial
              color="#0F172A"
              metalness={0.95}
              roughness={0.2}
            />
          </Cylinder>
        </AssemblyPiece>
      ))}

      {/* Floating Micro-data Particles around the Logo */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <group>
          {[-1.8, -0.8, 0.8, 1.8].map((x, i) => (
            <Sphere
              key={i}
              args={[0.035, 12, 12]}
              position={[x * 1.1, (i % 2 === 0 ? 1 : -1) * 1.3, (i % 2) * 0.4]}
            >
              <meshBasicMaterial color={cyanGlow} />
            </Sphere>
          ))}
        </group>
      </Float>
    </group>
  );
}

export default function NexoLogo3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative h-full w-full select-none cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Clean Studio Lighting */}
        <ambientLight intensity={0.7} color="#FFFFFF" />
        <directionalLight position={[5, 8, 6]} intensity={1.8} color="#FFFFFF" />
        <directionalLight position={[-6, -4, -4]} intensity={0.8} color="#00D2FF" />
        <pointLight position={[0, 0, 3]} intensity={1.2} color="#00D2FF" distance={8} />

        {/* 3D Model with Floating Effect */}
        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
          <NexoLogoModel />
        </Float>
      </Canvas>
    </div>
  );
}
