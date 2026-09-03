/**
 * Génère le code à partir du registre et des articles.
 *
 * Écrit deux fichiers, commités pour que les builds soient reproductibles et
 * les diffs relisibles :
 *   - src/seo/routes.js      → consommé par le prérendu et le sitemap
 *   - src/content/manifest.js → consommé par le bundle React et les scripts
 *
 * Ne jamais éditer ces deux fichiers à la main : relancer `npm run content:build`.
 */

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  ROOT,
  c,
  canonicalUrl,
  loadRegistry,
  loadArticles,
  loadAuthors,
  resolveInternalLinks,
} from "./lib.mjs";
import { STATIC_ROUTES, NOT_FOUND_ROUTE } from "../../content/static-routes.mjs";
import {
  SITE_URL,
  INDEX_ROUTES,
  STATIC_ROUTE_DEFAULTS,
  BLOG_CLUSTERS,
} from "../../content/seo.config.mjs";

const HEADER = (name) => `// ⚠️ FICHIER GÉNÉRÉ — ne pas modifier à la main.
// Source : content/registry.json + content/**/*.md
// Régénérer : npm run content:build
// ${name}
`;

const js = (value) => JSON.stringify(value, null, 2);

export async function build({ quiet = false } = {}) {
  const registry = await loadRegistry();
  const authors = await loadAuthors();
  const { articles, errors } = await loadArticles();

  if (errors.length) {
    for (const e of errors) {
      console.error(`${c.red}✗ ${e.file}${c.reset}`);
      for (const i of e.issues) console.error(`    ${i}`);
    }
    throw new Error(
      `${errors.length} article(s) au frontmatter invalide — génération interrompue.`
    );
  }

  const published = articles.filter((a) => a.status === "published");
  const publishedIds = new Set(published.map((a) => a.id));

  // ── Manifeste : métadonnées uniquement, jamais les corps Markdown ──────────
  const manifestArticles = published.map((a) => {
    const entry = registry.byId.get(a.id);
    return {
      id: a.id,
      slug: a.slug,
      cluster: a.cluster,
      clusterLabel: registry.clusters[a.cluster].label,
      route: a.route,
      template: a.template,
      h1: a.h1,
      metaTitle: a.metaTitle,
      metaDescription: a.metaDescription,
      canonical: canonicalUrl(a.route),
      datePublished: a.datePublished,
      dateModified: a.dateModified,
      factsVerifiedOn: a.factsVerifiedOn ?? null,
      author: a.author,
      reviewedBy: a.reviewedBy ?? null,
      keywordPrimary: a.keywordPrimary,
      searchIntent: a.searchIntent,
      ogImage: a.ogImage,
      imageAlt: a.imageAlt,
      isPillar: Boolean(entry?.isPillar),
      priority: entry?.priority ?? "P3",
      wave: entry?.wave ?? "V5",
      wordCount: a.body.split(/\s+/).filter(Boolean).length,
      dir: registry.byId.get(a.id).dir,
      internalLinks: resolveInternalLinks(a, registry, publishedIds),
      externalSources: a.externalSources,
      faq: a.faq,
      comparisonTable: a.comparisonTable ?? null,
      howToSteps: a.howToSteps,
      cta: a.cta ?? null,
    };
  });

  const indexPages = INDEX_ROUTES.filter((idx) =>
    published.some((a) => idx.clusters.includes(a.cluster))
  ).map((idx) => ({
    ...idx,
    articles: published
      .filter((a) => idx.clusters.includes(a.cluster))
      .map((a) => a.id),
  }));

  const manifest = `${HEADER("src/content/manifest.js")}
export const ARTICLES = ${js(manifestArticles)};

export const AUTHORS = ${js(authors)};

export const INDEX_PAGES = ${js(indexPages)};

export const BLOG_CLUSTERS = ${js(BLOG_CLUSTERS)};

export const ARTICLES_BY_ROUTE = Object.fromEntries(
  ARTICLES.map((a) => [a.route, a])
);

export const ARTICLES_BY_ID = Object.fromEntries(ARTICLES.map((a) => [a.id, a]));
`;

  // ── routes.js : statiques + index + articles publiés ───────────────────────
  const articleRoutes = manifestArticles.map((a) => ({
    path: a.route,
    title: a.metaTitle,
    description: a.metaDescription,
    priority: registry.clusters[a.cluster].sitemapPriority,
    changefreq: registry.clusters[a.cluster].changefreq,
    // lastmod vient du frontmatter, jamais de la date de build (§6.4)
    lastmod: a.dateModified,
    articleId: a.id,
  }));

  const indexRoutes = indexPages.map((idx) => ({
    path: idx.path,
    title: idx.title,
    description: idx.description,
    ...STATIC_ROUTE_DEFAULTS.index,
    lastmod: manifestArticles
      .filter((a) => idx.clusters.includes(a.cluster))
      .map((a) => a.dateModified)
      .sort()
      .pop(),
  }));

  const routes = [...STATIC_ROUTES, ...indexRoutes, ...articleRoutes];

  const routesFile = `${HEADER("src/seo/routes.js")}
export const SITE_URL = ${js(SITE_URL)};

export const ROUTES = ${js(routes)};

export const NOT_FOUND_ROUTE = ${js(NOT_FOUND_ROUTE)};
`;

  // Index minimal des routes : c'est le SEUL module de contenu importé par
  // App.jsx. Le manifeste complet (descriptions, FAQ, sources) resterait sinon
  // dans le bundle d'accueil et grossirait à chaque article publié.
  const routesIndex = `${HEADER("src/content/routes-index.js")}
export const ARTICLE_ROUTES = ${js(manifestArticles.map((a) => a.route))};

export const INDEX_ROUTES = ${js(indexPages.map((p) => p.path))};
`;

  // Carte de chargement des corps Markdown : un import dynamique par article,
  // donc un chunk par article. Les chemins sont des littéraux, condition pour
  // que Vite puisse les analyser statiquement et découper le bundle.
  const bodies = `${HEADER("src/content/bodies.js")}
export const BODY_LOADERS = {
${manifestArticles
  .map(
    (a) =>
      `  ${JSON.stringify(a.route)}: () => import("../../content/${a.dir}/${a.slug}.md?raw"),`
  )
  .join("\n")}
};

`;

  await mkdir(path.join(ROOT, "src", "content"), { recursive: true });
  await writeFile(path.join(ROOT, "src", "content", "bodies.js"), bodies, "utf8");
  await writeFile(path.join(ROOT, "src", "content", "routes-index.js"), routesIndex, "utf8");
  await writeFile(path.join(ROOT, "src", "content", "manifest.js"), manifest, "utf8");
  await writeFile(path.join(ROOT, "src", "seo", "routes.js"), routesFile, "utf8");

  if (!quiet) {
    console.log(`\n${c.bold}Génération${c.reset}`);
    console.log(`  ✓ src/content/manifest.js — ${manifestArticles.length} article(s) publié(s)`);
    console.log(
      `  ✓ src/seo/routes.js — ${routes.length} route(s) ` +
        `(${STATIC_ROUTES.length} statiques, ${indexRoutes.length} index, ${articleRoutes.length} articles)`
    );
    const drafts = articles.length - published.length;
    if (drafts > 0) {
      console.log(`  ${c.dim}${drafts} article(s) non publié(s), exclus du build${c.reset}`);
    }
  }

  return { articles, published, manifestArticles, routes, registry };
}

// Le chemin du projet contient un espace : comparer à pathToFileURL, pas à une
// concaténation « file:// » qui n'encoderait pas les caractères spéciaux.
const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  build().catch((e) => {
    console.error(`\n${c.red}${e.message}${c.reset}\n`);
    process.exit(1);
  });
}
