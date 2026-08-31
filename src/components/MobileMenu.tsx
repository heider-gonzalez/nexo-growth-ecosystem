import { useState } from "react";
import { X, Menu, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { ThemeToggle } from "@/components/ThemeToggle";

interface MobileMenuProps {
  nav: Array<{ label: string; href: string; caret?: boolean }>;
  onNavigate?: () => void;
}

export function MobileMenu({ nav, onNavigate }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

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

      {/* Mobile menu overlay with smooth animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] w-screen h-screen bg-[#ffffff] dark:bg-[#080d1a] md:hidden"
            style={{ backgroundColor: "var(--card)" }}
          >
            <div className="flex flex-col h-full px-6 py-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <a href="#" onClick={() => setIsOpen(false)} className="flex items-center">
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
                </a>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/nexo_bq?igsi=ZTlnZjQ2N3oyd2Vo&utm_source=qr"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-foreground transition-colors hover:text-[#00c2ff]"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <ThemeToggle />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-foreground transition-colors hover:text-muted-foreground"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <nav className="flex flex-col gap-6">
                {nav.map((n, idx) => (
                  <motion.a
                    key={n.label}
                    href={n.href}
                    onClick={handleNavigate}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.04, duration: 0.2 }}
                    className="text-lg font-medium text-foreground transition-colors hover:text-[#00c2ff]"
                  >
                    {n.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pt-8">
                <a
                  href="https://www.instagram.com/nexo_bq?igsi=ZTlnZjQ2N3oyd2Vo&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-cyan block w-full text-center rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Comience
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
