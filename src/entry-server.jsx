import { Writable } from "node:stream";
import { StaticRouter } from "react-router";
import { renderToPipeableStream } from "react-dom/server";
import { AppRoutes } from "./App";

/**
 * Rend une route en HTML statique.
 *
 * renderToPipeableStream plutôt que renderToString : les pages légales passent
 * par React.lazy, et renderToString n'attend pas les frontières Suspense — il
 * n'émettrait que le fallback vide, soit précisément le contenu qu'on cherche
 * à rendre indexable. `onAllReady` attend que tout soit résolu.
 */
export function render(url) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let failed = false;

    const { pipe, abort } = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>,
      {
        onAllReady() {
          if (failed) return;
          const sink = new Writable({
            write(chunk, _encoding, callback) {
              chunks.push(Buffer.from(chunk));
              callback();
            },
            final(callback) {
              // Le tampon de renderToPipeableStream fait 2048 octets et il est
              // pré-rempli de zéros. Quand un caractère multi-octets tombe à
              // cheval sur la fin du tampon, l'octet de queue non réécrit est
              // émis tel quel : un \0 se glisse alors au milieu du texte
              // (constaté sur « Données & Vie privée », à l'offset 2047 d'un
              // tampon). Invisible en relecture, mais bien présent dans le HTML
              // livré. On le retire ici : aucun \0 n'a de sens dans du HTML.
              const html = Buffer.concat(chunks).toString("utf8");
              resolve(html.replace(/\0/g, ""));
              callback();
            },
          });
          pipe(sink);
        },
        onError(error) {
          failed = true;
          reject(error);
        },
      }
    );

    // Filet de sécurité : sans ça, une frontière Suspense qui ne se résout
    // jamais ferait tourner le build indéfiniment.
    const timeout = setTimeout(() => {
      failed = true;
      abort();
      reject(new Error(`Délai de rendu dépassé pour ${url}`));
    }, 20_000);

    const clear = () => clearTimeout(timeout);
    Promise.resolve().then(clear, clear);
  });
}
