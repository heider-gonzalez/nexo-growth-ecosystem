import { useState } from "react";
import { X, Menu } from "lucide-react";

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

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col h-full px-6 py-6">
            <div className="flex items-center justify-between mb-8">
              <a
                href="#"
                className="flex items-center gap-1 font-sans text-[1.35rem] font-extrabold leading-none tracking-tight text-slate-900"
              >
                <span>NE</span>
                <span className="text-[#00c2ff]">X</span>
                <span>O</span>
              </a>
              <div className="flex items-center gap-2">
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
              {nav.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={handleNavigate}
                  className="text-lg font-medium text-foreground transition-colors hover:text-[#00c2ff]"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto">
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
        </div>
      )}
    </>
  );
}
