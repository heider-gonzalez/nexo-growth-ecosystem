import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Monitor, RefreshCw, Zap, Bot, ChevronDown, ArrowRight } from "lucide-react";

const RubikCube = lazy(() => import("@/components/RubikCube"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexo — Tecnología que impulsa tu negocio" },
      {
        name: "description",
        content:
          "Desarrollo web, implementación de CRM, optimización de procesos e inteligencia artificial para que tu empresa crezca sin límites.",
      },
      { property: "og:title", content: "Nexo — Tu negocio, listo para despegar" },
      {
        property: "og:description",
        content: "Diseñamos el ecosistema digital que tu marca necesita para crecer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const IG = "https://www.instagram.com/nexo_bq?igsi=ZTlnZjQ2N3oyd2Vo&utm_source=qr";

const nav = [
  { label: "Servicios", href: "#servicios", caret: true },
  { label: "Compañía", href: "#enfoque", caret: true },
  { label: "Proceso", href: "#proceso", caret: false },
  { label: "Contacto", href: "#contacto", caret: false },
];

const services = [
  {
    icon: Monitor,
    title: "Desarrollo Web",
    text: "Sitios y plataformas modernas, rápidas y adaptadas a tus objetivos.",
  },
  {
    icon: RefreshCw,
    title: "Implementación de CRM",
    text: "Organiza tus prospectos, automatiza ventas y mantén el control de tus clientes en un solo lugar.",
  },
  {
    icon: Zap,
    title: "Optimización de Procesos",
    text: "Eliminamos cuellos de botella para que tu equipo trabaje de forma más ágil y eficiente.",
  },
  {
    icon: Bot,
    title: "Inteligencia Artificial",
    text: "Soluciones avanzadas e integración de IA para automatizar tareas y tomar decisiones basadas en datos.",
  },
];

const steps = [
  {
    n: "01",
    title: "Diagnóstico",
    text: "Entendemos tu operación, tus clientes y dónde se pierde tiempo o dinero.",
  },
  {
    n: "02",
    title: "Diseño del ecosistema",
    text: "Definimos la arquitectura: web, CRM, automatizaciones e IA trabajando juntas.",
  },
  {
    n: "03",
    title: "Implementación y mejora",
    text: "Lanzamos, medimos y ajustamos con datos reales hasta que el sistema rinda solo.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#" className="text-base font-semibold tracking-tight">
            Nexo
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
                {n.caret && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a
              href={IG}
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              Instagram
            </a>
            <a
              href={IG}
              target="_blank"
              rel="noreferrer"
              className="surface-card rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              Comience
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-radial relative overflow-hidden pt-32">
        <div className="light-beam" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-6 pb-28 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <a
              href={IG}
              target="_blank"
              rel="noreferrer"
              className="pill-glow inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              ¡Llegó Nexo! Tu negocio, listo para despegar
              <ArrowRight className="h-3 w-3" />
            </a>
            <h1 className="text-shine mt-8 font-display text-[3.4rem] leading-[0.94] tracking-tight sm:text-7xl">
              Tecnología que
              <br />
              impulsa tu
              <br />
              negocio
            </h1>
            <p className="mt-7 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
              En Nexo transformamos la tecnología en resultados reales. No solo creamos
              herramientas: diseñamos el ecosistema digital que tu marca necesita para
              crecer sin límites.
            </p>
            <div className="mt-9 flex items-center gap-5">
              <a
                href={IG}
                target="_blank"
                rel="noreferrer"
                className="surface-card rounded-lg px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                Comience
              </a>
              <a
                href="#servicios"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Servicios
              </a>
            </div>
          </div>

          <div className="relative h-[340px] sm:h-[520px]">
            <ClientOnly fallback={null}>
              <Suspense fallback={null}>
                <RubikCube />
              </Suspense>
            </ClientOnly>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="relative">
        <div className="glow-line absolute inset-x-0 top-0 h-px" />
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Servicios
          </p>
          <h2 className="mt-5 font-display text-4xl tracking-tight sm:text-5xl">
            Un ecosistema, cuatro frentes
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Cada pieza se conecta con la siguiente: lo que capta tu web alimenta tu CRM,
            y lo que aprende tu CRM alimenta tus automatizaciones.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.title}
                className="surface-card group relative overflow-hidden rounded-2xl p-7 transition-colors hover:bg-accent/40"
              >
                <s.icon
                  className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 text-base font-medium">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="relative">
        <div className="glow-line absolute inset-x-0 top-0 h-px" />
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            Cómo trabajamos
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n}>
                <span className="font-display text-3xl text-muted-foreground/70">
                  {s.n}
                </span>
                <h3 className="mt-4 text-base font-medium">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enfoque */}
      <section id="enfoque" className="relative hero-radial">
        <div className="glow-line absolute inset-x-0 top-0 h-px" />
        <div className="mx-auto max-w-3xl px-6 py-28 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Enfoque
          </p>
          <h2 className="text-shine mt-6 font-display text-4xl leading-tight sm:text-5xl">
            Tu negocio no necesita más herramientas, necesita la estrategia correcta.
          </h2>
        </div>
        <div className="glow-line absolute inset-x-0 bottom-0 h-px" />
      </section>

      {/* CTA */}
      <section id="contacto" className="relative overflow-hidden">
        <div className="light-beam light-beam--soft" />
        <div className="relative mx-auto max-w-6xl px-6 py-28 text-center">
          <h2 className="font-display text-5xl tracking-tight">
            ¿Hablamos de tu proyecto?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Escríbenos por Instagram y te respondemos con una propuesta a la medida de tu
            operación.
          </p>
          <a
            href={IG}
            target="_blank"
            rel="noreferrer"
            className="surface-card mt-9 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            Escríbenos al DM
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Nexo</span>
          <a href={IG} target="_blank" rel="noreferrer" className="hover:text-foreground">
            @nexo_bq
          </a>
        </div>
      </footer>
    </div>
  );
}
