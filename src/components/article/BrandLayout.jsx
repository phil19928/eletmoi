import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Navbar from "../Navbar";
import Footer from "../../sections/Footer";
import CookieBanner from "../CookieBanner";
import { articleComponents } from "../markdownComponents";

import FaqBlock from "./FaqBlock";
import StoreCta from "./StoreCta";

/**
 * Gabarit des pages produit (/smartloop, /lumen, /tarifs, /a-propos).
 *
 * Volontairement différent du gabarit d'article. Une page produit n'a pas à
 * afficher une date de publication, un auteur, un sommaire ni un bloc
 * « Sources et références » : ce sont des marqueurs de contenu éditorial, et
 * ils donnaient à ces pages l'allure d'un billet de blog.
 *
 * Ce qui reste est ce qui sert la décision : la promesse, le contenu, les
 * questions fréquentes, et le téléchargement.
 */

/** Fond d'en-tête par page, repris des sections de l'accueil. */
const HEADERS = {
  "/smartloop": "section-smartloop-bg",
  "/lumen": "section-lumen-bg",
  "/tarifs": "section-features-bg",
};

/** Navigation entre pages produit, en pied de contenu. */
const SIBLINGS = [
  { route: "/smartloop", label: "La Smartloop", hint: "Comment le temps d'apprentissage débloque du temps libre" },
  { route: "/lumen", label: "Lumen", hint: "La cybersécurité en format court, par âge" },
  { route: "/tarifs", label: "Tarifs", hint: "Formule Essentiel gratuite et formule Famille" },
  { route: "/a-propos", label: "Qui sommes-nous", hint: "Notre méthode et nos choix" },
];

export default function BrandLayout({ article, body }) {
  const headerClass = HEADERS[article.route] ?? "section-features-bg";
  const others = SIBLINGS.filter((s) => s.route !== article.route);

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* En-tête : même langage visuel que les sections de l'accueil */}
        <header className={`${headerClass} pt-28 pb-14 sm:pt-32 sm:pb-20`}>
          <div className="max-w-[760px] mx-auto px-5 sm:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-slate-900 leading-[1.15] text-balance">
              {article.h1}
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {article.metaDescription}
            </p>
          </div>
        </header>

        <article className="max-w-[760px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <ReactMarkdown components={articleComponents} remarkPlugins={[remarkGfm]}>
            {body}
          </ReactMarkdown>

          {article.faq?.length ? <FaqBlock items={article.faq} /> : null}

          <StoreCta
            label={article.cta?.label}
            campaign={article.cta?.utm ?? "organic_brand"}
            position="page-end"
          />

          <nav aria-label="Autres pages" className="mt-14">
            <h2 className="text-xl font-semibold text-slate-900 mb-5 mt-0">
              Continuer la visite
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 list-none pl-0">
              {others.map((page) => (
                <li key={page.route}>
                  <Link
                    to={page.route}
                    className="block h-full rounded-2xl border border-slate-200 bg-white p-4 hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <span className="block font-medium text-slate-900">
                      {page.label}
                    </span>
                    <span className="block text-sm text-slate-500 mt-1">
                      {page.hint}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
