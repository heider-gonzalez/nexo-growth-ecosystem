import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const pieceProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay || 1)));
    // Smooth easeOutCubic
    const ease = 1 - Math.pow(1 - pieceProgress, 3);

    groupRef.current.position.x = finalPos[0] + initialOffset[0] * (1 - ease);
    groupRef.current.position.y = finalPos[1] + initialOffset[1] * (1 - ease);
    groupRef.current.position.z = finalPos[2] + initialOffset[2] * (1 - ease);

    groupRef.current.rotation.x = finalRot[0] * ease;
    groupRef.current.rotation.y = finalRot[1] * ease;
    groupRef.current.rotation.z = finalRot[2] * ease;

    const scale = Math.max(0.001, ease);
    groupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={groupRef} position={finalPos}>
      {children}
    </group>
  );
}

// Circuit Trace with cylindrical line and terminal node circles
function CircuitSegment({
  start,
  end,
  startNode = true,
  endNode = true,
}: {
  start: [number, number, number];
  end: [number, number, number];
  startNode?: boolean;
  endNode?: boolean;
}) {
  const p1 = new THREE.Vector3(...start);
  const p2 = new THREE.Vector3(...end);
  const length = p1.distanceTo(p2);
  const midpoint = p1.clone().add(p2).multiplyScalar(0.5);

  // Calculate orientation for the cylinder
  const dir = p2.clone().sub(p1).normalize();
  const orientation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  const euler = new THREE.Euler().setFromQuaternion(orientation);

  const cyanGlow = "#00D2FF";
  const cyanDeep = "#0284C7";
  const nodeDark = "#1E293B";

  return (
    <group>
      {/* Circuit Line Track */}
      <mesh position={midpoint.toArray()} rotation={euler}>
        <cylinderGeometry args={[0.035, 0.035, length, 16]} />
        <meshStandardMaterial
          color={cyanDeep}
          emissive={cyanGlow}
          emissiveIntensity={1.6}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Start Node */}
      {startNode && (
        <group position={start}>
          {/* Outer Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.06, 24]} />
            <meshStandardMaterial color={nodeDark} metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Glowing Center Dot */}
          <mesh position={[0, 0, 0.02]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color={cyanGlow} />
          </mesh>
        </group>
      )}

      {/* End Node */}
      {endNode && (
        <group position={end}>
          {/* Outer Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.06, 24]} />
            <meshStandardMaterial color={nodeDark} metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Glowing Center Dot */}
          <mesh position={[0, 0, 0.02]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color={cyanGlow} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function TransparentNexoX() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const [assembledTime, setAssembledTime] = useState(0);

  // Assembly animation progress (0 to 1 over ~1.6 seconds)
  useFrame((_state, delta) => {
    setAssembledTime((prev) => Math.min(1, prev + delta * 0.75));

    if (groupRef.current) {
      // 1. Continuous smooth rotation on Y axis
      groupRef.current.rotation.y += delta * 0.45;

      // 2. Parallax mouse tracking (tilt on X and Z axis)
      const targetTiltX = -pointer.y * 0.3 + 0.08;
      const targetTiltZ = -pointer.x * 0.22;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetTiltX,
        delta * 3.5,
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetTiltZ,
        delta * 3.5,
      );
    }
  });

  // Shapes for the 2 diagonal arms of the Nexo X with horizontal top/bottom caps
  const { arm1Geometry, arm2Geometry, outlineArm1, outlineArm2 } = useMemo(() => {
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    };

    // Arm 1 (\ diagonal: top-left to bottom-right)
    const shape1 = new THREE.Shape();
    shape1.moveTo(-1.6, 1.35);
    shape1.lineTo(-0.55, 1.35);
    shape1.lineTo(1.6, -1.35);
    shape1.lineTo(0.55, -1.35);
    shape1.closePath();

    // Arm 2 (/ diagonal: top-right to bottom-left)
    const shape2 = new THREE.Shape();
    shape2.moveTo(1.6, 1.35);
    shape2.lineTo(0.55, 1.35);
    shape2.lineTo(-1.6, -1.35);
    shape2.lineTo(-0.55, -1.35);
    shape2.closePath();

    const geo1 = new THREE.ExtrudeGeometry(shape1, extrudeSettings);
    const geo2 = new THREE.ExtrudeGeometry(shape2, extrudeSettings);
    geo1.center();
    geo2.center();

    // Outline contours
    const edges1 = new THREE.EdgesGeometry(geo1, 24);
    const edges2 = new THREE.EdgesGeometry(geo2, 24);

    return {
      arm1Geometry: geo1,
      arm2Geometry: geo2,
      outlineArm1: edges1,
      outlineArm2: edges2,
    };
  }, []);

  const cyanGlow = "#00D2FF";
  const cyanCore = "#00A3FF";

  return (
    <group ref={groupRef}>
      {/* --- ARM 1 (Top-Left to Bottom-Right: \ ) --- */}
      <AssemblyPiece
        finalPos={[0, 0, 0.04]}
        initialOffset={[-3.5, 3.5, -1.5]}
        delay={0.05}
        progress={assembledTime}
      >
        {/* Translucent Glass / Acrylic Body */}
        <mesh geometry={arm1Geometry}>
          <meshPhysicalMaterial
            transparent
            opacity={0.68}
            transmission={0.75}
            roughness={0.06}
            metalness={0.2}
            ior={1.52}
            thickness={0.38}
            color={cyanCore}
            emissive={cyanGlow}
            emissiveIntensity={0.55}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
          />
        </mesh>

        {/* Luminous Contour Edges */}
        <lineSegments geometry={outlineArm1}>
          <lineBasicMaterial color={cyanGlow} linewidth={2} transparent opacity={0.95} />
        </lineSegments>
      </AssemblyPiece>

      {/* --- ARM 2 (Top-Right to Bottom-Left: / ) --- */}
      <AssemblyPiece
        finalPos={[0, 0, -0.04]}
        initialOffset={[3.5, 3.5, -1.5]}
        delay={0.12}
        progress={assembledTime}
      >
        {/* Translucent Glass / Acrylic Body */}
        <mesh geometry={arm2Geometry}>
          <meshPhysicalMaterial
            transparent
            opacity={0.68}
            transmission={0.75}
            roughness={0.06}
            metalness={0.2}
            ior={1.52}
            thickness={0.38}
            color={cyanCore}
            emissive={cyanGlow}
            emissiveIntensity={0.55}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
          />
        </mesh>

        {/* Luminous Contour Edges */}
        <lineSegments geometry={outlineArm2}>
          <lineBasicMaterial color={cyanGlow} linewidth={2} transparent opacity={0.95} />
        </lineSegments>
      </AssemblyPiece>

      {/* --- 4 EXACT INTERNAL CIRCUIT TRACKS & NODES (Matching Logo) --- */}

      {/* Track 1: Upper-Left diagonal track with 2 circular nodes */}
      <AssemblyPiece
        finalPos={[0, 0, 0.12]}
        initialOffset={[-2, 2, 2]}
        delay={0.25}
        progress={assembledTime}
      >
        <CircuitSegment
          start={[-0.95, 0.82, 0]}
          end={[-0.15, -0.05, 0]}
          startNode={true}
          endNode={true}
        />
      </AssemblyPiece>

      {/* Track 2: Upper-Right diagonal track with node */}
      <AssemblyPiece
        finalPos={[0, 0, 0.12]}
        initialOffset={[2, 2, 2]}
        delay={0.28}
        progress={assembledTime}
      >
        <CircuitSegment
          start={[0.95, 0.82, 0]}
          end={[0.35, 0.18, 0]}
          startNode={true}
          endNode={false}
        />
      </AssemblyPiece>

      {/* Track 3: Lower-Left diagonal track from center to bottom-left node */}
      <AssemblyPiece
        finalPos={[0, 0, 0.12]}
        initialOffset={[-2, -2, 2]}
        delay={0.32}
        progress={assembledTime}
      >
        <CircuitSegment
          start={[-0.35, -0.18, 0]}
          end={[-0.95, -0.82, 0]}
          startNode={false}
          endNode={true}
        />
      </AssemblyPiece>

      {/* Track 4: Lower-Right diagonal track with 2 circular nodes */}
      <AssemblyPiece
        finalPos={[0, 0, 0.12]}
        initialOffset={[2, -2, 2]}
        delay={0.35}
        progress={assembledTime}
      >
        <CircuitSegment
          start={[0.15, 0.05, 0]}
          end={[0.95, -0.82, 0]}
          startNode={true}
          endNode={true}
        />
      </AssemblyPiece>
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
        camera={{ position: [0, 0, 4.8], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Studio Lighting to accentuate translucent acrylic and glowing contours */}
        <ambientLight intensity={0.9} color="#E0F2FE" />
        <directionalLight position={[4, 6, 5]} intensity={2.2} color="#FFFFFF" />
        <directionalLight position={[-4, -5, -3]} intensity={1.4} color="#00D2FF" />
        <pointLight position={[0, 0, 2.5]} intensity={2.2} color="#00D2FF" distance={8} />

        <TransparentNexoX />
      </Canvas>
    </div>
  );
}
