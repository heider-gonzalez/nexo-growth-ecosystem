# Especificación Técnica: Integración de Formulario de Contacto NEXO con Discord

## Contexto del Proyecto

El proyecto utiliza React 19, Vite y el framework TanStack Start. El objetivo es conectar el módulo de contacto de la interfaz (cuyo diseño emplea colores oscuros y azul cian) para enviar los datos de los prospectos directamente a un canal de Discord mediante un Webhook nativo. Se requiere validación estricta y un manejo de estado fluido en la UI.

## Tarea 1: Esquema de Validación Universal (Zod)

1. Crea un archivo `contact.schema.ts` (o intégralo directamente en el archivo del componente).
2. Exporta el esquema `contactSchema` con las siguientes validaciones:
   - `nombre`: string, min(2, "El nombre debe tener al menos 2 caracteres").
   - `email`: string, formato de correo válido.
   - `celular`: string, opcional.
   - `mensaje`: string, min(10, "Cuéntanos brevemente sobre tu proyecto").

## Tarea 2: Lógica de Servidor (Server Function de TanStack Start)

1. En el backend, importa `createServerFn` desde `@tanstack/react-start`.
2. Crea una mutación llamada `notifyDiscordLead` configurada como POST y tipada con el esquema: `createServerFn({ method: 'POST' }).validator(contactSchema)`.
3. En el handler, utiliza la API `fetch` nativa para enviar una petición POST a `process.env.DISCORD_WEBHOOK_URL`.
4. Estructura el cuerpo de la petición (`body`) utilizando un Embed de Discord que mantenga la identidad visual (azul cian) de NEXO. Utiliza este payload:
   ```javascript
   const payload = {
     content: "🚀 **¡Alguien quiere tomarse un café!**",
     embeds: [
       {
         title: "Detalles del Prospecto",
         color: 38287, // Azul cian
         fields: [
           { name: "Nombre", value: data.nombre, inline: true },
           { name: "Email", value: data.email, inline: true },
           { name: "Celular", value: data.celular || "No especificado", inline: true },
           { name: "Mensaje", value: data.mensaje },
         ],
       },
     ],
   };
   ```

## Tarea 3: Integración Frontend y Feedback UI

En el componente cliente del formulario (asegurando el "use client" si es necesario), importa la Server Function notifyDiscordLead.

Implementa el manejo de estado utilizando react-hook-form con @hookform/resolvers/zod (o la librería que maneje el formulario actual).

Conecta los inputs del DOM y renderiza los mensajes de error de Zod si el usuario ingresa datos inválidos.

En la función onSubmit, ejecuta la llamada asíncrona: await notifyDiscordLead({ data: formValues }).

Gestiona la experiencia de usuario (UX):

Mapea el estado isSubmitting para deshabilitar el botón de envío y cambiar el texto a "Enviando...".

Integra una librería de notificaciones (ej. Sonner). Muestra un toast de éxito y resetea el formulario (reset()) si se resuelve correctamente.

Muestra un toast de error si la mutación falla, invitando al usuario a reintentar.
