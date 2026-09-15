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
        className="cookie-card glass-panel"
      >
        <p id="cookie-title" className="text-lg font-bold text-foreground">
          Cookies
        </p>

        <p id="cookie-text" className="text-sm leading-relaxed text-muted-foreground">
          Usamos cookies para recordar tus preferencias y entender cómo se usa el sitio.{" "}
          <Link
            to="/privacidad"
            onClick={() => setVisible(false)}
            className="font-medium text-[#00c2ff] underline underline-offset-2 hover:text-[#00b0e8]"
          >
            Cómo las usamos
          </Link>
        </p>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            className="btn-cyan rounded-full px-5 py-2.5 text-sm"
            onClick={() => decide("all")}
          >
            Aceptar todas
          </button>

          <button
            type="button"
            className="btn-outline-cyan rounded-full px-5 py-2.5 text-sm"
            onClick={() => decide("essential")}
          >
            Solo las necesarias
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
