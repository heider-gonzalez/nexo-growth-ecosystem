import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Lightweight "liquid glass" spatial backdrop for the hero.
 *
 * This intentionally does NOT use a second WebGL canvas — the hero already
 * mounts a real @react-three/fiber scene (NexoLogo3D) lazily. Layering a
 * second 3D scene behind it would double the GPU cost for very little
 * visual gain. Instead this creates the sense of depth with CSS blur +
 * a subtle mouse-parallax on a few translucent "glass" orbs and a
 * receding grid plane, which is nearly free to render and never blocks
 * first paint.
 */
export function SpatialBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });

  const orb1X = useTransform(sx, (v) => v * 18);
  const orb1Y = useTransform(sy, (v) => v * 18);
  const orb2X = useTransform(sx, (v) => v * -24);
  const orb2Y = useTransform(sy, (v) => v * -14);
  const gridX = useTransform(sx, (v) => v * 6);
  const gridY = useTransform(sy, (v) => v * 6);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Receding technical grid plane, suggests a spatial floor/depth */}
      <motion.div
        style={{ x: gridX, y: gridY }}
        className="spatial-grid absolute inset-0 opacity-60 [transform:perspective(600px)_rotateX(55deg)] origin-top"
      />

      {/* Primary electric-cyan glow, parallaxes opposite the cursor */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="spatial-orb right-[-10%] top-[8%] h-[420px] w-[420px] bg-[#00c2ff]/25 sm:h-[560px] sm:w-[560px]"
      />

      {/* Secondary cooler glow for a two-light spatial feel */}
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="spatial-orb left-[-8%] bottom-[0%] h-[320px] w-[320px] bg-[#38bdf8]/15 sm:h-[420px] sm:w-[420px]"
      />

      {/* Soft vignette so content stays readable over the glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />
    </div>
  );
}
