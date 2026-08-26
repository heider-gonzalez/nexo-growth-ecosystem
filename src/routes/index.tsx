import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Monitor, RefreshCw, Zap, Bot, ChevronDown, ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { MobileMenu } from "@/components/MobileMenu";

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
const WA = "https://wa.me/573004497290?text=Hola%20Nexo%2C%20necesito%20asesor%C3%ADa%20para%20mi%20proyecto%20digital.%20%C2%BFPodr%C3%ADan%20ayudarme%3F";

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
          <a
            href="#"
            className="font-sans text-[1.35rem] font-extrabold leading-none tracking-[-0.06em] text-foreground"
          >
            Nexo
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="group flex items-center gap-1 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-105"
              >
                {n.label}
                {n.caret && <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />}
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
              className="hidden md:block rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
            >
              Comience
            </a>
            <MobileMenu nav={nav} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-radial relative min-h-screen flex items-center justify-center py-20 lg:py-32">
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] z-0" style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 80%)',
          filter: 'blur(60px)'
        }} />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-6 w-full z-10">
          {/* Mobile-first layout */}
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1.05fr_1fr] items-center gap-8">

            {/* 1. Texto (PRIMERO en el HTML) */}
            <ScrollAnimation direction="left" delay={0.1}>
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left px-4 sm:px-0">
                <a
                  href={IG}
                  target="_blank"
                  rel="noreferrer"
                  className="pill-glow-hover inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-8 sm:mb-10 text-muted-foreground transition-colors hover:text-foreground"
                >
                  ¡Llegó Nexo! Tu negocio, listo para despegar
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
                <h1 className="text-shine font-sans font-semibold text-3xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
                  Tecnología que
                  <br />
                  impulsa tu
                  <br />
                  negocio
                </h1>
                <p className="mt-6 max-w-xl text-sm sm:text-base lg:text-lg text-neutral-400 leading-relaxed mb-10">
                  En Nexo transformamos la tecnología en resultados reales. No solo creamos
                  herramientas: diseñamos el ecosistema digital que tu marca necesita para
                  crecer sin límites.
                </p>
                <div className="flex flex-row items-center gap-4 sm:gap-6">
                  <a
                    href={IG}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm sm:text-base px-6 py-2.5 rounded-full font-medium bg-neutral-800 text-white transition-colors duration-300 hover:bg-white hover:text-black hover:scale-105 transform"
                  >
                    Comience
                  </a>
                  <a
                    href="#servicios"
                    className="text-sm sm:text-base text-muted-foreground transition-colors hover:text-foreground hover:scale-105 transform transition-all duration-300"
                  >
                    Servicios
                  </a>
                </div>
              </div>
            </ScrollAnimation>

            {/* 2. Cubo (SEGUNDO en el HTML) */}
            <ScrollAnimation direction="right" delay={0.2}>
              <div className="w-full flex flex-col items-center lg:items-end">
                <div className="relative h-[280px] w-full sm:h-[400px] lg:h-[520px] lg:translate-x-8">
                  <ClientOnly fallback={null}>
                    <Suspense fallback={null}>
                      <RubikCube />
                    </Suspense>
                  </ClientOnly>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="relative">
        <div className="glow-line absolute inset-x-0 top-0 h-px" />
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollAnimation direction="up">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Servicios
            </p>
            <h2 className="mt-5 font-sans font-bold text-4xl tracking-tight sm:text-5xl">
              Un ecosistema, cuatro frentes
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-300">
              Cada pieza se conecta con la siguiente: lo que capta tu web alimenta tu CRM,
              y lo que aprende tu CRM alimenta tus automatizaciones.
            </p>
          </ScrollAnimation>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {services.map((s, index) => (
              <ScrollAnimation key={s.title} direction="up" delay={index * 0.1}>
                <article
                  className="surface-card group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:bg-accent/40 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  <s.icon
                    className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground group-hover:scale-110 transform"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-5 text-base font-medium">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                    {s.text}
                  </p>
                </article>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="relative">
        <div className="glow-line absolute inset-x-0 top-0 h-px" />
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollAnimation direction="up">
            <h2 className="font-sans font-bold text-4xl tracking-tight sm:text-5xl">
              Cómo trabajamos
            </h2>
          </ScrollAnimation>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {steps.map((s, index) => (
              <ScrollAnimation key={s.n} direction="up" delay={index * 0.15}>
                <div className="group transition-all duration-300 hover:scale-105">
                  <span className="font-sans font-bold text-3xl text-muted-foreground/70 group-hover:text-foreground transition-colors">
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-base font-medium">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                    {s.text}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Enfoque */}
      <section id="enfoque" className="relative hero-radial">
        <div className="glow-line absolute inset-x-0 top-0 h-px" />
        <div className="mx-auto max-w-3xl px-6 py-28 text-center">
          <ScrollAnimation direction="fade">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Enfoque
            </p>
            <h2 className="text-shine mt-6 font-sans font-bold text-4xl leading-tight sm:text-5xl">
              Tu negocio no necesita más herramientas, necesita la estrategia correcta.
            </h2>
          </ScrollAnimation>
        </div>
        <div className="glow-line absolute inset-x-0 bottom-0 h-px" />
      </section>

      {/* CTA */}
      <section id="contacto" className="relative overflow-hidden">
        <div className="light-beam light-beam--soft" />
        <div className="relative mx-auto max-w-6xl px-6 py-28 text-center">
          <ScrollAnimation direction="up">
            <h2 className="font-sans font-bold text-5xl tracking-tight">
              ¿Hablamos de tu proyecto?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-300">
              Escríbenos por Instagram y te respondemos con una propuesta a la medida de tu
              operación.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={IG}
                target="_blank"
                rel="noreferrer"
                className="surface-card inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 hover:bg-accent hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                Escríbenos al DM
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium bg-[#25D366] text-white transition-all duration-300 hover:bg-[#128C7E] hover:scale-110 hover:shadow-2xl hover:shadow-green-500/20"
              >
                WhatsApp
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
