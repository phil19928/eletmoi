/**
 * Génération d'ancres de titres.
 *
 * Partagé volontairement entre le rendu React (TableOfContents, titres) et les
 * scripts Node (validation, sommaire) : si les deux calculaient l'ancre
 * différemment, les liens du sommaire pointeraient dans le vide.
 */

/** « Comment ça marche ? » → « comment-ca-marche » */
export function slugifyHeading(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accents
    .replace(/[’'"«»]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Extrait le texte brut d'un nœud react-markdown pour en dériver l'ancre. */
export function nodeToText(children) {
  if (children == null) return "";
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) return children.map(nodeToText).join("");
  if (typeof children === "object" && children.props) {
    return nodeToText(children.props.children);
  }
  return "";
}
