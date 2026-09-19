import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, ArrowLeft, Search, Ghost } from "lucide-react";

import { Layout } from "@/components/Layout";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export const Route = createFileRoute("/404")({
  component: NotFound,
});

function NotFound() {
  return (
    <Layout>
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-background">
        {/* Subtle Ambient Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#00c2ff]/5 blur-[120px]"
        />

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <ScrollAnimation direction="up">
            {/* 404 Number with Glow */}
            <div className="relative mb-8">
              <h1 className="text-[120px] sm:text-[160px] md:text-[180px] font-black text-foreground/5 leading-none select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Ghost className="h-10 w-10 text-[var(--brand-ink)]" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Página no encontrada
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Lo sentimos, la página que buscas no existe o ha sido movida. 
              Quizás la dirección está mal escrita o la página fue eliminada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="btn-cyan inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
              >
                <Home className="h-4 w-4" />
                Volver al inicio
              </Link>

              <button
                onClick={() => window.history.back()}
                className="btn-outline-cyan inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver atrás
              </button>
            </div>

            {/* Quick Links */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                ¿Estabas buscando algo específico?
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link
                  to="/#servicios"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-muted/60 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Search className="h-3.5 w-3.5" />
                  Servicios
                </Link>
                <Link
                  to="/proyectos"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-muted/60 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Search className="h-3.5 w-3.5" />
                  Proyectos
                </Link>
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-muted/60 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Search className="h-3.5 w-3.5" />
                  Contacto
                </Link>
                <Link
                  to="/equipo"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-muted/60 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Search className="h-3.5 w-3.5" />
                  Equipo
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </Layout>
  );
}