import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const IG = "https://www.instagram.com/nexo_bq?igsi=ZTlnZjQ2N3oyd2Vo&utm_source=qr";
const WA =
  "https://wa.me/573137853050?text=Hola%20Nexo%2C%20necesito%20asesor%C3%ADa%20para%20mi%20proyecto%20digital.%20%C2%BFPodr%C3%ADan%20ayudarme%3F";
const FB =
  "https://www.facebook.com/profile.php?id=61593670084560&mibextid=wwXIfr&rdid=vAHbtPsbNuGkKTiM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B8hmLcFHu%2F%3Fmibextid%3DwwXIfr#";
const LINKEDIN = "https://www.linkedin.com/company/nexo-growth-solutions/";

function TikTokIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.489.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
    </svg>
  );
}

const navSections = [
  {
    title: "SERVICIOS",
    links: [
      { label: "Desarrollo Web", href: "/#servicios" },
      { label: "Implementación CRM", href: "/#servicios" },
      { label: "Automatización & n8n", href: "/#servicios" },
      { label: "Inteligencia Artificial", href: "/#servicios" },
      { label: "Consultoría Digital", href: "/contacto" },
    ],
  },
  {
    title: "EMPRESA",
    links: [
      { label: "Quiénes Somos", href: "/quienes-somos" },
      { label: "Nuestro Equipo", href: "/equipo" },
      { label: "Metodología", href: "/#proceso" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "LEGAL & SOPORTE",
    links: [
      { label: "Términos y Condiciones", href: "/terminos" },
      { label: "Política de Privacidad", href: "/privacidad" },
      { label: "Tratamiento de Datos", href: "/privacidad" },
      { label: "Soporte al Cliente", href: "/contacto" },
    ],
  },
];

export function SiteFooter() {
  const wordRef = useRef<HTMLDivElement>(null);
  const [light, setLight] = useState({ x: 50, y: 50, on: false });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-[#050811] text-slate-300 border-t border-slate-800/80">
      {/* Subtle Ambient Radial Glow at the Top of Footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[300px] w-[700px] rounded-full bg-[#00c2ff]/5 blur-[120px]"
      />

      {/* Giant Interactive Brand Typography */}
      <div
        ref={wordRef}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setLight({
            x: ((e.clientX - r.left) / r.width) * 100,
            y: ((e.clientY - r.top) / r.height) * 100,
            on: true,
          });
        }}
        onMouseLeave={() => setLight((l) => ({ ...l, on: false }))}
        className="relative z-0 select-none pt-12 pb-4 overflow-hidden"
      >
        <h2
          aria-label="NEXO"
          className="nexo-giant text-center font-sans text-[17vw] font-black leading-[0.78] tracking-tighter opacity-70 transition-opacity duration-300 hover:opacity-90"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0.15) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0.15) 85%, transparent 100%)",
          }}
        >
          NEXO
        </h2>

        {/* Dynamic Light Spotlight Follower */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden text-center font-sans text-[17vw] font-black leading-[0.78] tracking-tighter text-white transition-opacity duration-300"
          style={{
            opacity: light.on ? 1 : 0,
            WebkitMaskImage: `radial-gradient(280px circle at ${light.x}% ${light.y}%, rgba(0,194,255,0.9), transparent 70%)`,
            maskImage: `radial-gradient(280px circle at ${light.x}% ${light.y}%, rgba(0,194,255,0.9), transparent 70%)`,
            paddingTop: "3rem",
          }}
        >
          <span className="w-full">NEXO</span>
        </div>
      </div>

      {/* Main Footer Links & Info Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-6 pb-12">
        {/* Subtle Top Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/60 to-transparent mb-12" />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] items-start">
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center">
                <img
                  src="/Logo_ Paleta oscura.png"
                  alt="NEXO Logo"
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>

            <p className="text-sm font-light text-slate-400 leading-relaxed max-w-sm">
              Diseñamos e implementamos el ecosistema digital que tu marca necesita para crecer sin
              límites: desarrollo web, CRM, automatizaciones e inteligencia artificial.
            </p>

            {/* Quick Contact Points */}
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#00c2ff] shrink-0" />
                <span>Barranquilla, Colombia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#00c2ff] shrink-0" />
                <a
                  href="mailto:nexosolutions5@gmail.com"
                  className="transition-colors hover:text-[#00c2ff]"
                >
                  nexosolutions5@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#00c2ff] shrink-0" />
                <a
                  href={WA}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[#00c2ff]"
                >
                  +57 313 785 3050
                </a>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={IG}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 transition-all hover:border-[#00c2ff]/60 hover:bg-slate-800 hover:text-[#00c2ff] hover:shadow-[0_0_12px_rgba(0,194,255,0.3)]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={FB}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 transition-all hover:border-[#00c2ff]/60 hover:bg-slate-800 hover:text-[#00c2ff] hover:shadow-[0_0_12px_rgba(0,194,255,0.3)]"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 transition-all hover:border-[#00c2ff]/60 hover:bg-slate-800 hover:text-[#00c2ff] hover:shadow-[0_0_12px_rgba(0,194,255,0.3)]"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 transition-all hover:border-[#00c2ff]/60 hover:bg-slate-800 hover:text-[#00c2ff] hover:shadow-[0_0_12px_rgba(0,194,255,0.3)]"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 transition-all hover:border-[#00c2ff]/60 hover:bg-slate-800 hover:text-[#00c2ff] hover:shadow-[0_0_12px_rgba(0,194,255,0.3)]"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            </div>

            {/* Operational Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 text-xs font-light text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.7)]" />
              </span>
              <span>Sistemas 100% Operativos</span>
            </div>
          </div>

          {/* Navigation Columns */}
          {navSections.map((sec) => (
            <div key={sec.title} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-100">
                {sec.title}
              </h3>
              <ul className="space-y-2.5 text-sm font-light text-slate-400">
                {sec.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-[#00c2ff]"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    ) : (
                      <Link to={link.href} className="transition-colors hover:text-[#00c2ff]">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Sub-footer Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
          <p>© {new Date().getFullYear()} NEXO Growth. Todos los derechos reservados.</p>

          <p className="text-center sm:text-left">Hecho con pasión en Barranquilla, Colombia 🇨🇴</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:border-[#00c2ff]/50 hover:bg-slate-800 hover:text-[#00c2ff] cursor-pointer"
            aria-label="Volver arriba"
          >
            <span>Subir</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
