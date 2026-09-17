import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Lock } from "lucide-react";

import { ScrollAnimation } from "@/components/ScrollAnimation";
import { PROYECTOS, type Proyecto } from "@/config/proyectos";

// Marco de ventana con el dominio —o el nombre de la aplicación, cuando el
// proyecto no vive en la web— a la vista. Mientras no haya capturas propias,
// esto muestra algo cierto en vez de una imagen de archivo ajena al proyecto.
function ProyectoVisual({ proyecto }: { proyecto: Proyecto }) {
  if (proyecto.imagen) {
    return (
      <img
        src={proyecto.imagen}
        alt={proyecto.imagenAlt ?? `Captura del proyecto de ${proyecto.cliente}`}
        loading="lazy"
        className="h-44 w-full object-cover object-top sm:h-52"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex h-44 w-full flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-[#03354a] sm:h-52"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="ml-2 flex-1 truncate rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70">
          {proyecto.dominio ?? proyecto.entorno}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center px-6">
        <span className="text-center font-sans text-lg font-extrabold leading-tight tracking-tight text-white/90 sm:text-xl">
          {proyecto.cliente}
        </span>
      </div>
    </div>
  );
}

function ProyectoCard({ proyecto }: { proyecto: Proyecto }) {
  return (
    <article className="saas-card flex h-full flex-col overflow-hidden rounded-2xl">
      <ProyectoVisual proyecto={proyecto} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00c2ff]">
            {proyecto.sector}
          </span>

          {/* Etiquetado a la vista: quien lee la sección debe poder separar lo
              que entregamos a un cliente de lo que construimos para nosotros. */}
          {proyecto.propio ? (
            <span className="rounded-full border border-[#00c2ff]/40 bg-[#00c2ff]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#00c2ff]">
              Producto propio
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 font-sans text-xl font-extrabold tracking-tight text-foreground">
          {proyecto.cliente}
          {proyecto.anio ? (
            <span className="ml-2 align-middle text-xs font-semibold text-muted-foreground">
              {proyecto.anio}
            </span>
          ) : null}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{proyecto.resumen}</p>

        <ul className="mt-5 space-y-2">
          {proyecto.entregables.map((entregable) => (
            <li key={entregable} className="flex items-start gap-2.5 text-sm text-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00c2ff]" />
              {entregable}
            </li>
          ))}
        </ul>

        {proyecto.metricas?.length ? (
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
            {proyecto.metricas.map((metrica) => (
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

        {/* mt-auto: las tarjetas de una misma fila tienen texto de largo
            distinto y sin esto el enlace queda a distinta altura en cada una. */}
        <div className="mt-auto pt-6">
          <ul className="flex flex-wrap gap-2">
            {proyecto.stack.map((tecnologia) => (
              <li
                key={tecnologia}
                className="rounded-full border border-border bg-muted/60 px-3 py-1 text-[11px] font-semibold text-muted-foreground"
              >
                {tecnologia}
              </li>
            ))}
          </ul>

          {/* Un software interno no tiene enlace que mostrar: en su lugar va la
              razón, para que el hueco no parezca un descuido. */}
          {proyecto.url && proyecto.dominio ? (
            <a
              href={proyecto.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00c2ff] transition-colors hover:text-[#00b0e8]"
            >
              Ver {proyecto.dominio}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          ) : proyecto.notaAcceso ? (
            <p className="mt-5 flex items-start gap-1.5 text-sm text-muted-foreground">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {proyecto.notaAcceso}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ProyectosSection() {
  // Sin proyectos no hay sección: una grilla vacía en la portada dice algo
  // peor que no tener portafolio.
  if (PROYECTOS.length === 0) return null;

  // El número de columnas depende de cuántos proyectos haya: con uno solo,
  // una grilla de tres deja dos huecos y la tarjeta se ve abandonada. Con
  // cuatro se quedan en dos columnas (2x2) en lugar de tres más uno suelto.
  const gridClassName =
    PROYECTOS.length === 1
      ? "mx-auto max-w-2xl"
      : PROYECTOS.length === 2 || PROYECTOS.length === 4
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="proyectos" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollAnimation direction="up">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#00c2ff]">
              Proyectos
            </span>
            <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Trabajo entregado y en línea
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Cada uno de estos sitios está publicado y en uso hoy. Entra, míralo funcionar y juzga
              el resultado por tu cuenta.
            </p>
          </div>
        </ScrollAnimation>

        <div className={`mt-14 grid gap-6 ${gridClassName}`}>
          {PROYECTOS.map((proyecto, index) => (
            <ScrollAnimation
              key={proyecto.key}
              direction="up"
              delay={index * 0.12}
              className="min-w-0"
            >
              <ProyectoCard proyecto={proyecto} />
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation direction="up" delay={0.1}>
          <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              to="/contacto"
              className="btn-cyan inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold sm:text-sm"
            >
              Quiero un proyecto así
            </Link>
            <p className="text-sm text-muted-foreground">
              Te contamos cómo lo construimos y qué tomaría en tu caso.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

export default ProyectosSection;
