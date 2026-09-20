import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Monitor, RefreshCw, Zap, Bot, ArrowRight, Sparkles } from "lucide-react";

import { Layout } from "@/components/Layout";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Loader } from "@/components/Loader";

const ProductShowcase = lazy(() =>
  import("@/components/ProductShowcase").then((mod) => ({ default: mod.ProductShowcase })),
);
const CompanyVideo = lazy(() =>
  import("@/components/CompanyVideo").then((mod) => ({ default: mod.CompanyVideo })),
);
const NexoLogo3D = lazy(() => import("@/components/NexoLogo3D"));

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

const services = [
  {
    icon: Monitor,
    title: "Desarrollo de software",
    text: "Sitios y plataformas modernas, rápidas y adaptadas a tus objetivos.",
    badge: "Aplicaciones & Websites",
    tag: "Construcción a medida",
  },
  {
    icon: RefreshCw,
    title: "Implementación de CRM",
    text: "Organiza tus prospectos, automatiza ventas y mantén el control de tus clientes en un solo lugar.",
    badge: "Ventas & Retención",
    tag: "Gestión de embudo & leads",
  },
  {
    icon: Zap,
    title: "Optimización de Procesos",
    text: "Eliminamos cuellos de botella para que tu equipo trabaje de forma más ágil y eficiente.",
    badge: "Automatizaciones & Workflows",
    tag: "Flujos de trabajo eficientes",
  },
  {
    icon: Bot,
    title: "Inteligencia Artificial",
    text: "Soluciones avanzadas e integración de IA para automatizar tareas y tomar decisiones basadas en datos.",
    badge: "Modelos & Agentes",
    tag: "Agentes & analítica predictiva",
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
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-background">
        {/* Subtle Cyan Ambient Glow Reflection Behind 3D X */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 h-[280px] w-[280px] sm:h-[480px] sm:w-[480px] rounded-full bg-[#00c2ff]/10 blur-[60px] sm:blur-[90px]"
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 w-full z-10">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1.1fr_1fr] items-center gap-8 md:gap-12 lg:gap-8">
            {/* Hero Left Content */}
            <ScrollAnimation direction="left" delay={0.1}>
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="brand-pill rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium mb-8 cursor-default select-none">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--brand-ink)]" />
                  <span>¡Llegó Nexo! Tu negocio, listo para despegar</span>
                </div>

                <h1 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-foreground">
                  Tecnología que
                  <br />
                  <span className="text-[var(--brand-ink)]">impulsa</span> tu
                  <br />
                  negocio
                </h1>

                <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                  En Nexo transformamos la tecnología en resultados reales. No solo creamos
                  herramientas: diseñamos el ecosistema digital que tu marca necesita para crecer
                  sin límites.
                </p>

                <div className="flex flex-row items-center gap-4 sm:gap-5">
                  <a
                    href="/contacto"
                    className="btn-cyan inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm sm:text-base font-semibold"
                  >
                    Contacto
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </ScrollAnimation>

            {/* Hero Right 3D WebGL Canvas */}
            <div className="w-full flex flex-col items-center lg:items-end">
              <div className="relative h-[320px] w-full sm:h-[420px] lg:h-[500px]">
                <ClientOnly fallback={<div className="h-full w-full" />}>
                  <Suspense fallback={<div className="h-full w-full" />}>
                    <NexoLogo3D />
                  </Suspense>
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section
        id="servicios"
        className="relative bg-background py-24 sm:py-32 border-t border-border"
      >
        <div className="mx-auto max-w-6xl px-6">
          <ScrollAnimation direction="up">
            <div className="max-w-2xl">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-ink)]">
                Servicios
              </span>
              <h2 className="mt-3 font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-foreground">
                Un ecosistema, cuatro frentes
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                Cada pieza se conecta con la siguiente: lo que capta tu web alimenta tu CRM, y lo
                que aprende tu CRM alimenta tus automatizaciones.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation
            direction="up"
            delay={0.1}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-16"
          >
            {services.map((s) => (
              <article
                key={s.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card/85 p-7 sm:p-9 shadow-sm backdrop-blur-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00c2ff]/60 hover:shadow-[0_16px_36px_-8px_rgba(0,194,255,0.18),0_4px_12px_-2px_rgba(15,23,42,0.04)] active:scale-[0.99] overflow-hidden"
              >
                {/* Top subtle glow highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00c2ff]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-[var(--brand-ink)] shadow-2xs transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/40">
                      <s.icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
                    </div>
                    <span className="rounded-full border border-border/80 bg-muted/60 px-3.5 py-1 text-xs font-semibold text-muted-foreground group-hover:border-[#00c2ff]/40 group-hover:text-foreground transition-colors">
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl sm:text-2xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-[var(--brand-ink)]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-[var(--brand-ink)]">
                  <span>{s.tag}</span>
                </div>
              </article>
            ))}
          </ScrollAnimation>
        </div>
      </section>

      {/* Producto: showcase de servicios en video */}
      <Suspense fallback={<div className="min-h-[500px] w-full" />}>
        <ProductShowcase />
      </Suspense>

      {/* Video de presentación (sólo aparece cuando esté configurado) */}
      <Suspense fallback={<div className="min-h-[300px] w-full" />}>
        <CompanyVideo />
      </Suspense>

      {/* Proceso Section */}
      <section id="proceso" className="relative bg-muted/40 py-24 sm:py-32 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollAnimation direction="up">
            <div className="max-w-2xl">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-ink)]">
                Metodología
              </span>
              <h2 className="mt-3 font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-foreground">
                Cómo trabajamos
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Un flujo de trabajo estructurado para garantizar resultados medibles desde el primer
                día.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation
            direction="up"
            delay={0.1}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16"
          >
            {steps.map((s, idx) => (
              <article
                key={s.n}
                className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card/85 p-7 sm:p-9 shadow-sm backdrop-blur-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00c2ff]/60 hover:shadow-[0_16px_36px_-8px_rgba(0,194,255,0.18),0_4px_12px_-2px_rgba(15,23,42,0.04)] overflow-hidden"
              >
                {/* Top subtle glow highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00c2ff]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/25 text-base font-black font-mono text-[var(--brand-ink)] shadow-2xs group-hover:scale-110 group-hover:bg-primary/20 transition-transform duration-300">
                      {s.n}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-[var(--brand-ink)] transition-colors">
                      Paso {s.n}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl sm:text-2xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-[var(--brand-ink)]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00c2ff] to-[var(--brand-ink)] rounded-full transition-all duration-500"
                        style={{ width: `${((idx + 1) / steps.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      {idx + 1}/{steps.length}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </ScrollAnimation>
        </div>
      </section>

      {/* Enfoque / Cita Section */}
      <section
        id="enfoque"
        className="relative bg-background py-28 sm:py-36 border-t border-border"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ScrollAnimation direction="fade">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-[var(--brand-ink)]">
              Enfoque Estratégico
            </span>
            <h2 className="mt-6 font-sans font-black text-3xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-foreground">
              "Tu negocio no necesita más herramientas, necesita la estrategia correcta."
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground font-medium max-w-xl mx-auto">
              Diseño de sistemas conectados que potencian tu equipo y multiplican el retorno de
              inversión.
            </p>
          </ScrollAnimation>
        </div>
      </section>
    </Layout>
  );
}
