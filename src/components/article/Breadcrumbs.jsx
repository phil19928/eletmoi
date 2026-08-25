import { Link } from "react-router-dom";

/**
 * Fil d'Ariane visible. Son pendant structuré (BreadcrumbList) est injecté au
 * prérendu par scripts/prerender.mjs — les deux sont construits depuis la même
 * liste d'items pour rester cohérents.
 */
export default function Breadcrumbs({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.route ?? item.label} className="flex items-center gap-2">
              {last ? (
                <span
                  aria-current="page"
                  title={item.full ?? item.label}
                  className="text-slate-700 font-medium"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    to={item.route}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className="text-slate-300">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
