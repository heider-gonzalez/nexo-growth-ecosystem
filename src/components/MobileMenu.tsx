import { useState } from "react";
import { X, Menu } from "lucide-react";

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
                className="font-sans text-[1.35rem] font-extrabold leading-none tracking-[-0.06em] text-foreground"
              >
                Nexo
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-foreground transition-colors hover:text-muted-foreground"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {nav.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={handleNavigate}
                  className="text-lg text-foreground transition-colors hover:text-muted-foreground"
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
                className="block w-full text-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
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
