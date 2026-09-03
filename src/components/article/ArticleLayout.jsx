import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Navbar from "../Navbar";
import Footer from "../../sections/Footer";
import CookieBanner from "../CookieBanner";
import { articleComponents } from "../markdownComponents";
import { sectionCrumb } from "../../lib/breadcrumbs";

import Breadcrumbs from "./Breadcrumbs";
import ArticleMeta from "./ArticleMeta";
import TableOfContents from "./TableOfContents";
import UpdateNotice from "./UpdateNotice";
import TransparencyNotice from "./TransparencyNotice";
import ComparisonTable from "./ComparisonTable";
import HowToSteps from "./HowToSteps";
import FaqBlock from "./FaqBlock";
import StoreCta from "./StoreCta";
import SourcesBox from "./SourcesBox";
import AuthorBox from "./AuthorBox";
import RelatedArticles from "./RelatedArticles";

function breadcrumbItems(article) {
  const items = [{ label: "Accueil", route: "/" }];

  // Les pages de marque (/smartloop, /tarifs…) sont à la racine, et toutes les
  // racines de cluster ne sont pas des pages : `sectionCrumb` ne rend un
  // maillon que s'il mène quelque part.
  const section = sectionCrumb(article.route);
  if (section) items.push(section);

  // Le dernier maillon reprend le H1, qui peut être très long. On le coupe
  // proprement au mot : un fil d'Ariane sert à situer, pas à tout redire.
  const current =
    article.h1.length > 58
      ? `${article.h1.slice(0, 58).replace(/[\s,:—-]+\S*$/, "")}…`
      : article.h1;

  items.push({ label: current, full: article.h1 });
  return items;
}

/**
 * Gabarit commun à tous les articles.
 *
 * L'ordre des blocs suit la lecture : contexte (fil d'Ariane, méta), promesse
 * (H1), navigation (sommaire), contenu, puis les éléments de preuve (sources,
 * auteur) avant le maillage sortant. Le CTA magasin est placé avant les
 * sources : c'est le dernier moment où le lecteur est encore dans le sujet.
 */
export default function ArticleLayout({
  article,
  body,
  author = null,
  reviewer = null,
  suggestions = [],
}) {
  const isComparison = article.cluster === "B";
  const isNews = article.cluster === "A";

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* En-tête sur fond dégradé : même langage visuel que l'accueil, pour
            que le blog ne ressemble pas à un site à part. */}
        <header className="section-features-bg pt-28 pb-10 sm:pt-32 sm:pb-12">
          <div className="max-w-[760px] mx-auto px-5 sm:px-8">
            <Breadcrumbs items={breadcrumbItems(article)} />

            <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark mb-3">
              {article.clusterLabel}
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-slate-900 leading-[1.15] text-balance mb-4">
              {article.h1}
            </h1>

            <ArticleMeta
              datePublished={article.datePublished}
              dateModified={article.dateModified}
              author={author}
            />
          </div>
        </header>

        <article className="max-w-[760px] mx-auto px-5 sm:px-8 py-10 sm:py-14">
          {isComparison ? (
            <TransparencyNotice verifiedOn={article.factsVerifiedOn ?? article.dateModified} />
          ) : null}

          {isNews ? <UpdateNotice date={article.dateModified} /> : null}

          <TableOfContents markdown={body} />

          <div className="mt-10">
            <ReactMarkdown
              components={articleComponents}
              remarkPlugins={[remarkGfm]}
            >
              {body}
            </ReactMarkdown>
          </div>

          {article.comparisonTable ? (
            <ComparisonTable table={article.comparisonTable} />
          ) : null}

          {article.howToSteps?.length ? (
            <HowToSteps steps={article.howToSteps} />
          ) : null}

          {article.faq?.length ? <FaqBlock items={article.faq} /> : null}

          <StoreCta
            label={article.cta?.label}
            campaign={article.cta?.utm ?? `organic_${article.cluster.toLowerCase()}`}
            position="article-end"
          />

          <SourcesBox sources={article.externalSources} />
          <AuthorBox author={author} reviewer={reviewer} />
          <RelatedArticles
            links={article.internalLinks}
            suggestions={suggestions}
          />
        </article>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
