/**
 * npm run content:links — carte du maillage interne.
 *
 * Trois questions auxquelles ce script répond :
 *   - quels articles publiés n'ont aucun lien entrant (orphelins) ?
 *   - quels liens pointent vers un id inexistant ?
 *   - quels liens visent une cible pas encore publiée ?
 *
 * Un orphelin est un échec : le §8 interdit de publier un article sans lien
 * entrant. Google le découvrirait par le sitemap, mais rien ne lui dirait
 * qu'il compte.
 */

import { pathToFileURL } from "node:url";
import { c, loadRegistry, loadArticles, buildLinkGraph } from "./lib.mjs";

export async function links() {
  const registry = await loadRegistry();
  const { articles } = await loadArticles();
  const published = articles.filter((a) => a.status === "published");
  const publishedIds = new Set(published.map((a) => a.id));

  const inbound = buildLinkGraph(published);

  // Certains liens ne viennent pas du frontmatter mais du gabarit : AuthorBox
  // et TransparencyNotice pointent vers /a-propos depuis chaque article. Les
  // ignorer ferait remonter cette page comme orpheline à tort.
  const STRUCTURAL = { "/a-propos": "AuthorBox + TransparencyNotice" };
  for (const article of published) {
    const via = STRUCTURAL[article.route];
    if (via && inbound.has(article.id)) {
      for (const other of published) {
        if (other.id !== article.id) {
          inbound.get(article.id).push({ from: other.id, anchor: `(${via})` });
        }
      }
    }
  }

  const orphans = [];
  const broken = [];
  const pending = [];

  for (const article of published) {
    if ((inbound.get(article.id) ?? []).length === 0) {
      orphans.push(article);
    }
    for (const link of article.internalLinks) {
      if (!registry.byId.has(link.id)) {
        broken.push({ from: article.id, to: link.id });
      } else if (!publishedIds.has(link.id)) {
        pending.push({ from: article.id, to: link.id, route: registry.byId.get(link.id).route });
      }
    }
  }

  console.log(`\n${c.bold}Maillage interne${c.reset} — ${published.length} article(s) publié(s)\n`);

  if (published.length === 0) {
    console.log(`  ${c.dim}Aucun article publié pour le moment.${c.reset}\n`);
    return { orphans, broken, pending };
  }

  console.log(`  ${c.bold}Liens entrants${c.reset}`);
  for (const article of published) {
    const count = (inbound.get(article.id) ?? []).length;
    const color = count === 0 ? c.red : count < 2 ? c.yellow : c.green;
    console.log(
      `    ${color}${String(count).padStart(2)}${c.reset} ← ${article.id.padEnd(4)} ${article.route}`
    );
  }

  if (broken.length) {
    console.log(`\n  ${c.red}Liens vers un id inexistant${c.reset}`);
    for (const b of broken) console.log(`    ${b.from} → ${b.to}`);
  }

  if (pending.length) {
    console.log(`\n  ${c.yellow}Cibles non publiées${c.reset} ${c.dim}(rendues en texte simple)${c.reset}`);
    for (const p of pending) console.log(`    ${p.from} → ${p.to.padEnd(4)} ${p.route}`);
  }

  if (orphans.length) {
    console.log(`\n  ${c.red}Orphelins — aucun lien entrant${c.reset}`);
    for (const o of orphans) console.log(`    ${o.id.padEnd(4)} ${o.route}`);
    console.log(
      `\n  ${c.dim}Ajoutez un internalLinks vers ces articles depuis un article publié.${c.reset}`
    );
  } else {
    console.log(`\n  ${c.green}Aucun orphelin.${c.reset}`);
  }

  console.log("");
  return { orphans, broken, pending };
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const { orphans, broken } = await links();
  process.exit(orphans.length + broken.length > 0 ? 1 : 0);
}
