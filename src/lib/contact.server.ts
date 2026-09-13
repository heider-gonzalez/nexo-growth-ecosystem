import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "@/lib/contact.schema";

export const notifyDiscordLead = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("[contact] DISCORD_WEBHOOK_URL is not configured");
      throw new Error("Contact service is temporarily unavailable");
    }

    const payload = {
      content: "🚀 **¡Nuevo prospecto desde la web!**",
      embeds: [
        {
          title: "Detalles del Prospecto",
          color: 0x0095af,
          fields: [
            { name: "Nombre", value: data.nombre, inline: true },
            { name: "Email", value: data.email, inline: true },
            {
              name: "Celular",
              value: data.celular || "No especificado",
              inline: true,
            },
            { name: "Mensaje", value: data.mensaje },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(
        `[contact] Discord webhook failed: ${response.status} ${response.statusText}`,
      );
      throw new Error("Failed to send message. Please try again later.");
    }

    return { success: true };
  });
