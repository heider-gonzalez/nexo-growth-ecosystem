import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertCircle, Send, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { contactSchema, type ContactFormData } from "@/lib/contact.schema";
import { submitContactLead } from "@/lib/contact.server";

const WA_URL =
  "https://wa.me/573137853050?text=Hola%20Nexo%2C%20necesito%20asesor%C3%ADa%20para%20mi%20proyecto%20digital.%20%C2%BFPodr%C3%ADan%20ayudarme%3F";

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

export function ContactForm() {
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
          )}
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
  );
}

export default ContactForm;
