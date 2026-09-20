import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { MessageSquare, Mail, Clock, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";

import { BogotaStatus } from "@/components/BogotaStatus";
import { Layout } from "@/components/Layout";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Loader } from "@/components/Loader";

const ContactForm = lazy(() => import("@/components/ContactForm"));

const WA_URL =
  "https://wa.me/573137853050?text=Hola%20Nexo%2C%20necesito%20asesor%C3%ADa%20para%20mi%20proyecto%20digital.%20%C2%BFPodr%C3%ADan%20ayudarme%3F";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Nexo | Hablemos de tu Proyecto Digital" },
      {
        name: "description",
        content:
          "Ponte en contacto con el equipo de Nexo. Escríbenos para cotizar desarrollo web, CRM, automatizaciones e inteligencia artificial para tu empresa.",
      },
      { property: "og:title", content: "Contacto — Nexo" },
      {
        property: "og:description",
        content:
          "Queremos conversar contigo y construir el ecosistema digital que tu marca necesita.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContactoPage,
});

const reasons = [
  "Quieres desarrollar una plataforma web o app moderna, rápida y a medida.",
  "Necesitas implementar un CRM personalizado y automatizar tu embudo de ventas.",
  "Buscas integrar soluciones de Inteligencia Artificial para potenciar tu equipo.",
  "Deseas optimizar la operación de tu negocio y eliminar cuellos de botella.",
];

function ContactoPage() {
  return (
    <Layout>
      <main className="overflow-hidden bg-background pb-20 text-foreground sm:pb-28">
        <section className="relative pb-12 pt-32 sm:pb-16 sm:pt-40">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-12 h-[360px] w-[500px] rounded-full bg-[#00c2ff]/10 blur-[100px] sm:w-[850px]"
          />

          <div className="relative mx-auto max-w-6xl px-6">
            <ScrollAnimation direction="up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>INICIA TU PROYECTO</span>
              </div>
              <h1 className="max-w-3xl font-sans text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Cuéntanos qué quieres resolver.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Queremos conocerte y conocer a tu equipo para que juntos diseñemos y construyamos el
                ecosistema digital que llevará tu operación al siguiente nivel.
              </p>
            </ScrollAnimation>
          </div>
        </section>

        <section className="relative py-8 sm:py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:items-start">
              <ScrollAnimation direction="left" delay={0.1} className="min-w-0 space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Escríbenos si:</h2>
                  <div className="mt-5 space-y-3">
                    {reasons.map((reason) => (
                      <div
                        key={reason}
                        className="group flex items-start gap-3.5 rounded-2xl border border-border/70 bg-card/60 p-4 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:border-primary/40 hover:bg-card/90"
                      >
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary transition-transform duration-200 group-hover:scale-110">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-medium leading-snug text-muted-foreground group-hover:text-foreground transition-colors">
                          {reason}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-between rounded-2xl border border-border/80 bg-card/70 p-5 shadow-xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-md active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          WhatsApp
                        </span>
                        <p className="text-base font-bold text-foreground transition-colors group-hover:text-primary">
                          +57 313 785 3050
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Atención directa de lunes a sábado.
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </a>

                  <a
                    href="mailto:nexosolutions5@gmail.com"
                    className="group relative flex items-center justify-between rounded-2xl border border-border/80 bg-card/70 p-5 shadow-xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-md active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Correo
                        </span>
                        <p className="break-all text-base font-bold text-foreground transition-colors group-hover:text-primary sm:break-normal">
                          nexosolutions5@gmail.com
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Respuesta en menos de 24 horas.
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </a>

                  <div className="relative flex items-center gap-4 rounded-2xl border border-border/80 bg-card/70 p-5 shadow-xs backdrop-blur-xs">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Horario
                      </span>
                      <p className="text-base font-bold text-foreground">
                        Lunes a sábado, 8:00 am a 6:00 pm
                      </p>
                      <BogotaStatus className="mt-0.5 text-xs text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation
                direction="right"
                delay={0.2}
                className="min-w-0"
              >
                <div className="relative rounded-3xl border border-border/80 bg-card/85 p-6 sm:p-10 shadow-2xl backdrop-blur-xl ring-1 ring-white/10 dark:ring-white/5 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
                  <div className="mb-6">
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                      Escríbenos
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Déjanos tus datos y nos pondremos en contacto contigo a la brevedad.
                    </p>
                  </div>

                  <Suspense
                    fallback={
                      <div className="flex h-64 w-full items-center justify-center">
                        <Loader text="Cargando formulario..." />
                      </div>
                    }
                  >
                    <ContactForm />
                  </Suspense>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default ContactoPage;
