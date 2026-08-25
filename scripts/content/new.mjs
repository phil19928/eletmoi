/**
 * npm run content:new -- --id=B2
 *
 * Échafaude le fichier Markdown d'un article à partir du registre. Le
 * frontmatter est pré-rempli avec ce que le registre sait déjà ; tout ce qui
 * demande un choix éditorial est marqué « À RÉÉCRIRE » et reste en statut
 * draft, donc exclu du build.
 */

import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { ROOT, c, canonicalUrl, loadRegistry } from "./lib.mjs";

const today = () => new Date().toISOString().slice(0, 10);

/** Description de remplissage, calibrée dans la fourchette 140–155. */
function placeholderDescription(entry) {
  const base = `À RÉÉCRIRE — ${entry.workingTitle}. `;
  const filler =
    "Décrivez ici la promesse de la page en une phrase claire, orientée parent.";
  let text = (base + filler).slice(0, 155);
  while (text.length < 140) text += " ";
  return text.trimEnd().padEnd(140, ".");
}

const yamlList = (items, indent = "  ") =>
  items.length ? items.map((i) => `${indent}- ${i}`).join("\n") : `${indent}[]`;

function frontmatter(entry) {
  const title = entry.workingTitle.replace(/\s*\(pilier[^)]*\)/, "").trim();
  const metaTitle = `${title} | El&Moi`.slice(0, 60);

  return `---
# --- Identité
id: "${entry.id}"
slug: "${entry.slug}"
cluster: "${entry.cluster}"
route: "${entry.route}"
status: "draft"
template: "${entry.template}"

# --- SEO
metaTitle: "${metaTitle}"
metaDescription: "${placeholderDescription(entry)}"
h1: "${title}"
keywordPrimary: "${entry.keywordPrimary}"
keywordsSecondary: []
searchIntent: "${entry.cluster === "B" ? "commercial" : entry.cluster === "F" ? "transactional" : "informational"}"
canonical: "${canonicalUrl(entry.route)}"
noindex: false

# --- Dates (obligatoires, affichées à l'écran et dans le JSON-LD)
datePublished: "${today()}"
dateModified: "${today()}"
reviewCycle: "quarterly"

# --- Auteur (obligatoire — E-E-A-T)
author: "philippe"

# --- Maillage interne (minimum 3, dont 1 pilier de cluster et 1 page de conversion)
internalLinks:
  - { id: "TODO", anchor: "À RÉÉCRIRE — ancre descriptive", context: "body" }
  - { id: "TODO", anchor: "À RÉÉCRIRE — ancre descriptive", context: "body" }
  - { id: "F1", anchor: "le Smartloop", context: "cta" }

# --- Sources externes (minimum 2${
    ["A", "D", "E"].includes(entry.cluster) ? ", dont 1 institutionnelle" : ""
  })
externalSources:
  - title: "À RÉÉCRIRE — titre exact de la source"
    publisher: "À RÉÉCRIRE"
    url: "https://www.cnil.fr/"
    accessedOn: "${today()}"
  - title: "À RÉÉCRIRE — titre exact de la source"
    publisher: "À RÉÉCRIRE"
    url: "https://www.service-public.fr/"
    accessedOn: "${today()}"

# --- Blocs optionnels
faq: []
${
  entry.template === "comparison"
    ? `comparisonTable:
  competitors: ["À RÉÉCRIRE"]
  pillars: ["Éducatif (Smartloop)", "Vie privée (RGPD)", "Autonomie", "Configuration"]
  rows:
    - pillar: "Éducatif (Smartloop)"
      eletmoi: "À RÉÉCRIRE"
      others: { "À RÉÉCRIRE": "À RÉÉCRIRE" }
`
    : ""
}${
    entry.template === "guide"
      ? `howToSteps:
  - name: "À RÉÉCRIRE — intitulé de l'étape"
    text: "À RÉÉCRIRE — action concrète attendue du parent."
`
      : "howToSteps: []\n"
  }cta:
  label: "Télécharger El&Moi gratuitement"
  target: "stores"
  utm: "organic_${entry.cluster.toLowerCase()}_${entry.slug}"

# --- Médias
ogImage: "/og/${entry.slug}.png"
imageAlt: "À RÉÉCRIRE — description de l'image sociale, 10 caractères minimum"
---

## À RÉÉCRIRE — premier H2

Le corps commence en H2 : le H1 vient du frontmatter, il ne doit pas être
répété ici.

## À RÉÉCRIRE — deuxième H2

Contenu.
`;
}

export async function createArticle(id) {
  const registry = await loadRegistry();
  const entry = registry.byId.get(id);

  if (!entry) {
    throw new Error(
      `id « ${id} » absent du registre. Ajoutez-le à content/registry.json avant de rédiger.`
    );
  }

  const file = path.join(ROOT, "content", entry.dir, `${entry.slug}.md`);
  if (existsSync(file)) {
    throw new Error(`${path.relative(ROOT, file)} existe déjà.`);
  }

  await writeFile(file, frontmatter(entry), "utf8");

  console.log(`\n${c.green}✓${c.reset} ${path.relative(ROOT, file)}`);
  console.log(`  ${c.dim}${entry.workingTitle}${c.reset}`);
  console.log(`  ${c.dim}Statut draft : exclu du build tant qu'il n'est pas publié.${c.reset}`);
  console.log(`\n  Prochaine étape : remplacer les « À RÉÉCRIRE », puis ${c.bold}npm run seo:check${c.reset}\n`);

  return file;
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const arg = process.argv.find((a) => a.startsWith("--id="));
  if (!arg) {
    console.error(`\n${c.red}Usage : npm run content:new -- --id=B2${c.reset}\n`);
    process.exit(1);
  }
  await createArticle(arg.slice("--id=".length)).catch((e) => {
    console.error(`\n${c.red}${e.message}${c.reset}\n`);
    process.exit(1);
  });
}
