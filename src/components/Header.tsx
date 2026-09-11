import { Link } from "@tanstack/react-router";
import { ChevronDown, Instagram } from "lucide-react";

import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";

const IG = "https://www.instagram.com/nexo_bq?igsi=ZTlnZjQ2N3oyd2Vo&utm_source=qr";

/**
 * Nav único: antes index.tsx y equipo.tsx tenían cada uno su propio
 * array de `nav`, y el de index.tsx no incluía "Equipo". Ahora hay una
 * sola fuente de verdad, usada por <Header/> en todas las rutas.
 */
export const primaryNav = [
  { label: "Servicios", href: "/#servicios", caret: true },
  { label: "Equipo", href: "/equipo", caret: false },
  { label: "Contacto", href: "/#contacto", caret: false },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center">
          <img
            src="/Logo_ Paleta claro.png"
            alt="NEXO Logo"
            className="block dark:hidden h-20 w-auto object-contain"
          />
          <img
            src="/Logo_ Paleta oscura.png"
            alt="NEXO Logo"
            className="hidden dark:block h-20 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {primaryNav.map((n) => (
            <Link
              key={n.label}
              to={n.href}
              className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
              {n.caret && (
                <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={IG}
            target="_blank"
            rel="noreferrer"
            className="flex p-2 text-muted-foreground transition-colors hover:text-foreground items-center justify-center rounded-full hover:bg-accent/50"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={IG}
            target="_blank"
            rel="noreferrer"
            className="btn-cyan hidden md:inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold"
          >
            Comience
          </a>
          <MobileMenu nav={primaryNav} />
        </div>
      </div>
    </header>
  );
}
