import SiteLink from "../SiteLink";

/**
 * Encart auteur — signal E-E-A-T.
 *
 * Le balisage Person correspondant est injecté au prérendu (dans le graphe
 * Article), pas dupliqué ici : ce composant ne porte que l'affichage.
 * Les données viennent de content/authors.json via le manifeste, jamais
 * écrites en dur.
 */
export default function AuthorBox({ author, reviewer = null }) {
  if (!author) return null;

  return (
    <aside className="mt-14 rounded-2xl border border-slate-200 bg-primary-very-light/30 p-6">
      <div className="flex items-start gap-4">
        {author.avatar ? (
          <img
            src={author.avatar}
            srcSet={
              author.avatarLarge
                ? `${author.avatar} 1x, ${author.avatarLarge} 2x`
                : undefined
            }
            alt={`Portrait de ${author.name}`}
            width="56"
            height="56"
            loading="lazy"
            decoding="async"
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
          />
        ) : (
          <span
            aria-hidden="true"
            className="w-14 h-14 rounded-full bg-primary/15 text-primary-dark flex items-center justify-center text-lg font-semibold flex-shrink-0"
          >
            {author.name.slice(0, 1)}
          </span>
        )}

        <div className="min-w-0">
          <p className="font-semibold text-slate-900">{author.name}</p>
          {author.role ? (
            <p className="text-sm text-primary-dark">{author.role}</p>
          ) : null}
          {author.bio ? (
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {author.bio}
            </p>
          ) : null}

          {reviewer ? (
            <p className="mt-3 text-sm text-slate-500">
              Relu par{" "}
              <span className="text-slate-700 font-medium">{reviewer.name}</span>
              {reviewer.role ? ` — ${reviewer.role}` : null}
            </p>
          ) : null}

          <SiteLink
            to={author.url ?? "/a-propos"}
            className="mt-3 inline-block text-sm text-primary-dark hover:underline underline-offset-2"
          >
            Qui sommes-nous et comment nous testons →
          </SiteLink>
        </div>
      </div>
    </aside>
  );
}
