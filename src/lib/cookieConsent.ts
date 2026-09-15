export const COOKIE_STORAGE_KEY = "nexo-cookie-consent";

export type CookieConsentChoice = "all" | "essential";

/**
 * Devuelve la decisión guardada: 'all', 'essential' o null si aún no eligió.
 * Pensado para consultarlo antes de cargar analítica u otro script opcional:
 *   if (getCookieConsent() === 'all') { ...inicializar analítica... }
 */
export function getCookieConsent(): CookieConsentChoice | null {
  try {
    const stored = JSON.parse(window.localStorage.getItem(COOKIE_STORAGE_KEY) ?? "null");
    return stored?.choice ?? null;
  } catch {
    return null;
  }
}

export function setCookieConsent(choice: CookieConsentChoice): boolean {
  try {
    window.localStorage.setItem(
      COOKIE_STORAGE_KEY,
      JSON.stringify({ choice, date: new Date().toISOString() }),
    );
    return true;
  } catch {
    // Navegación privada o almacenamiento bloqueado
    return false;
  }
}
