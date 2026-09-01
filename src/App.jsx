import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import Hero from "./sections/Hero";
import SocialProof from "./sections/SocialProof";
import Smartloop from "./sections/Smartloop";
import Lumen from "./sections/Lumen";
import FAQ from "./sections/FAQ";
import CTABanner from "./sections/CTABanner";
import Pricing from "./sections/Pricing";
import Footer from "./sections/Footer";
import NotFound from "./pages/NotFound";

// Volontairement l'index minimal, pas le manifeste complet : App.jsx n'a besoin
// que des chemins. Importer les métadonnées ici les ferait entrer dans le
// bundle d'accueil, qui grossirait à chaque article publié.
import { ARTICLE_ROUTES, INDEX_ROUTES } from "./content/routes-index";
import { BODY_LOADERS } from "./content/bodies";
import { stripFrontmatter } from "./lib/markdown";

// Chargées à la demande : elles embarquent react-markdown + remark-gfm (49 Ko
// gzip) dont la page d'accueil n'a aucun besoin. Le prérendu les résout au
// build (renderToPipeableStream attend les frontières Suspense), donc leur
// contenu reste présent dans le HTML statique.
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const Confidentialite = lazy(() => import("./pages/Confidentialite"));
const CGV = lazy(() => import("./pages/CGV"));
const CGU = lazy(() => import("./pages/CGU"));

/**
 * Un composant paresseux par article. Le Markdown, le moteur de rendu et les
 * métadonnées ne sont téléchargés que si la page est visitée : ArticlePage va
 * chercher lui-même l'article dans le manifeste, à partir de sa route.
 */
function articleRoute(route) {
  const loadBody = BODY_LOADERS[route];

  return lazy(async () => {
    const [{ default: ArticlePage }, body] = await Promise.all([
      import("./pages/ArticlePage"),
      loadBody().then((m) => stripFrontmatter(m.default)),
    ]);
    return { default: () => <ArticlePage route={route} body={body} /> };
  });
}

// Construits une seule fois au chargement du module. Recréer les composants
// paresseux à chaque rendu ferait remonter l'arbre React à zéro à chaque
// navigation.
const ARTICLES = ARTICLE_ROUTES.map((route) => ({
  route,
  Component: articleRoute(route),
}));

const INDEXES = INDEX_ROUTES.map((route) => ({
  route,
  Component: lazy(async () => {
    const { default: IndexPage } = await import("./pages/IndexPage");
    return { default: () => <IndexPage route={route} /> };
  }),
}));

function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <Hero />
      <SocialProof />
      <Smartloop />
      <Lumen />
      <FAQ />
      <Pricing />
      <CTABanner />
      <Footer />
      <CookieBanner />
    </div>
  );
}

function PageFallback() {
  return <div className="min-h-screen bg-white" />;
}

// Agnostique du routeur : monté sous BrowserRouter côté client et sous
// StaticRouter au prérendu (voir entry-server.jsx).
export function AppRoutes() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/cgu" element={<CGU />} />

          {INDEXES.map(({ route, Component }) => (
            <Route key={route} path={route} element={<Component />} />
          ))}

          {ARTICLES.map(({ route, Component }) => (
            <Route key={route} path={route} element={<Component />} />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
