import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { contactSchema, type ContactFormData } from "@/lib/contact.schema";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateEmailHtml(data: ContactFormData, formattedDate: string): string {
  const phoneMarkup = data.celular
    ? `<a href="tel:${escapeHtml(data.celular)}" style="color: #e5e7eb; text-decoration: none;">${escapeHtml(data.celular)}</a>`
    : '<span style="color: #6b7280; font-style: italic;">No especificado</span>';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo prospecto: ${escapeHtml(data.nombre)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0f17; color: #f3f4f6; margin: 0; padding: 32px 16px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #141923; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
    <div style="background: linear-gradient(135deg, #0095af 0%, #00c2ff 100%); padding: 24px 32px; text-align: left;">
      <span style="display: inline-block; background-color: rgba(255,255,255,0.2); color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
        Contacto Web
      </span>
      <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">
        Nuevo Prospecto: ${escapeHtml(data.nombre)}
      </h1>
    </div>

    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #1f2937; color: #9ca3af; font-size: 13px; width: 120px; font-weight: 600;">Nombre</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #1f2937; color: #ffffff; font-size: 15px; font-weight: 700;">${escapeHtml(data.nombre)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #1f2937; color: #9ca3af; font-size: 13px; font-weight: 600;">Email</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #1f2937; color: #00c2ff; font-size: 15px;">
            <a href="mailto:${escapeHtml(data.email)}" style="color: #00c2ff; text-decoration: none;">${escapeHtml(data.email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #1f2937; color: #9ca3af; font-size: 13px; font-weight: 600;">Celular</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #1f2937; color: #e5e7eb; font-size: 15px;">
            ${phoneMarkup}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #1f2937; color: #9ca3af; font-size: 13px; font-weight: 600;">Fecha</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #1f2937; color: #9ca3af; font-size: 13px;">${formattedDate}</td>
        </tr>
      </table>

      <div style="margin-top: 24px;">
        <span style="display: block; color: #9ca3af; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
          Mensaje
        </span>
        <div style="background-color: #0c0f17; border: 1px solid #1f2937; border-radius: 12px; padding: 16px 20px; color: #d1d5db; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.mensaje)}</div>
      </div>
    </div>

    <div style="background-color: #0d111a; border-top: 1px solid #1f2937; padding: 16px 32px; text-align: center; color: #6b7280; font-size: 12px;">
      NEXO Growth Ecosystem • Notificación automática de formulario web
    </div>
  </div>
</body>
</html>
  `.trim();
}

function generateEmailText(data: ContactFormData, formattedDate: string): string {
  return [
    "NUEVO PROSPECTO WEB - NEXO",
    "----------------------------------------",
    `Nombre: ${data.nombre}`,
    `Email: ${data.email}`,
    `Celular: ${data.celular || "No especificado"}`,
    `Fecha: ${formattedDate}`,
    "----------------------------------------",
    "Mensaje:",
    data.mensaje,
    "----------------------------------------",
  ].join("\n");
}

async function sendDiscordNotification(data: ContactFormData): Promise<void> {
  const webhookUrl = process.env["DISCORD_WEBHOOK_URL"];

  if (!webhookUrl) {
    throw new Error("[contact] DISCORD_WEBHOOK_URL is not configured");
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
    throw new Error(`[contact] Discord webhook failed: ${response.status} ${response.statusText}`);
  }
}

async function sendResendNotification(data: ContactFormData, formattedDate: string): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];

  if (!apiKey) {
    throw new Error("[contact] RESEND_API_KEY is not configured");
  }

  const toEmail = process.env["CONTACT_TO_EMAIL"] || "nexosolutions5@gmail.com";
  const resend = new Resend(apiKey);

  const response = await resend.emails.send({
    from: "NEXO Contacto <onboarding@resend.dev>",
    to: toEmail,
    replyTo: data.email,
    subject: `Nuevo prospecto: ${data.nombre}`,
    html: generateEmailHtml(data, formattedDate),
    text: generateEmailText(data, formattedDate),
  });

  if (response.error) {
    throw new Error(
      `[contact] Resend API error: ${response.error.name} - ${response.error.message}`,
    );
  }
}

export const submitContactLead = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    const formattedDate = new Intl.DateTimeFormat("es-CO", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/Bogota",
    }).format(new Date());

    const [discordResult, resendResult] = await Promise.allSettled([
      sendDiscordNotification(data),
      sendResendNotification(data, formattedDate),
    ]);

    const discordFailed = discordResult.status === "rejected";
    const resendFailed = resendResult.status === "rejected";

    if (discordFailed) {
      console.error("[contact] Discord notification failed:", discordResult.reason);
    }

    if (resendFailed) {
      console.error("[contact] Resend email notification failed:", resendResult.reason);
    }

    // If both services failed, notify client to try again or reach out directly
    if (discordFailed && resendFailed) {
      console.error("[contact] All lead notification providers failed");
      throw new Error("Failed to send message. Please try again later.");
    }

    return { success: true };
  });

// Alias for backwards compatibility
export const notifyDiscordLead = submitContactLead;
