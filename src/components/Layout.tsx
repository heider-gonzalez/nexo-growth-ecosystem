import type { ReactNode } from "react";

import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * El proyecto usa @tanstack/react-router (rutas por archivo), no
 * react-router-dom, así que no existe un <Route element={<Layout/>}>
 * anidado tradicional. Este componente cumple el mismo rol: cada
 * archivo de ruta lo usa una sola vez y así queda garantizado el MISMO
 * <Header/> (mismos links, mismo orden) y el MISMO <SiteFooter/> en
 * todas las páginas.
 */
interface LayoutProps {
  children: ReactNode;
  /**
   * Oculta el <SiteFooter/> global. Pensado para vistas que se comportan
   * como pantalla aislada (ej. el modal de perfil de /equipo), donde el
   * footer solo agrega scroll innecesario y rompe la inmersión.
   */
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-[#00c2ff]/30 selection:text-foreground">
      <Header />
      {children}
      {!hideFooter && <SiteFooter />}
    </div>
  );
}
