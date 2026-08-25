/**
 * Routes qui ne viennent pas du registre éditorial : accueil et pages légales.
 *
 * Le registre (content/registry.json) ne décrit que des articles. Ces routes-ci
 * sont stables et éditées à la main ; scripts/content/build.mjs les fusionne
 * avec les articles publiés pour produire src/seo/routes.js.
 */

export const STATIC_ROUTES = [
  {
    path: "/",
    title: "Contrôle Parental & Application Temps d'Écran | El&Moi",
    description:
      "Découvrez l'application de contrôle parental El&Moi. Limitez le temps d'écran de vos enfants et transformez le scroll passif en progrès éducatif.",
    // Dossier ou fichier dont la date du dernier commit sert de <lastmod>
    source: "src/sections",
    priority: 1.0,
    changefreq: "weekly",
  },
  {
    path: "/mentions-legales",
    title: "Mentions légales | El&Moi",
    description:
      "Mentions légales du site eletmoi.fr, édité par C&S Associés : identité de l'éditeur, hébergement et directeur de la publication.",
    source: "src/legal/mentions-legales.md",
    priority: 0.3,
    changefreq: "yearly",
  },
  {
    path: "/confidentialite",
    title: "Politique de confidentialité | El&Moi",
    description:
      "Comment El&Moi protège les données de votre famille : données collectées, hébergement en France, durées de conservation et vos droits RGPD.",
    source: "src/legal/confidentialite.md",
    priority: 0.3,
    changefreq: "yearly",
  },
  {
    path: "/cgv",
    title: "Conditions générales de vente | El&Moi",
    description:
      "Conditions générales de vente de l'application de contrôle parental El&Moi : offres, tarifs, abonnement et droit de rétractation.",
    source: "src/legal/cgv.md",
    priority: 0.3,
    changefreq: "yearly",
  },
  {
    path: "/cgu",
    title: "Conditions générales d'utilisation | El&Moi",
    description:
      "Conditions générales d'utilisation de l'application de contrôle parental El&Moi : compte parent, compte enfant et règles d'usage du service.",
    source: "src/legal/cgu.md",
    priority: 0.3,
    changefreq: "yearly",
  },
];

export const NOT_FOUND_ROUTE = {
  path: "/404",
  title: "Page introuvable | El&Moi",
  description: "Cette page n'existe pas ou a été déplacée.",
};
