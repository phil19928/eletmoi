/**
 * Construction des données structurées, par template.
 *
 * Injectées au prérendu plutôt que rendues par React : le JSON-LD ne sert
 * qu'aux robots, il n'a aucune raison de peser dans le bundle client ni d'être
 * rejoué à l'hydratation.
 *
 * Organization et WebSite sont déclarés une fois pour toutes dans index.html
 * (donc présents sur chaque page) ; ce module ne produit que ce qui dépend de
 * la route.
 */

import { SITE_URL } from "../../content/seo.config.mjs";

const ORG_ID = `${SITE_URL}/#organization`;

const SECTION_LABELS = {
  blog: "Blog",
  comparatif: "Comparatifs",
  guides: "Guides",
  lumen: "Lumen",
};

const abs = (routePath) =>
  routePath === "/" ? `${SITE_URL}/` : `${SITE_URL}${routePath}/`;

/** Fil d'Ariane structuré — doit refléter exactement le fil visible. */
function breadcrumb(routePath, label) {
  const segments = routePath.split("/").filter(Boolean);
  const items = [{ name: "Accueil", item: `${SITE_URL}/` }];

  if (segments.length > 1 && SECTION_LABELS[segments[0]]) {
    items.push({
      name: SECTION_LABELS[segments[0]],
      item: `${SITE_URL}/${segments[0]}/`,
    });
  }
  items.push({ name: label, item: abs(routePath) });

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
}

function personNode(authors, key) {
  const author = authors?.[key];
  if (!author) return null;
  const node = {
    "@type": "Person",
    name: author.name,
    url: `${SITE_URL}${author.url ?? "/a-propos"}`,
  };
  if (author.role) node.jobTitle = author.role;
  if (author.bio) node.description = author.bio;
  const portrait = author.avatarLarge ?? author.avatar;
  if (portrait) node.image = `${SITE_URL}${portrait}`;
  if (author.sameAs?.length) node.sameAs = author.sameAs;
  return node;
}

function articleNode(article, authors) {
  const node = {
    "@type": "Article",
    "@id": `${abs(article.route)}#article`,
    headline: article.h1,
    description: article.metaDescription,
    inLanguage: "fr-FR",
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(article.route) },
    publisher: { "@id": ORG_ID },
    isAccessibleForFree: true,
  };

  const author = personNode(authors, article.author);
  if (author) node.author = author;

  const reviewer = personNode(authors, article.reviewedBy);
  if (reviewer) node.reviewedBy = reviewer;

  if (article.ogImage) node.image = `${SITE_URL}${article.ogImage}`;
  if (article.keywordPrimary) node.keywords = article.keywordPrimary;

  return node;
}

const faqNode = (article) => ({
  "@type": "FAQPage",
  "@id": `${abs(article.route)}#faq`,
  mainEntity: article.faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

const howToNode = (article) => ({
  "@type": "HowTo",
  "@id": `${abs(article.route)}#howto`,
  name: article.h1,
  description: article.metaDescription,
  inLanguage: "fr-FR",
  step: article.howToSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.name,
    text: step.text,
    ...(step.image ? { image: `${SITE_URL}${step.image}` } : {}),
  })),
});

/** Liste des solutions comparées — c'est ce qu'un moteur extrait d'un comparatif. */
const itemListNode = (article) => ({
  "@type": "ItemList",
  "@id": `${abs(article.route)}#comparaison`,
  name: article.h1,
  itemListElement: ["El&Moi", ...(article.comparisonTable?.competitors ?? [])].map(
    (name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
    })
  ),
});

/**
 * Fiche produit, sur l'accueil et les pages de marque.
 *
 * Pas d'aggregateRating : agréger une note sur un seul avis serait trompeur,
 * et Google ignore — voire sanctionne — ce type de déclaration. À rétablir
 * quand il y aura du volume réel et sourcé.
 */
function softwareNode(article) {
  const node = {
    "@type": "MobileApplication",
    "@id": `${SITE_URL}/#app`,
    name: "El&Moi",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "iOS, Android",
    inLanguage: "fr-FR",
    publisher: { "@id": ORG_ID },
    offers: [
      {
        "@type": "Offer",
        name: "El&Moi Essentiel",
        price: "0",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        name: "El&Moi Famille",
        price: "7.99",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "7.99",
          priceCurrency: "EUR",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: 1,
            unitCode: "MON",
          },
        },
      },
    ],
  };
  if (article?.metaDescription) node.description = article.metaDescription;
  return node;
}

/**
 * Assemble le graphe d'une route.
 * `article` est nul pour les routes statiques et les pages d'index.
 */
/**
 * Page de liste : déclarer explicitement qu'elle recense des articles aide un
 * moteur à comprendre que c'est un hub, et non une page de contenu de plus.
 */
function collectionNode(route, articles) {
  return {
    "@type": "CollectionPage",
    "@id": `${abs(route.path)}#collection`,
    name: route.title.split(" |")[0],
    description: route.description,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: abs(a.route),
        name: a.h1,
      })),
    },
  };
}

export function buildJsonLd({ route, article = null, authors = {}, label, indexArticles = null }) {
  const graph = [breadcrumb(route.path, label ?? route.title)];

  if (indexArticles) {
    graph.push(collectionNode(route, indexArticles));
    return graph;
  }

  // L'accueil porte la fiche produit : elle est retirée du gabarit index.html
  // pour ne pas se retrouver dupliquée sur les pages de marque.
  if (route.path === "/") {
    graph.push(softwareNode(null));
    return graph;
  }

  if (!article) return graph;

  switch (article.template) {
    case "guide":
      graph.push(articleNode(article, authors), howToNode(article));
      break;
    case "comparison":
      graph.push(articleNode(article, authors), itemListNode(article));
      break;
    case "brand":
      graph.push(softwareNode(article));
      break;
    default:
      graph.push(articleNode(article, authors));
  }

  if (article.faq?.length) graph.push(faqNode(article));

  return graph;
}

export function renderJsonLd(graph) {
  if (!graph?.length) return "";
  const payload = JSON.stringify(
    { "@context": "https://schema.org", "@graph": graph },
    null,
    2
  )
    // Empêche une fin de script prématurée si un texte contient « </script> ».
    .replace(/<\//g, "<\\/");
  return `  <script type="application/ld+json">\n${payload}\n  </script>\n`;
}
