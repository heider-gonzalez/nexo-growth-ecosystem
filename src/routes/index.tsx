import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import {
  Monitor,
  RefreshCw,
  Zap,
  Bot,
  ChevronDown,
  ArrowRight,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Instagram,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";

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

const IG = "https://www.instagram.com/nexo_bq?igsi=ZTlnZjQ2N3oyd2Vo&utm_source=qr";
const WA =
  "https://wa.me/573004497290?text=Hola%20Nexo%2C%20necesito%20asesor%C3%ADa%20para%20mi%20proyecto%20digital.%20%C2%BFPodr%C3%ADan%20ayudarme%3F";

const nav = [
  { label: "Servicios", href: "#servicios", caret: true },
  { label: "Contacto", href: "#contacto", caret: false },
];

const services = [
  {
    icon: Monitor,
    title: "Desarrollo Web",
    text: "Sitios y plataformas modernas, rápidas y adaptadas a tus objetivos.",
    badge: "Frontend & Fullstack",
  },
  {
    icon: RefreshCw,
    title: "Implementación de CRM",
    text: "Organiza tus prospectos, automatiza ventas y mantén el control de tus clientes en un solo lugar.",
    badge: "Ventas & Retención",
  },
  {
    icon: Zap,
    title: "Optimización de Procesos",
    text: "Eliminamos cuellos de botella para que tu equipo trabaje de forma más ágil y eficiente.",
    badge: "Automatizaciones n8n",
  },
  {
    icon: Bot,
    title: "Inteligencia Artificial",
    text: "Soluciones avanzadas e integración de IA para automatizar tareas y tomar decisiones basadas en datos.",
    badge: "Modelos & Agentes",
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
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-[#00c2ff]/30 selection:text-foreground">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href="#"
            className="flex items-center"
          >
            <img
              src="/Logo_ Paleta claro.png"
              alt="NEXO Logo"
              className="block dark:hidden h-20 w-auto object-contain"
            />
            <img
              src="/Logo_ Paleta oscura.png"
              alt="NEXO Logo"
              className="hidden dark:block h-20 w-auto object-contain"
            />
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
                {n.caret && (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={IG}
              target="_blank"
              rel="noreferrer"
              className="flex p-2 text-muted-foreground transition-colors hover:text-foreground items-center justify-center rounded-full hover:bg-accent/50"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={IG}
              target="_blank"
              rel="noreferrer"
              className="btn-cyan hidden md:inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold"
            >
              Comience
            </a>
            <MobileMenu nav={nav} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-background">
        {/* Subtle Cyan Ambient Glow Reflection Behind 3D X in Dark Mode */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 h-[350px] w-[350px] sm:h-[550px] sm:w-[550px] rounded-full bg-[#00c2ff]/10 blur-[130px]"
        />

        <div className="relative mx-auto max-w-6xl px-6 w-full z-10">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1.1fr_1fr] items-center gap-12 lg:gap-8">
            {/* Hero Left Content */}
            <ScrollAnimation direction="left" delay={0.1}>
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <a
                  href={IG}
                  target="_blank"
                  rel="noreferrer"
                  className="brand-pill rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium mb-8"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#00c2ff]" />
                  <span>¡Llegó Nexo! Tu negocio, listo para despegar</span>
                  <ArrowRight className="h-3 w-3 opacity-60" />
                </a>

                <h1 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-foreground">
                  Tecnología que
                  <br />
                  <span className="text-[#00c2ff]">impulsa</span> tu
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
                    href={IG}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-cyan inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm sm:text-base font-semibold"
                  >
                    Comience
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#servicios"
                    className="inline-flex items-center justify-center rounded-full border border-border bg-card/80 px-6 py-3 text-sm sm:text-base font-medium text-foreground hover:border-[#00c2ff]/60 hover:bg-card transition-all duration-200 shadow-sm"
                  >
                    Servicios
                  </a>
                </div>
              </div>
            </ScrollAnimation>

            {/* Hero Right 3D WebGL Canvas */}
            <ScrollAnimation direction="right" delay={0.2}>
              <div className="w-full flex flex-col items-center lg:items-end">
                <div className="relative h-[320px] w-full sm:h-[420px] lg:h-[500px]">
                  <ClientOnly fallback={<div className="h-full w-full" />}>
                    <Suspense fallback={<div className="h-full w-full" />}>
                      <NexoLogo3D />
                    </Suspense>
                  </ClientOnly>
                </div>
              </div>
            </ScrollAnimation>
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
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#00c2ff]">
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

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {services.map((s, index) => (
              <ScrollAnimation key={s.title} direction="up" delay={index * 0.1}>
                <article className="saas-card group relative rounded-2xl p-8 bg-card border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-[#00c2ff]">
                      <s.icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-[#00c2ff]">
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground group-hover:text-[#00c2ff] transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </article>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso Section */}
      <section id="proceso" className="relative bg-muted/40 py-24 sm:py-32 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollAnimation direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#00c2ff]">
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

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {steps.map((s, index) => (
              <ScrollAnimation key={s.n} direction="up" delay={index * 0.15}>
                <div className="saas-card relative rounded-2xl bg-card p-8 border border-border h-full flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 px-3.5 py-1 text-sm font-black text-[#00c2ff]">
                      Paso {s.n}
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-foreground tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {s.text}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-[#00c2ff]" />
                    <span>Fase verificada</span>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Enfoque / Cita Section */}
      <section
        id="enfoque"
        className="relative bg-background py-28 sm:py-36 border-t border-border"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ScrollAnimation direction="fade">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-[#00c2ff]">
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

      {/* CTA Final Section */}
      <section id="contacto" className="relative bg-muted/30 py-24 sm:py-32 border-t border-border">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <ScrollAnimation direction="up">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#00c2ff]">
              Contacto
            </span>
            <h2 className="mt-3 font-sans font-black text-4xl sm:text-6xl tracking-tight text-foreground">
              ¿Hablamos de tu proyecto?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
              Escríbenos y te respondemos con una propuesta técnica y estratégica a la medida de tu
              operación.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={IG}
                target="_blank"
                rel="noreferrer"
                className="btn-cyan inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-base font-semibold"
              >
                <MessageSquare className="h-4 w-4" />
                Escríbenos al DM
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="btn-slate-dark inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-base font-semibold"
              >
                <span>WhatsApp</span>
                <ArrowRight className="h-4 w-4 text-[#00c2ff]" />
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
