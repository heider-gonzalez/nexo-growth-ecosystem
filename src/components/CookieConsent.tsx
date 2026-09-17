import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import { getCookieConsent, setCookieConsent, type CookieConsentChoice } from "@/lib/cookieConsent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Aparece con un retardo corto: si salta de inmediato tapa el hero
  // antes de que la persona alcance a ver de qué trata el sitio.
  useEffect(() => {
    if (getCookieConsent()) return;

    const timer = window.setTimeout(() => setVisible(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  // Al aparecer guardamos el foco previo y lo devolvemos al cerrar,
  // para no dejar perdido a quien navega con teclado.
  useEffect(() => {
    if (!visible) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    cardRef.current?.focus();
  }, [visible]);

  const decide = (choice: CookieConsentChoice) => {
    // Si el almacenamiento está bloqueado no pasa nada: el aviso
    // simplemente volverá a aparecer en la próxima visita.
    setCookieConsent(choice);
    setVisible(false);
    previousFocus.current?.focus?.();
  };

  // Escape equivale a rechazar: nunca debe interpretarse como aceptar
  useEffect(() => {
    if (!visible) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") decide("essential");
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="cookie-wrapper">
      <div
        ref={cardRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-text"
        className="cookie-card"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-[#00c2ff]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              <path d="M8.5 8.5v.01" />
              <path d="M16 15.5v.01" />
              <path d="M12 12v.01" />
              <path d="M8.5 15.5v.01" />
              <path d="M16 8.5v.01" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p id="cookie-title" className="text-base font-bold text-foreground mb-1">
              Política de Cookies
            </p>

            <p id="cookie-text" className="text-xs leading-relaxed text-muted-foreground mb-4">
              Utilizamos cookies para mejorar tu experiencia y analizar el tráfico del sitio.{" "}
              <Link
                to="/privacidad"
                onClick={() => setVisible(false)}
                className="font-medium text-[#00c2ff] underline underline-offset-2 hover:text-[#00b0e8]"
              >
                Ver detalles
              </Link>
            </p>

            <div className="cookie-actions">
              <button
                type="button"
                className="btn-cyan rounded-lg px-4 py-2 text-xs font-semibold"
                onClick={() => decide("all")}
              >
                Aceptar todas
              </button>

              <button
                type="button"
                className="btn-outline-cyan rounded-lg px-4 py-2 text-xs font-semibold"
                onClick={() => decide("essential")}
              >
                Solo necesarias
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
