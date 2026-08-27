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

type ThemeMode = "light" | "dark";

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function getThemeMode(): ThemeMode {
  if (typeof document === "undefined") return "light";

  const savedTheme = window.localStorage.getItem("nexo-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return document.documentElement.dataset.theme === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function randomMove(): Move {
  const axis = AXES[Math.floor(Math.random() * 3)]!;
  const layer = ([-1, 0, 1] as const)[Math.floor(Math.random() * 3)]!;
  const dir = Math.random() > 0.5 ? 1 : -1;
  return { axis, layer, dir };
}

/** Procedural finishes: keep them subtle and consistent with the brand palette */
function makeFinishTexture(kind: 1 | 2 | 3 | 4, theme: ThemeMode) {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;

  const base = theme === "dark" ? "#0d1e2d" : "#edf6ff";
  const mix1 = theme === "dark" ? "#1b3551" : "#d9f0ff";
  const mix2 = theme === "dark" ? "#2a3340" : "#c2e4ff";
  const accent = theme === "dark" ? "#00AEEF" : "#74d9ff";

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  if (kind === 1) {
    ctx.fillStyle = mix1;
    const step = 16;
    for (let y = step / 2; y < size; y += step) {
      for (let x = step / 2; x < size; x += step) {
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (kind === 2) {
    for (let y = 0; y < size; y += 2) {
      const v = theme === "dark" ? 18 + Math.random() * 28 : 190 + Math.random() * 35;
      ctx.fillStyle = `rgba(${theme === "dark" ? "18, 35, 52" : "183, 211, 230"}, ${0.35 + Math.random() * 0.25})`;
      ctx.fillRect(0, y, size, 2);
      ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;
      ctx.fillRect(0, y + 1, size, 1);
    }
  } else if (kind === 3) {
    for (let i = 0; i < 280; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = Math.random() * 3 + 1;
      const v = theme === "dark" ? 20 + Math.random() * 28 : 180 + Math.random() * 35;
      ctx.fillStyle = `rgba(${v}, ${v}, ${v}, 0.42)`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (kind === 4) {
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, mix1);
    gradient.addColorStop(0.5, mix2);
    gradient.addColorStop(1, mix1);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.25;
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * size, Math.random() * size);
      ctx.bezierCurveTo(
        Math.random() * size,
        Math.random() * size,
        Math.random() * size,
        Math.random() * size,
        Math.random() * size,
        Math.random() * size,
      );
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

function Cube({ theme }: { theme: ThemeMode }) {
  const root = useRef<THREE.Group>(null);
  const pivot = useRef<THREE.Group>(null);
  const holder = useRef<THREE.Group>(null);
  const cubies = useRef<(THREE.Mesh | null)[]>([]);
  const move = useRef<{ m: Move; t: number } | null>(null);
  const cooldown = useRef(PAUSE);
  const spin = useRef(0);
  const { invalidate } = useThree();

  const palette = useMemo(
    () => ({
      surface: theme === "dark" ? "#dfeef9" : "#f4f9ff",
      soft: theme === "dark" ? "#b9d8f1" : "#dff7ff",
      accent: "#00AEEF",
      deep: theme === "dark" ? "#2a3340" : "#162130",
      shadow: theme === "dark" ? "#07131e" : "#dfeaf5",
      glow: theme === "dark" ? "#75dcff" : "#7dd7ff",
    }),
    [theme],
  );

  const maps = useMemo(() => [null, makeFinishTexture(1, theme), makeFinishTexture(2, theme), makeFinishTexture(3, theme), makeFinishTexture(4, theme)], [theme]);
  useEffect(
    () => () => maps.forEach((m) => m?.dispose()),
    [maps],
  );

  const cells = useMemo(() => {
    const arr: {
      pos: [number, number, number];
      finish: 0 | 1 | 2 | 3 | 4;
      color: string;
      roughness: number;
      metalness: number;
      emissive?: string;
      emissiveIntensity?: number;
    }[] = [];
    let i = 0;
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          const finish = ((i * 7 + x + y * 3 + z * 5 + 30) % 5) as 0 | 1 | 2 | 3 | 4;
          const accentBias = (x + y + z + 3) % 4;

          const colorSet = [palette.surface, palette.soft, palette.accent, palette.deep];
          const color = colorSet[accentBias] ?? palette.surface;

          let roughness = 0.62;
          let metalness = 0.2;
          let emissive: string | undefined;
          let emissiveIntensity = 0;

          if (finish === 0) {
            roughness = 0.82;
            metalness = 0.18;
          } else if (finish === 1) {
            roughness = 0.7;
            metalness = 0.32;
          } else if (finish === 2) {
            roughness = 0.55;
            metalness = 0.45;
          } else if (finish === 3) {
            roughness = 0.75;
            metalness = 0.2;
          } else if (finish === 4) {
            roughness = 0.38;
            metalness = 0.28;
            emissive = palette.glow;
            emissiveIntensity = 0.12;
          }

          arr.push({
            pos: [x * GAP, y * GAP, z * GAP],
            finish,
            color,
            roughness,
            metalness,
            emissive,
            emissiveIntensity,
          });
          i++;
        }
    return arr;
  }, [palette]);

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
            radius={0.08}
            smoothness={4}
            bevelSegments={2}
            creaseAngle={0.4}
            position={c.pos}
            castShadow
            receiveShadow
            ref={(el: THREE.Mesh | null) => {
              cubies.current[i] = el;
            }}
          >
            <meshPhysicalMaterial
              color={c.color}
              metalness={c.metalness}
              roughness={c.roughness}
              roughnessMap={maps[c.finish] ?? null}
              bumpMap={maps[c.finish] ?? null}
              bumpScale={0.02}
              clearcoat={c.finish === 4 ? 0.5 : 0.2}
              clearcoatRoughness={0.2}
              envMapIntensity={1.1}
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
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const syncTheme = () => setTheme(getThemeMode());
    syncTheme();

    const onThemeChange = () => syncTheme();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    document.addEventListener("themechange", onThemeChange);
    mediaQuery.addEventListener("change", onThemeChange);

    return () => {
      document.removeEventListener("themechange", onThemeChange);
      mediaQuery.removeEventListener("change", onThemeChange);
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
          setTheme(getThemeMode());
          return;
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => setReady(true), []);
  if (!ready) return null;

  const bgGlow =
    theme === "dark"
      ? "radial-gradient(circle at 50% 50%, rgba(0,174,239,0.22) 0%, rgba(0,0,0,0) 62%)"
      : "radial-gradient(circle at 50% 50%, rgba(82, 133, 188, 0.18) 0%, rgba(0,0,0,0) 62%)";

  const ambientColor = theme === "dark" ? "#eaf8ff" : "#dbe8f5";
  const keyColor = theme === "dark" ? "#dff8ff" : "#ffffff";
  const fillColor = theme === "dark" ? "#7ccdf0" : "#a1d9f2";

  return (
    <div className="relative h-full w-full">
      <div className="pointer-events-none absolute inset-0" style={{ background: bgGlow }} />
      <Canvas
        camera={{ position: [5.2, 3.4, 5.8], fov: 34 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={theme === "dark" ? 0.5 : 0.8} color={ambientColor} />
        <directionalLight position={[-8, 12, 6]} intensity={theme === "dark" ? 2.8 : 2.1} color={keyColor} castShadow />
        <spotLight
          position={[-6, 10, 4]}
          angle={0.42}
          penumbra={0.8}
          intensity={theme === "dark" ? 55 : 35}
          color={keyColor}
          castShadow
        />
        <directionalLight position={[8, -4, -6]} intensity={theme === "dark" ? 0.75 : 0.5} color={fillColor} />
        <pointLight position={[4, 4, 4]} intensity={theme === "dark" ? 0.9 : 0.7} color={theme === "dark" ? "#4ea6d7" : "#9cc8ef"} />
        <Environment preset={theme === "dark" ? "night" : "city"} environmentIntensity={theme === "dark" ? 0.35 : 0.5} />
        <Cube theme={theme} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
