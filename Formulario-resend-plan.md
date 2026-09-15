# Especificación Técnica: Módulo de Contacto NEXO (Resend + Discord Existente)

## Contexto del Desarrollo

El objetivo es volver funcional el formulario de contacto para el envío de correos, **manteniendo intacta y operativa la integración de Discord que ya fue desarrollada**.

Al enviarse el formulario, se debe disparar la notificación por correo transaccional vía Resend (usando la capa gratuita/sandbox, sin dominio verificado) **en conjunto** con la notificación de Discord existente. Se requiere asegurar la validación estricta y el feedback en la UI.

---

## Tarea 1: Verificación de Dependencias y Esquema (Zod)

1. **Dependencias:** Instala la dependencia faltante si es necesario ejecutando `npm install resend` (se asume que `zod`, `react-hook-form`, y la librería de notificaciones UI ya están instaladas).
2. **Esquema Zod:** Asegúrate de que el esquema `contactSchema` existente contemple correctamente las siguientes validaciones:
   - `nombre`: string, mínimo 2 caracteres.
   - `email`: string, formato de correo válido.
   - `celular`: string, opcional.
   - `mensaje`: string, mínimo 10 caracteres.

---

## Tarea 2: Actualización de la Server Function (TanStack Start)

1. **Ubicar función:** Abre la Server Function existente que actualmente maneja el envío a Discord (ej. `submitContactForm` o `notifyDiscordLead` en el archivo `.server.ts`).
2. **Importar dependencias:** Importa `Resend` desde la librería `resend`.
3. **Instanciar cliente:** Fuera del handler de la función, instancia Resend:
   `const resend = new Resend(process.env.RESEND_API_KEY);`
4. **Modificar handler (Inyección):** Agrega la llamada a Resend **sin eliminar la de Discord**. Puedes ejecutar ambas mediante `Promise.all` o de manera secuencial.
5. **Configuración del payload de Resend:**
   - Ejecuta `resend.emails.send({...})` con los siguientes parámetros:
   - `from`: Usa estrictamente `'NEXO Contacto <onboarding@resend.dev>'`.
   - `to`: Usa `process.env.CONTACT_TO_EMAIL`.
   - `reply_to`: Usa `data.email` (para poder responder directamente al cliente).
   - `subject`: `Nuevo prospecto: ${data.nombre}`
   - `html`: Construye un HTML limpio tabulando los datos del cliente (Nombre, Email, Celular, Mensaje).
6. **Manejo de Errores:** Envuelve la llamada a Resend en un `try/catch`. Si Resend falla, captura el error con `console.error` para no romper el flujo principal, asegurando que la notificación de Discord (si fue exitosa) complete el proceso y el lead no se pierda.

---

## Tarea 3: Verificación del Frontend (UI)

Dado que la integración de Discord ya existe, el componente cliente debe requerir mínimos o nulos cambios. Verifica que:

1. **Envío de datos:** La función `onSubmit` siga pasando el payload correctamente a la Server Function actualizada.
2. **Estado de carga:** El estado `isSubmitting` siga deshabilitando el botón "Enviar" y mostrando el feedback visual ("Enviando...").
3. **Notificaciones (Toasts):** El feedback visual de éxito/error de la librería de UI y el reseteo del formulario (`reset()`) sigan operando de forma normal al resolverse la mutación.
