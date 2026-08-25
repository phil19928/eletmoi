import ArticleLayout from "../components/article/ArticleLayout";
import BrandLayout from "../components/article/BrandLayout";
import { AUTHORS, ARTICLES, ARTICLES_BY_ROUTE } from "../content/manifest";

/**
 * Page d'article.
 *
 * Le corps Markdown est passé en prop : c'est App.jsx qui le charge, via un
 * import dynamique par article (un chunk chacun). Ce composant reste donc
 * purement synchrone — indispensable pour que le prérendu produise du HTML
 * complet et que l'hydratation ne rejoue pas le rendu.
 */
export default function ArticlePage({ route, body }) {
  const article = ARTICLES_BY_ROUTE[route];

  // Les pages produit ont leur propre gabarit : ni date, ni auteur, ni
  // sommaire, ni sources. Voir BrandLayout pour le détail.
  if (article.template === "brand") {
    return <BrandLayout article={article} body={body} />;
  }

  const author = AUTHORS[article.author] ?? null;
  const reviewer = article.reviewedBy ? AUTHORS[article.reviewedBy] ?? null : null;

  // Complète le maillage sortant avec des articles du même cluster, sans
  // jamais proposer l'article courant ni doublonner un lien déjà explicite.
  const explicit = new Set(article.internalLinks.map((l) => l.id));
  const suggestions = ARTICLES.filter(
    (a) =>
      a.cluster === article.cluster &&
      a.id !== article.id &&
      !explicit.has(a.id)
  ).map((a) => ({
    id: a.id,
    route: a.route,
    h1: a.h1,
    clusterLabel: a.clusterLabel,
    resolved: true,
  }));

  return (
    <ArticleLayout
      article={article}
      body={body}
      author={author}
      reviewer={reviewer}
      suggestions={suggestions}
    />
  );
}
