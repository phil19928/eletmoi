import SiteLink from "../SiteLink";

/**
 * Maillage interne sortant, en fin d'article.
 *
 * Deux règles issues du §4 du brief :
 *  - une cible non publiée n'est **jamais** rendue : ni en lien, qui ferait un
 *    404, ni en encart grisé « à paraître », qui occupait une carte pour
 *    annoncer un article que personne ne peut lire. Elle est simplement
 *    ignorée, et une vraie page prend sa place. Rien n'est à retirer à la main
 *    quand l'article paraît : il réapparaît de lui-même au prochain build ;
 *  - l'ancre décrit la page cible (« gérer le temps d'écran sur Android »),
 *    jamais « cliquez ici » — c'est l'ancre qui porte le signal.
 */
export default function RelatedArticles({ links = [], suggestions = [] }) {
  // Les liens explicites du frontmatter priment, mais seuls ceux dont la cible
  // est publiée : le registre décrit 62 articles, une douzaine existe. Les
  // suggestions, elles, ne viennent que du manifeste — donc toujours publiées.
  const seen = new Set(links.map((l) => l.id));
  const items = [
    ...links.filter((l) => l.resolved && l.route),
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

          return (
            <li key={item.id}>
              <SiteLink
                to={item.route}
                className="block h-full rounded-2xl border border-slate-200 bg-white p-4 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <span className="block font-medium text-slate-900">{label}</span>
                {item.clusterLabel ? (
                  <span className="block text-xs text-slate-400 mt-1">
                    {item.clusterLabel}
                  </span>
                ) : null}
              </SiteLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
