/**
 * ─────────────────────────────────────────────────────────────────────
 * VIDEO DE PRESENTACIÓN — PENDIENTE DE GRABAR
 * ─────────────────────────────────────────────────────────────────────
 *
 * Mientras `source` esté vacío, la sección no se renderiza: no queda un
 * hueco ni un reproductor roto en la portada.
 *
 * Dos formas de conectarlo:
 *
 * 1. Alojado fuera (RECOMENDADO)
 *    provider: 'youtube', source: 'ID_DEL_VIDEO'
 *    provider: 'vimeo',   source: 'ID_DEL_VIDEO'
 *
 *    La miniatura no se descarga desde el proveedor: se usa `poster`, un
 *    archivo propio. Así no se contacta a Google/Vimeo hasta que alguien
 *    pulsa reproducir, que es lo que corresponde con el aviso de cookies.
 *
 * 2. Archivo propio
 *    provider: 'file', source: '/presentacion.mp4'
 *    Sólo si el archivo pesa menos de 5 MB.
 *
 * `captions` apunta a un archivo .vtt de subtítulos. No es opcional en la
 * práctica: la mayoría de la gente ve video en redes sin sonido, y sin
 * subtítulos el mensaje se pierde. Sólo aplica al modo 'file'; en YouTube
 * y Vimeo los subtítulos se cargan desde la plataforma.
 */

export type CompanyVideoProvider = "youtube" | "vimeo" | "file";

export interface CompanyVideoConfig {
  provider: CompanyVideoProvider;
  source: string;
  poster: string;
  title: string;
  description: string;
  duration: string;
  captions: string;
}

export const companyVideo: CompanyVideoConfig = {
  provider: "youtube",
  source: "",
  poster: "",
  title: "Conoce a Nexo en dos minutos",
  description:
    "Quiénes somos, cómo trabajamos y por qué empezamos por entender tu operación antes de proponerte tecnología.",
  duration: "2:14",
  captions: "",
};
