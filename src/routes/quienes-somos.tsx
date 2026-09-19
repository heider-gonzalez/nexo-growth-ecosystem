import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Sparkles, CheckCircle2 } from "lucide-react";

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
    title: "Tecnología de Vanguardia",
    description: "Stack moderno, seguro y preparado para escalar sin generar deuda técnica.",
  },
  {
    title: "Procesos Digitales Ágiles",
    description: "Metodologías estructuradas que acortan los tiempos de entrega y reducen costos.",
  },
  {
    title: "Metas Comerciales Reales",
    description: "Todo desarrollo se orienta a métricas de negocio, ventas y retorno de inversión.",
  },
];

function QuienesSomosPage() {
  return (
    <Layout>
      <main className="overflow-hidden bg-background text-foreground pb-20 sm:pb-28">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
          {/* Ambient Glow Effects */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 h-[380px] w-[600px] sm:w-[900px] rounded-full bg-[#00c2ff]/10 blur-[140px]"
          />

          <div className="relative mx-auto max-w-5xl px-6">
            <ScrollAnimation direction="up">
              <div className="text-center">
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
                  estratégico en transformación digital y comercial. Nos apasiona impulsar el
                  crecimiento de empresas y emprendimientos conectando la tecnología más avanzada
                  con los objetivos reales de tu negocio.
                </p>
              </div>
            </ScrollAnimation>

            {/* Concepto Nexo Card */}
            <ScrollAnimation direction="up" delay={0.15}>
              <div className="mt-14 relative rounded-3xl border border-border bg-card/80 p-8 sm:p-12 shadow-xl backdrop-blur-sm">
                <div className="absolute top-0 right-0 -mt-3 mr-6 rounded-full bg-[#00c2ff] px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-950">
                  Concepto Nexo
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                      Nuestra Esencia: La Conexión Fundamental
                    </h2>
                    <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                      El concepto de{" "}
                      <span className="text-[var(--brand-ink)] font-semibold">Nexo</span> representa
                      nuestra esencia: somos la conexión estratégica fundamental entre la
                      tecnología, los procesos digitales y las metas comerciales de cada negocio que
                      confía en nosotros.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3.5">
                    {pillars.map((item, idx) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-3 rounded-2xl bg-muted/60 p-4 border border-border/60 transition-colors hover:border-[#00c2ff]/40"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-[var(--brand-ink)] font-bold text-xs">
                          0{idx + 1}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-foreground">
                            {item.title}
                          </span>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Misión y Visión Section */}
        <section className="relative py-20 sm:py-28 border-t border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollAnimation direction="up">
              <div className="text-center max-w-2xl mx-auto mb-16">
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

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Misión Card */}
              <ScrollAnimation direction="left" delay={0.1}>
                <article className="saas-card relative h-full rounded-3xl bg-card p-8 sm:p-10 border border-border flex flex-col justify-between overflow-hidden group">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-[#00c2ff]/5 rounded-full blur-2xl group-hover:bg-[#00c2ff]/15 transition-all duration-500" />
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-[var(--brand-ink)]">
                        <Target className="h-7 w-7" strokeWidth={2.2} />
                      </div>
                      <span className="rounded-full bg-muted border border-border px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-[var(--brand-ink)] group-hover:border-[#00c2ff]/30 transition-colors">
                        Misión
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      Transformar y Acelerar Negocios
                    </h3>

                    <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                      Impulsar la transformación y el crecimiento de empresas y emprendimientos a
                      través del desarrollo de plataformas web a medida, soluciones de CRM
                      personalizadas, integración de Inteligencia Artificial y la optimización
                      inteligente de procesos.
                    </p>

                    <div className="mt-6 rounded-2xl bg-muted/40 p-5 border border-border/60">
                      <p className="text-sm font-medium text-foreground leading-relaxed">
                        "Nos dedicamos a ser el nexo estratégico entre las necesidades comerciales
                        de nuestros clientes y el máximo potencial de la tecnología, entregando
                        resultados tangibles, ágiles y sostenibles."
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex flex-col gap-2.5 text-xs sm:text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--brand-ink)]" />
                      <span>Resultados tangibles y medibles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--brand-ink)]" />
                      <span>Desarrollo ágil e iteración continua</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--brand-ink)]" />
                      <span>Escalabilidad técnica y sostenibilidad</span>
                    </div>
                  </div>
                </article>
              </ScrollAnimation>

              {/* Visión Card */}
              <ScrollAnimation direction="right" delay={0.2}>
                <article className="saas-card relative h-full rounded-3xl bg-card p-8 sm:p-10 border border-border flex flex-col justify-between overflow-hidden group">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-[#00c2ff]/5 rounded-full blur-2xl group-hover:bg-[#00c2ff]/15 transition-all duration-500" />
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-[var(--brand-ink)]">
                        <Eye className="h-7 w-7" strokeWidth={2.2} />
                      </div>
                      <span className="rounded-full bg-muted border border-border px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-[var(--brand-ink)] group-hover:border-[#00c2ff]/30 transition-colors">
                        Visión
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      El Socio Tecnológico Imprescindible
                    </h3>

                    <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                      Ser el socio tecnológico imprescindible para las empresas que buscan liderar
                      su sector, conectando la innovación digital y la automatización inteligente
                      para acelerar sus ventas, optimizar sus operaciones y potenciar su crecimiento
                      sostenible.
                    </p>

                    <div className="mt-6 rounded-2xl bg-muted/40 p-5 border border-border/60">
                      <p className="text-sm font-medium text-foreground leading-relaxed">
                        "Liderazgo en el sector a través de innovación continua, automatización de
                        alto impacto y aceleración directa de ventas."
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex flex-col gap-2.5 text-xs sm:text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--brand-ink)]" />
                      <span>Liderazgo en innovación digital</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--brand-ink)]" />
                      <span>Automatización e inteligencia operativa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--brand-ink)]" />
                      <span>Aceleración de ventas y crecimiento</span>
                    </div>
                  </div>
                </article>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default QuienesSomosPage;
