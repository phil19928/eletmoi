/**
 * Formatage des dates d'article.
 *
 * Les dates sont affichées à l'écran ET reprises dans le JSON-LD : le même
 * helper sert donc au rendu et aux scripts, pour qu'une seule et même valeur
 * circule partout.
 */

/** "2026-09-15" → "15 septembre 2026" */
export function frenchDate(iso) {
  if (!iso) return "";
  // Midi UTC : évite qu'un décalage de fuseau ne fasse reculer la date d'un jour.
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Date ISO complète pour l'attribut datetime et le JSON-LD. */
export const isoDateTime = (iso) => (iso ? `${iso}T12:00:00+02:00` : "");

export const isSameDay = (a, b) => a === b;
