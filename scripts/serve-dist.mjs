/**
 * Sert dist/ comme le fait Netlify, pour vérifier un build en local.
 *
 * Ne pas utiliser `vite preview` sur ce projet : il ne résout pas les index de
 * sous-répertoires et retombe sur index.html pour toute route imbriquée. Il
 * sert donc la page d'accueil sur /cgv, ce qui provoque de fausses erreurs
 * d'hydratation React et masque ce que Netlify servira réellement.
 *
 * Règles reproduites : fichier réel > <route>/index.html > 404.html en HTTP 404.
 */

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
  ".json": "application/json",
};

const isFile = async (p) => {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
};

const send = (res, status, body, file) =>
  res
    .writeHead(status, {
      "content-type": TYPES[path.extname(file)] ?? "application/octet-stream",
      // Mêmes en-têtes de cache que netlify.toml, pour vérifier au bon endroit.
      "cache-control": file.includes(`${path.sep}assets${path.sep}`)
        ? "public, max-age=31536000, immutable"
        : "public, max-age=0, must-revalidate",
    })
    .end(body);

createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  const relative = path.normalize(url).replace(/^(\.\.[/\\])+/, "");

  // Netlify sert <route>/index.html sur <route>/ et redirige <route> en 301.
  if (!url.endsWith("/") && (await isFile(path.join(DIST, relative, "index.html")))) {
    return res.writeHead(301, { location: `${url}/` }).end();
  }

  for (const file of [
    path.join(DIST, relative),
    path.join(DIST, relative, "index.html"),
  ]) {
    if (await isFile(file)) return send(res, 200, await readFile(file), file);
  }

  const notFound = path.join(DIST, "404.html");
  if (await isFile(notFound)) {
    return send(res, 404, await readFile(notFound), notFound);
  }
  res.writeHead(404, { "content-type": "text/plain" }).end("Not found");
}).listen(PORT, () => {
  console.log(`\n  dist/ servi comme sur Netlify → http://localhost:${PORT}\n`);
});
