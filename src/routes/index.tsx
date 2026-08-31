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
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-[#00c2ff]/20 selection:text-[#0f172a]">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href="#"
            className="flex items-center gap-1.5 font-sans text-[1.4rem] font-black leading-none tracking-tight text-slate-900"
          >
            <span>NE</span>
            <span className="text-[#00c2ff]">X</span>
            <span>O</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="group flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
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
              className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:block"
            >
              Instagram
            </a>
            <a
              href={IG}
              target="_blank"
              rel="noreferrer"
              className="btn-cyan hidden md:inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold text-white"
            >
              Comience
            </a>
            <MobileMenu nav={nav} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-white">
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
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </a>

                <h1 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-slate-900">
                  Tecnología que
                  <br />
                  <span className="text-[#00c2ff]">impulsa</span> tu
                  <br />
                  negocio
                </h1>

                <p className="mt-6 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                  En Nexo transformamos la tecnología en resultados reales. No solo creamos
                  herramientas: diseñamos el ecosistema digital que tu marca necesita para
                  crecer sin límites.
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
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm sm:text-base font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
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
      <section id="servicios" className="relative bg-white py-24 sm:py-32 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollAnimation direction="up">
            <div className="max-w-2xl">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#00c2ff]">
                Servicios
              </span>
              <h2 className="mt-3 font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-900">
                Un ecosistema, cuatro frentes
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
                Cada pieza se conecta con la siguiente: lo que capta tu web alimenta tu CRM,
                y lo que aprende tu CRM alimenta tus automatizaciones.
              </p>
            </div>
          </ScrollAnimation>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {services.map((s, index) => (
              <ScrollAnimation key={s.title} direction="up" delay={index * 0.1}>
                <article className="saas-card group relative rounded-2xl p-8 bg-white border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors duration-300 group-hover:bg-[#E0F7FE] group-hover:text-[#00c2ff]">
                      <s.icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition-colors group-hover:bg-[#E0F7FE] group-hover:text-[#0369a1]">
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#00c2ff] transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600">
                    {s.text}
                  </p>
                </article>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso Section */}
      <section id="proceso" className="relative bg-slate-50/70 py-24 sm:py-32 border-t border-slate-200/80">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollAnimation direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#00c2ff]">
                Metodología
              </span>
              <h2 className="mt-3 font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-900">
                Cómo trabajamos
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Un flujo de trabajo estructurado para garantizar resultados medibles desde el primer día.
              </p>
            </div>
          </ScrollAnimation>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {steps.map((s, index) => (
              <ScrollAnimation key={s.n} direction="up" delay={index * 0.15}>
                <div className="saas-card relative rounded-2xl bg-white p-8 border border-slate-200 h-full flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#E0F7FE] px-3.5 py-1 text-sm font-black text-[#00c2ff]">
                      Paso {s.n}
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-slate-900 tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                      {s.text}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-400">
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
      <section id="enfoque" className="relative bg-white py-28 sm:py-36 border-t border-slate-200/80">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ScrollAnimation direction="fade">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-[#00c2ff]">
              Enfoque Estratégico
            </span>
            <h2 className="mt-6 font-sans font-black text-3xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-slate-900">
              "Tu negocio no necesita más herramientas, necesita la estrategia correcta."
            </h2>
            <p className="mt-6 text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto">
              Diseño de sistemas conectados que potencian tu equipo y multiplican el retorno de inversión.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Final Section */}
      <section id="contacto" className="relative bg-slate-50/90 py-24 sm:py-32 border-t border-slate-200">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <ScrollAnimation direction="up">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#00c2ff]">
              Contacto
            </span>
            <h2 className="mt-3 font-sans font-black text-4xl sm:text-6xl tracking-tight text-slate-900">
              ¿Hablamos de tu proyecto?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-slate-600">
              Escríbenos y te respondemos con una propuesta técnica y estratégica a la medida de tu operación.
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
