import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, Clock, Send, Sparkles, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

import { Layout } from "@/components/Layout";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { contactSchema, type ContactFormData } from "@/lib/contact.schema";
import { submitContactLead } from "@/lib/contact.server";

const WA_URL =
  "https://wa.me/573137853050?text=Hola%20Nexo%2C%20necesito%20asesor%C3%ADa%20para%20mi%20proyecto%20digital.%20%C2%BFPodr%C3%ADan%20ayudarme%3F";

function WhatsAppIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.489.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
    </svg>
  );
}

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

const contactCards = [
  {
    icon: Mail,
    title: "Correo",
    primary: "nexosolutions5@gmail.com",
    href: "mailto:nexosolutions5@gmail.com",
    caption: "Respuesta en menos de 24 horas",
    actionLabel: "Enviar email",
  },
  {
    iconComponent: WhatsAppIcon,
    title: "WhatsApp",
    primary: "+57 313 785 3050",
    href: WA_URL,
    caption: "Atención directa de lunes a sábado",
    actionLabel: "Iniciar chat",
  },
  {
    icon: Clock,
    title: "Horario",
    primary: "Lunes a Sábado",
    secondary: "8:00 am - 6:00 pm (COT)",
    caption: "Sistemas y soporte 100% operativos",
  },
];

function ContactoPage() {
  const {
    register,
    handleSubmit,
    reset,
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

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContactLead({ data });
      toast.success("¡Mensaje enviado!", {
        description: "Nos pondremos en contacto contigo pronto.",
      });
      reset();
    } catch {
      toast.error("No se pudo enviar el mensaje", {
        description: "Intenta de nuevo o escríbenos por WhatsApp.",
      });
    }
  };

  const inputBaseClass =
    "w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-[#00c2ff] focus:bg-background focus:outline-none focus:ring-2 focus:ring-[#00c2ff]/20";
  const inputErrorClass =
    "w-full rounded-xl border border-red-500/50 bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-red-500 focus:bg-background focus:outline-none focus:ring-2 focus:ring-red-500/20";

  return (
    <Layout>
      <main className="overflow-hidden bg-background text-foreground pb-20 sm:pb-28">
        {/* Header Hero Section */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
          {/* Ambient Glow / Particle Field Backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 h-[360px] w-[500px] sm:w-[850px] rounded-full bg-[#00c2ff]/10 blur-[140px]"
          />

          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <ScrollAnimation direction="up">
              <div className="brand-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium mb-6 cursor-default select-none">
                <Sparkles className="h-3.5 w-3.5 text-[#00c2ff]" />
                <span>Atención & Consultoría Estratégica</span>
              </div>

              <h1 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-foreground">
                Contacto
              </h1>

              <p className="mt-5 text-lg sm:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
                Queremos conversar contigo
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Main 2-Column Section: "¿Nos tomamos un café?" + Formulario "Escríbenos" */}
        <section className="relative py-8 sm:py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] items-start">
              {/* Left Column: Mensaje & Razones */}
              <ScrollAnimation direction="left" delay={0.1}>
                <div className="flex flex-col justify-between h-full space-y-8 lg:pr-6">
                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#00c2ff] mb-3">
                      Hablemos
                    </span>
                    <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground">
                      ¿Nos tomamos un <span className="text-[#00c2ff]">café?</span>
                    </h2>

                    <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                      Queremos conocerte y conocer a tu equipo para que juntos diseñemos y
                      construyamos el ecosistema digital que llevará tu operación al siguiente
                      nivel.
                    </p>

                    <div className="mt-10">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                        Contáctanos si:
                      </h3>
                      <ul className="space-y-4">
                        {reasons.map((reason) => (
                          <li key={reason} className="flex items-start gap-3">
                            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[#00c2ff]">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-sm sm:text-base text-muted-foreground leading-snug">
                              {reason}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-muted/40 p-6">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        Disponibilidad Inmediata
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                      Respondemos consultas comerciales y técnicas con propuestas personalizadas.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Right Column: Formulario "Escríbenos" */}
              <ScrollAnimation direction="right" delay={0.2}>
                <div className="saas-card relative rounded-3xl bg-card p-8 sm:p-10 border border-border shadow-2xl overflow-hidden">
                  {/* Subtle Top-Right Ambient Glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute top-0 right-0 h-48 w-48 bg-[#00c2ff]/10 rounded-full blur-3xl"
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight text-[#00c2ff]">
                        Escríbenos
                      </h3>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-[#00c2ff] border border-primary/20">
                        Mensaje Directo
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-8">
                      Déjanos tus datos y nos pondremos en contacto contigo a la brevedad.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                      {/* Campo Nombre */}
                      <div>
                        <label
                          htmlFor="nombre"
                          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                        >
                          Nombre
                        </label>
                        <input
                          id="nombre"
                          type="text"
                          placeholder="Tu nombre o empresa"
                          className={errors.nombre ? inputErrorClass : inputBaseClass}
                          {...register("nombre")}
                        />
                        {errors.nombre && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.nombre.message}</p>
                        )}
                      </div>

                      {/* Campo Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="correo@ejemplo.com"
                          className={errors.email ? inputErrorClass : inputBaseClass}
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                        )}
                      </div>

                      {/* Campo Celular */}
                      <div>
                        <label
                          htmlFor="celular"
                          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                        >
                          Celular
                        </label>
                        <input
                          id="celular"
                          type="tel"
                          placeholder="+57 300 000 0000"
                          className={errors.celular ? inputErrorClass : inputBaseClass}
                          {...register("celular")}
                        />
                        {errors.celular && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.celular.message}</p>
                        )}
                      </div>

                      {/* Campo Mensaje */}
                      <div>
                        <label
                          htmlFor="mensaje"
                          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                        >
                          Mensaje
                        </label>
                        <textarea
                          id="mensaje"
                          rows={4}
                          placeholder="Cuéntanos brevemente sobre tu proyecto o necesidad..."
                          className={`resize-y ${errors.mensaje ? inputErrorClass : inputBaseClass}`}
                          {...register("mensaje")}
                        />
                        {errors.mensaje && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.mensaje.message}</p>
                        )}
                      </div>

                      {/* Aceptación de Términos y Condiciones */}
                      <div>
                        <label htmlFor="terminos" className="flex items-start gap-3 cursor-pointer">
                          <input
                            id="terminos"
                            type="checkbox"
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-[#00c2ff] focus:ring-2 focus:ring-[#00c2ff]/30 cursor-pointer"
                            {...register("terminos")}
                          />
                          <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Acepto los{" "}
                            <Link
                              to="/terminos"
                              target="_blank"
                              className="font-semibold text-[#00c2ff] hover:underline"
                            >
                              Términos y Condiciones
                            </Link>{" "}
                            y la{" "}
                            <Link
                              to="/privacidad"
                              target="_blank"
                              className="font-semibold text-[#00c2ff] hover:underline"
                            >
                              Política de Privacidad
                            </Link>
                            .
                          </span>
                        </label>
                        {errors.terminos && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.terminos.message}</p>
                        )}
                      </div>

                      {/* Botón Enviar */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-cyan inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold shadow-[0_4px_20px_rgba(0,194,255,0.35)] transition-all hover:shadow-[0_6px_28px_rgba(0,194,255,0.5)] active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Enviando...</span>
                            </>
                          ) : (
                            <>
                              <span>Enviar</span>
                              <Send className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Bottom Info Cards Section (Correo, WhatsApp, Horario) */}
        <section className="relative pt-16 sm:pt-24 border-t border-border mt-16 sm:mt-24 bg-muted/20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {contactCards.map((card, idx) => {
                const Icon = card.icon;
                const IconComp = card.iconComponent;
                return (
                  <ScrollAnimation key={card.title} direction="up" delay={idx * 0.1}>
                    <div className="saas-card relative h-full rounded-2xl bg-card p-8 border border-border flex flex-col justify-between transition-all duration-300 hover:border-[#00c2ff]/40">
                      <div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-[#00c2ff] mb-6">
                          {IconComp ? (
                            <IconComp className="h-6 w-6" />
                          ) : Icon ? (
                            <Icon className="h-6 w-6" />
                          ) : null}
                        </div>

                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {card.title}
                        </span>

                        <div className="mt-2">
                          {card.href ? (
                            <a
                              href={card.href}
                              target={card.href.startsWith("http") ? "_blank" : undefined}
                              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="text-lg font-bold text-foreground transition-colors hover:text-[#00c2ff] break-all sm:break-normal"
                            >
                              {card.primary}
                            </a>
                          ) : (
                            <p className="text-lg font-bold text-foreground">{card.primary}</p>
                          )}

                          {card.secondary && (
                            <p className="text-sm font-medium text-foreground/80 mt-0.5">
                              {card.secondary}
                            </p>
                          )}
                        </div>

                        <p className="mt-3 text-xs text-muted-foreground">{card.caption}</p>
                      </div>

                      {card.actionLabel && card.href && (
                        <div className="mt-6 pt-4 border-t border-border">
                          <a
                            href={card.href}
                            target={card.href.startsWith("http") ? "_blank" : undefined}
                            rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00c2ff] hover:underline"
                          >
                            <span>{card.actionLabel}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </ScrollAnimation>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default ContactoPage;
