import { Link } from "@tanstack/react-router";
import { ChevronDown, Instagram, Facebook, Linkedin } from "lucide-react";

import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const IG = "https://www.instagram.com/nexo_bq?igsi=ZTlnZjQ2N3oyd2Vo&utm_source=qr";
const FB =
  "https://www.facebook.com/profile.php?id=61593670084560&mibextid=wwXIfr&rdid=vAHbtPsbNuGkKTiM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B8hmLcFHu%2F%3Fmibextid%3DwwXIfr#";
const LINKEDIN = "https://www.linkedin.com/company/nexo-growth-solutions/";

function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export type NavItem = {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
};

export const primaryNav: NavItem[] = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Contacto", href: "/contacto" },
  {
    label: "Nosotros",
    children: [
      { label: "Quiénes Somos", href: "/quienes-somos" },
      { label: "Equipo", href: "/equipo" },
      { label: "Términos y Condiciones", href: "/terminos" },
      { label: "Política de Privacidad", href: "/privacidad" },
    ],
  },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl shadow-2xs">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center active:scale-[0.98] transition-transform">
          <img
            src="/Logo_ Paleta claro.png"
            alt="NEXO Logo"
            width={107}
            height={80}
            className="block dark:hidden h-20 w-auto object-contain"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <img
            src="/Logo_ Paleta oscura.png"
            alt="NEXO Logo"
            width={107}
            height={80}
            className="hidden dark:block h-20 w-auto object-contain"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </Link>

        <nav className="hidden items-center gap-1.5 lg:flex">
          {primaryNav.map((n) => {
            if (n.children) {
              return (
                <div key={n.label} className="relative group/nav">
                  <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-all group-hover/nav:text-foreground group-hover/nav:bg-accent/60 px-3.5 py-1.5 rounded-full outline-none cursor-pointer active:scale-[0.97]">
                    {n.label}
                    <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover/nav:rotate-180" />
                  </button>
                  <div className="absolute left-0 top-full pt-1.5 hidden group-hover/nav:block z-50">
                    <div className="w-56 bg-card/95 backdrop-blur-xl border border-border/80 shadow-2xl rounded-2xl p-1.5 flex flex-col gap-0.5 animate-in fade-in-0 zoom-in-95 duration-150 origin-top-left">
                      {n.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="rounded-xl px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent focus:bg-accent active:scale-[0.98]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={n.label}
                to={n.href!}
                className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-accent/60 px-3.5 py-1.5 rounded-full active:scale-[0.97]"
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Tablet navigation - simplified version */}
        <nav className="hidden items-center gap-2 md:flex lg:hidden">
          {primaryNav.map((n) => (
            <Link
              key={n.label}
              to={n.href!}
              className="text-xs font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-accent/60 px-2.5 py-1.5 rounded-full active:scale-[0.97]"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href={IG}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex p-2 text-muted-foreground transition-all hover:text-foreground items-center justify-center rounded-full hover:bg-accent/70 active:scale-90"
            aria-label="Instagram"
          >
            <Instagram className="h-4.5 w-4.5" />
          </a>
          <a
            href={FB}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex p-2 text-muted-foreground transition-all hover:text-foreground items-center justify-center rounded-full hover:bg-accent/70 active:scale-90"
            aria-label="Facebook"
          >
            <Facebook className="h-4.5 w-4.5" />
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex p-2 text-muted-foreground transition-all hover:text-foreground items-center justify-center rounded-full hover:bg-accent/70 active:scale-90"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4.5 w-4.5" />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hidden md:flex p-2 text-muted-foreground transition-all hover:text-foreground items-center justify-center rounded-full hover:bg-accent/70 active:scale-90"
            aria-label="TikTok"
          >
            <TikTokIcon className="h-4.5 w-4.5" />
          </a>
          <MobileMenu nav={primaryNav} />
        </div>
      </div>
    </header>
  );
}
