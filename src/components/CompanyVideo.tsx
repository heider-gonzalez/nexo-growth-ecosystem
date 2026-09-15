import { useState } from "react";

import { companyVideo } from "@/config/media";

/**
 * Reproductor con fachada: se muestra una miniatura propia y el iframe del
 * proveedor sólo se inserta cuando la persona pulsa reproducir. Evita cargar
 * scripts de terceros a quien nunca vio el video.
 */
export function CompanyVideo() {
  const [playing, setPlaying] = useState(false);
  const { provider, source, poster, title, description, duration, captions } = companyVideo;

  // Sin video configurado la sección no existe, en vez de dejar un hueco
  if (!source) return null;

  const embedUrl =
    provider === "vimeo"
      ? `https://player.vimeo.com/video/${source}?autoplay=1`
      : `https://www.youtube-nocookie.com/embed/${source}?autoplay=1&rel=0`;

  return (
    <section className="relative bg-background py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-end lg:gap-16">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#00c2ff]">
              Quiénes somos
            </span>
            <h2 className="mt-5 font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-foreground">
              {title}
            </h2>
            <p className="mt-6 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
            {duration && (
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Duración {duration}
              </p>
            )}
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="aspect-video w-full">
              {playing ? (
                provider === "file" ? (
                  <video
                    src={source}
                    poster={poster}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                  >
                    {captions && (
                      <track kind="captions" src={captions} srcLang="es" label="Español" default />
                    )}
                  </video>
                ) : (
                  <iframe
                    src={embedUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                )
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Reproducir: ${title}`}
                  className="group relative block h-full w-full"
                >
                  <img
                    src={poster}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-slate-950/45 transition-colors group-hover:bg-slate-950/30" />

                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00c2ff] shadow-[0_0_40px_rgba(0,194,255,0.45)] transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="ml-1 h-6 w-6 text-slate-950 md:h-7 md:w-7"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompanyVideo;
