/**
 * Prérendu statique du site.
 *
 * Le site est une SPA : sans ce script, Netlify sert un <div id="root"></div>
 * vide et Google ne voit aucun contenu. Ici, chaque route de src/seo/routes.js
 * est rendue en HTML complet et écrite comme fichier statique dans dist/.
 *
 * Exécuté par `npm run build`, après le build client et le build SSR.
 */

import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SSR_ENTRY = path.join(ROOT, "dist-ssr", "entry-server.js");

const { ROUTES, NOT_FOUND_ROUTE, SITE_URL } = await import(
  pathToFileURL(path.join(ROOT, "src", "seo", "routes.js")).href
);
const { render } = await import(pathToFileURL(SSR_ENTRY).href);

const { ARTICLES_BY_ROUTE, AUTHORS, ARTICLES, INDEX_PAGES } = await import(
  pathToFileURL(path.join(ROOT, "src", "content", "manifest.js")).href
);
const { buildJsonLd, renderJsonLd } = await import(
  pathToFileURL(path.join(ROOT, "scripts", "content", "jsonld.mjs")).href
);

/**
 * URL canonique d'une route.
 *
 * Les routes sont écrites en <route>/index.html : Netlify les sert alors sur
 * <route>/ et redirige <route> en 301. Le canonical et le sitemap doivent
 * donc porter le slash final, sinon ils désignent une URL qui redirige — ce
 * que Search Console signale en « Page avec redirection ».
 */
const canonicalUrl = (routePath) =>
  routePath === "/" ? SITE_URL + "/" : `${SITE_URL}${routePath}/`;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Remplace le contenu d'une balise meta existante, sans en créer de nouvelle.
 *
 * Le guillemet ouvrant est capturé puis réutilisé en référence arrière (\2) :
 * une classe [^"'] s'arrêterait au premier apostrophe du contenu — et les
 * descriptions françaises en sont pleines (« l'application », « d'écran »).
 */
function setMeta(html, attr, name, content) {
  const pattern = new RegExp(
    `(<meta\\s+${attr}=["']${name}["']\\s+content=)(["'])[\\s\\S]*?\\2`,
    "i"
  );
  if (!pattern.test(html)) {
    throw new Error(
      `Balise meta introuvable dans le gabarit : ${attr}="${name}". ` +
        `index.html a probablement changé — mets à jour scripts/prerender.mjs.`
    );
  }
  return html.replace(pattern, `$1"${escapeHtml(content)}"`);
}

/**
 * Insère une balise meta absente du gabarit, juste après og:type.
 *
 * setMeta refuse volontairement de créer une balise : si index.html perd une
 * balise attendue, on veut une erreur, pas un head silencieusement incomplet.
 * Les `article:*` sont un autre cas — elles n'ont de sens que sur un article,
 * et les poser vides sur /tarifs ou /cgv serait faux. Elles sont donc ajoutées
 * à la demande.
 */
function addMeta(html, property, content) {
  const tag = `  <meta property="${property}" content="${escapeHtml(content)}" />\n`;
  return html.replace(/([ \t]*<meta property="og:type"[^>]*>\n)/i, `$1${tag}`);
}

function applyHead(html, { title, description, canonical, noindex = false, ogImage, imageAlt, jsonLd, article = null }) {
  let out = html;

  if (!/<title>[^<]*<\/title>/i.test(out)) {
    throw new Error("Balise <title> introuvable dans dist/index.html.");
  }
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  out = setMeta(out, "name", "description", description);
  out = setMeta(out, "property", "og:title", title);
  out = setMeta(out, "property", "og:description", description);
  out = setMeta(out, "property", "og:url", canonical);
  out = setMeta(out, "name", "twitter:title", title);
  out = setMeta(out, "name", "twitter:description", description);

  const canonicalPattern = /(<link\s+rel=["']canonical["']\s+href=)(["'])[\s\S]*?\2/i;
  if (!canonicalPattern.test(out)) {
    throw new Error("Balise <link rel=\"canonical\"> introuvable dans le gabarit.");
  }
  out = out.replace(canonicalPattern, `$1"${escapeHtml(canonical)}"`);

  // hreflang auto-référençant. Sans effet tant qu'il n'existe qu'une version
  // linguistique, mais il déclare explicitement la cible France.
  out = out.replace(
    /(<link\s+rel=["']canonical["'][^>]*>)/i,
    `$1\n  <link rel="alternate" hreflang="fr-FR" href="${escapeHtml(canonical)}" />` +
      `\n  <link rel="alternate" hreflang="x-default" href="${escapeHtml(canonical)}" />`
  );

  // og:type. Le gabarit déclare « website » ; sur un article, Facebook et
  // LinkedIn attendent « article » et exploitent les dates qui l'accompagnent.
  // Les pages de marque restent des pages de site, pas des publications.
  if (article && article.template !== "brand") {
    out = setMeta(out, "property", "og:type", "article");
    const author = article.author ? AUTHORS[article.author]?.name : null;
    if (author) out = addMeta(out, "article:author", author);
    out = addMeta(out, "article:modified_time", article.dateModified);
    out = addMeta(out, "article:published_time", article.datePublished);
  }

  // Image sociale propre à l'article, sinon celle du site.
  if (ogImage) {
    const absolute = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;
    out = setMeta(out, "property", "og:image", absolute);
    out = setMeta(out, "name", "twitter:image", absolute);
    if (imageAlt) out = setMeta(out, "property", "og:image:alt", imageAlt);
  }

  // Le JSON-LD dépendant de la route s'ajoute à celui du gabarit
  // (Organization + WebSite, communs à toutes les pages).
  if (jsonLd) {
    out = out.replace(/<\/head>/i, `${jsonLd}</head>`);
  }

  if (noindex) {
    out = out.replace(
      /<\/title>/i,
      '</title>\n  <meta name="robots" content="noindex" />'
    );
    // La 404 est servie sur n'importe quelle URL inconnue : déclarer une
    // canonique n'aurait aucun sens, elle désignerait une page inexistante.
    out = out.replace(/\s*<link\s+rel=["']canonical["'][^>]*>/i, "");
  }

  return out;
}

/**
 * Relit le <head> produit et compare aux valeurs attendues.
 *
 * Un remplacement par regex peut corrompre le gabarit sans lever d'erreur (ça
 * s'est produit : une classe [^"'] coupait au premier apostrophe et laissait
 * un fragment de l'ancienne description). On revalide donc le résultat.
 */
function verifyHead(html, { title, description, canonical }, routePath, expect = {}) {
  const head = html.slice(0, html.indexOf("</head>"));
  const decode = (s) =>
    s
      .replace(/&quot;/g, '"')
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/&amp;/g, "&");

  const checks = [
    ["title", /<title>([\s\S]*?)<\/title>/i, title],
    [
      "meta description",
      /<meta\s+name=["']description["']\s+content=(["'])([\s\S]*?)\1/i,
      description,
    ],
    [
      "og:title",
      /<meta\s+property=["']og:title["']\s+content=(["'])([\s\S]*?)\1/i,
      title,
    ],
    [
      "og:url",
      /<meta\s+property=["']og:url["']\s+content=(["'])([\s\S]*?)\1/i,
      canonical,
    ],
    [
      "canonical",
      /<link\s+rel=["']canonical["']\s+href=(["'])([\s\S]*?)\1/i,
      canonical,
    ],
  ];

  for (const [label, pattern, expected] of checks) {
    if (label === "canonical" && expect.canonical === false) continue;
    const match = head.match(pattern);
    if (!match) {
      throw new Error(`${routePath} : ${label} introuvable dans le <head> généré.`);
    }
    const actual = decode(match[match.length - 1]);
    if (actual !== expected) {
      throw new Error(
        `${routePath} : ${label} incorrect après réécriture.\n` +
          `  attendu : ${expected}\n  obtenu  : ${actual}`
      );
    }
  }

  // Une réécriture ratée laisse un fragment de l'ancienne valeur en dehors des
  // guillemets — invisible pour les contrôles ci-dessus, qui s'arrêtent au
  // guillemet fermant. On neutralise d'abord les blocs qui contiennent
  // légitimement du texte (<title>, JSON-LD, commentaires), puis tout texte
  // restant entre deux balises est forcément parasite.
  const stripped = head
    .replace(/<title>[\s\S]*?<\/title>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]*>/g, "");

  const orphan = stripped.trim();
  if (orphan.length > 0) {
    throw new Error(
      `${routePath} : texte orphelin dans le <head> — réécriture corrompue.\n` +
        `  fragment : « ${orphan.replace(/\s+/g, " ").slice(0, 120)} »`
    );
  }
}

function injectBody(html, markup) {
  const target = '<div id="root"></div>';
  if (!html.includes(target)) {
    throw new Error(
      `Point d'injection ${target} introuvable dans dist/index.html.`
    );
  }
  return html.replace(target, `<div id="root">${markup}</div>`);
}

/**
 * Garde-fou : les builds client et SSR calculent les noms d'assets hashés
 * séparément. S'ils divergent, le HTML prérendu référencerait des images
 * inexistantes — on préfère casser le build ici plutôt qu'en production.
 */
function verifyAssets(html, routePath) {
  const referenced = new Set(
    [...html.matchAll(/["'(](\/assets\/[^"')\s]+)["')\s]/g)].map((m) => m[1])
  );
  const missing = [...referenced].filter(
    (asset) => !existsSync(path.join(DIST, decodeURIComponent(asset)))
  );
  if (missing.length > 0) {
    throw new Error(
      `Assets référencés mais absents de dist/ pour la route ${routePath} :\n` +
        missing.map((m) => `  - ${m}`).join("\n") +
        `\nLes hashes des builds client et SSR ont divergé.`
    );
  }
  return referenced.size;
}

const isFile = (absolute) => {
  try {
    return statSync(absolute).isFile();
  } catch {
    return false;
  }
};

/**
 * Garde-fou : tout lien interne doit désigner l'URL réellement servie en 200.
 *
 * Netlify sert `<route>/` et redirige `<route>` en 301. Un lien interne sans
 * slash final envoie donc chaque robot sur une redirection — c'est ce que
 * Search Console remonte en « Page avec redirection », et ça a vécu des mois
 * sans que rien ne le signale. Un lien vers une route inexistante est pire
 * encore : /guides n'a jamais été une page, et les trois guides pointaient
 * dessus depuis leur fil d'Ariane.
 *
 * Les chemins qui désignent un fichier réellement présent dans dist/ (assets,
 * médias, cartes sociales, favicons) sont laissés tranquilles.
 */
function verifyInternalLinks(html, routePath) {
  const known = new Set(ROUTES.map((r) => r.path));
  const problems = [];

  for (const [, href] of html.matchAll(/\shref="(\/[^"]*)"/g)) {
    const target = href.split(/[#?]/)[0];
    if (target === "" || target === "/") continue;
    // `existsSync` seul ne suffit pas : /blog/ correspond au dossier dist/blog,
    // qui existe. Seul un vrai fichier dispense du contrôle de route.
    if (isFile(path.join(DIST, decodeURIComponent(target)))) continue;

    const withoutSlash = target.replace(/\/$/, "");
    if (!known.has(withoutSlash)) {
      problems.push(`${href} — aucune route de ce nom, et aucun fichier dans dist/`);
    } else if (!target.endsWith("/")) {
      problems.push(`${href} — sans slash final : Netlify y répondra 301`);
    }
  }

  if (problems.length > 0) {
    throw new Error(
      `Liens internes non canoniques sur ${routePath} :\n` +
        [...new Set(problems)].map((m) => `  - ${m}`).join("\n")
    );
  }
}

/** Date du dernier commit touchant le fichier source, pour un <lastmod> honnête. */
function lastModified(source) {
  if (!source) return null;
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", source],
      { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}

function buildSitemap(entries) {
  const urls = entries
    .map(({ path: routePath, priority, changefreq, lastmod }) => {
      const loc = canonicalUrl(routePath);
      return [
        "  <url>",
        `    <loc>${escapeHtml(loc)}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
        priority !== undefined ? `    <priority>${priority.toFixed(1)}</priority>` : null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/** Flux RSS 2.0 du blog. Les dates RFC 822 sont imposées par la spécification. */
function buildRss(articles) {
  const rfc822 = (iso) => new Date(`${iso}T12:00:00Z`).toUTCString();
  const items = articles
    .map((a) =>
      [
        "    <item>",
        `      <title>${escapeHtml(a.h1)}</title>`,
        `      <link>${escapeHtml(canonicalUrl(a.route))}</link>`,
        `      <guid isPermaLink="true">${escapeHtml(canonicalUrl(a.route))}</guid>`,
        `      <description>${escapeHtml(a.metaDescription)}</description>`,
        `      <pubDate>${rfc822(a.datePublished)}</pubDate>`,
        `      <category>${escapeHtml(a.clusterLabel)}</category>`,
        "    </item>",
      ].join("\n")
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>El&amp;Moi — Blog</title>",
    `    <link>${SITE_URL}/blog/</link>`,
    "    <description>Encadrer le temps d'écran des enfants : cadre légal, repères pratiques et parentalité numérique.</description>",
    "    <language>fr-FR</language>",
    `    <lastBuildDate>${rfc822(articles[0].dateModified)}</lastBuildDate>`,
    `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

async function writeRoute(template, route, { noindex = false, file } = {}) {
  const markup = await render(route.path);
  const canonical = canonicalUrl(route.path);

  const article = ARTICLES_BY_ROUTE[route.path] ?? null;
  const head = {
    title: route.title,
    description: route.description,
    canonical,
  };

  let html = applyHead(template, {
    ...head,
    noindex,
    article,
    ogImage: article?.ogImage,
    imageAlt: article?.imageAlt,
    // Pas de données structurées sur la 404 : elle est en noindex.
    jsonLd: noindex
      ? null
      : renderJsonLd(
          buildJsonLd({
            route,
            article,
            authors: AUTHORS,
            label: article?.h1 ?? route.title.split(" |")[0],
            // Les pages d'index reçoivent un CollectionPage listant leurs articles.
            indexArticles: INDEX_PAGES.some((p) => p.path === route.path)
              ? ARTICLES.filter((a) =>
                  INDEX_PAGES.find((p) => p.path === route.path).articles.includes(a.id)
                )
              : null,
          })
        ),
  });
  // La 404 n'a volontairement pas de canonique (voir applyHead).
  verifyHead(html, head, route.path, { canonical: !noindex });
  html = injectBody(html, markup);

  verifyAssets(html, route.path);
  verifyInternalLinks(html, route.path);

  const outFile =
    file ??
    (route.path === "/"
      ? path.join(DIST, "index.html")
      : path.join(DIST, route.path.replace(/^\//, ""), "index.html"));

  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, html, "utf8");

  return { outFile, bytes: Buffer.byteLength(html), markupBytes: markup.length };
}

// ─── Exécution ────────────────────────────────────────────────────────────────

const template = await readFile(path.join(DIST, "index.html"), "utf8");

if (template.includes('<div id="root">') && !template.includes('<div id="root"></div>')) {
  throw new Error(
    "dist/index.html semble déjà prérendu. Relance un `vite build` propre."
  );
}

console.log("\nPrérendu des routes :");

const sitemapEntries = [];

for (const route of ROUTES) {
  const { outFile, markupBytes } = await writeRoute(template, route);
  const relative = path.relative(ROOT, outFile);
  console.log(`  ✓ ${route.path.padEnd(20)} → ${relative} (${markupBytes} o de HTML)`);

  sitemapEntries.push({
    path: route.path,
    priority: route.priority,
    changefreq: route.changefreq,
    // Le dateModified du frontmatter fait foi (§6.4). Les routes statiques,
    // qui n'en ont pas, retombent sur la date du dernier commit du fichier
    // source — jamais sur la date de build.
    lastmod: route.lastmod ?? lastModified(route.source),
  });
}

// 404 : rendue comme fichier plat, servie par Netlify en vrai HTTP 404.
// Volontairement absente du sitemap, et en noindex.
const notFound = await writeRoute(template, NOT_FOUND_ROUTE, {
  noindex: true,
  file: path.join(DIST, "404.html"),
});
console.log(`  ✓ ${"404".padEnd(20)} → ${path.relative(ROOT, notFound.outFile)}`);

await writeFile(path.join(DIST, "sitemap.xml"), buildSitemap(sitemapEntries), "utf8");
console.log(`\n  ✓ sitemap.xml — ${sitemapEntries.length} URLs`);

// Flux RSS des articles de blog (clusters A et D).
const feedArticles = Object.values(ARTICLES_BY_ROUTE)
  .filter((a) => a.route.startsWith("/blog/"))
  .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
  .slice(0, 30);

if (feedArticles.length > 0) {
  await writeFile(path.join(DIST, "rss.xml"), buildRss(feedArticles), "utf8");
  console.log(`  ✓ rss.xml — ${feedArticles.length} article(s)`);
}

// Contrôle final : le HTML prérendu doit contenir du texte réel, pas une
// coquille vide. Volontairement générique — une assertion sur une expression
// de marque précise deviendrait fausse au premier changement de copy.
const home = await readFile(path.join(DIST, "index.html"), "utf8");
const homeBody = home.slice(home.indexOf("<body"));
const visibleText = homeBody
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<[^>]*>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

if (visibleText.length < 500) {
  throw new Error(
    `Page d'accueil : seulement ${visibleText.length} caractères de texte visible ` +
      "dans le HTML prérendu — le rendu a probablement échoué silencieusement."
  );
}

console.log(`  ✓ ${visibleText.length} caractères de texte visible sur l'accueil\n`);
