import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import CookieBanner from "../components/CookieBanner";
import { frenchDate, isoDateTime } from "../lib/date";
import {
  ARTICLES_BY_ID,
  INDEX_PAGES,
  BLOG_CLUSTERS,
  AUTHORS,
} from "../content/manifest";

/**
 * Le blog, hub unique de tout le contenu éditorial.
 *
 * Cinq briques thématiques — une par cluster — puis une section par brique
 * listant ses articles. Concentrer les contenus au même endroit simplifie la
 * navigation et évite d'éparpiller le maillage interne sur plusieurs pages de
 * liste : c'est un seul point d'entrée à faire remonter, pas cinq.
 *
 * Les URLs des articles ne changent pas : elles restent sur /blog/,
 * /comparatif/, /guides/ et /lumen/.
 */

/** Une couleur par famille : le lecteur situe le type de contenu d'un coup d'œil. */
const ACCENTS = {
  primary: {
    pill: "bg-primary/10 text-primary-dark border-primary/20",
    brick: "hover:border-primary/40 hover:shadow-primary/5",
    dot: "bg-primary",
  },
  secondary: {
    pill: "bg-secondary/10 text-secondary-dark border-secondary/20",
    brick: "hover:border-secondary/40 hover:shadow-secondary/5",
    dot: "bg-secondary",
  },
  accent: {
    pill: "bg-accent/10 text-amber-700 border-accent/20",
    brick: "hover:border-accent/40 hover:shadow-accent/5",
    dot: "bg-accent",
  },
};

function ClusterBrick({ brick, count, index }) {
  const accent = ACCENTS[brick.accent] ?? ACCENTS.primary;

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.06 }}
    >
      <a
        href={`#${brick.anchor}`}
        className={`group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${accent.brick}`}
      >
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className={`w-2 h-2 rounded-full ${accent.dot}`} />
          <span className="font-semibold text-slate-900 leading-snug">
            {brick.label}
          </span>
        </span>
        <span className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">
          {brick.tagline}
        </span>
        <span className="mt-4 text-xs font-medium text-slate-400">
          {count === 0
            ? "Bientôt"
            : `${count} article${count > 1 ? "s" : ""}`}
        </span>
      </a>
    </motion.li>
  );
}

function ArticleCard({ article, accent, index }) {
  const author = AUTHORS[article.author];
  const styles = ACCENTS[accent] ?? ACCENTS.primary;

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.07 }}
    >
      <Link
        to={article.route}
        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
      >
        <span
          className={`self-start rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${styles.pill}`}
        >
          {article.clusterLabel}
        </span>

        <h3 className="mt-4 text-lg font-bold text-slate-900 leading-snug text-balance group-hover:text-primary-dark transition-colors">
          {article.h1}
        </h3>

        <p className="mt-3 text-sm text-slate-500 leading-relaxed flex-1">
          {article.metaDescription}
        </p>

        <span className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4 text-xs text-slate-400">
          {author?.avatar ? (
            <img
              src={author.avatar}
              alt=""
              width="24"
              height="24"
              loading="lazy"
              decoding="async"
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : null}
          <span className="text-slate-500">{author?.name}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime} min</span>
          <time dateTime={isoDateTime(article.dateModified)} className="ml-auto">
            {frenchDate(article.dateModified)}
          </time>
        </span>
      </Link>
    </motion.li>
  );
}

export default function IndexPage({ route }) {
  const page = INDEX_PAGES.find((p) => p.path === route);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const published = page.articles.map((id) => ARTICLES_BY_ID[id]).filter(Boolean);

  const byCluster = BLOG_CLUSTERS.map((brick) => ({
    ...brick,
    articles: published
      .filter((a) => a.cluster === brick.cluster)
      .sort((a, b) => b.datePublished.localeCompare(a.datePublished)),
  }));

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Navbar />

      <main className="flex-1">
        <header
          ref={headerRef}
          className="section-features-bg pt-28 pb-14 sm:pt-32 sm:pb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[1000px] mx-auto px-5 sm:px-8 text-center"
          >
            <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-slate-500">
              <Link to="/" className="hover:text-primary transition-colors">
                Accueil
              </Link>
              <span aria-hidden="true" className="mx-2 text-slate-300">
                /
              </span>
              <span aria-current="page" className="text-slate-700 font-medium">
                Blog
              </span>
            </nav>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
              Tout pour accompagner votre enfant en ligne
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {page.description}
            </p>

            {/* Les cinq briques : point d'entrée thématique du hub. */}
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 list-none pl-0 text-left">
              {byCluster.map((brick, index) => (
                <ClusterBrick
                  key={brick.cluster}
                  brick={brick}
                  count={brick.articles.length}
                  index={index}
                />
              ))}
            </ul>
          </motion.div>
        </header>

        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 py-14 sm:py-20 space-y-20">
          {byCluster.map((brick) => (
            <section
              key={brick.cluster}
              id={brick.anchor}
              aria-labelledby={`${brick.anchor}-titre`}
              className="scroll-mt-24"
            >
              <div className="flex items-baseline justify-between gap-4 mb-6">
                <h2
                  id={`${brick.anchor}-titre`}
                  className="text-2xl sm:text-3xl font-bold text-slate-900"
                >
                  {brick.label}
                </h2>
                <span className="text-sm text-slate-400 whitespace-nowrap">
                  {brick.articles.length || "—"}
                </span>
              </div>

              {brick.articles.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-400">
                  Les premiers articles de cette thématique arrivent bientôt.
                </p>
              ) : (
                <ul className="grid gap-5 sm:grid-cols-2 auto-rows-fr list-none pl-0">
                  {brick.articles.map((article, index) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      accent={brick.accent}
                      index={index}
                    />
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
