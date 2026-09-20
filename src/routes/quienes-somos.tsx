import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Target,
  Eye,
  Sparkles,
  CheckCircle2,
  Rocket,
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { Layout } from "@/components/Layout";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export const Route = createFileRoute("/quienes-somos")({
  head: () => ({
    meta: [
      { title: "Quiénes Somos — Nexo | Conexión Estratégica & Transformación Digital" },
      {
        name: "description",
        content:
          "En Nexo somos el puente estratégico fundamental entre la tecnología de vanguardia, los procesos digitales y los objetivos comerciales de tu empresa.",
      },
      { property: "og:title", content: "Quiénes Somos — Nexo" },
      {
        property: "og:description",
        content:
          "Conoce la misión, visión y principios que impulsan a Nexo como tu socio estratégico en desarrollo web, CRM, IA y automatización.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: QuienesSomosPage,
});

const pillars = [
  {
    number: "01",
    title: "Tecnología de Vanguardia",
    description: "Stack moderno, seguro y preparado para escalar sin generar deuda técnica.",
  },
  {
    number: "02",
    title: "Procesos Digitales Ágiles",
    description: "Metodologías estructuradas que acortan los tiempos de entrega y reducen costos.",
  },
  {
    number: "03",
    title: "Metas Comerciales Reales",
    description: "Todo desarrollo se orienta a métricas de negocio, ventas y retorno de inversión.",
  },
];

const missionFeatures = [
  "Resultados tangibles y medibles",
  "Desarrollo ágil e iteración continua",
  "Arquitectura limpia y escalabilidad",
];

const visionFeatures = [
  "Liderazgo en innovación digital",
  "Automatización e inteligencia operativa",
  "Escalabilidad e impacto comercial",
];

const engineeringPrinciples = [
  {
    icon: ShieldCheck,
    badge: "Arquitectura & Calidad",
    title: "Zero Deuda Técnica",
    description:
      "Arquitecturas limpias, modulares y fuertemente tipadas de principio a fin para garantizar estabilidad y mantenibilidad a largo plazo.",
  },
  {
    icon: Rocket,
    badge: "Velocidad & Fiabilidad",
    title: "Entrega Continua (CI/CD)",
    description:
      "Ciclos de despliegue ágiles con feedback real de negocio, minimizando el time-to-market sin comprometer la robustez del sistema.",
  },
  {
    icon: BrainCircuit,
    badge: "Eficiencia Operativa",
    title: "Data & AI Driven",
    description:
      "Automatizaciones inteligentes y modelos predictivos orientados a resolver cuellos de botella reales y acelerar la productividad del equipo.",
  },
];

function QuienesSomosPage() {
  return (
    <Layout>
      <main className="overflow-hidden bg-background text-foreground pb-20 sm:pb-28">
        {/* ============================================================ */}
        {/* SECCIÓN 1: HERO & CONCEPTO NEXO (REFACTORIZADO)             */}
        {/* ============================================================ */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
          {/* Ambient Glow Effects */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 h-[380px] w-[600px] sm:w-[900px] rounded-full bg-[#00c2ff]/10 blur-[140px]"
          />

          <div className="relative mx-auto max-w-6xl px-6">
            <ScrollAnimation direction="up">
              <div className="text-center max-w-4xl mx-auto">
                <div className="brand-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium mb-6 cursor-default select-none">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--brand-ink)]" />
                  <span>Nuestra Identidad & Propósito</span>
                </div>

                <h1 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-foreground">
                  El puente estratégico entre la{" "}
                  <span className="text-[var(--brand-ink)]">tecnología</span> y tu negocio
                </h1>

                <p className="mt-8 max-w-3xl mx-auto text-base sm:text-xl text-muted-foreground leading-relaxed">
                  En <span className="text-foreground font-semibold">Nexo</span>, somos tu socio
                  estratégico en transformación digital y comercial. Conectamos ingeniería de
                  software de alto nivel, automatización inteligente y visión de negocio para
                  escalar tu empresa.
                </p>
              </div>
            </ScrollAnimation>

            {/* Pilar Grid (01, 02, 03) */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {pillars.map((item, idx) => (
                <ScrollAnimation key={item.title} direction="up" delay={0.1 * (idx + 1)}>
                  <article className="saas-card relative h-full rounded-3xl p-7 sm:p-8 flex flex-col justify-between overflow-hidden group">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/25 font-mono text-sm font-black text-[var(--brand-ink)] shadow-2xs group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                          {item.number}
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-[var(--brand-ink)] transition-colors">
                          Pilar {item.number}
                        </span>
                      </div>

                      <h2 className="mt-6 text-xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-[var(--brand-ink)]">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-5 border-t border-border/50">
                      <div className="h-1 w-8 rounded-full bg-primary/30 group-hover:w-full group-hover:bg-primary transition-all duration-500" />
                    </div>
                  </article>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECCIÓN 2: MISIÓN Y VISIÓN (SPLIT BENTO LAYOUT CON ASSETS)  */}
        {/* ============================================================ */}
        <section className="relative py-20 sm:py-28 border-t border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollAnimation direction="up">
              <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-ink)]">
                  Dirección Estratégica
                </span>
                <h2 className="mt-3 font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-foreground">
                  Misión & Visión
                </h2>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                  El norte claro que guía cada decisión de ingeniería, diseño y consultoría que
                  desplegamos.
                </p>
              </div>
            </ScrollAnimation>

            <div className="flex flex-col gap-12 sm:gap-16">
              {/* Bloque A: Misión (Texto Izquierda / Visual Derecha) */}
              <ScrollAnimation direction="up" delay={0.1}>
                <article className="rounded-3xl border border-border/80 bg-card/80 p-6 sm:p-10 lg:p-12 shadow-xl backdrop-blur-xs relative overflow-hidden group">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#00c2ff]/10 blur-3xl group-hover:bg-[#00c2ff]/15 transition-all duration-500"
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Texto Misión */}
                    <div className="flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--brand-ink)] w-fit mb-5">
                        <Target className="h-3.5 w-3.5" />
                        <span>Misión · Ejecución & Entrega</span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                        Transformar y Acelerar Negocios
                      </h3>

                      <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                        Impulsamos la transformación y el crecimiento de empresas y emprendimientos
                        mediante plataformas web a medida, soluciones de CRM personalizadas,
                        integración de Inteligencia Artificial y la optimización inteligente de
                        procesos.
                      </p>

                      <ul className="mt-8 flex flex-col gap-3.5">
                        {missionFeatures.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-3 text-sm sm:text-base font-medium text-foreground/90"
                          >
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[var(--brand-ink)]">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual Misión */}
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 dark:border-white/10 bg-muted/30 shadow-2xl">
                      <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden">
                        <img
                          src="/quienes%20somos/mision.avif"
                          alt="Misión de Nexo — Desarrollo de plataformas web e inteligencia artificial"
                          width={800}
                          height={600}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-75"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-white/10"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollAnimation>

              {/* Bloque B: Visión (Visual Izquierda / Texto Derecha en Desktop) */}
              <ScrollAnimation direction="up" delay={0.2}>
                <article className="rounded-3xl border border-border/80 bg-card/80 p-6 sm:p-10 lg:p-12 shadow-xl backdrop-blur-xs relative overflow-hidden group">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-[#00c2ff]/10 blur-3xl group-hover:bg-[#00c2ff]/15 transition-all duration-500"
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Visual Visión (orden 2 en mobile, orden 1 en desktop) */}
                    <div className="order-2 lg:order-1 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 dark:border-white/10 bg-muted/30 shadow-2xl group-hover:border-primary/40 transition-colors">
                      <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden">
                        <img
                          src="/quienes%20somos/vision.avif"
                          alt="Visión de Nexo — El socio tecnológico imprescindible en automatización e innovación"
                          width={800}
                          height={600}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-75"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-white/10"
                        />
                      </div>
                    </div>

                    {/* Texto Visión (orden 1 en mobile, orden 2 en desktop) */}
                    <div className="order-1 lg:order-2 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--brand-ink)] w-fit mb-5">
                        <Eye className="h-3.5 w-3.5" />
                        <span>Visión · Proyección & Futuro</span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                        El Socio Tecnológico Imprescindible
                      </h3>

                      <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                        Ser el socio tecnológico imprescindible para las empresas que buscan
                        liderar su sector, conectando la innovación digital y la automatización
                        inteligente para acelerar sus ventas, optimizar sus operaciones y potenciar
                        su crecimiento sostenible.
                      </p>

                      <ul className="mt-8 flex flex-col gap-3.5">
                        {visionFeatures.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-3 text-sm sm:text-base font-medium text-foreground/90"
                          >
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[var(--brand-ink)]">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECCIÓN 3: MANIFIESTO / PRINCIPIOS DE INGENIERÍA            */}
        {/* ============================================================ */}
        <section className="relative py-20 sm:py-28 border-t border-border">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollAnimation direction="up">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-ink)]">
                  Cultura & Estándares
                </span>
                <h2 className="mt-3 font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-foreground">
                  Principios de Ingeniería
                </h2>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                  El rigor técnico y las buenas prácticas que sustentan cada producto y plataforma
                  que construimos.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {engineeringPrinciples.map((principle, idx) => {
                const IconComponent = principle.icon;
                return (
                  <ScrollAnimation key={principle.title} direction="up" delay={0.1 * (idx + 1)}>
                    <article className="saas-card relative h-full rounded-3xl p-7 sm:p-8 flex flex-col justify-between overflow-hidden group">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/25 text-[var(--brand-ink)] shadow-2xs group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                            <IconComponent className="h-6 w-6" strokeWidth={2.2} />
                          </div>
                          <span className="rounded-full bg-muted/80 border border-border px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-[var(--brand-ink)] group-hover:border-primary/30 transition-colors">
                            {principle.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-[var(--brand-ink)]">
                          {principle.title}
                        </h3>
                        <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                          {principle.description}
                        </p>
                      </div>

                      <div className="mt-8 pt-5 border-t border-border/50">
                        <div className="h-1 w-8 rounded-full bg-primary/30 group-hover:w-full group-hover:bg-primary transition-all duration-500" />
                      </div>
                    </article>
                  </ScrollAnimation>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECCIÓN 4: PRE-FOOTER CTA (CONVERSIÓN DIRECTA)               */}
        {/* ============================================================ */}
        <section className="relative pt-10 sm:pt-14 pb-12 sm:pb-16">
          <div className="mx-auto max-w-5xl px-6">
            <ScrollAnimation direction="up">
              <div className="relative rounded-3xl border border-primary/25 dark:border-cyan-500/25 bg-gradient-to-b from-primary/10 via-card/90 to-card p-8 sm:p-14 md:p-16 text-center overflow-hidden shadow-2xl backdrop-blur-md">
                {/* Radial Glow Background */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] sm:w-[700px] rounded-full bg-[#00c2ff]/15 blur-[100px]"
                />

                <div className="relative z-10">
                  <div className="brand-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium mb-6 cursor-default select-none">
                    <Sparkles className="h-3.5 w-3.5 text-[var(--brand-ink)]" />
                    <span>Empecemos a Construir</span>
                  </div>

                  <h2 className="font-sans font-extrabold text-2xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-foreground max-w-3xl mx-auto">
                    ¿Listo para transformar la infraestructura digital de tu negocio?
                  </h2>

                  <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Diseñamos soluciones personalizadas que conectan ingeniería de vanguardia con tus
                    metas de crecimiento.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      to="/contacto"
                      className="btn-cyan group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm sm:text-base font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all w-full sm:w-auto"
                    >
                      <span>Hablar con un especialista</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default QuienesSomosPage;
