"use server";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Da de alta el correo en Brevo (Contactos).
 * Si existe BREVO_LIST_ID, también lo añade a esa lista.
 */
export async function joinWaitlist(email: string): Promise<void> {
  const normalized = email.trim().toLowerCase();
  if (!isValidEmail(normalized)) {
    throw new Error("Correo no válido");
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("Falta la configuración de Brevo");
  }

  const listId = Number(process.env.BREVO_LIST_ID);
  const payload: {
    email: string;
    updateEnabled: boolean;
    listIds?: number[];
  } = {
    email: normalized,
    updateEnabled: true,
  };

  if (Number.isInteger(listId) && listId > 0) {
    payload.listIds = [listId];
  }

  const response = await fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (response.ok) return;

  if (response.status === 400) {
    const body = (await response.json().catch(() => null)) as { code?: string } | null;
    if (body?.code === "duplicate_parameter") return;
  }

  throw new Error("No se pudo registrar el correo");
}
