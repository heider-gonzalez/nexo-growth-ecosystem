# TASK SPECIFICATION: Rediseño Módulo "Quiénes Somos" (/quienes-somos)

## 1. Contexto y Objetivos del Cambio

Modernizar la página `/quienes-somos` de NEXO para elevar su autoridad técnica, mejorar la legibilidad y dinamismo visual, y optimizar el flujo de conversión. Se debe transformar la actual estructura basada puramente en texto y listas estáticas a un diseño contemporáneo que integre assets visuales generados para **Misión** y **Visión**, incorpore patrones tipo **Bento Grid / Split Layout**, microinteracciones y un Call to Action (CTA) antes del footer.

---

## 2. Inventario de Assets Requeridos

Las imagenes se encuentran en la carpeta quienes somos que se encuentra dentro de la carpeta public, son dos imagenes tipo Avif una para la mision y otra para la vision.

---

## 3. Arquitectura del Layout y Secciones

### Sección 1: Hero & Concepto NEXO (Refactorización)

- **Objetivo:** Eliminar la monotonía de texto plano conectando el concepto de "puente tecnológico".
- **Diseño UI:**
  - **Top:** Badge de contexto (`Nuestra Identidad & Propósito`), H1 con gradiente de texto acentuado (`El puente estratégico entre la tecnología y tu negocio`) y párrafo introductorio de alto contraste.
  - **Pilar Grid (01, 02, 03):**
    - Transformar los 3 items en tarjetas interactivas compactas (`grid grid-cols-1 md:grid-cols-3 gap-6`).
    - Estilo: Glassmorphism sutil (`bg-[#0B1120]/60 backdrop-blur-md border border-white/5 hover:border-cyan-500/30`).
    - Microinteracciones: Transición suave (`transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]`).
    - Indicadores numéricos (`01`, `02`, `03`) con tipografía monospace / tabular y acento cian/teal brillante.

---

### Sección 2: Misión y Visión (Rediseño Principal con Assets)

- **Estructura:** Alternancia en 2 bloques independientes (Split Layout / Bento Cards asimétricas) en lugar de dos tarjetas idénticas y simétricas colapsadas de texto.
- **Depuración de Contenido:** Eliminar la duplicidad entre el párrafo descriptivo y la cita redundante entre comillas.

#### Bloque A: Misión (Enfoque: Ejecución Técnica & Operación)

- **Layout:** Grid 2 columnas (Desktop: 50% texto / 50% visual).
  - **Columna Izquierda (Texto):**
    - Tag: `Misión · Ejecución & Entrega`
    - Titular H3: `Transformar y Acelerar Negocios`
    - Copy conciso: Máximo 3 líneas enfocadas en desarrollo web a medida, integraciones de IA, CRM y optimización ágil de procesos.
    - Feature pills / Badges con iconos SVG limpios:
      - `[✓] Resultados tangibles y medibles`
      - `[✓] Desarrollo ágil e iteración continua`
      - `[✓] Arquitectura limpia y escalabilidad`
  - **Columna Derecha (Visual):**
    - Contenedor con borde pulido (`rounded-2xl overflow-hidden border border-white/10 relative group`).
    - Máscara/Gradiente interno de fusión en los bordes para integrarse naturalmente con el fondo oscuro (`bg-gradient-to-t from-[#050811] via-transparent to-transparent`).
    - Imagen `mision.webp` con ligero zoom suave al hacer hover (`group-hover:scale-105 transition-transform duration-700 ease-out`).

#### Bloque B: Visión (Enfoque: Proyección, Escala & Futuro)

- **Layout:** Grid 2 columnas invertido (Desktop: 50% visual / 50% texto).
  - **Columna Izquierda (Visual):**
    - Contenedor idéntico con borde estilizado, glow cian/azul tenue en hover (`group-hover:border-cyan-500/40`).
    - Imagen `vision.webp` con zoom interactivo.
  - **Columna Derecha (Texto):**
    - Tag: `Visión · Proyección & Futuro`
    - Titular H3: `El Socio Tecnológico Imprescindible`
    - Copy conciso: Posicionamiento como partner clave en automatización inteligente, escalabilidad sin límites y aceleración directa de ingresos.
    - Feature pills:
      - `[✓] Liderazgo en innovación digital`
      - `[✓] Automatización e inteligencia operativa`
      - `[✓] Escalabilidad e impacto comercial`

---

### Sección 3: Manifiesto / Principios de Ingeniería (Nuevo Bloque de Autoridad)

- **Objetivo:** Dar respaldo técnico al "Quiénes Somos" sin inflar la página con texto genérico.
- **Layout:** 3 o 4 tarjetas compactas de principios técnicos:
  1. **Zero Deuda Técnica:** Arquitecturas limpias y tipadas de principio a fin.
  2. **Entrega Continua (CI/CD):** Iteraciones rápidas con feedback real de negocio.
  3. **Data & AI Driven:** Automatizaciones que resuelven cuellos de botella operativos reales.

---

### Sección 4: Pre-Footer CTA (Conversión Directa)

- **Problema resuelto:** Evita el corte abrupto de navegación hacia el footer.
- **Diseño:**
  - Tarjeta centralizada con fondo degradado sutil (`from-cyan-950/20 via-blue-950/10 to-transparent border border-cyan-500/20 rounded-3xl p-10 text-center relative overflow-hidden`).
  - Glow radial de fondo.
  - H2: `¿Listo para transformar la infraestructura digital de tu negocio?`
  - P: `Diseñamos soluciones personalizadas que conectan ingeniería de vanguardia con tus metas de crecimiento.`
  - Botón primario:
    - Componente Link hacia `/contacto`.
    - Estilo: Botón con gradiente de marca, estado hover interactivo y microanimación de flecha (`group-hover:translate-x-1`).

---

## 4. Guía de Estilos y Tokens de Diseño

*Manten la paleta de colores base de la web.

- Manten la tipografia base de la web.

---

## 5. Checklist de Implementación Técnica (DoD)

1. [ ] **Assets:** Verificar la ubicacion de los archivos.
2. [ ] **Responsive Design:** Validar comportamiento en mobile y modo tableta (las columnas visuales colapsan ordenadamente debajo o encima del texto según prioridad de lectura: Texto primero, imagen después en mobile).
3. [ ] **Performance & Accesibilidad:**
   - Añadir etiquetas `alt` semánticas y descriptivas a cada imagen (sin palabras vacías como "imagen de").
   - Definir `aspect-ratio` o dimensiones explícitas (`width` y `height`) para prevenir Cumulative Layout Shift (CLS).
4. [ ] **Depuración de UI:** Verificar que no existan estilos rotos en el header/dropdown y que el botón del nuevo CTA conduzca fluidamente a `/contacto`.
