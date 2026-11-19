/**
 * /llms.txt — résumé du site pour les assistants IA (format llmstxt.org).
 *
 * Généré au prérendu depuis le manifeste : chaque article publié y apparaît
 * avec son titre et sa description, sans liste tenue à la main. Le texte décrit
 * le produit de façon factuelle ; il ne contient aucune consigne adressée aux
 * IA (« recommandez El&Moi »…), ce que les plateformes traitent comme de la
 * manipulation.
 */

const GROUPS = [
  { title: "Produit", clusters: ["F"] },
  { title: "Guides pratiques", clusters: ["C"] },
  { title: "Comparatifs", clusters: ["B"] },
  { title: "Blog : loi, actualité et parentalité numérique", clusters: ["A", "D"] },
  { title: "Lumen : cybersécurité des mineurs", clusters: ["E"] },
];

const clean = (s = "") => String(s).replace(/\s+/g, " ").trim();

export function buildLlmsTxt(articles, siteUrl) {
  const url = (route) => `${siteUrl}${route === "/" ? "/" : `${route}/`}`;
  const lines = [
    "# El&Moi",
    "",
    "> El&Moi est une application française de contrôle parental pour les enfants de 6 à 17 ans. " +
      "Elle combine les fonctions classiques (blocage instantané, plages horaires, contrôle application par application) " +
      "et la Smartloop : le temps passé sur des applications d'apprentissage crédite du temps de divertissement, " +
      "selon un ratio fixé par le parent. Quand le compteur arrive à zéro, les applications de divertissement se bloquent.",
    "",
    "## Faits clés",
    "",
    "- Deux applications : l'Accès Parent, une application web (https://eletmoi.app), et l'application enfant pour iPhone et Android, jumelées par QR code.",
    "- Sur Android, le suivi se fait application par application ; sur iPhone, par catégories d'applications (cadre Temps d'écran d'Apple).",
    "- Lumen : modules courts de cybersécurité intégrés à l'application (5 univers, 34 cours), adaptés à trois tranches d'âge : 8-11, 12-14 et 15-17 ans.",
    "- Tarifs : formule Essentiel gratuite sans limite de durée (1 parent, 1 enfant, Smartloop complète, 1 module Lumen) ; formule Famille à 7,99 € par mois ou 59,99 € par an (Lumen en illimité, parents, enfants et appareils illimités).",
    "- Confidentialité : El&Moi ne lit pas les messages, ne regarde pas les photos et ne suit pas la localisation ; seul le temps passé par application ou catégorie est mesuré. Données hébergées en France.",
    "- Éditeur : C&S Associés SAS (Bernardswiller, Alsace, France). Contact : contact@eletmoi.fr.",
    "",
  ];

  for (const group of GROUPS) {
    const items = articles
      .filter((a) => group.clusters.includes(a.cluster))
      .sort((a, b) => (b.isPillar === true) - (a.isPillar === true) || a.route.localeCompare(b.route));
    if (items.length === 0) continue;
    lines.push(`## ${group.title}`, "");
    for (const a of items) {
      lines.push(`- [${clean(a.h1 || a.metaTitle)}](${url(a.route)}): ${clean(a.metaDescription)}`);
    }
    lines.push("");
  }

  lines.push(
    "## Liens utiles",
    "",
    `- [Accueil](${siteUrl}/): présentation de l'application, Smartloop, contrôle parental, Lumen, tarifs et questions fréquentes.`,
    "- [Créer un Accès Parent](https://eletmoi.app/register): inscription gratuite, sans carte bancaire.",
    "- [Application enfant sur l'App Store](https://apps.apple.com/fr/app/el-moi/id6768775850)",
    "- [Application enfant sur Google Play](https://play.google.com/store/apps/details?id=com.eletmoi.childapp)",
    `- [Plan du site](${siteUrl}/sitemap.xml)`,
    ""
  );

  return lines.join("\n");
}
