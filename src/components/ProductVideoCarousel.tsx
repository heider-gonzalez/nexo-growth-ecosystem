import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import ProductVideo from "@/components/ProductVideo";
import type { ProductVideoData } from "@/config/productVideos";

/**
 * Carrusel de 3 "videos" simulados (ver ProductVideo). Navega con flechas,
 * puntos o arrastre (mouse/touch vía Pointer Events) y combina un
 * deslizamiento horizontal con un desvanecido/escalado de la escena
 * saliente y entrante, para que el cambio entre servicios se sienta como
 * una transición de una sola pieza en vez de un corte.
 *
 * Durante el arrastre el track sigue el dedo 1:1 (sin transición CSS) para
 * que no haya retraso; al soltar (o al navegar con flechas/puntos) se activa
 * la transición para el "snap" final.
 */

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

const CAROUSEL_CSS = `
/* min-width:0 es el punto clave en mobile: sin él, un ítem de grid no se
   encoge por debajo del ancho mínimo de su contenido, y como el track de
   abajo tiene 3 diapositivas con flex-shrink:0 (no pueden encogerse), todo
   el carrusel terminaba exigiendo ~3 anchos de pantalla y desbordaba la
   página completa (scroll/zoom horizontal en el sitio entero). */
.pvc-root { position: relative; width: 100%; max-width: 100%; min-width: 0; }

.pvc-viewport {
  overflow: hidden;
  touch-action: pan-y;
  cursor: grab;
  min-width: 0;
}
.pvc-viewport.is-dragging { cursor: grabbing; }

.pvc-track {
  display: flex;
  width: 100%;
  min-width: 0;
  will-change: transform;
}
.pvc-track.is-animating { transition: transform .55s cubic-bezier(.22,1,.36,1); }

/* opacity/transform de reposo los pone el style inline (según distancia al
   slide activo) en cada render, así que no hace falta declararlos aquí. */
.pvc-slide {
  flex: 0 0 100%;
  min-width: 0;
}
.pvc-slide.is-animating { transition: opacity .5s ease, transform .5s cubic-bezier(.22,1,.36,1); }

.pvc-placeholder {
  width: min(320px, 78vw);
  aspect-ratio: 9 / 16;
  margin: clamp(1.5rem, 4vw, 2.75rem) auto;
  border-radius: 46px;
  background: linear-gradient(180deg, #fbfbfd, #eef0f3);
}

.pvc-arrow {
  position: absolute;
  top: 42%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 0;
  background: rgba(255,255,255,.92);
  color: #1d1d1f;
  box-shadow: 0 8px 20px -8px rgba(15,23,42,.35), 0 0 0 1px rgba(0,0,0,.06);
  transition: transform .2s ease, background .2s ease, opacity .2s ease;
  z-index: 3;
  cursor: pointer;
}
.pvc-arrow:hover { transform: translateY(-50%) scale(1.08); background: #fff; }
.pvc-arrow:active { transform: translateY(-50%) scale(0.94); }
/* En mobile las flechas van DENTRO del cuadro (nunca fuera de pvc-root):
   con la columna angosta, un offset negativo las manda contra o más allá
   del borde de la pantalla. Solo desde sm: hay margen de sobra para
   sacarlas un poco afuera del teléfono como en desktop. */
.pvc-arrow-left { left: 6px; }
.pvc-arrow-right { right: 6px; }
@media (min-width: 640px) {
  .pvc-arrow-left { left: -16px; }
  .pvc-arrow-right { right: -16px; }
}

.pvc-dots {
  margin-top: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.pvc-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: 0;
  background: rgba(0,0,0,.15);
  transition: width .3s ease, background .3s ease;
  cursor: pointer;
}
.pvc-dot.is-active { width: 22px; background: #00c2ff; }

/* Solo el video activo necesita sus 30+ animaciones corriendo: pausar las
   de los otros 2 evita triplicar la carga del compositor sin que se note
   (retoman desde donde quedaron al volver a quedar activos). */
.pvc-slide:not(.is-active) .pv35-root * { animation-play-state: paused !important; }

@media (prefers-reduced-motion: reduce) {
  .pvc-track, .pvc-slide { transition: none !important; }
}
`;

export default function ProductVideoCarousel({
  items,
  className = "",
}: {
  items: ProductVideoData[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [animating, setAnimating] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(0);
  // Cada ProductVideo trae su propia hoja de +100 keyframes; solo se monta
  // el "video" activo al inicio y los demás se activan la primera vez que
  // se navega a ellos, para no correr 3 timelines completas a la vez.
  const [visited, setVisited] = useState(() => new Set([0]));
  const viewportRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);
  const widthRef = useRef(1);
  const pointerIdRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingDeltaRef = useRef(0);

  // Mide el ancho del viewport (para el umbral de swipe y el desvanecido en
  // vivo del render) y lo mantiene al día si el layout cambia de tamaño.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    const update = () => {
      const w = el.getBoundingClientRect().width || 1;
      widthRef.current = w;
      setViewportWidth(w);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const lastIndex = items.length - 1;
  const clampIndex = (i: number) => Math.max(0, Math.min(lastIndex, i));

  const visit = (i: number) => setVisited((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));

  const goTo = (next: number) => {
    const clamped = clampIndex(next);
    setAnimating(true);
    visit(clamped);
    setIndex(clamped);
  };

  // Patrón de teclado para un tablist con activación automática: ←/→ mueven
  // el foco Y activan el slide (Home/End van al primero/último). El foco
  // sigue al tab activo (roving tabindex) en vez de quedarse en el que se
  // acaba de ocultar.
  const handleDotKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    let next: number | null = null;
    if (e.key === "ArrowLeft") next = clampIndex(index - 1);
    else if (e.key === "ArrowRight") next = clampIndex(index + 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = lastIndex;
    if (next === null || next === index) return;
    e.preventDefault();
    goTo(next);
    dotRefs.current[next]?.focus();
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerIdRef.current = e.pointerId;
    startXRef.current = e.clientX;
    startTimeRef.current = performance.now();
    setAnimating(false);
    setIsDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  // El navegador puede disparar touchmove/pointermove muchas más veces por
  // segundo que la tasa de refresco de pantalla. Sin agrupar en un solo
  // requestAnimationFrame, cada evento dispara un setState (y por lo tanto
  // un render) — en un celular de gama baja eso es lo que se sentía como la
  // sección "pegándose" al arrastrar.
  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || e.pointerId !== pointerIdRef.current) return;
    let delta = e.clientX - startXRef.current;
    const atStart = index === 0 && delta > 0;
    const atEnd = index === lastIndex && delta < 0;
    if (atStart || atEnd) delta *= 0.35; // resistencia en los extremos
    pendingDeltaRef.current = delta;
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setDragX(pendingDeltaRef.current);
      });
    }
  };

  const finishDrag = () => {
    if (!isDragging) return;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsDragging(false);
    const finalDelta = pendingDeltaRef.current;
    const elapsed = Math.max(1, performance.now() - startTimeRef.current);
    const velocity = finalDelta / elapsed; // px/ms, +derecha / -izquierda
    const threshold = widthRef.current * 0.16;
    // Un flick corto y rápido cuenta como swipe aunque no cruce el 16% del
    // ancho: sin esto, un gesto veloz pero de poco recorrido no navegaba,
    // que es justo el gesto más natural para "pasar" el video.
    const FLICK_VELOCITY = 0.5;
    const crossedLeft = finalDelta <= -threshold || velocity <= -FLICK_VELOCITY;
    const crossedRight = finalDelta >= threshold || velocity >= FLICK_VELOCITY;
    pendingDeltaRef.current = 0;
    setDragX(0);
    if (crossedLeft && index < lastIndex) {
      goTo(index + 1);
    } else if (crossedRight && index > 0) {
      goTo(index - 1);
    } else {
      setAnimating(true);
    }
  };

  const trackTransform = `translateX(calc(-${index * 100}% + ${dragX}px))`;
  const activeFloat = index - dragX / (viewportWidth || 1);

  return (
    <div className={`pvc-root ${className}`}>
      <style>{CAROUSEL_CSS}</style>

      <div
        ref={viewportRef}
        className={`pvc-viewport ${isDragging ? "is-dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onPointerLeave={(e) => {
          // setPointerCapture (en pointerdown) redirige pointermove/up, pero
          // NO pointerleave: sin este chequeo, arrastrar en diagonal y sacar
          // el cursor del cuadro cortaba el drag a mitad de camino aunque el
          // botón siguiera presionado. e.buttons===0 confirma que ya se soltó.
          if (isDragging && e.buttons === 0) finishDrag();
        }}
      >
        <div
          className={`pvc-track ${animating ? "is-animating" : ""}`}
          style={{ transform: trackTransform }}
        >
          {items.map((item, i) => {
            const distance = Math.min(1, Math.abs(i - activeFloat));
            return (
              <div
                key={item.key}
                id={`pvc-panel-${item.key}`}
                role="tabpanel"
                aria-labelledby={`pvc-tab-${item.key}`}
                className={`pvc-slide ${animating ? "is-animating" : ""} ${i === index ? "is-active" : ""}`}
                style={{ opacity: 1 - distance * 0.65, transform: `scale(${1 - distance * 0.06})` }}
                aria-hidden={i !== index}
              >
                {visited.has(i) ? (
                  <ProductVideo data={item} />
                ) : (
                  <div className="pvc-placeholder" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {index > 0 && (
        <button
          type="button"
          className="pvc-arrow pvc-arrow-left"
          onClick={() => goTo(index - 1)}
          aria-label="Servicio anterior"
        >
          <ChevronIcon direction="left" />
        </button>
      )}
      {index < lastIndex && (
        <button
          type="button"
          className="pvc-arrow pvc-arrow-right"
          onClick={() => goTo(index + 1)}
          aria-label="Servicio siguiente"
        >
          <ChevronIcon direction="right" />
        </button>
      )}

      <div className="pvc-dots" role="tablist" aria-label="Selecciona un servicio">
        {items.map((item, i) => (
          <button
            key={item.key}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            id={`pvc-tab-${item.key}`}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-controls={`pvc-panel-${item.key}`}
            aria-label={item.dotLabel}
            tabIndex={i === index ? 0 : -1}
            className={`pvc-dot ${i === index ? "is-active" : ""}`}
            onClick={() => goTo(i)}
            onKeyDown={handleDotKeyDown}
          />
        ))}
      </div>
    </div>
  );
}
