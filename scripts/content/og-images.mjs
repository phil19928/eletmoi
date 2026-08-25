/**
 * npm run content:og — génère une image sociale 1200×630 par article publié.
 *
 * Rendu d'un gabarit HTML capturé par Chrome headless. Volontairement exécuté
 * en local, le résultat étant commité dans public/og/ : dépendre de Chrome au
 * build Netlify ferait échouer un déploiement le jour où il n'est pas dans
 * l'image de build, alors que ces fichiers sont de simples assets statiques
 * qui n'ont pas à être reconstruits à chaque mise en ligne.
 *
 *   --force   régénère même les images déjà présentes
 */

import { writeFile, mkdir, readFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawn, execFileSync } from "node:child_process";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";

import { ROOT, c } from "./lib.mjs";

const OUT_DIR = path.join(ROOT, "public", "og");
const PORT = 9333;

/** Emplacements usuels de Chrome, par système. */
const CHROME_PATHS = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
];

const findChrome = () => CHROME_PATHS.find((p) => existsSync(p));

/** Dégradé par cluster, repris des fonds de section du site. */
const THEMES = {
  A: { from: "#EAF2FB", via: "#F7FBF9", accent: "#4F7FAE", label: "Loi & actualité" },
  B: { from: "#FEF6E7", via: "#FBFDFC", accent: "#B45309", label: "Comparatif" },
  C: { from: "#EDF3F0", via: "#F8FBF9", accent: "#4D7A65", label: "Guide pratique" },
  D: { from: "#EDF3F0", via: "#F7FBF9", accent: "#4D7A65", label: "Parentalité numérique" },
  E: { from: "#EAF2FB", via: "#FBFDFC", accent: "#4F7FAE", label: "Lumen" },
  F: { from: "#EDF3F0", via: "#EAF2FB", accent: "#4D7A65", label: "El&Moi" },
};

const escapeHtml = (v) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Le titre est rendu à une taille qui dépend de sa longueur, pour tenir. */
function fontSize(title) {
  if (title.length > 90) return 46;
  if (title.length > 65) return 54;
  if (title.length > 45) return 62;
  return 70;
}

function template(article, logoDataUri) {
  const theme = THEMES[article.cluster] ?? THEMES.F;
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;font-family:Roboto,system-ui,sans-serif;
       background:linear-gradient(135deg,${theme.from} 0%,${theme.via} 55%,#ffffff 100%);
       display:flex;flex-direction:column;justify-content:space-between;padding:64px 72px;
       position:relative;overflow:hidden}
  .blob{position:absolute;border-radius:50%;filter:blur(80px);opacity:.5}
  .b1{width:520px;height:520px;background:${theme.accent}22;top:-180px;right:-120px}
  .b2{width:420px;height:420px;background:${theme.accent}18;bottom:-200px;left:-100px}
  .top{display:flex;align-items:center;justify-content:space-between;position:relative;z-index:1}
  .brand{display:flex;align-items:center;gap:16px}
  .brand img{width:56px;height:56px}
  .brand span{font-size:34px;font-weight:800;color:#0f172a;letter-spacing:-.5px}
  .brand em{color:${theme.accent};font-style:normal}
  .pill{font-size:19px;font-weight:700;text-transform:uppercase;letter-spacing:1.4px;
        color:${theme.accent};background:#ffffffcc;border:1px solid ${theme.accent}33;
        padding:11px 22px;border-radius:999px}
  h1{position:relative;z-index:1;font-size:${fontSize(article.h1)}px;font-weight:800;
     color:#0f172a;line-height:1.14;letter-spacing:-1.4px;max-width:1010px;text-wrap:balance}
  .foot{display:flex;align-items:center;gap:18px;position:relative;z-index:1;
        font-size:23px;color:#64748b;font-weight:500}
  .dot{width:7px;height:7px;border-radius:50%;background:#cbd5e1}
</style></head><body>
  <div class="blob b1"></div><div class="blob b2"></div>
  <div class="top">
    <div class="brand"><img src="${logoDataUri}" alt=""><span>El<em>&amp;</em>Moi</span></div>
    <div class="pill">${escapeHtml(theme.label)}</div>
  </div>
  <h1>${escapeHtml(article.h1)}</h1>
  <div class="foot"><span>eletmoi.fr</span><span class="dot"></span><span>${article.readingTime} min de lecture</span></div>
</body></html>`;
}

/**
 * Gabarit de vignette pour les cartes du blog.
 *
 * Volontairement **sans le titre** : contrairement à une image sociale, qui
 * apparaît seule dans un fil, une vignette est collée au titre de la carte.
 * L'y répéter donne un doublon disgracieux. Il ne reste donc que l'identité
 * visuelle : dégradé du cluster, formes, marque.
 */
function thumbTemplate(article, logoDataUri) {
  const theme = THEMES[article.cluster] ?? THEMES.F;
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;position:relative;overflow:hidden;
       background:linear-gradient(135deg,${theme.accent}26 0%,${theme.from} 45%,#ffffff 100%)}
  .ring{position:absolute;border-radius:50%;border:3px solid ${theme.accent}26}
  .r1{width:900px;height:900px;top:-330px;right:-260px}
  .r2{width:640px;height:640px;bottom:-300px;left:-180px}
  .r3{width:380px;height:380px;top:120px;left:120px;border-style:dashed;opacity:.7}
  .blob{position:absolute;border-radius:50%;filter:blur(70px)}
  .b1{width:520px;height:520px;background:${theme.accent}3d;top:-160px;right:-100px}
  .b2{width:420px;height:420px;background:${theme.accent}2b;bottom:-180px;left:-80px}
  .mascot{position:absolute;right:96px;bottom:64px;width:300px;height:300px;
          opacity:.96;filter:drop-shadow(0 24px 48px ${theme.accent}40)}
  .bar{position:absolute;left:0;top:0;bottom:0;width:14px;background:${theme.accent}}
</style></head><body>
  <div class="blob b1"></div><div class="blob b2"></div>
  <div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div>
  <div class="bar"></div>
  <img class="mascot" src="${logoDataUri}" alt="">
</body></html>`;
}

/** Pilote Chrome via le protocole DevTools — aucune dépendance npm. */
async function withChrome(fn) {
  const chrome = findChrome();
  if (!chrome) {
    throw new Error(
      "Chrome introuvable. Installez Google Chrome, ou fournissez les images à la main dans public/og/."
    );
  }
  const profile = path.join(os.tmpdir(), `eletmoi-og-${Date.now()}`);
  const proc = spawn(
    chrome,
    ["--headless=new", "--disable-gpu", `--remote-debugging-port=${PORT}`,
     `--user-data-dir=${profile}`, "--no-first-run", "about:blank"],
    { stdio: "ignore" }
  );

  try {
    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 250));
      try {
        await fetch(`http://127.0.0.1:${PORT}/json/version`);
        break;
      } catch {}
    }
    return await fn();
  } finally {
    proc.kill();
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  }
}

async function capture(html, outFile) {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/new?url=about:blank`, { method: "PUT" });
  const target = await res.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);

  let id = 0;
  const pending = new Map();
  const call = (method, params = {}) =>
    new Promise((resolve) => {
      const msgId = ++id;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m.result);
      pending.delete(m.id);
    }
  };
  await new Promise((r) => (ws.onopen = r));

  await call("Emulation.setDeviceMetricsOverride", {
    width: 1200, height: 630, deviceScaleFactor: 1, mobile: false,
  });
  await call("Page.enable");
  await call("Page.navigate", {
    url: "data:text/html;charset=utf-8," + encodeURIComponent(html),
  });
  // Laisse le temps à la police distante de se charger avant la capture.
  await new Promise((r) => setTimeout(r, 1400));

  const { data } = await call("Page.captureScreenshot", { format: "png" });
  await writeFile(outFile, Buffer.from(data, "base64"));
  ws.close();
}

export async function generate({ force = false } = {}) {
  const { ARTICLES } = await import(
    pathToFileURL(path.join(ROOT, "src", "content", "manifest.js")).href
  );
  await mkdir(OUT_DIR, { recursive: true });

  const logo = await readFile(path.join(ROOT, "public", "favicon-192.png"));
  const logoDataUri = `data:image/png;base64,${logo.toString("base64")}`;

  const todo = ARTICLES.filter(
    (a) => force || !existsSync(path.join(ROOT, "public", a.ogImage.replace(/^\//, "")))
  );

  if (todo.length > 0) console.log(`\n${c.bold}Images sociales${c.reset} — ${todo.length} à générer\n`);

  if (todo.length > 0) await withChrome(async () => {
    for (const article of todo) {
      const out = path.join(ROOT, "public", article.ogImage.replace(/^\//, ""));
      await mkdir(path.dirname(out), { recursive: true });
      await capture(template(article, logoDataUri), out);
      console.log(`  ✓ ${article.ogImage.padEnd(42)} ${article.h1.slice(0, 44)}`);
    }
  });

  // Vignettes des cartes. Une image sociale pèse ~285 Ko : en afficher douze
  // sur une page de liste coûterait 3,3 Mo. Rendu séparé, puis JPEG 600 px.
  const thumbs = path.join(OUT_DIR, "thumbs");
  await mkdir(thumbs, { recursive: true });
  const todoThumbs = ARTICLES.filter(
    (a) => force || !existsSync(path.join(thumbs, path.basename(a.ogImage).replace(/\.png$/, ".jpg")))
  );

  if (todoThumbs.length > 0) {
    console.log(`\n${c.bold}Vignettes${c.reset} — ${todoThumbs.length} à générer\n`);
    await withChrome(async () => {
      for (const article of todoThumbs) {
        const raw = path.join(thumbs, path.basename(article.ogImage));
        const out = raw.replace(/\.png$/, ".jpg");
        await capture(thumbTemplate(article, logoDataUri), raw);
        try {
          execFileSync("sips", ["-Z", "600", "-s", "format", "jpeg",
            "-s", "formatOptions", "76", raw, "--out", out], { stdio: "ignore" });
          await rm(raw, { force: true });
        } catch {
          console.log(`  ${c.yellow}sips absent : ${path.basename(out)} reste en PNG${c.reset}`);
        }
        console.log(`  ✓ ${path.basename(out)}`);
      }
    });
  }

  console.log(
    `\n  ${c.dim}Commitez public/og/ : ces fichiers ne sont pas régénérés au build.${c.reset}\n`
  );
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  await generate({ force: process.argv.includes("--force") }).catch((e) => {
    console.error(`\n${c.red}${e.message}${c.reset}\n`);
    process.exit(1);
  });
}
