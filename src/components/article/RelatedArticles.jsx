import { Link } from "react-router-dom";

/**
 * Maillage interne sortant, en fin d'article.
 *
 * Deux règles issues du §4 du brief :
 *  - une cible non publiée n'est **jamais** rendue en lien : elle apparaît en
 *    texte grisé, pour ne pas produire de 404 en production ;
 *  - l'ancre décrit la page cible (« gérer le temps d'écran sur Android »),
 *    jamais « cliquez ici » — c'est l'ancre qui porte le signal.
 */
export default function RelatedArticles({ links = [], suggestions = [] }) {
  // Les liens explicites du frontmatter priment ; les suggestions du même
  // cluster complètent jusqu'à 5 cartes.
  const seen = new Set(links.map((l) => l.id));
  const items = [
    ...links,
    ...suggestions.filter((s) => !seen.has(s.id)),
  ].slice(0, 5);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="lies-titre" className="mt-14">
      <h2
        id="lies-titre"
        className="text-xl font-semibold text-slate-900 mb-5 mt-0"
      >
        À lire aussi
      </h2>

      <ul className="grid gap-3 sm:grid-cols-2 list-none pl-0">
        {items.map((item) => {
          const label = item.anchor ?? item.h1 ?? item.title;

          if (!item.resolved || !item.route) {
            return (
              <li
                key={item.id}
                className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4"
              >
                <span className="text-slate-400 text-sm">{label}</span>
                <span className="block text-xs text-slate-400 mt-1">
                  Article à paraître
                </span>
              </li>
            );
          }

          return (
            <li key={item.id}>
              <Link
                to={item.route}
                className="block h-full rounded-2xl border border-slate-200 bg-white p-4 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <span className="block font-medium text-slate-900">{label}</span>
                {item.clusterLabel ? (
                  <span className="block text-xs text-slate-400 mt-1">
                    {item.clusterLabel}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
