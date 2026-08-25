/**
 * npm run seo:ping — signale les URLs nouvelles ou modifiées.
 *
 * IndexNow uniquement, et c'est délibéré : Google a fermé son endpoint de ping
 * sitemap en juin 2023 (« /ping?sitemap= » ne fait plus rien), et son Indexing
 * API reste officiellement réservée aux types JobPosting et BroadcastEvent.
 * Coder un appel vers Google reviendrait à faire échouer une requête en
 * silence en croyant agir.
 *
 * Pour Google, ce qui compte est le <lastmod> du sitemap — déjà renseigné
 * depuis le frontmatter — et Search Console.
 *
 * IndexNow est en revanche réellement consommé par Bing, Yandex et Seznam,
 * qui alimentent aussi plusieurs assistants IA.
 *
 *   --dry   affiche ce qui serait soumis, sans rien envoyer
 */

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { randomUUID } from "node:crypto";

import { ROOT, c, canonicalUrl, loadArticles } from "./lib.mjs";
import { SITE_URL } from "../../content/seo.config.mjs";

const HOST = new URL(SITE_URL).hostname;
const KEY_FILE = path.join(ROOT, "public", "indexnow-key.txt");
const ENDPOINT = "https://api.indexnow.org/IndexNow";

/**
 * La clé doit être servie en clair à la racine du domaine : c'est ainsi que
 * le moteur vérifie que l'émetteur contrôle bien le site.
 */
async function ensureKey() {
  if (existsSync(KEY_FILE)) {
    return (await readFile(KEY_FILE, "utf8")).trim();
  }
  const key = randomUUID().replace(/-/g, "");
  await writeFile(KEY_FILE, `${key}\n`, "utf8");
  console.log(
    `${c.yellow}Clé IndexNow générée${c.reset} → public/indexnow-key.txt\n` +
      `  Elle sera servie sur ${SITE_URL}/indexnow-key.txt au prochain déploiement.\n` +
      `  ${c.dim}Le ping ne fonctionnera qu'une fois ce fichier en ligne.${c.reset}\n`
  );
  return key;
}

export async function ping({ dry = false } = {}) {
  const key = await ensureKey();
  const { articles } = await loadArticles();

  const urls = articles
    .filter((a) => a.status === "published" && !a.noindex)
    .map((a) => canonicalUrl(a.route));

  if (urls.length === 0) {
    console.log(`\n  ${c.dim}Aucune URL publiée à soumettre.${c.reset}\n`);
    return { submitted: 0 };
  }

  console.log(`\n${c.bold}IndexNow${c.reset} — ${urls.length} URL(s)`);
  for (const url of urls) console.log(`  ${url}`);

  if (dry) {
    console.log(`\n  ${c.dim}--dry : rien n'a été envoyé.${c.reset}\n`);
    return { submitted: 0, urls };
  }

  const keyUrl = `${SITE_URL}/indexnow-key.txt`;
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key, keyLocation: keyUrl, urlList: urls }),
  });

  // 200 = accepté, 202 = accepté mais clé pas encore vérifiée.
  if (response.ok || response.status === 202) {
    console.log(`\n  ${c.green}✓ soumis${c.reset} (HTTP ${response.status})\n`);
  } else {
    console.log(
      `\n  ${c.red}✗ refusé (HTTP ${response.status})${c.reset} — ` +
        `vérifiez que ${keyUrl} est bien accessible.\n`
    );
  }

  return { submitted: urls.length, status: response.status };
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  await ping({ dry: process.argv.includes("--dry") });
}
