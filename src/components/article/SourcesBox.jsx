import { frenchDate } from "../../lib/date";

/**
 * « Sources et références » en fin d'article.
 *
 * Le `rel` n'est pas laissé à l'auteur : il est calculé au build par
 * qualifyRel — institutionnel en dofollow, concurrent ou commercial en
 * nofollow. La date de consultation est affichée parce qu'une source en ligne
 * change, et qu'un lecteur doit savoir de quand date la vérification.
 */
export default function SourcesBox({ sources = [] }) {
  if (sources.length === 0) return null;

  return (
    <section
      aria-labelledby="sources-titre"
      className="mt-14 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <h2
        id="sources-titre"
        className="text-lg font-semibold text-slate-900 mb-4 mt-0"
      >
        Sources et références
      </h2>

      <ol className="space-y-4 text-sm">
        {sources.map((source, index) => (
          <li key={source.url} className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-very-light text-primary-dark text-xs font-semibold flex items-center justify-center"
            >
              {index + 1}
            </span>
            <div className="min-w-0">
              <a
                href={source.url}
                rel={source.rel ?? "nofollow noopener"}
                target={source.target ?? "_blank"}
                className="text-primary-dark hover:underline underline-offset-2 break-words"
              >
                {source.title}
              </a>
              <p className="text-slate-500 mt-0.5">
                {source.publisher}
                {source.accessedOn ? (
                  <> · consulté le {frenchDate(source.accessedOn)}</>
                ) : null}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
