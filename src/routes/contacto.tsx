import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

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
            <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-0">
              <ScrollAnimation direction="left" delay={0.1} className="min-w-0 lg:pr-16">
                <h2 className="text-xl font-bold text-foreground">Escríbenos si:</h2>
                <ul className="mt-5 space-y-4">
                  {reasons.map((reason) => (
                    <li key={reason} className="flex items-start gap-4">
                      <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-[#00c2ff]" />
                      <span className="text-base leading-snug text-muted-foreground">{reason}</span>
                    </li>
                  ))}
                </ul>

                <dl className="mt-14 divide-y divide-border/60 border-y border-border/60">
                  <div className="grid gap-1 py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-6">
                    <dt className="text-sm text-muted-foreground">WhatsApp</dt>
                    <dd>
                      <a
                        href={WA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-foreground transition-colors hover:text-[var(--brand-ink)]"
                      >
                        +57 313 785 3050
                      </a>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Atención directa de lunes a sábado.
                      </p>
                    </dd>
                  </div>
                  <div className="grid gap-1 py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-6">
                    <dt className="text-sm text-muted-foreground">Correo</dt>
                    <dd>
                      <a
                        href="mailto:nexosolutions5@gmail.com"
                        className="break-all text-lg font-semibold text-foreground transition-colors hover:text-[var(--brand-ink)] sm:break-normal"
                      >
                        nexosolutions5@gmail.com
                      </a>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Respuesta en menos de 24 horas.
                      </p>
                    </dd>
                  </div>
                  <div className="grid gap-1 py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-6">
                    <dt className="text-sm text-muted-foreground">Horario</dt>
                    <dd>
                      <p className="text-lg font-semibold text-foreground">
                        Lunes a sábado, 8:00 am a 6:00 pm
                      </p>
                      <BogotaStatus className="mt-1 text-sm text-muted-foreground" />
                    </dd>
                  </div>
                </dl>
              </ScrollAnimation>

              <ScrollAnimation
                direction="right"
                delay={0.2}
                className="min-w-0 lg:border-l lg:border-border lg:pl-16"
              >
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  Escríbenos
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Déjanos tus datos y nos pondremos en contacto contigo a la brevedad.
                </p>

                <Suspense
                  fallback={
                    <div className="flex h-64 w-full items-center justify-center">
                      <Loader text="Cargando formulario..." />
                    </div>
                  }
                >
                  <ContactForm />
                </Suspense>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default ContactoPage;
