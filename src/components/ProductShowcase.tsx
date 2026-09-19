import { Link } from "@tanstack/react-router";

import ProductVideoCarousel from "@/components/ProductVideoCarousel";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { PRODUCT_VIDEOS } from "@/config/productVideos";

// El panel de texto es fijo a propósito: solo el video del carrusel rota
// (ver ProductVideoCarousel). Si el título/lista cambiaran con cada video,
// el largo del texto variaría y el layout de la sección saltaría cada vez
// que el usuario navega entre servicios.
const features = [
  "Software a la medida de tu operación",
  "Plataformas web de alto rendimiento",
  "Automatización de procesos internos",
  "Bases de datos y APIs sincronizadas",
  "Despliegues continuos a producción",
];

export function ProductShowcase() {
  return (
    <section className="relative bg-muted/40 py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
          <ScrollAnimation direction="left" className="min-w-0">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-ink)]">
                Producto
              </span>
              <h2 className="mt-5 font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-foreground">
                Sistemas hechos a la medida de tu negocio
              </h2>
              <p className="mt-6 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
                Diseñamos y construimos el software que tu operación necesita: plataformas web,
                paneles de control, integraciones entre sistemas y procesos automatizados, todo
                desplegado y monitoreado por nuestro equipo.
              </p>

              <ul className="mt-8 space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[var(--brand-ink)]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/contacto"
                className="btn-cyan mt-9 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold"
              >
                Conoce el proyecto
              </Link>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right" delay={0.15} className="min-w-0">
            <ProductVideoCarousel items={PRODUCT_VIDEOS} className="max-w-sm lg:max-w-none" />
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;
