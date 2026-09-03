/**
 * Fil d'Ariane — source unique du maillon intermédiaire.
 *
 * Partagé entre le rendu React (`components/article/ArticleLayout`) et la
 * construction du JSON-LD (`scripts/content/jsonld.mjs`), pour que le fil
 * visible et le `BreadcrumbList` déclarent exactement les mêmes maillons.
 * Les deux fichiers en tenaient chacun une copie, et elles ont divergé de la
 * réalité : « Guides » pointait vers /guides, qui n'a jamais été une page.
 */

import { ARTICLE_ROUTES, INDEX_ROUTES } from "../content/routes-index.js";

/** Racine de cluster → libellé affiché. */
export const SECTION_LABELS = {
  blog: "Blog",
  comparatif: "Comparatifs",
  guides: "Guides",
  lumen: "Lumen",
};

const EXISTING_ROUTES = new Set([...ARTICLE_ROUTES, ...INDEX_ROUTES]);

/**
 * Maillon intermédiaire d'une route, ou `null`.
 *
 * Trois conditions, et la troisième est celle qui manquait : la racine doit
 * exister en tant que page. /blog est une page d'index, /comparatif et /lumen
 * sont des articles publiés — mais /guides n'existe pas, le hub éditorial
 * unique étant /blog (voir INDEX_ROUTES dans content/seo.config.mjs). Le fil
 * des trois guides annonçait donc un niveau qui renvoyait un 404, aussi bien
 * au lecteur qu'à Google.
 *
 * La règle est générique : un cluster qui gagnera un jour sa page d'index
 * verra son maillon réapparaître, sans rien à modifier ici.
 */
export function sectionCrumb(route) {
  const segments = String(route).split("/").filter(Boolean);
  if (segments.length < 2) return null;

  const root = `/${segments[0]}`;
  const label = SECTION_LABELS[segments[0]];
  if (!label || !EXISTING_ROUTES.has(root)) return null;

  return { label, route: root };
}

/**
 * Libellé court d'une page d'index (/blog → « Blog »).
 *
 * Le fil visible d'une page de liste affiche ce mot ; son BreadcrumbList
 * reprenait le titre complet (« Blog — encadrer le temps d'écran des
 * enfants »), qui ne correspondait à rien de ce que le lecteur voit. Google
 * demande que le balisage reflète le contenu affiché.
 */
export function indexLabel(route) {
  const segments = String(route).split("/").filter(Boolean);
  return segments.length === 1 ? SECTION_LABELS[segments[0]] ?? null : null;
}
