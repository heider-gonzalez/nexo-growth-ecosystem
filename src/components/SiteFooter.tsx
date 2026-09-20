import { Link } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";

import { BogotaStatus } from "@/components/BogotaStatus";

const IG = "https://www.instagram.com/nexo_bq?igsi=ZTlnZjQ2N3oyd2Vo&utm_source=qr";
const WA =
  "https://wa.me/573137853050?text=Hola%20Nexo%2C%20necesito%20asesor%C3%ADa%20para%20mi%20proyecto%20digital.%20%C2%BFPodr%C3%ADan%20ayudarme%3F";
const FB =
  "https://www.facebook.com/profile.php?id=61593670084560&mibextid=wwXIfr&rdid=vAHbtPsbNuGkKTiM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B8hmLcFHu%2F%3Fmibextid%3DwwXIfr#";
const LINKEDIN = "https://www.linkedin.com/company/nexo-growth-solutions/";

const columns = [
  {
    title: "Explora",
    links: [
      { label: "Servicios", href: "/#servicios", external: false },
      { label: "Proyectos", href: "/proyectos", external: false },
      { label: "Cómo trabajamos", href: "/#proceso", external: false },
      { label: "Quiénes somos", href: "/quienes-somos", external: false },
      { label: "Equipo", href: "/equipo", external: false },
      { label: "Contacto", href: "/contacto", external: false },
    ],
  },
  {
    title: "Síguenos",
    links: [
      { label: "LinkedIn", href: LINKEDIN, external: true },
      { label: "Instagram", href: IG, external: true },
      { label: "Facebook", href: FB, external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos y condiciones", href: "/terminos", external: false },
      { label: "Privacidad y datos", href: "/privacidad", external: false },
    ],
  },
];

const linkClass = "text-slate-400 transition-colors hover:text-white";

type FooterColumnData = (typeof columns)[number];

function FooterColumn({ column }: { column: FooterColumnData }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{column.title}</h3>
      <ul className="mt-3.5 space-y-2 text-sm md:mt-4 md:space-y-2.5 md:text-[15px]">
        {column.links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>
                {link.label}
              </a>
            ) : (
              <Link to={link.href} className={linkClass}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050811] text-slate-400">
      {/* El tramo cian recoge el acento de marca y separa el footer del
          contenido sin recurrir a otra caja. */}
      <div aria-hidden="true" className="h-px bg-slate-800" />

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-10 sm:pb-10 sm:pt-16">
        <div className="md:flex md:items-start md:justify-between md:gap-12">
          <div className="max-w-sm">
            <p className="text-[1.35rem] font-bold leading-snug tracking-tight text-white sm:text-[1.75rem]">
              ¿Qué te gustaría mejorar en tu negocio?
            </p>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="btn-cyan mt-5 inline-flex rounded-full px-6 py-2.5 text-sm font-semibold"
            >
              Escríbenos por WhatsApp
            </a>
            <p className="mt-5 text-[15px]">
              <a
                href="mailto:nexosolutions5@gmail.com"
                className="text-slate-300 underline decoration-slate-600 underline-offset-4 transition-colors hover:decoration-[#00c2ff]"
              >
                nexosolutions5@gmail.com
              </a>
            </p>
            <BogotaStatus className="mt-2 text-sm leading-snug text-slate-500" />
          </div>

          {/* Dos columnas parejas en móvil: "Síguenos" y "Legal" comparten
              la segunda (son listas cortas) en vez de abrir una fila nueva
              con medio ancho vacío. En md cada lista vuelve a ser columna
              propia gracias a display:contents. */}
          <nav
            aria-label="Enlaces del sitio"
            className="mt-10 grid grid-cols-2 gap-x-8 md:mt-0 md:grid-cols-3 md:gap-x-14"
          >
            <FooterColumn column={columns[0]!} />
            <div className="space-y-7 md:contents">
              <FooterColumn column={columns[1]!} />
              <FooterColumn column={columns[2]!} />
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:pr-16">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Nexo, ir al inicio" className="shrink-0">
              <img
                src="/Logo_ Paleta oscura.png"
                alt="Nexo"
                width={48}
                height={36}
                className="h-9 w-auto"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p>© {new Date().getFullYear()} Nexo Growth. Todos los derechos reservados.</p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex cursor-pointer items-center gap-1.5 self-start transition-all hover:text-white active:scale-95 sm:self-auto py-1 px-2 rounded-lg hover:bg-slate-900"
          >
            Volver arriba
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
