/**
 * npm run seo:check — validation article par article.
 *
 * Bloque le build. Le frontmatter est déjà typé par content/schema.mjs ; ce
 * script ajoute tout ce qu'un schéma ne peut pas exprimer : cohérence du
 * maillage avec le registre, hiérarchie des titres, règles de marque, sources
 * institutionnelles, liens réellement joignables.
 *
 *   --links   vérifie aussi les liens externes en HTTP (lent, réseau requis)
 */

import { pathToFileURL } from "node:url";
import {
  c,
  loadRegistry,
  loadArticles,
  loadAuthors,
  isInstitutional,
} from "./lib.mjs";
import { extractHeadings } from "../../src/lib/headings.js";
import {
  LIMITS,
  BANNED_PHRASES,
  CLUSTERS_REQUIRING_INSTITUTIONAL,
} from "../../content/seo.config.mjs";

const CONVERSION_ROUTES = ["/comparatif", "/tarifs", "/smartloop", "/lumen"];

/**
 * Un « chiffre » qui mérite une source : pourcentage, ou volume chiffré.
 *
 * « ans » est volontairement exclu : dans des articles sur l'enfance, un âge
 * apparaît à chaque paragraphe et n'est pas une statistique. L'alerte serait
 * si bruyante qu'elle ne serait plus lue.
 */
const NUMBER_CLAIM =
  /(\d+(?:[.,]\d+)?\s?%)|(\b\d{2,}\s?(?:heures?|minutes?|enfants?|parents?|familles?|élèves?|adolescents?)\b)/gi;

function checkHeadings(article, report) {
  const headings = extractHeadings(article.body);

  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length > 0) {
    report.error(
      `${h1s.length} H1 dans le corps : le H1 vient du frontmatter, ` +
        `le corps doit commencer en H2 (« ${h1s[0].text} »)`
    );
  }

  let previous = 1;
  for (const h of headings) {
    if (h.level > previous + 1) {
      report.error(
        `saut de niveau H${previous} → H${h.level} sur « ${h.text} »`
      );
    }
    previous = h.level;
  }

  const ids = headings.map((h) => h.id);
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicates.length) {
    report.error(
      `ancres dupliquées (${[...new Set(duplicates)].join(", ")}) : ` +
        `deux titres produisent le même identifiant`
    );
  }
}

function checkImages(article, report) {
  // ![](src) ou ![   ](src) → alternative absente
  for (const match of article.body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    if (!match[1].trim()) {
      report.error(`image sans alt : ${match[2]}`);
    }
  }
  if (!article.imageAlt?.trim()) {
    report.error("imageAlt (image sociale) vide");
  }
}

function checkBannedPhrases(article, report) {
  for (const rule of BANNED_PHRASES) {
    if (rule.scope !== "content") continue;

    const pattern = new RegExp(rule.phrase, "gi");
    const headings = extractHeadings(article.body);

    // Titres : un seul écart toléré, et seulement s'il reprend la question
    // du lecteur (donc formulé de façon interrogative).
    const offendingHeadings = headings.filter((h) => pattern.test(h.text));
    pattern.lastIndex = 0;

    const questionHeadings = offendingHeadings.filter((h) =>
      h.text.trim().endsWith("?")
    );

    const raise = rule.severity === "error" ? report.error : report.warn;

    if (offendingHeadings.length > (rule.allowedInHeadings ?? 0)) {
      raise(
        `« ${rule.phrase} » dans ${offendingHeadings.length} titres ` +
          `(maximum ${rule.allowedInHeadings})`
      );
    }
    if (rule.headingMustBeQuestion && questionHeadings.length < offendingHeadings.length) {
      raise(
        `« ${rule.phrase} » dans un titre non interrogatif : ` +
          `l'exception ne vaut que pour un titre reprenant la question du lecteur`
      );
    }

    // Corps hors titres : aucune tolérance.
    const bodyWithoutHeadings = article.body
      .split("\n")
      .filter((l) => !/^#{1,6}\s/.test(l))
      .join("\n");
    const inBody = [...bodyWithoutHeadings.matchAll(pattern)];
    if (inBody.length) {
      raise(
        `« ${rule.phrase} » ${inBody.length}× dans le corps de texte ` +
          `(autorisé uniquement en ${rule.allowedFields.slice(0, 4).join(", ")}…)`
      );
    }
  }
}

function checkInternalLinks(article, registry, publishedIds, report) {
  const cluster = registry.clusters[article.cluster];

  for (const link of article.internalLinks) {
    const target = registry.byId.get(link.id);
    if (!target) {
      report.error(`lien interne vers « ${link.id} » : id absent du registre`);
      continue;
    }
    if (!publishedIds.has(link.id)) {
      report.warn(
        `lien interne « ${link.id} » (${target.route}) : cible non publiée, ` +
          `rendue en texte simple`
      );
    }
  }

  const targets = article.internalLinks.map((l) => l.id);

  // ≥ 1 lien vers le pilier du cluster, quand le cluster en déclare un.
  if (cluster.pillars.length > 0) {
    const linksToPillar = targets.some(
      (id) => cluster.pillars.includes(id) && id !== article.id
    );
    const isSelfPillar = cluster.pillars.includes(article.id);
    if (!linksToPillar && !isSelfPillar) {
      report.error(
        `aucun lien vers le pilier du cluster ${article.cluster} ` +
          `(${cluster.pillars.join(" ou ")})`
      );
    }
  } else {
    report.warn(
      `cluster ${article.cluster} sans pilier déclaré : ` +
        `règle « 1 lien vers le pilier » non vérifiable`
    );
  }

  // ≥ 1 lien vers une page de conversion.
  const linksToConversion = article.internalLinks.some((l) => {
    const t = registry.byId.get(l.id);
    return t && CONVERSION_ROUTES.includes(t.route);
  });
  if (!linksToConversion && !CONVERSION_ROUTES.includes(article.route)) {
    report.error(
      `aucun lien vers une page de conversion (${CONVERSION_ROUTES.join(", ")})`
    );
  }
}

/**
 * Les internalLinks du frontmatter n'alimentent que le bloc « À lire aussi ».
 * Ce qui transmet vraiment le contexte sémantique, c'est le lien posé dans une
 * phrase, avec une ancre descriptive (§8.4 du brief). Sans ce contrôle,
 * l'oubli passe inaperçu : le maillage a l'air complet alors qu'aucun lien
 * n'existe dans le texte.
 */
function checkInTextLinks(article, report) {
  const inText = [...article.body.matchAll(/\[([^\]]+)\]\((\/[a-z][^)]*)\)/g)];

  if (inText.length === 0) {
    report.error(
      "aucun lien interne dans le corps du texte — les internalLinks ne " +
        "produisent que le bloc « À lire aussi »"
    );
  } else if (inText.length < 2) {
    report.warn(`${inText.length} seul lien interne dans le corps du texte (2 minimum conseillé)`);
  }

  for (const [, anchor] of inText) {
    if (/^(ici|cliquez ici|lire la suite|en savoir plus|ce lien)$/i.test(anchor.trim())) {
      report.error(`ancre non descriptive dans le corps : « ${anchor} »`);
    }
  }
}

function checkExternalSources(article, report) {
  if (
    CLUSTERS_REQUIRING_INSTITUTIONAL.includes(article.cluster) &&
    !article.externalSources.some((s) => isInstitutional(s.url))
  ) {
    report.error(
      `cluster ${article.cluster} : au moins une source institutionnelle est ` +
        `exigée (CNIL, Arcom, Legifrance, Santé publique France…)`
    );
  }

  const seen = new Set();
  for (const source of article.externalSources) {
    if (seen.has(source.url)) report.warn(`source en double : ${source.url}`);
    seen.add(source.url);
  }
}

function checkUnsourcedNumbers(article, report) {
  const claims = [...article.body.matchAll(NUMBER_CLAIM)].map((m) => m[0].trim());
  if (claims.length === 0) return;

  // Heuristique : un chiffre est considéré sourcé si un lien externe figure
  // dans le même paragraphe.
  const paragraphs = article.body.split(/\n\s*\n/);
  const unsourced = new Set();

  for (const paragraph of paragraphs) {
    const found = [...paragraph.matchAll(NUMBER_CLAIM)].map((m) => m[0].trim());
    if (found.length === 0) continue;
    if (/\]\(https?:\/\//.test(paragraph)) continue;
    found.forEach((f) => unsourced.add(f));
  }

  if (unsourced.size > 0) {
    report.warn(
      `chiffre(s) sans source dans le paragraphe : ${[...unsourced].slice(0, 5).join(", ")}` +
        `${unsourced.size > 5 ? "…" : ""} — vérifier qu'ils renvoient à externalSources`
    );
  }
}

async function checkHttp(article, report) {
  for (const source of article.externalSources) {
    try {
      const headers = { "user-agent": "Mozilla/5.0 (compatible; eletmoi-seo-check)" };
      let res = await fetch(source.url, { method: "HEAD", redirect: "follow", headers });
      // Certains serveurs refusent HEAD : on retente en GET avant de conclure.
      if (res.status === 405 || res.status === 403) {
        res = await fetch(source.url, { method: "GET", redirect: "follow", headers });
      }
      if (res.status === 403 || res.status === 429) {
        // Legifrance et education.gouv.fr bloquent les requêtes automatisées.
        // Un 403 renvoyé à un script ne dit rien de la validité du lien.
        report.warn(
          `lien externe non vérifiable automatiquement (HTTP ${res.status}, ` +
            `protection anti-bot) : ${source.url} — à contrôler à la main`
        );
      } else if (!res.ok) {
        report.error(`lien externe HTTP ${res.status} : ${source.url}`);
      }
    } catch (e) {
      report.error(`lien externe injoignable : ${source.url} (${e.message})`);
    }
  }
}

export async function check({ http = false } = {}) {
  const registry = await loadRegistry();
  const authors = await loadAuthors();
  const { articles, errors: schemaErrors } = await loadArticles();

  let errorCount = 0;
  let warnCount = 0;

  for (const e of schemaErrors) {
    console.log(`\n${c.red}✗ ${e.file}${c.reset}`);
    for (const issue of e.issues) console.log(`    ${c.red}erreur${c.reset}  ${issue}`);
    errorCount += e.issues.length;
  }

  const publishedIds = new Set(
    articles.filter((a) => a.status === "published").map((a) => a.id)
  );

  for (const article of articles) {
    const messages = [];
    const report = {
      error: (m) => messages.push(["error", m]),
      warn: (m) => messages.push(["warn", m]),
    };

    const registryEntry = registry.byId.get(article.id);
    if (!registryEntry) {
      report.error(`id « ${article.id} » absent de content/registry.json`);
    } else if (registryEntry.route !== article.route) {
      report.error(
        `route « ${article.route} » ≠ registre « ${registryEntry.route} » — ` +
          `toute URL publiée doit rester figée`
      );
    }

    if (!authors[article.author]) {
      report.error(`auteur « ${article.author} » absent de content/authors.json`);
    }
    if (article.metaTitle.length > LIMITS.metaTitleMax) {
      report.error(`metaTitle : ${article.metaTitle.length} caractères`);
    }

    checkHeadings(article, report);
    checkImages(article, report);
    checkBannedPhrases(article, report);
    checkInternalLinks(article, registry, publishedIds, report);
    checkInTextLinks(article, report);
    checkExternalSources(article, report);
    checkUnsourcedNumbers(article, report);
    if (http) await checkHttp(article, report);

    const errs = messages.filter(([k]) => k === "error");
    const warns = messages.filter(([k]) => k === "warn");
    errorCount += errs.length;
    warnCount += warns.length;

    if (messages.length === 0) {
      console.log(`${c.green}✓${c.reset} ${article.id.padEnd(4)} ${article.route}`);
    } else {
      console.log(
        `\n${errs.length ? c.red + "✗" : c.yellow + "!"}${c.reset} ` +
          `${article.id.padEnd(4)} ${article.route} ${c.dim}(${article.file})${c.reset}`
      );
      for (const [kind, message] of messages) {
        const tag = kind === "error" ? `${c.red}erreur${c.reset}` : `${c.yellow}alerte${c.reset}`;
        console.log(`    ${tag}  ${message}`);
      }
    }
  }

  const total = articles.length + schemaErrors.length;
  console.log(
    `\n${c.bold}${total} article(s) analysé(s)${c.reset} — ` +
      `${errorCount ? c.red : c.green}${errorCount} erreur(s)${c.reset}, ` +
      `${warnCount ? c.yellow : c.dim}${warnCount} alerte(s)${c.reset}\n`
  );

  return { errorCount, warnCount };
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const http = process.argv.includes("--links");
  const { errorCount } = await check({ http });
  process.exit(errorCount > 0 ? 1 : 0);
}
