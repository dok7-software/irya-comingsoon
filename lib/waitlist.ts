/**
 * Alta en la lista de espera.
 * TODO: conectar con el servicio real (el destino de envío de Framer no está migrado).
 * Mientras tanto solo simula la latencia de red y resuelve correctamente.
 */
export async function joinWaitlist(email: string): Promise<void> {
  void email;
  await new Promise((resolve) => setTimeout(resolve, 900));
}
