import { memo } from "react";

import type {
  ProductVideoData,
  ProductVideoIconName,
  ProductVideoTone,
} from "@/config/productVideos";

/**
 * Reproductor promocional simulado (9:16, 35s) de un servicio de Nexo. El
 * contenido de las 7 escenas llega por la prop `data` (ver
 * src/config/productVideos.ts) para que ProductVideoCarousel pueda mostrar 3
 * servicios distintos reusando el mismo "hardware".
 *
 * No hay archivo de video: la "reproducción" es una línea de tiempo de 35s
 * escrita en CSS puro (keyframes por porcentaje, generados abajo a partir de
 * segundos absolutos). Se eligió así en vez de exportar un .mp4 o animar por
 * JS/rAF porque el compositor del navegador anima opacity/transform en su
 * propio hilo: nunca se cae de cuadro aunque el resto de la página esté
 * ocupada, y el ciclo de 35s se repite en loop exacto sin depender de un
 * archivo pesado ni de un timer de React re-renderizando 60 veces por
 * segundo. Cada escena vive en el mismo contenedor y se funde con la
 * siguiente (crossfade), así que nunca hay un corte seco entre planos.
 */

const TOTAL = 35; // segundos totales del ciclo
const SCENE_LEN = 5;
const SCENE_COUNT = 7;
const CROSSFADE = 0.6; // segundos de fundido entre escenas

const pct = (t: number) => `${+((t / TOTAL) * 100).toFixed(3)}%`;

// Escena i: aparece en [i*5, i*5+5]s. Fuera de su ventana permanece invisible
// y ligeramente desplazada; el fundido de entrada/salida dura CROSSFADE.
function buildSceneCSS() {
  let css = "";
  for (let i = 0; i < SCENE_COUNT; i += 1) {
    const start = i * SCENE_LEN;
    const end = start + SCENE_LEN;
    const inEnd = start + CROSSFADE;
    const outStart = end - CROSSFADE;
    const first = i === 0;

    const stops: [number, number, number, number][] = [];
    if (!first) stops.push([0, 0, 14, 0.98]);
    if (!first) stops.push([start, 0, 14, 0.98]);
    if (first) stops.push([0, 1, 0, 1]);
    stops.push([inEnd, 1, 0, 1]);
    stops.push([outStart, 1, 0, 1]);
    stops.push([end, 0, -10, 1.02]);

    const body = stops
      .map(([t, o, y, s]) => `${pct(t)}{opacity:${o};transform:translateY(${y}px) scale(${s})}`)
      .join("");

    css += `@keyframes pv35-scene-${i}{${body}}\n`;
    css += `.pv35-scene-${i}{animation:pv35-scene-${i} ${TOTAL}s cubic-bezier(.4,0,.2,1) infinite}\n`;
  }
  return css;
}

// Barra de progreso estilo "historias": un segmento por escena, se llena
// durante su ventana y queda lleno hasta que el ciclo entero reinicia.
function buildProgressCSS() {
  let css = "";
  for (let i = 0; i < SCENE_COUNT; i += 1) {
    const start = i * SCENE_LEN;
    const end = start + SCENE_LEN;
    const raw: [number, number][] = [
      [0, 0],
      [start, 0],
      [end, 100],
      [TOTAL, 100],
    ];
    const stops = raw.filter((s, idx) => idx === 0 || s[0] !== raw[idx - 1]?.[0]);
    const body = stops.map(([t, w]) => `${pct(t)}{transform:scaleX(${w / 100})}`).join("");
    css += `@keyframes pv35-prog-${i}{${body}}\n`;
    css += `.pv35-prog-${i}{animation:pv35-prog-${i} ${TOTAL}s linear infinite}\n`;
  }
  return css;
}

interface RevealOptions {
  start: number;
  dur?: number;
  fromX?: number;
  toX?: number;
  exitX?: number;
  fromY?: number;
  toY?: number;
  exitY?: number;
  fromScale?: number;
  toScale?: number;
  exitScale?: number;
  persist?: boolean;
  exitStart?: number;
  exitDur?: number;
}

// Aparición genérica de un elemento dentro de una escena: entra con fundido +
// deslizamiento + escala, y por defecto se queda visible ("persist") hasta
// que la propia escena lo cubre al desvanecerse. Con persist:false, además
// sale antes de que termine la escena (p. ej. el paquete que "se despliega").
function reveal(
  name: string,
  {
    start,
    dur = 0.5,
    fromX = 0,
    toX = 0,
    exitX = 0,
    fromY = 16,
    toY = 0,
    exitY = -10,
    fromScale = 0.96,
    toScale = 1,
    exitScale = 1.02,
    persist = true,
    exitStart,
    exitDur = 0.4,
  }: RevealOptions,
) {
  const inEnd = start + dur;
  const stops: [number, number, number, number, number][] = [
    [start, 0, fromX, fromY, fromScale],
    [inEnd, 1, toX, toY, toScale],
  ];

  if (persist) {
    stops.push([TOTAL, 1, toX, toY, toScale]);
  } else {
    const es = exitStart ?? inEnd + 1;
    const ee = es + exitDur;
    stops.push([es, 1, toX, toY, toScale]);
    stops.push([ee, 0, exitX, exitY, exitScale]);
    stops.push([TOTAL, 0, exitX, exitY, exitScale]);
  }

  const body = stops
    .map(
      ([t, o, x, y, s]) => `${pct(t)}{opacity:${o};transform:translate(${x}px,${y}px) scale(${s})}`,
    )
    .join("");

  return `@keyframes ${name}{${body}}\n.${name}{opacity:0;animation:${name} ${TOTAL}s cubic-bezier(.22,1,.36,1) infinite}\n`;
}

// Crecimiento de barra (throughput de automatización): escala en Y desde la base.
function grow(name: string, start: number, dur: number, toScale: number) {
  const end = start + dur;
  return (
    `@keyframes ${name}{${pct(start)}{transform:scaleY(0)}${pct(end)}{transform:scaleY(${toScale})}${pct(TOTAL)}{transform:scaleY(${toScale})}}\n` +
    `.${name}{transform:scaleY(0);transform-origin:bottom;animation:${name} ${TOTAL}s cubic-bezier(.16,1,.3,1) infinite}\n`
  );
}

// Trazo de la mini gráfica de latencia (sparkline) "dibujándose" sola.
function draw(name: string, start: number, dur: number, length: number) {
  const end = start + dur;
  return (
    `@keyframes ${name}{${pct(start)}{stroke-dashoffset:${length}}${pct(end)}{stroke-dashoffset:0}${pct(TOTAL)}{stroke-dashoffset:0}}\n` +
    `.${name}{stroke-dasharray:${length};stroke-dashoffset:${length};animation:${name} ${TOTAL}s ease-out infinite}\n`
  );
}

const REVEALS: [string, RevealOptions][] = [
  ["pv35-greet", { start: 5.15, dur: 0.5, fromY: 12 }],
  ["pv35-balance", { start: 5.35, dur: 0.55, fromY: 10, fromScale: 0.92 }],
  ["pv35-badge", { start: 6.05, dur: 0.4, fromY: 6, fromScale: 0.7 }],

  ["pv35-eyebrow2", { start: 10.15, dur: 0.4 }],
  ["pv35-legend", { start: 11.7, dur: 0.4 }],
  ["pv35-row1", { start: 12.0, dur: 0.4, fromY: 10 }],
  ["pv35-row2", { start: 12.25, dur: 0.4, fromY: 10 }],

  ["pv35-eyebrow3", { start: 15.15, dur: 0.4 }],
  ["pv35-note1", { start: 15.35, dur: 0.5, fromY: -18 }],
  ["pv35-note2", { start: 16.15, dur: 0.5, fromY: -18 }],
  ["pv35-note3", { start: 16.95, dur: 0.5, fromY: -18 }],

  ["pv35-eyebrow4", { start: 20.15, dur: 0.4 }],
  ["pv35-xrow0", { start: 20.35, dur: 0.35, fromY: 8 }],
  ["pv35-xrow1", { start: 20.62, dur: 0.35, fromY: 8 }],
  ["pv35-xrow2", { start: 20.89, dur: 0.35, fromY: 8 }],
  ["pv35-xrow3", { start: 21.16, dur: 0.35, fromY: 8 }],
  ["pv35-stamp", { start: 23.4, dur: 0.4, fromY: 6, fromScale: 0.5 }],

  ["pv35-eyebrow5", { start: 25.15, dur: 0.4 }],
  [
    "pv35-envelope",
    {
      start: 25.35,
      dur: 0.4,
      persist: false,
      exitStart: 26.15,
      exitDur: 0.5,
      exitX: 40,
      exitY: -4,
    },
  ],
  ["pv35-sending", { start: 25.4, dur: 0.3, persist: false, exitStart: 26.15, exitDur: 0.35 }],
  ["pv35-sentcheck", { start: 26.65, dur: 0.4, fromScale: 0.5 }],
  ["pv35-pdfcard", { start: 27.35, dur: 0.6, fromY: 30 }],

  ["pv35-icon0", { start: 30.35, dur: 0.45, fromY: 10, fromScale: 0.6 }],
  ["pv35-icon1", { start: 30.51, dur: 0.45, fromY: 10, fromScale: 0.6 }],
  ["pv35-icon2", { start: 30.67, dur: 0.45, fromY: 10, fromScale: 0.6 }],
  ["pv35-icon3", { start: 30.83, dur: 0.45, fromY: 10, fromScale: 0.6 }],
  ["pv35-icon4", { start: 30.99, dur: 0.45, fromY: 10, fromScale: 0.6 }],
  ["pv35-tagline", { start: 31.65, dur: 0.5 }],
  ["pv35-outrologo", { start: 32.45, dur: 0.5 }],
];

const BARS: [string, number, number, number][] = [
  ["pv35-bar0", 10.3, 0.55, 0.5],
  ["pv35-bar1", 10.48, 0.55, 0.85],
  ["pv35-bar2", 10.66, 0.55, 0.38],
  ["pv35-bar3", 10.84, 0.55, 1],
  ["pv35-bar4", 11.02, 0.55, 0.66],
];

const TIMELINE_CSS = [
  buildSceneCSS(),
  buildProgressCSS(),
  ...REVEALS.map(([name, opts]) => reveal(name, opts)),
  ...BARS.map(([name, start, dur, to]) => grow(name, start, dur, to)),
  draw("pv35-spark", 5.3, 0.9, 140),
].join("");

// Estructura, tipografía y "hardware" del reproductor. Fondo blanco puro
// deliberado: es el color del propio video, no depende del tema del sitio.
const STATIC_CSS = `
.pv35-root { --pv-ink:#1d1d1f; --pv-muted:#6e6e73; --pv-accent:#00c2ff; --pv-line:rgba(0,0,0,.07); }

.pv35-stage {
  position: relative;
  isolation: isolate;
  display: flex;
  justify-content: center;
  padding: clamp(1.5rem, 4vw, 2.75rem) 1rem;
  border-radius: 32px;
  background: #ffffff;
}

/* Estático a propósito: animar un elemento con filter:blur() obliga a
   recomponer el blur en cada frame en vez de solo mover una capa cacheada,
   que es lo que hacía sentir "pegada" la sección en celulares de gama baja. */
.pv35-glow {
  position: absolute;
  inset: -10%;
  z-index: 0;
  background:
    radial-gradient(closest-side, rgba(0,194,255,.14), transparent 70%) 30% 20% / 60% 60% no-repeat,
    radial-gradient(closest-side, rgba(0,194,255,.10), transparent 70%) 75% 80% / 55% 55% no-repeat;
  filter: blur(6px);
}

@media (min-width: 768px) and (hover: hover) and (pointer: fine) {
  .pv35-glow { animation: pv35-float 9s ease-in-out infinite; }
}

@keyframes pv35-float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.03); }
}

.pv35-phone {
  position: relative;
  z-index: 1;
  width: min(320px, 78vw);
  aspect-ratio: 9 / 16;
  border-radius: 46px;
  background: linear-gradient(180deg, #fbfbfd, #eef0f3);
  box-shadow:
    0 1px 0 rgba(255,255,255,.6) inset,
    0 0 0 1px rgba(0,0,0,.06),
    0 30px 70px -20px rgba(15, 23, 42, .35),
    0 10px 24px -12px rgba(15, 23, 42, .25);
  padding: 10px;
  animation: pv35-float 7s ease-in-out infinite;
  animation-delay: -2s;
}

.pv35-screen {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 36px;
  background: #ffffff;
  box-shadow: 0 0 0 1px rgba(0,0,0,.08);
}

.pv35-island {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: 84px;
  height: 24px;
  border-radius: 999px;
  background: #0b0b0c;
  z-index: 5;
}

.pv35-statusbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 22px 0;
  font: 600 12px/1 -apple-system, 'SF Pro Text', var(--font-sans, sans-serif);
  color: var(--pv-ink);
}

.pv35-scenes { position: absolute; inset: 0; }

.pv35-scene {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 52px 20px 30px;
  opacity: 0;
  will-change: opacity, transform;
}

.pv35-homebar {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 108px;
  height: 4px;
  border-radius: 999px;
  background: rgba(0,0,0,.55);
  z-index: 5;
}

.pv35-caption {
  margin-top: 1.25rem;
  width: min(320px, 78vw);
  margin-inline: auto;
}

.pv35-progress {
  display: flex;
  gap: 5px;
}

.pv35-progress-track {
  flex: 1;
  height: 3px;
  border-radius: 999px;
  background: rgba(0,0,0,.08);
  overflow: hidden;
}

.pv35-progress-fill {
  display: block;
  height: 100%;
  width: 100%;
  transform-origin: left;
  transform: scaleX(0);
  border-radius: 999px;
  background: var(--pv-ink);
  will-change: transform;
}

.pv35-eyebrow {
  font: 700 10px/1 var(--font-mono, monospace);
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--pv-accent);
  margin-bottom: 10px;
}

.pv35-card {
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 1px 0 rgba(255,255,255,.7) inset, 0 10px 30px -14px rgba(15,23,42,.25), 0 0 0 1px rgba(0,0,0,.05);
}

@media (prefers-reduced-motion: reduce) {
  .pv35-root,
  .pv35-root * {
    animation: none !important;
    animation-play-state: paused !important;
    animation-delay: 0s !important;
    transition: none !important;
  }
}
`;

const FULL_CSS = STATIC_CSS + TIMELINE_CSS;

const TONE_CLASSES: Record<ProductVideoTone, string> = {
  info: "bg-[#00c2ff]/10 text-[#00c2ff]",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-500",
};

function Icon({ name, className = "" }: { name: ProductVideoIconName; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "code":
      return (
        <svg {...common}>
          <path d="M9 6.5L3.5 12 9 17.5" />
          <path d="M15 6.5L20.5 12 15 17.5" />
        </svg>
      );
    case "database":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6" rx="8" ry="3" />
          <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
          <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6.5 9a5.5 5.5 0 1 1 11 0c0 3.6 1.3 5 1.3 5H5.2s1.3-1.4 1.3-5z" />
          <path d="M9.7 17a2.3 2.3 0 0 0 4.6 0" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
          <path d="M3.5 9.5h17M3.5 14.5h17M9.5 4.5v15" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M7.5 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17.4 8.6 4 4 0 0 1 17 18H7.5z" />
          <path d="M12 12.5v4M9.7 14.8l2.3-2.3 2.3 2.3" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M7 3h6l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
          <path d="M13 3v5h5" />
          <path d="M9 14.5h6M9 17.3h6" strokeWidth="1.4" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
    case "up":
      return (
        <svg {...common}>
          <path d="M6.5 17L17 6.5M17 6.5H10M17 6.5v7" />
        </svg>
      );
    default:
      return null;
  }
}

// Memoizado: el carrusel actualiza su estado de arrastre en cada evento de
// puntero/touch, y sin esto React volvería a reconciliar los ~150 nodos de
// este componente (varios <svg>) en cada uno de esos eventos, que es lo que
// hacía sentir "pegada" la sección al arrastrar en celulares de gama baja.
const ProductVideo = memo(function ProductVideo({
  className = "",
  data,
}: {
  className?: string;
  data: ProductVideoData;
}) {
  const { icon, captionLabel, ariaLabel, scenes } = data;
  const { scene0, scene1, scene2, scene3, scene4, scene5, scene6 } = scenes;

  return (
    <div className={`pv35-root mx-auto w-full ${className}`} role="img" aria-label={ariaLabel}>
      <style>{FULL_CSS}</style>

      <div className="pv35-stage">
        <div className="pv35-glow" aria-hidden="true" />

        <div className="pv35-phone" aria-hidden="true">
          <div className="pv35-island" />

          <div className="pv35-screen">
            <div className="pv35-statusbar">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <svg
                  viewBox="0 0 16 12"
                  className="h-2.5 w-3.5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="0" y="7" width="3" height="5" rx="0.6" />
                  <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.6" />
                  <rect x="9" y="2" width="3" height="10" rx="0.6" />
                  <rect x="13.5" y="0" width="2.5" height="12" rx="0.6" opacity="0.35" />
                </svg>
                <svg
                  viewBox="0 0 20 14"
                  className="h-2.5 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M2 5.5a11 11 0 0 1 16 0" />
                  <path d="M5.2 8.6a6.5 6.5 0 0 1 9.6 0" />
                  <circle cx="10" cy="12" r="1.1" fill="currentColor" stroke="none" />
                </svg>
                <span className="h-2.5 w-5 rounded-[3px] border border-current opacity-70" />
              </div>
            </div>

            <div className="pv35-scenes">
              {/* Escena 0 — 0:00–0:05 · Presentación */}
              <div className="pv35-scene pv35-scene-0 items-center justify-center text-center">
                <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#00c2ff]">
                  <span className="absolute inset-0 rounded-[22px] bg-[#00c2ff]/40 blur-xl" />
                  <Icon name={icon} className="relative h-8 w-8 text-white" />
                </div>
                <span className="pv35-eyebrow">{scene0.eyebrow}</span>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--pv-ink)]">
                  {scene0.title}
                </h2>
                <p className="mt-2 max-w-[220px] text-[13px] leading-relaxed text-[var(--pv-muted)]">
                  {scene0.subtitle}
                </p>
              </div>

              {/* Escena 1 — 0:05–0:10 · Métrica principal */}
              <div className="pv35-scene pv35-scene-1">
                <div className="pv35-greet flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00c2ff]">
                    <Icon name={icon} className="h-4 w-4 text-white" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[13px] font-semibold text-[var(--pv-ink)]">
                      {scene1.greetLabel}
                    </p>
                    <p className="text-[11px] text-[var(--pv-muted)]">{scene1.greetSub}</p>
                  </div>
                </div>

                <div className="pv35-balance pv35-card mt-5 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--pv-muted)]">
                    {scene1.metricLabel}
                  </p>
                  <p className="mt-1 text-[26px] font-bold tracking-tight text-[var(--pv-ink)]">
                    {scene1.metricValue}
                  </p>
                  <svg viewBox="0 0 160 40" className="mt-2 h-9 w-full text-[#00c2ff]">
                    <path
                      d="M2 30 L26 24 L48 27 L70 14 L94 18 L118 6 L158 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="pv35-spark"
                    />
                  </svg>
                  <span className="pv35-badge mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-600">
                    <Icon name="up" className="h-3 w-3" />
                    {scene1.badge}
                  </span>
                </div>
              </div>

              {/* Escena 2 — 0:10–0:15 · Actividad y automatización */}
              <div className="pv35-scene pv35-scene-2">
                <span className="pv35-eyebrow2 pv35-eyebrow">{scene2.eyebrow}</span>

                <div className="pv35-card flex h-24 items-end justify-between gap-2 p-3">
                  {BARS.map(([name], i) => (
                    <div
                      key={name}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                    >
                      <div
                        className="h-full w-full overflow-hidden rounded-t-md bg-black/5"
                        style={{ display: "flex", alignItems: "flex-end" }}
                      >
                        <div
                          className={`${name} w-full rounded-t-md`}
                          style={{ height: "100%", background: i === 3 ? "#00c2ff" : "#c7ccd4" }}
                        />
                      </div>
                      <span className="text-[9px] font-medium text-[var(--pv-muted)]">
                        {["L", "M", "M", "J", "V"][i]}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pv35-legend mt-3 flex items-center gap-4 text-[11px] text-[var(--pv-muted)]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#00c2ff]" /> {scene2.legend1}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#c7ccd4]" /> {scene2.legend2}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="pv35-row1 pv35-card flex items-center gap-3 p-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Icon name={scene2.row1.icon} className="h-4 w-4" />
                    </span>
                    <div className="flex-1 leading-tight">
                      <p className="text-[12px] font-semibold text-[var(--pv-ink)]">
                        {scene2.row1.title}
                      </p>
                      <p className="text-[10px] text-[var(--pv-muted)]">{scene2.row1.sub}</p>
                    </div>
                    <span className="text-[12px] font-bold text-emerald-600">
                      {scene2.row1.value}
                    </span>
                  </div>
                  <div className="pv35-row2 pv35-card flex items-center gap-3 p-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-[var(--pv-muted)]">
                      <Icon name={scene2.row2.icon} className="h-4 w-4" />
                    </span>
                    <div className="flex-1 leading-tight">
                      <p className="text-[12px] font-semibold text-[var(--pv-ink)]">
                        {scene2.row2.title}
                      </p>
                      <p className="text-[10px] text-[var(--pv-muted)]">{scene2.row2.sub}</p>
                    </div>
                    <span className="text-[12px] font-bold text-[var(--pv-ink)]">
                      {scene2.row2.value}
                    </span>
                  </div>
                </div>
              </div>

              {/* Escena 3 — 0:15–0:20 · Notificaciones */}
              <div className="pv35-scene pv35-scene-3">
                <span className="pv35-eyebrow3 pv35-eyebrow">{scene3.eyebrow}</span>

                <div className="space-y-2.5">
                  {[scene3.notif1, scene3.notif2, scene3.notif3].map((notif, i) => (
                    <div
                      key={i}
                      className={`pv35-note${i + 1} pv35-card flex items-start gap-3 p-3`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${TONE_CLASSES[notif.tone]}`}
                      >
                        <Icon name={notif.icon} className="h-4 w-4" />
                      </span>
                      <div className="leading-tight">
                        <p className="text-[12px] font-semibold text-[var(--pv-ink)]">
                          {notif.title}
                        </p>
                        <p
                          className={`text-[10.5px] ${notif.tone === "success" ? "font-semibold text-emerald-600" : "text-[var(--pv-muted)]"}`}
                        >
                          {notif.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Escena 4 — 0:20–0:25 · Panel de control */}
              <div className="pv35-scene pv35-scene-4">
                <span className="pv35-eyebrow4 pv35-eyebrow">{scene4.eyebrow}</span>

                <div className="pv35-card overflow-hidden">
                  <div className="grid grid-cols-[1.3fr_0.9fr_0.7fr] gap-1 border-b border-[var(--pv-line)] px-3 py-2 text-[9.5px] font-semibold uppercase tracking-wide text-[var(--pv-muted)]">
                    <span>Servicio</span>
                    <span>Detalle</span>
                    <span>Estado</span>
                  </div>
                  {scene4.rows.map(([service, detail, status, isPositive], i) => (
                    <div
                      key={service}
                      className={`pv35-xrow${i} grid grid-cols-[1.3fr_0.9fr_0.7fr] items-center gap-1 px-3 py-2 text-[11px] text-[var(--pv-ink)] ${i > 0 ? "border-t border-[var(--pv-line)]" : ""}`}
                    >
                      <span className="truncate font-medium">{service}</span>
                      <span>{detail}</span>
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-semibold ${isPositive ? "text-emerald-600" : "text-amber-600"}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${isPositive ? "bg-emerald-500" : "bg-amber-500"}`}
                        />
                        {status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pv35-stamp mt-4 flex items-center gap-2 self-center rounded-full bg-emerald-50 px-3.5 py-2 text-[12px] font-semibold text-emerald-600">
                  <Icon name="check" className="h-3.5 w-3.5" />
                  {scene4.stamp}
                </div>
              </div>

              {/* Escena 5 — 0:25–0:30 · Publicación / cierre de flujo */}
              <div className="pv35-scene pv35-scene-5">
                <span className="pv35-eyebrow5 pv35-eyebrow">{scene5.eyebrow}</span>

                <div className="pv35-card relative flex items-center gap-3 overflow-hidden p-3.5">
                  <div className="pv35-envelope flex h-9 w-9 items-center justify-center rounded-full bg-[#00c2ff]/10 text-[#00c2ff]">
                    <Icon name={scene5.icon} className="h-4 w-4" />
                  </div>
                  <div className="pv35-sending leading-tight">
                    <p className="text-[12px] font-semibold text-[var(--pv-ink)]">
                      {scene5.deployTitle}
                    </p>
                    <p className="text-[10.5px] text-[var(--pv-muted)]">{scene5.deployUrl}</p>
                  </div>
                  <div className="pv35-sentcheck absolute inset-0 flex items-center gap-3 bg-white p-3.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[12px] font-semibold text-[var(--pv-ink)]">
                        {scene5.successTitle}
                      </p>
                      <p className="text-[10.5px] text-[var(--pv-muted)]">{scene5.successSub}</p>
                    </div>
                  </div>
                </div>

                <div className="pv35-pdfcard pv35-card mt-4 flex items-center gap-3 p-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00c2ff]/10 text-[#00c2ff]">
                    <Icon name="doc" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="truncate text-[12px] font-semibold text-[var(--pv-ink)]">
                      {scene5.docTitle}
                    </p>
                    <p className="text-[10.5px] text-[var(--pv-muted)]">{scene5.docSub}</p>
                  </div>
                  <span className="rounded-full bg-black/5 px-2 py-1 text-[9.5px] font-bold uppercase tracking-wide text-[var(--pv-muted)]">
                    DOC
                  </span>
                </div>
              </div>

              {/* Escena 6 — 0:30–0:35 · Cierre */}
              <div className="pv35-scene pv35-scene-6 items-center justify-center text-center">
                <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#00c2ff]">
                    <Icon name={icon} className="h-5 w-5 text-white" />
                  </span>
                  {[
                    { name: "database" as const, cls: "pv35-icon0", pos: "left-0 top-1" },
                    { name: "bell" as const, cls: "pv35-icon1", pos: "right-0 top-1" },
                    { name: "grid" as const, cls: "pv35-icon2", pos: "left-[-6px] bottom-2" },
                    { name: "cloud" as const, cls: "pv35-icon3", pos: "right-[-6px] bottom-2" },
                    {
                      name: "doc" as const,
                      cls: "pv35-icon4",
                      pos: "left-1/2 -translate-x-1/2 -bottom-4",
                    },
                  ].map(({ name, cls, pos }) => (
                    <span
                      key={name}
                      className={`${cls} absolute ${pos} flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--pv-ink)]`}
                      style={{
                        boxShadow: "0 8px 20px -8px rgba(15,23,42,.35), 0 0 0 1px rgba(0,0,0,.06)",
                      }}
                    >
                      <Icon name={name} className="h-4 w-4" />
                    </span>
                  ))}
                </div>

                <p className="pv35-tagline max-w-[210px] text-[15px] font-bold leading-snug tracking-tight text-[var(--pv-ink)]">
                  {scene6.tagline}
                </p>
                <p className="pv35-outrologo mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--pv-muted)]">
                  Nexo
                </p>
              </div>
            </div>
          </div>

          <div className="pv35-homebar" />
        </div>
      </div>

      <div className="pv35-caption" aria-hidden="true">
        <div className="pv35-progress">
          {Array.from({ length: SCENE_COUNT }).map((_, i) => (
            <span key={i} className="pv35-progress-track">
              <span className={`pv35-progress-fill pv35-prog-${i}`} />
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-[var(--pv-muted)]">
          <span>{captionLabel} · Nexo</span>
          <span>0:35 · 9:16</span>
        </div>
      </div>
    </div>
  );
});

export default ProductVideo;
