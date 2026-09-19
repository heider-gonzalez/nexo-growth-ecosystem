# Plan de Optimización de Rendimiento, Carga y Animaciones: NEXO Web

**Objetivo:** Llevar la plataforma a puntuaciones de 95+ en Google Lighthouse (Mobile & Desktop), reducir el Total Blocking Time (TBT) a < 50ms, eliminar saltos de diseño (CLS = 0) y garantizar animaciones fluidas a 60/120 FPS constantes.

---

## Fase 1: Optimización de Assets y Fuentes (LCP & CLS)

### 1.1 Migración y Compresión de Imágenes

- [x] Implementar la etiqueta `<picture>` o dimensiones responsivas con ratios de aspecto optimizados.
- [x] Declarar de manera explícita `width` y `height` o ratios de aspecto (`aspect-ratio`) en cada etiqueta `<img>` para reservar espacio y anular el Cumulative Layout Shift (CLS).
- [x] Aplicar `loading="lazy"` y `decoding="async"` a todos los elementos gráficos por debajo del pliegue (below-the-fold).
- [x] Mantener `loading="eager"` y `fetchpriority="high"` únicamente en el logo principal y el asset del Hero section (LCP).

### 1.2 Estrategia de Fuentes Locales (FOIT/FOUT Mitigation)

- [x] Eliminar dependencias bloqueantes de CDN externos (`fonts.googleapis.com` y `fonts.gstatic.com`).
- [x] Descargar la tipografía (Inter) en formato comprimido **`.woff2`** y alojarla localmente en `/public/fonts/`.
- [x] Declarar `@font-face` en CSS con la propiedad `font-display: swap`.
- [x] Precargar únicamente el peso principal mediante `<link rel="preload" as="font" type="font/woff2" crossorigin href="...">`.

---

## Fase 2: Reducción del Bundle JS y Carga Diferida (FCP, TBT & INP)

### 2.1 Code-Splitting y Dynamic Imports

- [x] Identificar componentes pesados que no se renderizan en el viewport inicial (Hero):
  - Formulario de contacto y modales (`ContactForm`).
  - Interactive Showcase / Mockup interactivo (`ProductShowcase`).
  - Animaciones complejas y pie de página (`CompanyVideo`).
- [x] Aplicar `lazy loading` dinámico (`React.lazy` / dynamic imports) envuelto en `Suspense` con fallbacks visuales ligeros para evitar retrasar el hilo principal.

### 2.2 Tree Shaking y Análisis de Dependencias

- [x] Auditar paquetes y eliminar dependencias huérfanas (`recharts` vía `chart.tsx`, `@react-three/drei`, `SpatialBackground.tsx`, y `zod` innecesario en rutas).
- [x] Separación en chunks modulares mediante `manualChunks` (`vendor-react`, `vendor-tanstack`, `vendor-framer`).
- [x] Mantener el JavaScript inicial del primer pantallazo por debajo de **80 KB gzip** (Logrado: **72.75 KB gzip**).

---

## Fase 3: Arquitectura y Rendimiento de Animaciones (FPS & Compositor Layer)

### 3.1 Aceleración por Hardware (GPU Offloading)

- [x] En la página principal/raíz de la web hay dos animaciones que empeoraban el rendimiento de la web al cambiar de tema:
  - **X animada (NexoLogo3D):** Desconectada del recálculo de tema con `transition: none !important;`, pausa del bucle WebGL (`frameloop={isVisible ? "always" : "never"}`) vía `IntersectionObserver` al salir del viewport, y reducción del blur excesivo de fondo para prevenir stalls del GPU rasterizer.
  - **Teléfono en Producto (ProductVideo):** Migrada la barra de progreso de `width: %` a `transform: scaleX(...)` para eliminar reflow continuo a 60fps; migrados los puntos del carrusel a `transform: scaleX(2.75)`; aislados los estilos del teléfono contra recálculos de tema.
- [x] Prohibir terminantemente animar propiedades que disparen _Reflow/Layout_ o _Repaint_ (`top`, `left`, `width`, `height`, `margin`, `padding`). Migrado `.svc-rule::after` a `transform: scaleX(...)`.
- [x] Restringir todas las animaciones y transiciones exclusivamente a propiedades compuestas por GPU:
  - `transform: translate3d(x, y, 0) / scale() / rotate()`
  - `opacity`
- [x] Aplicar `will-change: transform, opacity` únicamente en elementos en interacción activa.

### 3.2 Optimización de Librerías de Animación (Framer Motion / Motion)

- [x] Configurar observadores de intersección (`IntersectionObserver` y `useInView` con `once: true`).
- [x] Reducir la cantidad de elementos simultáneos con efectos de blur complejos (`backdrop-filter`) en móviles.
- [x] Implementar la media query `@media (prefers-reduced-motion: reduce)` en CSS y el hook `useReducedMotion()` en `ScrollAnimation` y `WhatsAppButton`.

---

## Fase 4: Caché y Entrega en Edge (TTFB)

### 4.1 Headers de Caché HTTP

- [x] Configurar directivas estrictas en la capa de hosting (`vercel.json` y `public/_headers`):
  - Assets estáticos versionados (`/assets/*`, fonts, imágenes):
    `Cache-Control: public, max-age=31536000, immutable`
  - Respuestas dinámicas o páginas SSR:
    `Cache-Control: public, max-age=0, s-maxage=86400, stale-while-revalidate=3600`
- [x] Habilitar caché local de fuentes en el Service Worker (`public/sw.js`).

---

## Fase 5: Matriz de Validación de Rendimiento

| Métrica                             | Objetivo    | Estado Inicial | Estado Optimizado |
| :---------------------------------- | :---------- | :------------- | :---------------- |
| **Initial Critical JS (gzip)**      | $\le$ 80 KB | 123.45 KB      | **72.75 KB**      |
| **External Render-blocking Fonts**  | 0 CDNs      | Google Fonts   | **0 (Local WOFF2)**|
| **LCP Image Preload Overhead**      | 1 asset     | 2 logos PNG    | **1 (Eager + High)**|
| **3D Offscreen Render Loop**        | 0 FPS idle  | 60 FPS always  | **0 FPS (Paused)** |
| **Progress Bar Animation Reflows**  | 0 reflows   | 35s constant   | **0 (GPU scaleX)** |
| **Theme Switch Layout Recalculation**| Aislado    | Global `*`     | **Aislado GPU**    |
| **Prefers Reduced Motion Support**  | Completo    | Parcial        | **Total (CSS + JS)**|
