"use server";

const BREVO_EMAIL_URL = "https://api.brevo.com/v3/smtp/email";

function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function contactEmailHtml(name: string, email: string, message: string): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  return `<!DOCTYPE html>
<html lang="es">
  <body style="margin:0;padding:0;background:#f4f3f9;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3f9;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#f9f9fb;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#251d44;padding:28px 32px;">
                <p style="margin:0;font-family:Manrope,Arial,sans-serif;font-size:32px;line-height:1;font-weight:600;letter-spacing:-0.04em;color:#d1f383;">irya</p>
                <p style="margin:10px 0 0;font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.4;color:#e6e4f1;">Nuevo mensaje de contacto</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0 0 6px;font-family:Inter,Arial,sans-serif;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;color:#5c6788;">Nombre</p>
                <p style="margin:0 0 18px;font-family:Manrope,Arial,sans-serif;font-size:18px;line-height:1.3;font-weight:600;color:#141721;">${safeName}</p>
                <p style="margin:0 0 6px;font-family:Inter,Arial,sans-serif;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;color:#5c6788;">Correo</p>
                <p style="margin:0 0 18px;font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.4;color:#141721;">
                  <a href="mailto:${safeEmail}" style="color:#352b5b;text-decoration:none;">${safeEmail}</a>
                </p>
                <p style="margin:0 0 6px;font-family:Inter,Arial,sans-serif;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;color:#5c6788;">Mensaje</p>
                <p style="margin:0;padding:16px 18px;background:#f4f3f9;border-radius:10px;font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.5;color:#373f53;">${safeMessage}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px;">
                <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:13px;line-height:1.4;color:#5c6788;">Responde a este correo para escribirle directamente.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendContactMessage(input: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const name = input.name.trim().replace(/[\r\n]/g, " ");
  const email = input.email.trim().toLowerCase();
  const message = input.message.trim();

  if (name.length < 2 || name.length > 80) throw new Error("Nombre no válido");
  if (!isValidEmail(email)) throw new Error("Correo no válido");
  if (message.length < 5 || message.length > 4000) throw new Error("Mensaje no válido");

  const apiKey = process.env.BREVO_API_KEY;
  const to = process.env.BREVO_CONTACT_TO;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "IRYA";
  if (!apiKey || !to || !senderEmail) throw new Error("Falta la configuración de Brevo");

  const response = await fetch(BREVO_EMAIL_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to, name: "IRYA" }],
      replyTo: { email, name },
      subject: `Nuevo mensaje de ${name} — IRYA`,
      htmlContent: contactEmailHtml(name, email, message),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { code?: string; message?: string } | null;
    console.error("Brevo contact email failed", response.status, body?.code ?? body?.message ?? "");
    throw new Error("No se pudo enviar el mensaje");
  }
}
