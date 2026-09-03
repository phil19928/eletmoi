/**
 * npm run content:ingest -- <fichier.md> [--id=C1] [--publish]
 *
 * Convertit un brouillon au format de rédaction (url / title / meta_description
 * / mots_cles) vers le frontmatter du pipeline, et le range au bon endroit.
 *
 * Ce que le script fait, parce que c'est mécanique :
 *   - retire le H1 du corps (il vient du frontmatter) et corrige les sauts de
 *     niveau de titre ;
 *   - supprime les sections de travail (« Notes de production », « JSON-LD ») ;
 *   - extrait « Questions fréquentes » vers le champ faq ;
 *   - dérive howToSteps des titres « Étape N : … » pour les guides ;
 *   - résout les liens internes annoncés en notes de production ;
 *   - propose des sources institutionnelles vérifiées selon le cluster.
 *
 * Ce qu'il ne fait pas, parce que c'est éditorial : écrire les sources exactes,
 * placer les liens dans le texte, choisir les ancres. Il les liste en rapport.
 *
 * Par défaut le résultat est en `draft` : rien ne part en production sans une
 * relecture. `--publish` bascule en `published`.
 */

import { readFile, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";

import { ROOT, c, canonicalUrl, loadRegistry, qualifyRel } from "./lib.mjs";
import { extractHeadings } from "../../src/lib/headings.js";

const TODAY = new Date().toISOString().slice(0, 10);

/**
 * Sources par défaut, toutes vérifiées comme répondant en HTTP 200.
 * Ce sont des points d'entrée institutionnels : la référence précise (article
 * de loi, étude datée) reste à ajouter à la main.
 */
const DEFAULT_SOURCES = {
  A: [
    { title: "Réseaux sociaux et protection des données", publisher: "CNIL", url: "https://www.cnil.fr/fr/reseaux-sociaux" },
    { title: "Protection des mineurs en ligne", publisher: "Arcom", url: "https://www.arcom.fr/" },
  ],
  B: [
    { title: "Google Family Link", publisher: "Google", url: "https://families.google/familylink/" },
    { title: "Temps d'écran sur iPhone et iPad", publisher: "Apple", url: "https://support.apple.com/fr-fr/HT201304" },
  ],
  C: [
    { title: "Temps d'écran sur iPhone et iPad", publisher: "Apple", url: "https://support.apple.com/fr-fr/HT201304" },
    { title: "Google Family Link", publisher: "Google", url: "https://families.google/familylink/" },
  ],
  D: [
    { title: "Santé des enfants et usages des écrans", publisher: "Santé publique France", url: "https://www.santepubliquefrance.fr/" },
    { title: "Accompagner les usages numériques", publisher: "jeprotegemonenfant.gouv.fr", url: "https://jeprotegemonenfant.gouv.fr/" },
  ],
  E: [
    { title: "Assistance aux victimes de cybermalveillance", publisher: "cybermalveillance.gouv.fr", url: "https://www.cybermalveillance.gouv.fr/" },
    { title: "Numéro national 3018", publisher: "e-Enfance / 3018", url: "https://www.3018.fr/" },
  ],
  F: [],
};

const INTENT = { A: "informational", B: "commercial", C: "informational", D: "informational", E: "informational", F: "transactional" };

/** Découpe le corps en sections de niveau 2. */
function sections(body) {
  const parts = [];
  let current = { title: null, lines: [] };
  for (const line of body.split("\n")) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) {
      parts.push(current);
      current = { title: m[1].trim(), lines: [] };
    } else current.lines.push(line);
  }
  parts.push(current);
  return parts;
}

/** « **Question ?**\nRéponse » → { q, a } */
function parseFaq(text) {
  const items = [];
  for (const m of text.matchAll(/^\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=\n\*\*|\n---|\s*$)/gm)) {
    const a = m[2].replace(/\s+/g, " ").trim();
    if (m[1].trim() && a) items.push({ q: m[1].trim(), a });
  }
  return items;
}

/** Titres « Étape 1 : … » → étapes du JSON-LD HowTo. */
function parseSteps(parts) {
  return parts
    .filter((p) => p.title && /^Étape\s*\d+\s*[:—-]/i.test(p.title))
    .map((p) => ({
      name: p.title.replace(/^Étape\s*\d+\s*[:—-]\s*/i, "").trim(),
      text:
        clampToSentence(
          p.lines
            .join(" ")
            .replace(/[*_`#>]/g, "")
            .replace(/\s+/g, " ")
            .trim(),
          300
        ) || "Voir le détail dans l'article.",
    }));
}

/**
 * Coupe à `max` sans laisser un mot à moitié : ces textes sont affichés à
 * l'écran (HowToSteps) et publiés dans le JSON-LD HowTo. Un `slice` brut a déjà
 * produit des étapes qui s'arrêtaient sur « À parti » ou « prenez une seconde
 * pou ». On préfère la dernière phrase complète, à défaut le dernier mot.
 */
function clampToSentence(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" ; "));
  if (sentence > max * 0.6) return cut.slice(0, sentence + 1).trim();
  const word = cut.lastIndexOf(" ");
  return (word > 0 ? cut.slice(0, word) : cut).trim() + "…";
}

const isWorkSection = (title) =>
  /^(Notes de production|JSON-LD)/i.test(title ?? "");

/**
 * Un brouillon arrive souvent avec des gabarits `{{date}}` / `{{auteur}}` dans
 * son frontmatter. Repris tels quels, ils produisent une date invalide et un
 * auteur inconnu, que zod rejette bien plus loin avec un message obscur. On
 * les traite comme absents : les valeurs par défaut de l'ingestion reprennent
 * alors la main.
 */
function withoutPlaceholders(data) {
  const clean = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string" && /\{\{\w+\}\}/.test(value)) continue;
    clean[key] = value;
  }
  return clean;
}

export async function ingest(file, { id, publish = false } = {}) {
  const registry = await loadRegistry();
  const parsed = matter(await readFile(file, "utf8"));
  const old = withoutPlaceholders(parsed.data);

  // L'id vient de l'argument, du frontmatter, ou de la route déclarée.
  const byRoute = new Map(registry.articles.map((a) => [a.route, a.id]));
  const articleId = id ?? old.id ?? byRoute.get(String(old.url ?? "").trim());
  if (!articleId) {
    throw new Error(
      `Impossible de déterminer l'id. Passez --id=XX, ou vérifiez que « ${old.url} » figure dans le registre.`
    );
  }

  const entry = registry.byId.get(articleId);
  if (!entry) throw new Error(`id « ${articleId} » absent de content/registry.json.`);

  // ── Corps ───────────────────────────────────────────────────────────────────
  let body = parsed.content.replace(/^\s*#\s+.+?\n/, "").trim();
  const parts = sections(body);

  const faqPart = parts.find((p) => /^Questions fréquentes/i.test(p.title ?? ""));
  const faq = old.faq ?? (faqPart ? parseFaq(faqPart.lines.join("\n")) : []);

  const notes = parts.find((p) => /^Notes de production/i.test(p.title ?? ""));
  const suggested = notes
    ? [...notes.lines.join("\n").matchAll(/`(\/[a-z0-9/-]+)`/g)].map((m) => m[1])
    : [];

  const howToSteps =
    entry.template === "guide" ? old.howToSteps ?? parseSteps(parts) : old.howToSteps ?? [];

  body = parts
    .filter(
      (p) => !p.title || (!isWorkSection(p.title) && !/^Questions fréquentes/i.test(p.title))
    )
    .map((p) => (p.title ? `## ${p.title}\n${p.lines.join("\n")}` : p.lines.join("\n")))
    .join("\n")
    .replace(/\{\{date\}\}/g, new Date(TODAY).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }))
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\n+---\s*$/, "")
    .trim();

  // ── Maillage ────────────────────────────────────────────────────────────────
  const titleOf = (x) =>
    registry.byId.get(x).workingTitle.replace(/\s*\(pilier[^)]*\)/, "").trim();

  const links = old.internalLinks ?? [];
  if (links.length === 0) {
    for (const route of suggested) {
      const target = byRoute.get(route);
      if (!target || target === articleId || links.some((l) => l.id === target)) continue;
      links.push({ id: target, anchor: titleOf(target), context: "body" });
    }
    // Garantit un lien vers le pilier du cluster et vers une page de conversion.
    const pillars = registry.clusters[entry.cluster].pillars.filter((x) => x !== articleId);
    if (pillars.length && !links.some((l) => pillars.includes(l.id))) {
      links.unshift({ id: pillars[0], anchor: titleOf(pillars[0]), context: "body" });
    }
    if (!links.some((l) => ["B1", "F1", "F2", "F3"].includes(l.id))) {
      links.push({ id: "F1", anchor: titleOf("F1"), context: "cta" });
    }
  }

  const keywords = String(old.mots_cles ?? "")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const data = {
    id: articleId,
    slug: entry.slug,
    cluster: entry.cluster,
    route: entry.route,
    status: publish ? "published" : old.status ?? "draft",
    template: old.template ?? entry.template,
    metaTitle: clampToSentence(String(old.metaTitle ?? old.title ?? ""), 60),
    metaDescription: clampToSentence(
      String(old.metaDescription ?? old.meta_description ?? ""),
      155
    ),
    h1: old.h1 ?? entry.workingTitle,
    keywordPrimary: old.keywordPrimary ?? keywords[0] ?? entry.keywordPrimary,
    keywordsSecondary: old.keywordsSecondary ?? keywords.slice(1),
    searchIntent: old.searchIntent ?? INTENT[entry.cluster],
    canonical: canonicalUrl(entry.route),
    noindex: old.noindex ?? false,
    datePublished: old.datePublished ?? TODAY,
    dateModified: TODAY,
    reviewCycle: old.reviewCycle ?? (entry.cluster === "A" ? "monthly" : "quarterly"),
    author: old.author ?? "philippe",
    internalLinks: links.slice(0, 5),
    externalSources: (old.externalSources ?? DEFAULT_SOURCES[entry.cluster] ?? []).map((s) => ({
      accessedOn: TODAY,
      ...s,
    })),
    faq,
    howToSteps,
    ...(old.comparisonTable ? { comparisonTable: old.comparisonTable } : {}),
    cta: old.cta ?? {
      label: "Télécharger El&Moi gratuitement",
      target: "stores",
      utm: `organic_${entry.cluster.toLowerCase()}_${entry.slug}`,
    },
    ogImage: old.ogImage ?? `/og/${entry.slug}.png`,
    imageAlt: old.imageAlt ?? `À RÉÉCRIRE — description de l'image sociale de « ${entry.workingTitle} »`,
  };

  const target = path.join(ROOT, "content", entry.dir, `${entry.slug}.md`);
  const overwriting = existsSync(target);
  await writeFile(target, matter.stringify(`\n${body}\n`, data), "utf8");

  const source = path.resolve(file);
  if (source !== target) await rm(source);

  // ── Rapport ─────────────────────────────────────────────────────────────────
  const headings = extractHeadings(body);
  const outbound = [...body.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => ({
    url: m[2],
    ...qualifyRel(m[2]),
  }));

  console.log(
    `\n${c.green}✓${c.reset} ${path.relative(ROOT, target)}` +
      `${overwriting ? ` ${c.yellow}(écrasé)${c.reset}` : ""}`
  );
  console.log(
    `  ${articleId} · ${body.split(/\s+/).length} mots · ` +
      `${headings.filter((h) => h.level === 2).length} H2 · ${faq.length} FAQ · ` +
      `${howToSteps.length} étapes · ${links.length} liens · statut ${c.bold}${data.status}${c.reset}`
  );

  const todo = [];
  const placeholders = [...body.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]);
  if (placeholders.length) {
    todo.push(
      `${placeholders.length} placeholder(s) {{${[...new Set(placeholders)].join("}}, {{")}}} dans le corps`
    );
  }
  if (data.imageAlt.startsWith("À RÉÉCRIRE")) todo.push("imageAlt");
  if (data.metaDescription.length < 140) todo.push(`metaDescription : ${data.metaDescription.length}/140`);
  if (!old.externalSources) todo.push("externalSources : sources par défaut, à préciser");

  if (outbound.length) {
    console.log(`\n  ${c.bold}Liens sortants du corps${c.reset}`);
    for (const l of outbound) {
      const tag = l.kind === "institutional" ? `${c.green}dofollow${c.reset}` : `${c.yellow}nofollow${c.reset}`;
      console.log(`    ${tag}  ${l.url}`);
    }
  }
  if (todo.length) {
    console.log(`\n  ${c.yellow}À compléter${c.reset}`);
    for (const t of todo) console.log(`    ${t}`);
  }
  console.log(
    `\n  Puis : ${c.bold}npm run seo:check${c.reset}` +
      `${data.status === "draft" ? `, passez status en « published »` : ""}, ` +
      `${c.bold}npm run content:build${c.reset}\n`
  );

  return target;
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const args = process.argv.slice(2);
  const file = args.find((a) => !a.startsWith("--"));
  if (!file) {
    console.error(
      `\n${c.red}Usage : npm run content:ingest -- <fichier.md> [--id=C1] [--publish]${c.reset}\n`
    );
    process.exit(1);
  }
  await ingest(file, {
    id: args.find((a) => a.startsWith("--id="))?.slice(5),
    publish: args.includes("--publish"),
  }).catch((e) => {
    console.error(`\n${c.red}${e.message}${c.reset}\n`);
    process.exit(1);
  });
}
