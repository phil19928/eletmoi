/**
 * Classification des liens sortants.
 *
 * Partagé entre le rendu React (liens dans le corps des articles) et les
 * scripts Node (validation, SourcesBox) : une seule liste de domaines, donc
 * aucun risque qu'un lien soit qualifié différemment selon l'endroit.
 */

/**
 * Sources institutionnelles : dofollow, et satisfont l'exigence des clusters
 * A/D/E.
 *
 * Le suffixe `.gouv.fr` est réservé aux administrations françaises : le
 * reconnaître globalement évite d'oublier un domaine à chaque nouvel article.
 * Sans lui, info.gouv.fr, jeprotegemonenfant.gouv.fr, service-public.gouv.fr et
 * internet-signalement.gouv.fr partaient en `nofollow`, à rebours de la règle
 * annoncée dans CLAUDE.md.
 */
export const INSTITUTIONAL_SUFFIXES = ["gouv.fr", "europa.eu"];

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
  "conseil-constitutionnel.fr",
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

/**
 * Chemin interne dans sa forme réellement servie : avec slash final.
 *
 * Netlify écrit chaque route en <route>/index.html, la sert sur <route>/ et
 * redirige <route> en 301. Le canonical et le sitemap portent donc le slash
 * (voir scripts/prerender.mjs) ; sans ce helper, les liens du site pointaient
 * vers l'autre forme et Google ne suivait que des URLs qui redirigent — ce
 * qu'il remonte en « Page avec redirection ».
 *
 * Laissés intacts : les ancres, les URLs externes, et tout chemin qui désigne
 * un fichier (`/og/tarifs.png`) plutôt qu'une route. La partie `#ancre` ou
 * `?requête` est préservée, le slash s'insère avant elle.
 */
export function withTrailingSlash(href) {
  if (typeof href !== "string") return href;
  if (!href.startsWith("/")) return href;

  const cut = href.search(/[#?]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const rest = cut === -1 ? "" : href.slice(cut);

  if (path === "" || path.endsWith("/")) return href;
  // Un dernier segment qui porte une extension est un fichier, pas une route.
  if (/\.[a-z0-9]+$/i.test(path)) return href;

  return `${path}/${rest}`;
}

export const isInstitutional = (url) => {
  const host = hostOf(url);
  return (
    matches(host, INSTITUTIONAL_DOMAINS) ||
    INSTITUTIONAL_SUFFIXES.some((s) => host === s || host.endsWith(`.${s}`))
  );
};
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
