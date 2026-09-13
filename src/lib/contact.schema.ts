import { z } from "zod";

export const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo"),
  email: z
    .string()
    .email("Ingresa un correo electrónico válido")
    .max(254, "El correo es demasiado largo"),
  celular: z
    .string()
    .max(20, "El número es demasiado largo")
    .optional()
    .or(z.literal("")),
  mensaje: z
    .string()
    .min(10, "Cuéntanos brevemente sobre tu proyecto")
    .max(2000, "El mensaje es demasiado largo"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
