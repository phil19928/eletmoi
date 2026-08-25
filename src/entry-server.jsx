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
              resolve(Buffer.concat(chunks).toString("utf8"));
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
