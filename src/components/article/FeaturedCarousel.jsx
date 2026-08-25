import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { frenchDate, isoDateTime } from "../../lib/date";

/**
 * Carrousel des articles mis en avant.
 *
 * Défilement manuel uniquement — flèches, points, glissement tactile et
 * clavier. Rien ne bouge sans action du visiteur : un défilement automatique
 * fait rater du contenu à ceux qui lisent lentement, et complique la vie des
 * lecteurs d'écran.
 *
 * Toutes les diapositives sont **montées en permanence** et seulement
 * translatées : une diapositive rendue conditionnellement serait absente du
 * HTML prérendu, donc invisible pour les moteurs.
 */
export default function FeaturedCarousel({ articles, accents }) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(null);
  const count = articles.length;

  const go = useCallback(
    (next) => setIndex((current) => (next + count) % count),
    [count]
  );

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
  };

  // Le glissement tactile est la façon naturelle de parcourir un carrousel
  // sur mobile, où les flèches sont petites.
  const onTouchStart = (e) => (touchStart.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1));
    touchStart.current = null;
  };

  useEffect(() => {
    if (index >= count) setIndex(0);
  }, [count, index]);

  if (count === 0) return null;

  return (
    <section
      aria-roledescription="carrousel"
      aria-label="Articles à la une"
      className="relative"
      onKeyDown={onKeyDown}
    >
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {articles.map((article, i) => {
            const accent = accents[article.cluster] ?? accents.F;
            return (
              <div
                key={article.id}
                role="group"
                aria-roledescription="diapositive"
                aria-label={`${i + 1} sur ${count}`}
                aria-hidden={i !== index}
                className="w-full flex-shrink-0"
              >
                <Link
                  to={article.route}
                  tabIndex={i === index ? 0 : -1}
                  className="group grid md:grid-cols-2 items-stretch"
                >
                  <div className="relative aspect-[1200/630] md:aspect-auto md:h-full bg-slate-100 overflow-hidden">
                    <img
                      src={article.thumb}
                      alt=""
                      width="600"
                      height="315"
                      // La première diapositive est l'élément le plus visible
                      // au chargement : elle ne doit pas être différée.
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchpriority={i === 0 ? "high" : undefined}
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-7 sm:p-10">
                    <span
                      className={`self-start rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${accent.pill}`}
                    >
                      {article.clusterLabel}
                    </span>
                    <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900 leading-tight text-balance group-hover:text-primary-dark transition-colors">
                      {article.h1}
                    </h2>
                    <p className="mt-3 text-slate-500 leading-relaxed line-clamp-3">
                      {article.metaDescription}
                    </p>
                    <span className="mt-5 flex items-center gap-3 text-xs text-slate-400">
                      <span>{article.readingTime} min de lecture</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={isoDateTime(article.dateModified)}>
                        {frenchDate(article.dateModified)}
                      </time>
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Article précédent"
            className="absolute left-3 top-1/2 -translate-y-1/2 md:-left-5 w-11 h-11 rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-primary-dark hover:border-primary/40 transition-colors flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Article suivant"
            className="absolute right-3 top-1/2 -translate-y-1/2 md:-right-5 w-11 h-11 rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-primary-dark hover:border-primary/40 transition-colors flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="mt-5 flex justify-center gap-2">
            {articles.map((article, i) => (
              <button
                key={article.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Aller à l'article ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-primary" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
