/**
 * npm run content:status — avancement éditorial.
 *
 * Croise le registre (ce qui est planifié) avec le disque (ce qui existe
 * vraiment), par cluster et par vague. Sert à décider quoi rédiger ensuite.
 */

import { pathToFileURL } from "node:url";
import { c, loadRegistry, loadArticles } from "./lib.mjs";

const BAR_WIDTH = 24;

function bar(done, total) {
  if (total === 0) return "";
  const filled = Math.round((done / total) * BAR_WIDTH);
  return `${c.green}${"█".repeat(filled)}${c.dim}${"░".repeat(BAR_WIDTH - filled)}${c.reset}`;
}

export async function status() {
  const registry = await loadRegistry();
  const { articles } = await loadArticles();
  const onDisk = new Map(articles.map((a) => [a.id, a.status]));

  const statusOf = (id) => onDisk.get(id) ?? "planned";

  console.log(`\n${c.bold}Avancement par cluster${c.reset}\n`);
  for (const [key, cluster] of Object.entries(registry.clusters)) {
    const entries = registry.articles.filter((a) => a.cluster === key);
    const published = entries.filter((a) => statusOf(a.id) === "published").length;
    const drafts = entries.filter((a) =>
      ["draft", "review"].includes(statusOf(a.id))
    ).length;

    console.log(
      `  ${c.bold}${key}${c.reset} ${cluster.label.padEnd(28)} ` +
        `${bar(published, entries.length)} ` +
        `${String(published).padStart(2)}/${String(entries.length).padEnd(3)}` +
        `${drafts ? ` ${c.yellow}+${drafts} en cours${c.reset}` : ""}`
    );
  }

  console.log(`\n${c.bold}Avancement par vague${c.reset}\n`);
  const waves = [...new Set(registry.articles.map((a) => a.wave))].sort();
  for (const wave of waves) {
    const entries = registry.articles.filter((a) => a.wave === wave);
    const published = entries.filter((a) => statusOf(a.id) === "published").length;
    console.log(
      `  ${wave}  ${bar(published, entries.length)} ` +
        `${String(published).padStart(2)}/${entries.length}`
    );
  }

  // Prochaines priorités : P1, vague la plus basse, non encore rédigées.
  const next = registry.articles
    .filter((a) => statusOf(a.id) === "planned" && a.priority === "P1")
    .sort((a, b) => a.wave.localeCompare(b.wave) || a.id.localeCompare(b.id))
    .slice(0, 8);

  if (next.length) {
    console.log(`\n${c.bold}À rédiger en priorité${c.reset} ${c.dim}(P1, vague la plus basse)${c.reset}\n`);
    for (const a of next) {
      console.log(
        `  ${a.wave}  ${a.id.padEnd(4)} ${a.route.padEnd(46)} ${c.dim}${a.keywordPrimary}${c.reset}`
      );
    }
  }

  const total = registry.articles.length;
  const done = registry.articles.filter((a) => statusOf(a.id) === "published").length;
  console.log(
    `\n${c.bold}Total${c.reset} ${done}/${total} publiés ` +
      `${c.dim}(${Math.round((done / total) * 100)} %)${c.reset}\n`
  );
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  await status();
}
