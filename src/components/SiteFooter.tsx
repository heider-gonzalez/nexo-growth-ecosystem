import { useRef, useState } from "react";

const IG = "https://www.instagram.com/nexo_bq?igsi=ZTlnZjQ2N3oyd2Vo&utm_source=qr";
const WA = "https://wa.me/573004497290?text=Hola%20Nexo%2C%20necesito%20asesor%C3%ADa%20para%20mi%20proyecto%20digital.%20%C2%BFPodr%C3%ADan%20ayudarme%3F";

const columns = [
  {
    title: "Servicios",
    links: [
      { label: "Desarrollo Web", href: "#servicios" },
      { label: "Implementación de CRM", href: "#servicios" },
      { label: "Automatización de Procesos", href: "#servicios" },
      { label: "Integraciones IA", href: "#servicios" },
    ],
  },
  {
    title: "Tecnología",
    links: [
      { label: "APIs & Webhooks", href: "#proceso" },
      { label: "Flujos n8n", href: "#proceso" },
      { label: "Supabase & Cloud", href: "#proceso" },
      { label: "Optimización de Software", href: "#proceso" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: "Asesoría Directa", href: IG },
      { label: "Escríbenos al DM", href: IG },
      { label: "Políticas de Privacidad", href: "#contacto" },
    ],
  },
];

export function SiteFooter() {
  const wordRef = useRef<HTMLDivElement>(null);
  const [light, setLight] = useState({ x: 50, y: 50, on: false });

  return (
    <footer className="relative overflow-hidden bg-[#050505]">
      {/* Texto gigante de fondo */}
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
        className="relative z-0 select-none pt-16"
      >
        <h2
          aria-label="NEXO"
          className="nexo-giant text-center font-sans text-[18vw] font-black leading-[0.8] tracking-tighter"
        >
          NEXO
        </h2>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden text-center font-sans text-[18vw] font-black leading-[0.8] tracking-tighter text-white transition-opacity duration-300"
          style={{
            opacity: light.on ? 1 : 0,
            WebkitMaskImage: `radial-gradient(260px circle at ${light.x}% ${light.y}%, rgba(0,0,0,0.95), transparent 70%)`,
            maskImage: `radial-gradient(260px circle at ${light.x}% ${light.y}%, rgba(0,0,0,0.95), transparent 70%)`,
            paddingTop: "4rem",
          }}
        >
          <span className="w-full">NEXO</span>
        </div>

      </div>

      {/* Línea divisoria + contenido que sumerge la mitad inferior */}
      <div className="relative z-10 -mt-[7vw] bg-[#050505]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-sm font-semibold tracking-tight text-neutral-100">
              NEXO
            </span>
            <p className="mt-2 text-sm font-light text-neutral-400">
              Barranquilla, Colombia
            </p>
            <ul className="mt-4 space-y-2 text-sm font-light text-neutral-400">
              <li>
                <a
                  href={IG}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-neutral-100"
                >
                  Instagram (@nexo_bq)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-neutral-100"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={WA}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-neutral-100"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-xs font-light text-neutral-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.7)]" />
              </span>
              Sistemas 100% Operativos
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <span className="text-sm font-medium text-neutral-100">{col.title}</span>
              <ul className="mt-4 space-y-2 text-sm font-light text-neutral-400">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="transition-colors hover:text-neutral-100"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-900 px-6 py-6 text-center text-xs font-light text-neutral-500">
          © 2026 NEXO Growth. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
