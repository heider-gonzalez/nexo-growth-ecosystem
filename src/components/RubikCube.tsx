import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, OrbitControls, Environment } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const GAP = 1.02;
const AXES = ["x", "y", "z"] as const;
type Axis = (typeof AXES)[number];

type Move = { axis: Axis; layer: -1 | 0 | 1; dir: 1 | -1 };

const TURN_DURATION = 0.7; // s
const PAUSE = 0.5; // s
const SPIN_SPEED = 0.63; // rad/s
const TILT = (20 * Math.PI) / 180;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function randomMove(): Move {
  const axis = AXES[Math.floor(Math.random() * 3)]!;
  const layer = ([-1, 0, 1] as const)[Math.floor(Math.random() * 3)]!;
  const dir = Math.random() > 0.5 ? 1 : -1;
  return { axis, layer, dir };
}

/** Procedural finishes: 0 = smooth, 1 = micro-perforated, 2 = brushed, 3 = granite, 4 = marble glow */
function makeFinishTexture(kind: 1 | 2 | 3 | 4) {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, size, size);

  if (kind === 1) {
    // Micro-perforated / mesh pattern
    ctx.fillStyle = "#2a2a2a";
    const step = 8;
    for (let y = step / 2; y < size; y += step)
      for (let x = step / 2; x < size; x += step) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
  } else if (kind === 2) {
    // Brushed metal
    for (let y = 0; y < size; y++) {
      const v = 30 + Math.random() * 50;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(0, y, size, 1);
    }
  } else if (kind === 3) {
    // Granite / stone texture
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = Math.random() * 3 + 1;
      const v = 20 + Math.random() * 40;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (kind === 4) {
    // Marble with emissive glow pattern
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#4a4a4a");
    gradient.addColorStop(0.5, "#6a6a6a");
    gradient.addColorStop(1, "#4a4a4a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Marble veins
    ctx.strokeStyle = "#7a7a7a";
    ctx.lineWidth = 2;
    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * size, Math.random() * size);
      ctx.bezierCurveTo(
        Math.random() * size, Math.random() * size,
        Math.random() * size, Math.random() * size,
        Math.random() * size, Math.random() * size
      );
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

function Cube() {
  const root = useRef<THREE.Group>(null);
  const pivot = useRef<THREE.Group>(null);
  const holder = useRef<THREE.Group>(null);
  const cubies = useRef<(THREE.Mesh | null)[]>([]);
  const move = useRef<{ m: Move; t: number } | null>(null);
  const cooldown = useRef(PAUSE);
  const spin = useRef(0);
  const { invalidate } = useThree();

  const maps = useMemo(() => [
    null,
    makeFinishTexture(1),
    makeFinishTexture(2),
    makeFinishTexture(3),
    makeFinishTexture(4)
  ], []);
  useEffect(
    () => () => maps.forEach((m) => m?.dispose()),
    [maps],
  );

  const cells = useMemo(() => {
    const arr: {
      pos: [number, number, number];
      finish: 0 | 1 | 2 | 3 | 4;
      roughness: number;
      metalness: number;
      emissive?: string;
      emissiveIntensity?: number;
    }[] = [];
    let i = 0;
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          // Varied finish distribution for texture variety
          const finish = ((i * 7 + x + y * 3 + z * 5 + 30) % 5) as 0 | 1 | 2 | 3 | 4;

          let roughness = 0.3;
          let metalness = 0.85;
          let emissive: string | undefined;
          let emissiveIntensity = 0;

          if (finish === 0) {
            // Super dark matte
            roughness = 0.9;
            metalness = 0.1;
          } else if (finish === 1) {
            // Micro-perforated
            roughness = 0.7;
            metalness = 0.4;
          } else if (finish === 2) {
            // Brushed metal
            roughness = 0.4;
            metalness = 0.8;
          } else if (finish === 3) {
            // Granite/stone
            roughness = 0.85;
            metalness = 0.15;
          } else if (finish === 4) {
            // Marble with emissive glow
            roughness = 0.25;
            metalness = 0.3;
            emissive = "#3a3a3a";
            emissiveIntensity = 0.15;
          }

          arr.push({
            pos: [x * GAP, y * GAP, z * GAP],
            finish,
            roughness,
            metalness,
            emissive,
            emissiveIntensity,
          });
          i++;
        }
    return arr;
  }, []);

  const startMove = (m: Move) => {
    if (move.current || !pivot.current) return;
    pivot.current.rotation.set(0, 0, 0);
    cubies.current.forEach((mesh) => {
      if (!mesh) return;
      if (Math.abs(mesh.position[m.axis] - m.layer * GAP) < 0.3)
        pivot.current!.attach(mesh);
    });
    move.current = { m, t: 0 };
  };

  useFrame((_state, delta) => {
    const d = Math.min(delta, 0.05);
    spin.current += d * SPIN_SPEED;

    if (root.current) {
      root.current.rotation.y = spin.current;
      root.current.rotation.x = TILT;
    }

    if (!move.current) {
      cooldown.current -= d;
      if (cooldown.current <= 0) startMove(randomMove());
    } else if (pivot.current && holder.current) {
      const { m } = move.current;
      move.current.t = Math.min(1, move.current.t + d / TURN_DURATION);
      const target = (Math.PI / 2) * m.dir;
      pivot.current.rotation[m.axis] = target * easeInOut(move.current.t);

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
        cooldown.current = PAUSE;
      }
    }
    invalidate();
  });

  return (
    <group ref={root} rotation={[TILT, 0, 0]}>
      <group ref={holder}>
        {cells.map((c, i) => (
          <RoundedBox
            key={i}
            args={[1, 1, 1]}
            radius={0.07}
            smoothness={5}
            bevelSegments={3}
            creaseAngle={0.5}
            position={c.pos}
            castShadow
            receiveShadow
            ref={(el: THREE.Mesh | null) => {
              cubies.current[i] = el;
            }}
          >
            <meshPhysicalMaterial
              color="#111111"
              metalness={c.metalness}
              roughness={c.roughness}
              roughnessMap={maps[c.finish] ?? null}
              bumpMap={maps[c.finish] ?? null}
              bumpScale={c.finish === 1 ? 0.08 : c.finish === 3 ? 0.03 : 0.015}
              clearcoat={c.finish === 0 ? 0.3 : c.finish === 4 ? 0.6 : 0.25}
              clearcoatRoughness={c.finish === 0 ? 0.8 : 0.15}
              envMapIntensity={1.5}
              emissive={c.emissive}
              emissiveIntensity={c.emissiveIntensity || 0}
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
    <div className="relative h-full w-full">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(60,60,65,0.28) 0%, rgba(0,0,0,0) 62%)",
        }}
      />
      <Canvas
        camera={{ position: [5.2, 3.4, 5.8], fov: 34 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[-8, 12, 6]} intensity={3.5} color="#ffffff" castShadow />
        <spotLight
          position={[-6, 10, 4]}
          angle={0.4}
          penumbra={0.6}
          intensity={100}
          color="#ffffff"
          castShadow
        />
        <directionalLight position={[8, -4, -6]} intensity={0.5} color="#a0b0d0" />
        <pointLight position={[4, 4, 4]} intensity={0.8} color="#4a6fa5" />
        <Environment preset="warehouse" environmentIntensity={0.4} />
        <Cube />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
