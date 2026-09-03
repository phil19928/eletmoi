import { useMemo, useRef, useState } from "react";
import SiteLink from "../components/SiteLink";
import { indexLabel } from "../lib/breadcrumbs";
import { motion, useInView } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import CookieBanner from "../components/CookieBanner";
import FeaturedCarousel from "../components/article/FeaturedCarousel";
import { frenchDate, isoDateTime } from "../lib/date";
import {
  ARTICLES_BY_ID,
  INDEX_PAGES,
  BLOG_CLUSTERS,
  AUTHORS,
} from "../content/manifest";

/**
 * Le blog, hub unique de tout le contenu du site — articles et pages de marque.
 *
 * Trois niveaux de lecture : un carrousel des articles à la une, une barre de
 * filtres par thématique, puis la grille complète. Le filtre est purement
 * visuel — tous les articles restent montés dans le DOM, donc présents dans le
 * HTML prérendu quel que soit le filtre actif.
 */

/** Une couleur par famille, reprise de la charte du site. */
const ACCENTS = {
  A: { pill: "bg-secondary/10 text-secondary-dark border-secondary/20", chip: "bg-secondary text-white", dot: "bg-secondary" },
  B: { pill: "bg-accent/10 text-amber-700 border-accent/20", chip: "bg-accent text-white", dot: "bg-accent" },
  C: { pill: "bg-primary/10 text-primary-dark border-primary/20", chip: "bg-primary text-white", dot: "bg-primary" },
  D: { pill: "bg-primary/10 text-primary-dark border-primary/20", chip: "bg-primary text-white", dot: "bg-primary" },
  E: { pill: "bg-secondary/10 text-secondary-dark border-secondary/20", chip: "bg-secondary text-white", dot: "bg-secondary" },
  F: { pill: "bg-slate-100 text-slate-600 border-slate-200", chip: "bg-slate-700 text-white", dot: "bg-slate-400" },
};

function ArticleCard({ article, index }) {
  const author = AUTHORS[article.author];
  const accent = ACCENTS[article.cluster] ?? ACCENTS.F;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.04 }}
    >
      <SiteLink
        to={article.route}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
      >
        {/* Bandeau de couleur en tête de carte : il remplace la vignette
            comme repère visuel de la thématique. */}
        <span aria-hidden="true" className={`h-1 w-full ${accent.dot}`} />

        <div className="flex flex-1 flex-col p-6">
          <span
            className={`self-start rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${accent.pill}`}
          >
            {article.clusterLabel}
          </span>

          <h3 className="mt-4 text-lg font-bold text-slate-900 leading-snug text-balance group-hover:text-primary-dark transition-colors">
            {article.h1}
          </h3>

          <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
            {article.metaDescription}
          </p>

          <span className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs text-slate-400">
            {author?.avatar ? (
              <img src={author.avatar} alt="" width="20" height="20" loading="lazy" className="w-5 h-5 rounded-full object-cover" />
            ) : null}
            <span className="text-slate-500">{author?.name}</span>
            <time dateTime={isoDateTime(article.dateModified)} className="ml-auto">
              {frenchDate(article.dateModified)}
            </time>
          </span>
        </div>
      </SiteLink>
    </motion.li>
  );
}

export default function IndexPage({ route }) {
  const page = INDEX_PAGES.find((p) => p.path === route);
  const [filter, setFilter] = useState("all");
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  const articles = useMemo(
    () =>
      page.articles
        .map((id) => ARTICLES_BY_ID[id])
        .filter(Boolean)
        .sort((a, b) => b.datePublished.localeCompare(a.datePublished)),
    [page]
  );

  // À la une : les piliers d'abord, puis les articles prioritaires. Quatre au
  // maximum — au-delà, personne ne fait défiler jusqu'au bout.
  //
  // Les pages de marque en sont écartées : elles ont leur place dans la grille
  // et dans les filtres, mais mettre /tarifs « à la une » d'un hub de contenu
  // ferait passer une page produit pour un article.
  const featured = useMemo(
    () =>
      articles
        .filter((a) => a.cluster !== "F")
        .sort(
          (a, b) =>
            Number(b.isPillar) - Number(a.isPillar) ||
            (a.priority ?? "P3").localeCompare(b.priority ?? "P3") ||
            b.dateModified.localeCompare(a.dateModified)
        )
        .slice(0, 4),
    [articles]
  );

  const counts = useMemo(() => {
    const map = { all: articles.length };
    for (const a of articles) map[a.cluster] = (map[a.cluster] ?? 0) + 1;
    return map;
  }, [articles]);

  const visible =
    filter === "all" ? articles : articles.filter((a) => a.cluster === filter);

  const chips = [
    { key: "all", label: "Tous", accent: ACCENTS.F },
    ...BLOG_CLUSTERS.filter((b) => counts[b.cluster]).map((b) => ({
      key: b.cluster,
      label: b.label,
      accent: ACCENTS[b.cluster] ?? ACCENTS.F,
    })),
  ];

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Navbar />

      <main className="flex-1">
        <header className="section-features-bg pt-28 pb-10 sm:pt-32 sm:pb-12">
          {/* Centré, comme le carrousel juste en dessous : aligné à gauche,
              le titre paraissait collé au bord sur les écrans larges. */}
          <div className="max-w-[1080px] mx-auto px-5 sm:px-8 text-center">
            <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-slate-500">
              <SiteLink to="/" className="hover:text-primary transition-colors">
                Accueil
              </SiteLink>
              <span aria-hidden="true" className="mx-2 text-slate-300">/</span>
              <span aria-current="page" className="text-slate-700 font-medium">
                {indexLabel(route)}
              </span>
            </nav>

            <h1 className="mx-auto max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
              Tout pour accompagner votre enfant en ligne
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
              {page.description}
            </p>
          </div>
        </header>

        {/* À la une — chevauche le bas de l'en-tête dégradé. */}
        <div className="section-features-bg pb-14 sm:pb-16">
          <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
            <FeaturedCarousel articles={featured} accents={ACCENTS} />
          </div>
        </div>

        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {chips.map((chip) => {
              const active = filter === chip.key;
              return (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => setFilter(chip.key)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    active
                      ? `${chip.accent.chip} border-transparent shadow-sm`
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {chip.label}
                  <span className={`ml-2 text-xs ${active ? "opacity-70" : "text-slate-400"}`}>
                    {counts[chip.key] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          <ul
            ref={gridRef}
            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr list-none pl-0 transition-opacity duration-300 ${
              gridInView ? "opacity-100" : "opacity-0"
            }`}
          >
            {visible.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </ul>

          {visible.length === 0 ? (
            <p className="text-slate-400 text-center py-10">
              Aucun article dans cette thématique pour le moment.
            </p>
          ) : null}
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
