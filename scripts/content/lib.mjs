/**
 * Socle commun aux commandes content:* et seo:*.
 *
 * Lit le registre et les fichiers Markdown, valide le frontmatter, résout le
 * maillage interne et qualifie les liens sortants. Tout le reste (génération,
 * vérification, statut) s'appuie sur ces fonctions.
 */

import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

import { validateArticle, formatIssues } from "../../content/schema.mjs";
import { SITE_URL } from "../../content/seo.config.mjs";
import { qualifyRel, isInstitutional, isCommercial } from "../../src/lib/links.js";

export const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  ".."
);
export const CONTENT_DIR = path.join(ROOT, "content");

export const c = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
};

/** URL canonique : les routes prérendues sont servies avec un slash final. */
export function canonicalUrl(routePath) {
  return routePath === "/" ? `${SITE_URL}/` : `${SITE_URL}${routePath}/`;
}

export async function loadRegistry() {
  const raw = await readFile(path.join(CONTENT_DIR, "registry.json"), "utf8");
  const registry = JSON.parse(raw);
  registry.byId = new Map(registry.articles.map((a) => [a.id, a]));
  return registry;
}

export async function loadAuthors() {
  const raw = await readFile(path.join(CONTENT_DIR, "authors.json"), "utf8");
  return JSON.parse(raw).authors;
}

export { qualifyRel, isInstitutional, isCommercial };

/** Retire le frontmatter d'un Markdown brut (utilisé aussi côté client). */
export function stripFrontmatter(raw) {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}

/** Liste les fichiers .md de content/, hors dossiers techniques. */
export async function listContentFiles() {
  const dirs = ["blog", "comparatif", "guides", "lumen", "brand"];
  const files = [];
  for (const dir of dirs) {
    const abs = path.join(CONTENT_DIR, dir);
    if (!existsSync(abs)) continue;
    for (const name of await readdir(abs)) {
      if (name.endsWith(".md")) files.push(path.join(abs, name));
    }
  }
  return files.sort();
}

/**
 * Charge et valide tous les articles présents sur disque.
 * Retourne { articles, errors } — on ne jette pas ici pour que seo:check
 * puisse afficher l'ensemble des problèmes d'un coup.
 */
export async function loadArticles() {
  const articles = [];
  const errors = [];

  for (const file of await listContentFiles()) {
    const relative = path.relative(ROOT, file);
    const raw = await readFile(file, "utf8");
    const { data, content } = matter(raw);

    const parsed = validateArticle(data);
    if (!parsed.success) {
      errors.push({ file: relative, issues: formatIssues(parsed.error) });
      continue;
    }

    articles.push({
      ...parsed.data,
      file: relative,
      body: content.trim(),
      externalSources: parsed.data.externalSources.map((s) => ({
        ...s,
        ...qualifyRel(s.url),
      })),
    });
  }

  return { articles, errors };
}

/**
 * Résout les internalLinks d'un article contre le registre et les articles
 * publiés. Une cible non publiée n'est jamais rendue en lien : elle reste du
 * texte, pour ne pas produire de 404 en production.
 */
export function resolveInternalLinks(article, registry, publishedIds) {
  return article.internalLinks.map((link) => {
    const target = registry.byId.get(link.id);
    if (!target) {
      return { ...link, resolved: false, reason: "id absent du registre" };
    }
    const published = publishedIds.has(link.id);
    return {
      ...link,
      route: target.route,
      title: target.workingTitle,
      cluster: target.cluster,
      resolved: published,
      reason: published ? null : "cible non publiée",
    };
  });
}

/** Compte les liens entrants de chaque article — sert à repérer les orphelins. */
export function buildLinkGraph(articles) {
  const inbound = new Map();
  for (const a of articles) inbound.set(a.id, []);
  for (const a of articles) {
    for (const link of a.internalLinks) {
      if (!inbound.has(link.id)) inbound.set(link.id, []);
      inbound.get(link.id).push({ from: a.id, anchor: link.anchor });
    }
  }
  return inbound;
}

/** Extrait les titres Markdown pour le sommaire et le contrôle de hiérarchie. */
export function extractHeadings(markdown) {
  const headings = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const m = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (m) headings.push({ level: m[1].length, text: m[2].trim() });
  }
  return headings;
}

export const frenchDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
