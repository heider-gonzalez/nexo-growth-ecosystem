import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertCircle, Send, Loader2 } from "lucide-react";

import { BogotaStatus } from "@/components/BogotaStatus";
import { Layout } from "@/components/Layout";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { contactSchema, type ContactFormData } from "@/lib/contact.schema";
import { submitContactLead } from "@/lib/contact.server";

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

const fieldClass =
  "w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-2.5 text-base text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-[#00c2ff] focus:outline-none focus:ring-0";
const fieldErrorClass = `${fieldClass} !border-red-500/70 focus:!border-red-500`;

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

function ContactoPage() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: "",
      email: "",
      celular: "",
      mensaje: "",
      terminos: false,
    },
  });

  const isTerminosAccepted = watch("terminos");

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContactLead({ data });
      toast.success("¡Mensaje enviado!", {
        description: "Nos pondremos en contacto contigo pronto.",
        duration: 5000,
      });
      reset();
    } catch (error) {
      console.error("Error al enviar formulario:", error);

      const errorMessage = error instanceof Error ? error.message : "";

      toast.error("No se pudo enviar el mensaje", {
        description: errorMessage || "Intenta de nuevo o escríbenos por WhatsApp.",
        duration: 6000,
        action: {
          label: "WhatsApp",
          onClick: () => window.open(WA_URL, "_blank"),
        },
      });
    }
  };

  return (
    <Layout>
      <main className="overflow-hidden bg-background pb-20 text-foreground sm:pb-28">
        <section className="relative pb-12 pt-32 sm:pb-16 sm:pt-40">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-12 h-[360px] w-[500px] rounded-full bg-[#00c2ff]/10 blur-[140px] sm:w-[850px]"
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

                <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
                  {/* Honeypot anti-bot field */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("website" as keyof ContactFormData)}
                    />
                  </div>

                  <div>
                    <label htmlFor="nombre" className="block text-sm text-muted-foreground">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      placeholder="Tu nombre o empresa"
                      className={errors.nombre ? fieldErrorClass : fieldClass}
                      {...register("nombre")}
                    />
                    <FieldError message={errors.nombre?.message} />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-muted-foreground">
                      Correo
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className={errors.email ? fieldErrorClass : fieldClass}
                      {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>

                  <div>
                    <label htmlFor="celular" className="block text-sm text-muted-foreground">
                      Celular
                    </label>
                    <input
                      id="celular"
                      type="tel"
                      placeholder="+57 300 000 0000"
                      className={errors.celular ? fieldErrorClass : fieldClass}
                      {...register("celular")}
                    />
                    <FieldError message={errors.celular?.message} />
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm text-muted-foreground">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      rows={3}
                      placeholder="Cuéntanos brevemente sobre tu proyecto o necesidad..."
                      className={`resize-none ${errors.mensaje ? fieldErrorClass : fieldClass}`}
                      {...register("mensaje")}
                    />
                    <FieldError message={errors.mensaje?.message} />
                  </div>

                  <div>
                    <label htmlFor="terminos" className="flex cursor-pointer items-start gap-3">
                      <input
                        id="terminos"
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-border text-[var(--brand-ink)] focus:ring-2 focus:ring-[#00c2ff]/30"
                        {...register("terminos")}
                      />
                      <span className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        Acepto los{" "}
                        <Link
                          to="/terminos"
                          target="_blank"
                          className="font-semibold text-[var(--brand-ink)] hover:underline"
                        >
                          Términos y Condiciones
                        </Link>{" "}
                        y la{" "}
                        <Link
                          to="/privacidad"
                          target="_blank"
                          className="font-semibold text-[var(--brand-ink)] hover:underline"
                        >
                          Política de Privacidad
                        </Link>
                        .
                      </span>
                    </label>
                    <FieldError message={errors.terminos?.message} />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !isTerminosAccepted}
                      className="btn-cyan inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Enviando mensaje...</span>
                        </>
                      ) : (
                        <>
                          <span>Enviar mensaje</span>
                          <Send className="h-4 w-4" />
                        </>
                    </button>

                    <p className="mt-4 text-xs text-muted-foreground">
                      ¿Problemas con el formulario?{" "}
                      <a
                        href={WA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[var(--brand-ink)] hover:underline"
                      >
                        Escríbenos por WhatsApp
                      </a>
                    </p>
                  </div>
                </form>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default ContactoPage;
