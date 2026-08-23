import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, OrbitControls, Environment } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const GAP = 1.04;
const AXES = ["x", "y", "z"] as const;
type Axis = (typeof AXES)[number];

type Move = { axis: Axis; layer: -1 | 0 | 1; dir: 1 | -1 };

const SHADES = [
  { color: "#0b0b0c", metalness: 0.95, roughness: 0.28 },
  { color: "#121214", metalness: 0.85, roughness: 0.45 },
  { color: "#171718", metalness: 0.7, roughness: 0.6 },
  { color: "#1f1f22", metalness: 0.98, roughness: 0.2 },
  { color: "#2a2a2d", metalness: 0.8, roughness: 0.4 },
  { color: "#0e0e10", metalness: 0.9, roughness: 0.55 },
];

function randomMove(): Move {
  const axis = AXES[Math.floor(Math.random() * 3)]!;
  const layer = ([-1, 0, 1] as const)[Math.floor(Math.random() * 3)]!;
  const dir = Math.random() > 0.5 ? 1 : -1;
  return { axis, layer, dir };
}

function MouseLight() {
  const light = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (!light.current) return;
    const { x, y } = state.pointer;
    light.current.position.lerp(new THREE.Vector3(x * 7, y * 7 + 1, 6), 0.08);
  });
  return <pointLight ref={light} intensity={55} distance={22} decay={2} color="#dfe6ff" />;
}

function Cube({ interactive }: { interactive: boolean }) {
  const root = useRef<THREE.Group>(null);
  const pivot = useRef<THREE.Group>(null);
  const holder = useRef<THREE.Group>(null);
  const cubies = useRef<(THREE.Mesh | null)[]>([]);
  const move = useRef<{ m: Move; t: number; angle: number } | null>(null);
  const cooldown = useRef(1.2);
  const { invalidate } = useThree();

  const cells = useMemo(() => {
    const arr: { pos: [number, number, number]; s: (typeof SHADES)[number] }[] = [];
    let i = 0;
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          arr.push({
            pos: [x * GAP, y * GAP, z * GAP],
            s: SHADES[(i * 5 + x + y * 2 + z * 3 + 12) % SHADES.length]!,
          });
          i++;
        }
    return arr;
  }, []);

  const startMove = (m: Move) => {
    if (move.current || !pivot.current || !holder.current) return;
    pivot.current.rotation.set(0, 0, 0);
    const axis = m.axis;
    cubies.current.forEach((mesh) => {
      if (!mesh) return;
      const v = mesh.position[axis];
      if (Math.abs(v - m.layer * GAP) < 0.3) pivot.current!.attach(mesh);
    });
    move.current = { m, t: 0, angle: 0 };
  };

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (root.current) {
      root.current.rotation.y += delta * 0.18;
      root.current.rotation.x = 0.42 + Math.sin(t * 0.22) * 0.08;
    }

    if (!move.current) {
      cooldown.current -= delta;
      if (cooldown.current <= 0) {
        startMove(randomMove());
        cooldown.current = 1 + Math.random() * 1.4;
      }
    } else if (pivot.current && holder.current) {
      const { m } = move.current;
      const speed = 2.2;
      move.current.t = Math.min(1, move.current.t + delta * speed);
      const e = 1 - Math.pow(1 - move.current.t, 3);
      const target = (Math.PI / 2) * m.dir;
      pivot.current.rotation[m.axis] = target * e;

      if (move.current.t >= 1) {
        pivot.current.rotation[m.axis] = target;
        pivot.current.updateMatrixWorld(true);
        [...pivot.current.children].forEach((child) => {
          holder.current!.attach(child);
          child.position.set(
            Math.round(child.position.x / GAP) * GAP,
            Math.round(child.position.y / GAP) * GAP,
            Math.round(child.position.z / GAP) * GAP,
          );
        });
        pivot.current.rotation.set(0, 0, 0);
        move.current = null;
      }
    }
    invalidate();
  });

  return (
    <group ref={root}>
      <group ref={holder}>
        {cells.map((c, i) => (
          <RoundedBox
            key={i}
            args={[1, 1, 1]}
            radius={0.12}
            smoothness={6}
            bevelSegments={4}
            creaseAngle={0.5}
            position={c.pos}
            castShadow
            receiveShadow
            onPointerDown={
              interactive
                ? (e) => {
                    e.stopPropagation();
                    const mesh = e.object as THREE.Mesh;
                    const axis = AXES[Math.floor(Math.random() * 3)]!;
                    const layer = Math.round(mesh.position[axis] / GAP) as -1 | 0 | 1;
                    startMove({ axis, layer, dir: Math.random() > 0.5 ? 1 : -1 });
                  }
                : undefined
            }
            ref={(el: THREE.Mesh | null) => {
              cubies.current[i] = el;
            }}
          >
            <meshPhysicalMaterial
              color={c.s.color}
              metalness={c.s.metalness}
              roughness={c.s.roughness}
              clearcoat={0.6}
              clearcoatRoughness={0.35}
              reflectivity={0.4}
              envMapIntensity={0.9}
            />
          </RoundedBox>
        ))}
      </group>
      <group ref={pivot} />
    </group>
  );
}

export default function RubikCube() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <Canvas
      camera={{ position: [4.8, 3.6, 5.6], fov: 36 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[6, 9, 4]} intensity={1.3} />
      <directionalLight position={[-7, 2, -3]} intensity={0.4} color="#b9c6ff" />
      <spotLight position={[-3, 5, 7]} angle={0.6} penumbra={1} intensity={40} />
      <MouseLight />
      <Environment preset="city" environmentIntensity={0.35} />
      <Cube interactive />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
