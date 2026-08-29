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

  // Complète le maillage sortant, sans jamais proposer l'article courant ni
  // doublonner un lien déjà explicite.
  //
  // Le même cluster d'abord, c'est le plus pertinent. Mais tant que le plan
  // éditorial n'est pas écrit, un cluster ne compte souvent qu'un ou deux
  // articles publiés : s'y limiter laissait « À lire aussi » avec une seule
  // carte. On élargit donc aux autres clusters, piliers en tête — ce sont les
  // pages qui couvrent le sujet le plus largement.
  //
  // Tout vient du manifeste, qui ne contient que des articles publiés : aucune
  // liste à tenir à jour, et un nouvel article entre dans le maillage au
  // premier build qui suit sa publication.
  const explicit = new Set(article.internalLinks.map((l) => l.id));
  const candidates = ARTICLES.filter(
    (a) =>
      a.id !== article.id &&
      !explicit.has(a.id) &&
      a.template !== "brand"
  );

  const rank = (a) =>
    (a.cluster === article.cluster ? 0 : 2) + (a.isPillar ? 0 : 1);

  const suggestions = [...candidates]
    .sort((a, b) => rank(a) - rank(b) || b.datePublished.localeCompare(a.datePublished))
    .map((a) => ({
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
