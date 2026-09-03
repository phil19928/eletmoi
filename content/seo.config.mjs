/**
 * Règles SEO ajustables, regroupées ici pour n'avoir qu'un seul endroit à
 * modifier quand une politique éditoriale change.
 *
 * Consommé par scripts/content/*.mjs uniquement — jamais par le bundle client.
 */

export { INSTITUTIONAL_DOMAINS, COMMERCIAL_DOMAINS, qualifyRel } from "../src/lib/links.js";

export const SITE_URL = "https://eletmoi.fr";

/** Longueurs imposées aux balises (§3 du brief). */
export const LIMITS = {
  metaTitleMax: 60,
  metaDescriptionMin: 140,
  metaDescriptionMax: 155,
  minInternalLinks: 3,
  minExternalSources: 2,
};

/**
 * Expressions bannies du texte lu par l'utilisateur, et zones où elles restent
 * autorisées.
 *
 * `scope: "content"` : la règle ne s'applique qu'aux articles de content/.
 *
 * Vide depuis le 29 août 2026. « Contrôle parental » y figurait ; l'expression
 * est désormais assumée, parce que c'est celle que les parents tapent dans
 * Google (voir CLAUDE.md, « Stratégie de mots-clés »). Le mécanisme est
 * conservé : `checkBannedPhrases` (scripts/content/check.mjs) itère simplement
 * sur un tableau vide.
 *
 * Pour réactiver une règle, ajouter une entrée de cette forme :
 *
 *   {
 *     phrase: "expression à surveiller",
 *     scope: "content",
 *     severity: "warn",          // "error" pour bloquer le build
 *     allowedFields: ["metaTitle", "metaDescription", "slug"],
 *     allowedInHeadings: 1,      // tolérance dans les titres visibles
 *     headingMustBeQuestion: true,
 *   }
 */
export const BANNED_PHRASES = [];


/** Clusters pour lesquels une source institutionnelle est obligatoire. */
export const CLUSTERS_REQUIRING_INSTITUTIONAL = ["A", "D", "E"];


/** Priorité et fréquence de sitemap hors registre. */
export const STATIC_ROUTE_DEFAULTS = {
  home: { priority: 1.0, changefreq: "weekly" },
  index: { priority: 0.7, changefreq: "weekly" },
  legal: { priority: 0.3, changefreq: "yearly" },
};

/**
 * Le blog est le hub unique de tout le contenu éditorial.
 *
 * Une seule page d'index, organisée en six briques thématiques — une par
 * cluster. Concentrer les contenus au même endroit simplifie la navigation et
 * évite d'éparpiller le maillage interne sur plusieurs pages de liste.
 *
 * Les pages de marque (cluster F) y figurent au même titre que les articles :
 * elles restent atteignables par la barre de navigation et le pied de page,
 * mais rien ne justifiait qu'elles soient absentes de la seule liste
 * exhaustive du site.
 *
 * Les URLs des articles ne changent pas pour autant : elles restent figées sur
 * /blog/, /comparatif/, /guides/ et /lumen/.
 */
export const INDEX_ROUTES = [
  {
    path: "/blog",
    title: "Blog — encadrer le temps d'écran des enfants | El&Moi",
    description:
      "Cadre légal, comparatifs, guides de configuration, parentalité numérique et sécurité en ligne : tous nos contenus pour accompagner les enfants sans conflit.",
    clusters: ["A", "B", "C", "D", "E", "F"],
  },
];

/**
 * Les six briques du hub, dans l'ordre d'affichage. L'ancre sert à la fois de
 * cible de navigation interne et d'identifiant de section.
 */
export const BLOG_CLUSTERS = [
  {
    cluster: "D",
    anchor: "parentalite",
    label: "Parentalité numérique",
    tagline: "Repères par âge, premier téléphone, conflits du soir.",
    accent: "primary",
  },
  {
    cluster: "A",
    anchor: "actualite",
    label: "Loi & actualité",
    tagline: "Ce que la loi change, expliqué sans jargon.",
    accent: "secondary",
  },
  {
    cluster: "C",
    anchor: "guides",
    label: "Guides pratiques",
    tagline: "Pas à pas pour paramétrer Android, iPhone et applications.",
    accent: "primary",
  },
  {
    cluster: "B",
    anchor: "comparatifs",
    label: "Comparatifs",
    tagline: "Les solutions du marché, critère par critère.",
    accent: "accent",
  },
  {
    cluster: "E",
    anchor: "lumen",
    label: "Lumen — sécurité en ligne",
    tagline: "Deepfakes, arnaques, harcèlement : ce qu'un ado doit savoir.",
    accent: "secondary",
  },
  {
    cluster: "F",
    anchor: "el-et-moi",
    label: "Pages de marque",
    tagline: "La Smartloop, Lumen, les tarifs et qui nous sommes.",
    accent: "slate",
  },
];
