import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface NexoXProps {
  onHoverChange: (hovered: boolean) => void;
  onDragChange: (dragging: boolean) => void;
}

interface CircuitSegmentProps {
  start: [number, number, number];
  end: [number, number, number];
  node?: [number, number, number];
}

function CircuitNode({ position }: { position: [number, number, number] }) {
  const ringGeometry = useMemo(() => new THREE.TorusGeometry(0.075, 0.012, 6, 16), []);
  const coreGeometry = useMemo(() => new THREE.SphereGeometry(0.028, 8, 6), []);

  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]} geometry={ringGeometry}>
        <meshStandardMaterial color="#163247" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh geometry={coreGeometry}>
        <meshBasicMaterial color="#a4f1ff" />
      </mesh>
    </group>
  );
}

function CircuitSegment({ start, end, node }: CircuitSegmentProps) {
  const { midpoint, length, rotation } = useMemo(() => {
    const first = new THREE.Vector3(...start);
    const second = new THREE.Vector3(...end);
    const direction = second.clone().sub(first).normalize();

    return {
      length: first.distanceTo(second),
      midpoint: first.add(second).multiplyScalar(0.5),
      rotation: new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction),
      ),
    };
  }, [start, end]);

  return (
    <group>
      <mesh position={midpoint} rotation={rotation}>
        <cylinderGeometry args={[0.014, 0.014, length, 6]} />
        <meshStandardMaterial
          color="#0b6689"
          emissive="#00c2ff"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.22}
        />
      </mesh>
      {node && <CircuitNode position={node} />}
    </group>
  );
}

function NexoX({ onHoverChange, onDragChange }: NexoXProps) {
  const groupRef = useRef<THREE.Group>(null);
  const highlightRef = useRef<THREE.PointLight>(null);
  const hoverLightRef = useRef<THREE.PointLight>(null);
  const elapsedRef = useRef(0);
  const assemblyRef = useRef(0);
  const hoveredRef = useRef(false);
  const draggingRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: -0.06, y: 0.12, z: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const setHovered = (hovered: boolean) => {
    if (hoveredRef.current === hovered) return;
    hoveredRef.current = hovered;
    onHoverChange(hovered);
  };

  const setDragging = (dragging: boolean) => {
    if (draggingRef.current === dragging) return;
    draggingRef.current = dragging;
    onDragChange(dragging);
  };

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    draggingRef.current = true;
    pointerRef.current.x = event.nativeEvent.clientX;
    pointerRef.current.y = event.nativeEvent.clientY;
    velocityRef.current.x = 0;
    velocityRef.current.y = 0;
    event.target.setPointerCapture(event.pointerId);
    onDragChange(true);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!draggingRef.current) return;

    const currentX = event.nativeEvent.clientX;
    const currentY = event.nativeEvent.clientY;
    const deltaX = currentX - pointerRef.current.x;
    const deltaY = currentY - pointerRef.current.y;
    const sensitivity = 0.009;

    pointerRef.current.x = currentX;
    pointerRef.current.y = currentY;
    velocityRef.current.y = deltaX * sensitivity;
    velocityRef.current.x = deltaY * sensitivity;
    targetRotationRef.current.y += deltaX * sensitivity;
    targetRotationRef.current.x += deltaY * sensitivity;
    targetRotationRef.current.x = THREE.MathUtils.clamp(
      targetRotationRef.current.x,
      -Math.PI * 0.68,
      Math.PI * 0.68,
    );
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    if (draggingRef.current) event.target.releasePointerCapture(event.pointerId);
    setDragging(false);
  };

  const handlePointerCancel = () => setDragging(false);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    elapsedRef.current += delta;
    assemblyRef.current = Math.min(1, assemblyRef.current + delta / 1.25);

    const assembly = 1 - Math.pow(1 - assemblyRef.current, 3);
    const ambientStrength = draggingRef.current ? 0 : 1;
    const ambientX = Math.sin(elapsedRef.current * 0.48) * 0.018 * ambientStrength;
    const ambientY = Math.sin(elapsedRef.current * 0.3) * 0.035 * ambientStrength;
    const damping = 1 - Math.pow(0.001, delta);
    const inertiaDamping = Math.pow(0.06, delta);

    if (!draggingRef.current) {
      targetRotationRef.current.y += velocityRef.current.y * delta;
      targetRotationRef.current.x += velocityRef.current.x * delta;
      velocityRef.current.x *= inertiaDamping;
      velocityRef.current.y *= inertiaDamping;
    }

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationRef.current.x + ambientX,
      damping,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationRef.current.y + ambientY,
      damping,
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotationRef.current.z,
      damping,
    );
    groupRef.current.position.y = Math.sin(elapsedRef.current * 0.72) * 0.045 * ambientStrength;

    const responsiveScale = THREE.MathUtils.clamp(viewport.width / 5.2, 0.72, 1.08);
    const hoverScale = hoveredRef.current ? 1.012 : 1;
    groupRef.current.scale.setScalar(responsiveScale * hoverScale * Math.max(0.001, assembly));

    if (highlightRef.current) {
      highlightRef.current.position.set(
        Math.sin(elapsedRef.current * 0.34) * 1.45,
        Math.cos(elapsedRef.current * 0.42) * 1.15,
        1.25,
      );
    }
    if (hoverLightRef.current) {
      hoverLightRef.current.intensity = THREE.MathUtils.lerp(
        hoverLightRef.current.intensity,
        hoveredRef.current ? 0.72 : 0.18,
        damping,
      );
    }
  });

  const { armGeometry, coreGeometry, edgeGeometry } = useMemo(() => {
    const armShape = new THREE.Shape();
    armShape.moveTo(-1.72, 1.34);
    armShape.lineTo(-0.64, 1.34);
    armShape.lineTo(1.72, -1.34);
    armShape.lineTo(0.64, -1.34);
    armShape.closePath();

    const oppositeShape = new THREE.Shape();
    oppositeShape.moveTo(1.72, 1.34);
    oppositeShape.lineTo(0.64, 1.34);
    oppositeShape.lineTo(-1.72, -1.34);
    oppositeShape.lineTo(-0.64, -1.34);
    oppositeShape.closePath();

    const bodySettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.24,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.065,
      bevelThickness: 0.05,
    };
    const coreSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.27,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.028,
      bevelThickness: 0.024,
    };
    const bodyA = new THREE.ExtrudeGeometry(armShape, bodySettings);
    const bodyB = new THREE.ExtrudeGeometry(oppositeShape, bodySettings);
    const coreA = new THREE.ExtrudeGeometry(armShape, coreSettings);
    const coreB = new THREE.ExtrudeGeometry(oppositeShape, coreSettings);
    bodyA.center();
    bodyB.center();
    coreA.center();
    coreB.center();

    return {
      armGeometry: [bodyA, bodyB],
      coreGeometry: [coreA, coreB],
      edgeGeometry: [new THREE.EdgesGeometry(bodyA, 30), new THREE.EdgesGeometry(bodyB, 30)],
    };
  }, []);

  const bodyMaterial = (
    <meshPhysicalMaterial
      color="#197f9f"
      transparent
      opacity={0.84}
      transmission={0.16}
      thickness={0.34}
      ior={1.46}
      metalness={0.68}
      roughness={0.18}
      clearcoat={1}
      clearcoatRoughness={0.1}
      emissive="#00a9d6"
      emissiveIntensity={0.13}
    />
  );
  const coreMaterial = (
    <meshPhysicalMaterial
      color="#071d31"
      transparent
      opacity={0.72}
      metalness={0.82}
      roughness={0.2}
      clearcoat={1}
      clearcoatRoughness={0.08}
    />
  );

  return (
    <group
      ref={groupRef}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        if (!draggingRef.current) setHovered(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerMissed={handlePointerCancel}
    >
      <pointLight ref={highlightRef} color="#00c2ff" intensity={0.48} distance={3.8} decay={2} />
      <pointLight ref={hoverLightRef} color="#6feaff" intensity={0.18} distance={3.5} decay={2} />

      <mesh geometry={armGeometry[0]}>{bodyMaterial}</mesh>
      <mesh geometry={coreGeometry[0]} position={[0, 0, 0.045]} scale={0.985}>
        {coreMaterial}
      </mesh>
      <lineSegments geometry={edgeGeometry[0]}>
        <lineBasicMaterial color="#b1f3ff" transparent opacity={0.68} />
      </lineSegments>

      <mesh geometry={armGeometry[1]} position={[0, 0, -0.055]}>
        {bodyMaterial}
      </mesh>
      <mesh geometry={coreGeometry[1]} position={[0, 0, -0.01]} scale={0.985}>
        {coreMaterial}
      </mesh>
      <lineSegments geometry={edgeGeometry[1]} position={[0, 0, -0.055]}>
        <lineBasicMaterial color="#b1f3ff" transparent opacity={0.68} />
      </lineSegments>

      <group position={[0, 0, 0.18]}>
        <CircuitSegment start={[-1.03, 0.82, 0]} end={[-0.32, 0.12, 0]} node={[-1.03, 0.82, 0]} />
        <CircuitSegment start={[1.03, 0.82, 0]} end={[0.34, 0.18, 0]} node={[1.03, 0.82, 0]} />
        <CircuitSegment
          start={[-0.34, -0.18, 0]}
          end={[-1.03, -0.82, 0]}
          node={[-1.03, -0.82, 0]}
        />
        <CircuitSegment start={[0.32, -0.12, 0]} end={[1.03, -0.82, 0]} node={[1.03, -0.82, 0]} />
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.08, 24]} />
          <meshStandardMaterial color="#0a2940" metalness={0.88} roughness={0.22} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <cylinderGeometry args={[0.09, 0.09, 0.025, 16]} />
          <meshBasicMaterial color="#7ce8ff" />
        </mesh>
      </group>
    </group>
  );
}

export default function NexoLogo3D() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const cursorClass = dragging ? "cursor-grabbing" : hovered ? "cursor-grab" : "cursor-grab";

  return (
    <div className={`relative h-full w-full select-none ${cursorClass}`}>
      <Canvas
        camera={{ position: [0, 0, 5.35], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onPointerMissed={() => setDragging(false)}
      >
        <ambientLight intensity={0.38} color="#dff8ff" />
        <directionalLight position={[3, 4, 5]} intensity={1.65} color="#ffffff" />
        <directionalLight position={[-4, 1, -2]} intensity={0.85} color="#075985" />
        <pointLight position={[2, -1, 3]} intensity={0.72} color="#00c2ff" distance={6} />
        <NexoX onHoverChange={setHovered} onDragChange={setDragging} />
      </Canvas>
    </div>
  );
}
