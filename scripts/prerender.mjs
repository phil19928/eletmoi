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
import { existsSync } from "node:fs";
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

function applyHead(html, { title, description, canonical, noindex = false }) {
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

  if (noindex) {
    out = out.replace(
      /<\/title>/i,
      '</title>\n  <meta name="robots" content="noindex" />'
    );
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
function verifyHead(html, { title, description, canonical }, routePath) {
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
      const loc = new URL(routePath, SITE_URL).href;
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

async function writeRoute(template, route, { noindex = false, file } = {}) {
  const markup = await render(route.path);
  const canonical = new URL(route.path, SITE_URL).href;

  const head = {
    title: route.title,
    description: route.description,
    canonical,
  };

  let html = applyHead(template, { ...head, noindex });
  verifyHead(html, head, route.path);
  html = injectBody(html, markup);

  verifyAssets(html, route.path);

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
    lastmod: lastModified(route.source),
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

// Contrôle final : le mot-clé principal doit être présent dans le HTML brut.
const home = await readFile(path.join(DIST, "index.html"), "utf8");
const bodyOnly = home.slice(home.indexOf("<body"));
if (!/contrôle parental/i.test(bodyOnly)) {
  throw new Error(
    "Le HTML prérendu de la page d'accueil ne contient pas « contrôle parental » " +
      "dans le <body> — le rendu a probablement échoué silencieusement."
  );
}

console.log("  ✓ contenu vérifié dans le <body> de la page d'accueil\n");
