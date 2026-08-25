/**
 * Classification des liens sortants.
 *
 * Partagé entre le rendu React (liens dans le corps des articles) et les
 * scripts Node (validation, SourcesBox) : une seule liste de domaines, donc
 * aucun risque qu'un lien soit qualifié différemment selon l'endroit.
 */

/** Sources institutionnelles : dofollow, et satisfont l'exigence des clusters A/D/E. */
export const INSTITUTIONAL_DOMAINS = [
  "cnil.fr",
  "arcom.fr",
  "legifrance.gouv.fr",
  "santepubliquefrance.fr",
  "has-sante.fr",
  "inserm.fr",
  "e-enfance.org",
  "3018.fr",
  "cybermalveillance.gouv.fr",
  "service-public.fr",
  "education.gouv.fr",
  "assemblee-nationale.fr",
  "senat.fr",
];

/** Concurrents et sites commerciaux : nofollow systématique. */
export const COMMERCIAL_DOMAINS = [
  "google.com",
  "support.google.com",
  "families.google.com",
  "apple.com",
  "support.apple.com",
  "qustodio.com",
  "xooloo.com",
  "kaspersky.fr",
  "kaspersky.com",
  "bark.us",
  "kizzo.fr",
  "nortonlifelock.com",
  "norton.com",
  "famisafe.wondershare.com",
  "netnanny.com",
  "orange.fr",
  "sfr.fr",
  "bouyguestelecom.fr",
  "free.fr",
];

export function hostOf(url) {
  try {
    return new URL(url, "https://eletmoi.fr").hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

const matches = (host, list) =>
  list.some((d) => host === d || host.endsWith(`.${d}`));

export const isInternalHref = (href) =>
  typeof href === "string" && (href.startsWith("/") || href.startsWith("#"));

export const isInstitutional = (url) => matches(hostOf(url), INSTITUTIONAL_DOMAINS);
export const isCommercial = (url) => matches(hostOf(url), COMMERCIAL_DOMAINS);

/**
 * Un domaine inconnu est traité comme commercial : on ne transmet pas
 * d'autorité par défaut, on l'accorde explicitement.
 */
export function qualifyRel(url) {
  if (isInstitutional(url)) {
    return { rel: "noopener", target: "_blank", kind: "institutional" };
  }
  return {
    rel: "nofollow noopener",
    target: "_blank",
    kind: isCommercial(url) ? "commercial" : "unknown",
  };
}
