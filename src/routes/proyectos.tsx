import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, X as CloseIcon, Lock, Check } from "lucide-react";
import { z } from "zod";

import { Layout } from "@/components/Layout";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { PROYECTOS, type Proyecto } from "@/config/proyectos";

// Igual que el directorio de equipo: el detalle abierto se guarda en la URL
// (?proyecto=key) y no sólo en useState. Así abrir un proyecto crea una
// entrada real de historial y el botón "Atrás" del navegador vuelve a la
// grilla, no a Inicio.
const searchSchema = z.object({
  proyecto: z.string().optional(),
});

export const Route = createFileRoute("/proyectos")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Proyectos — Nexo" },
      {
        name: "description",
        content:
          "Sitios, plataformas y software a la medida que hemos construido y entregado: qué resolvía cada proyecto, cómo se construyó y dónde está funcionando hoy.",
      },
    ],
  }),
  component: ProyectosPage,
});

/**
 * Marco de ventana con el dominio —o el nombre de la aplicación, cuando el
 * proyecto no vive en la web— a la vista. Mientras un proyecto no tenga
 * captura propia, esto muestra algo cierto en lugar de una imagen de archivo
 * ajena al proyecto.
 */
function ProyectoVisual({ proyecto, className = "" }: { proyecto: Proyecto; className?: string }) {
  if (proyecto.imagen) {
    return (
      <img
        src={proyecto.imagen}
        alt={proyecto.imagenAlt ?? `Captura del proyecto de ${proyecto.cliente}`}
        loading="lazy"
        decoding="async"
        className={`w-full object-cover object-top ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`flex w-full flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-[#03354a] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="ml-2 flex-1 truncate rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70">
          {proyecto.dominio ?? proyecto.entorno}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-8">
        <span className="text-center font-sans text-lg font-extrabold leading-tight tracking-tight text-white/90 sm:text-2xl">
          {proyecto.cliente}
        </span>
      </div>
    </div>
  );
}

function ProyectoCard({ proyecto, onOpen }: { proyecto: Proyecto; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="saas-card group flex h-full w-full flex-col overflow-hidden rounded-2xl text-left"
    >
      <ProyectoVisual proyecto={proyecto} className="h-48 sm:h-56" />

      <div className="flex flex-1 flex-col p-6">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00c2ff]">
          {proyecto.sector}
        </span>

        <h2 className="mt-3 font-sans text-xl font-extrabold tracking-tight text-foreground">
          {proyecto.cliente}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {proyecto.resumen}
        </p>

        {/* mt-auto: el pie de todas las tarjetas de una fila queda a la misma
            altura aunque el resumen de cada una tenga otro largo. */}
        <div className="mt-auto pt-6">
          <ul className="flex flex-wrap gap-2">
            {proyecto.stack.slice(0, 3).map((tecnologia) => (
              <li
                key={tecnologia}
                className="rounded-full border border-border bg-muted/60 px-3 py-1 text-[11px] font-semibold text-muted-foreground"
              >
                {tecnologia}
              </li>
            ))}
            {proyecto.stack.length > 3 ? (
              <li className="rounded-full border border-border bg-muted/60 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                +{proyecto.stack.length - 3}
              </li>
            ) : null}
          </ul>

          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00c2ff] transition-transform group-hover:translate-x-0.5">
            Ver el proyecto
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </button>
  );
}

function ProyectosPage() {
  const { proyecto: proyectoKey } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  const selected = proyectoKey
    ? (PROYECTOS.find((item) => item.key === proyectoKey) ?? null)
    : null;

  // Mientras el detalle está abierto se bloquea el scroll del body, para que
  // el modal se comporte como una pantalla contenida y no asome el footer.
  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  const openProyecto = (item: Proyecto) => {
    setIsClosing(false);
    navigate({ search: { proyecto: item.key } });
  };

  const closeProyecto = (event?: React.MouseEvent) => {
    if (event) event.preventDefault();
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      navigate({ search: {} });
      setIsClosing(false);
    }, 200);
  };

  // Escape cierra el detalle, como en cualquier diálogo.
  useEffect(() => {
    if (!selected) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProyecto();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Los tres números salen de la lista, no están escritos a mano: si mañana
  // entra otro proyecto, la cabecera se actualiza sola. La frontera entre uno
  // y otro es si tiene URL pública que visitar.
  const sitiosWeb = PROYECTOS.filter((item) => item.url).length;
  const aplicaciones = PROYECTOS.length - sitiosWeb;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative flex min-h-[46vh] items-center justify-center overflow-hidden bg-background pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <ScrollAnimation direction="up">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#00c2ff]">
                Proyectos
              </span>
              <h1 className="mt-5 font-sans text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Lo que hemos <span className="text-[#00c2ff]">construido</span>
              </h1>
              <p className="mt-6 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
                Sitios, plataformas y software a la medida que hoy están en uso. Aquí está qué
                resolvía cada uno, cómo lo construimos y dónde verlo funcionando.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.12}>
            <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-3">
              <div className="text-center">
                <dt className="sr-only">Proyectos entregados</dt>
                <dd className="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  {PROYECTOS.length}
                </dd>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Proyectos
                </p>
              </div>

              <div className="text-center">
                <dt className="sr-only">Sitios web en línea</dt>
                <dd className="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  {sitiosWeb}
                </dd>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Sitios en línea
                </p>
              </div>

              <div className="col-span-2 text-center sm:col-span-1">
                <dt className="sr-only">Aplicaciones a la medida</dt>
                <dd className="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  {aplicaciones}
                </dd>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Aplicaciones
                </p>
              </div>
            </dl>
          </ScrollAnimation>
        </div>
      </section>

      {/* Grilla */}
      <section className="relative border-t border-border bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {PROYECTOS.map((item, index) => (
              <ScrollAnimation
                key={item.key}
                direction="up"
                delay={index * 0.08}
                className="min-w-0"
              >
                <ProyectoCard proyecto={item} onOpen={() => openProyecto(item)} />
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation direction="up" delay={0.1}>
            <div className="mt-16 flex flex-col items-start gap-4 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-sans text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                  ¿Quieres algo así para tu negocio?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Te contamos cómo lo construimos y qué tomaría en tu caso.
                </p>
              </div>

              <Link
                to="/contacto"
                className="btn-cyan inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold sm:text-sm"
              >
                Hablemos de tu proyecto
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Detalle */}
      {selected && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md transition-all duration-200 ease-out sm:p-6 md:p-10 ${
            isClosing
              ? "opacity-0 backdrop-blur-none"
              : "animate-in fade-in opacity-100 duration-200"
          }`}
          onClick={closeProyecto}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="proyecto-titulo"
            onClick={(event) => event.stopPropagation()}
            className={`relative flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border/80 bg-background shadow-2xl transition-all duration-200 ease-out ${
              isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <button
              type="button"
              onClick={closeProyecto}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
            >
              <CloseIcon className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="overflow-y-auto">
              <ProyectoVisual proyecto={selected} className="h-52 sm:h-72" />

              <div className="p-6 sm:p-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00c2ff]">
                  {selected.sector}
                </span>

                <h2
                  id="proyecto-titulo"
                  className="mt-3 font-sans text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl"
                >
                  {selected.cliente}
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {selected.resumen}
                </p>

                <div className="mt-10 grid gap-10 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      Qué construimos
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {selected.entregables.map((entregable) => (
                        <li
                          key={entregable}
                          className="flex items-start gap-2.5 text-sm text-foreground"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[#00c2ff]">
                            <Check className="h-3 w-3" aria-hidden="true" />
                          </span>
                          {entregable}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      Con qué
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {selected.stack.map((tecnologia) => (
                        <li
                          key={tecnologia}
                          className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground"
                        >
                          {tecnologia}
                        </li>
                      ))}
                    </ul>

                    {selected.metricas?.length ? (
                      <dl className="mt-8 grid grid-cols-2 gap-4">
                        {selected.metricas.map((metrica) => (
                          <div key={metrica.etiqueta}>
                            <dt className="sr-only">{metrica.etiqueta}</dt>
                            <dd className="font-sans text-2xl font-extrabold tracking-tight text-foreground">
                              {metrica.valor}
                            </dd>
                            <p className="mt-1 text-xs leading-snug text-muted-foreground">
                              {metrica.etiqueta}
                            </p>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </div>
                </div>

                <div className="mt-10 border-t border-border pt-6">
                  {selected.url && selected.dominio ? (
                    <a
                      href={selected.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cyan inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
                    >
                      Ver {selected.dominio}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">(se abre en una pestaña nueva)</span>
                    </a>
                  ) : selected.notaAcceso ? (
                    <p className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {selected.notaAcceso}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
