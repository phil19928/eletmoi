import { tocHeadings } from "../../lib/headings";

/**
 * Sommaire construit depuis les H2/H3 du Markdown.
 *
 * Les ancres viennent de `slugifyHeading`, la même fonction qui pose les `id`
 * sur les titres rendus — un sommaire ne peut donc pas pointer dans le vide.
 * Rendu en <nav> pour être annoncé comme tel par les lecteurs d'écran.
 */
export default function TableOfContents({ markdown, minHeadings = 3 }) {
  const headings = tocHeadings(markdown);

  // Sous trois titres, un sommaire encombre plus qu'il n'aide.
  if (headings.length < minHeadings) return null;

  return (
    <nav
      aria-labelledby="sommaire-titre"
      className="my-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6"
    >
      <p
        id="sommaire-titre"
        className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3"
      >
        Sommaire
      </p>
      <ol className="space-y-1.5 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${h.id}`}
              className="text-slate-600 hover:text-primary-dark hover:underline underline-offset-2 transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
