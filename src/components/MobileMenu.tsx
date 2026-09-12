import { useState, useEffect } from "react";
import { X, Menu, Instagram, Facebook } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";

import type { NavItem } from "@/components/Header";

const MotionLink = motion(Link);

const IG = "https://www.instagram.com/nexo_bq?igsi=ZTlnZjQ2N3oyd2Vo&utm_source=qr";
const FB =
  "https://www.facebook.com/profile.php?id=61593670084560&mibextid=wwXIfr&rdid=vAHbtPsbNuGkKTiM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B8hmLcFHu%2F%3Fmibextid%3DwwXIfr#";

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

interface MobileMenuProps {
  nav: NavItem[];
  onNavigate?: () => void;
}

export function MobileMenu({ nav, onNavigate }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Tarea 3: Bloquear scroll del fondo cuando el menú esté abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavigate = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-foreground transition-colors hover:text-muted-foreground"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Tarea 2: Animación suavizada de apertura y cierre */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] w-screen h-screen bg-card md:hidden flex flex-col"
            style={{ backgroundColor: "var(--card)" }}
          >
            <div className="flex flex-col h-full px-6 py-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center">
                  <img
                    src="/Logo_ Paleta claro.png"
                    alt="NEXO Logo"
                    className="block dark:hidden h-14 w-auto object-contain"
                  />
                  <img
                    src="/Logo_ Paleta oscura.png"
                    alt="NEXO Logo"
                    className="hidden dark:block h-14 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-foreground transition-colors hover:text-muted-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {nav.map((n, idx) => {
                  if (n.children) {
                    return (
                      <motion.div
                        key={n.label}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + idx * 0.04, duration: 0.2 }}
                        className="flex flex-col gap-3"
                      >
                        <span className="text-lg font-semibold text-muted-foreground">{n.label}</span>
                        <div className="flex flex-col gap-2.5 pl-4 border-l border-border/60">
                          {n.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              onClick={handleNavigate}
                              className="text-base font-medium text-foreground transition-colors hover:text-[#00c2ff]"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    );
                  }
                  return (
                    <MotionLink
                      key={n.label}
                      to={n.href!}
                      onClick={handleNavigate}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + idx * 0.04, duration: 0.2 }}
                      className="text-lg font-medium text-foreground transition-colors hover:text-[#00c2ff]"
                    >
                      {n.label}
                    </MotionLink>
                  );
                })}
              </nav>

              {/* Tarea 1: Redes sociales situadas en la parte inferior eliminando el botón "Contactanos" */}
              <div className="mt-auto pt-8 border-t border-border/50 flex items-center justify-center gap-6">
                <a
                  href={IG}
                  target="_blank"
                  rel="noreferrer"
                  className="flex p-3 text-muted-foreground transition-all hover:text-foreground items-center justify-center rounded-full hover:bg-accent/60 bg-accent/30"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={FB}
                  target="_blank"
                  rel="noreferrer"
                  className="flex p-3 text-muted-foreground transition-all hover:text-foreground items-center justify-center rounded-full hover:bg-accent/60 bg-accent/30"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex p-3 text-muted-foreground transition-all hover:text-foreground items-center justify-center rounded-full hover:bg-accent/60 bg-accent/30"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
