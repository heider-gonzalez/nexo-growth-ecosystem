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

/** Procedural finishes: 0 = smooth, 1 = micro-perforated, 2 = brushed */
function makeFinishTexture(kind: 1 | 2) {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(0, 0, size, size);

  if (kind === 1) {
    ctx.fillStyle = "#c8c8c8";
    const step = 12;
    for (let y = step / 2; y < size; y += step)
      for (let x = step / 2; x < size; x += step) {
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
  } else {
    for (let y = 0; y < size; y++) {
      const v = 40 + Math.random() * 70;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(0, y, size, 1);
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

  const maps = useMemo(() => [null, makeFinishTexture(1), makeFinishTexture(2)], []);
  useEffect(
    () => () => maps.forEach((m) => m?.dispose()),
    [maps],
  );

  const cells = useMemo(() => {
    const arr: {
      pos: [number, number, number];
      finish: 0 | 1 | 2;
      roughness: number;
      metalness: number;
    }[] = [];
    let i = 0;
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          const finish = ((i * 7 + x + y * 3 + z * 5 + 30) % 3) as 0 | 1 | 2;
          arr.push({
            pos: [x * GAP, y * GAP, z * GAP],
            finish,
            roughness: finish === 0 ? 0.18 : finish === 1 ? 0.4 : 0.3,
            metalness: finish === 1 ? 0.75 : 0.85,
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
              bumpScale={c.finish === 1 ? 0.05 : 0.015}
              clearcoat={c.finish === 0 ? 0.6 : 0.15}
              clearcoatRoughness={0.2}
              envMapIntensity={0.6}
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
        <ambientLight intensity={0.08} />
        <directionalLight position={[-5, 8, 5]} intensity={3.2} color="#ffffff" />
        <spotLight
          position={[-5, 8, 5]}
          angle={0.5}
          penumbra={0.8}
          intensity={90}
          color="#ffffff"
        />
        <directionalLight position={[7, -2, -4]} intensity={0.25} color="#8fa0c8" />
        <Environment preset="warehouse" environmentIntensity={0.18} />
        <Cube />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
