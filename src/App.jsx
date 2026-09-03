import { Component, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
const CHUNK_RELOAD_PREFIX = "eletmoi:chunk-reload:";
const CHUNK_ERROR_PATTERN =
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading chunk \d+ failed/i;

function storageKey(key) {
  return `${CHUNK_RELOAD_PREFIX}${key}`;
}

function storageGet(key) {
  try {
    return window.sessionStorage.getItem(storageKey(key));
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    window.sessionStorage.setItem(storageKey(key), value);
    return true;
  } catch {
    // Sans stockage, on ne peut pas garantir un seul reload : mieux vaut
    // laisser l'ErrorBoundary afficher une action manuelle.
    return false;
  }
}

function storageRemove(key) {
  try {
    window.sessionStorage.removeItem(storageKey(key));
  } catch {
    // Le nettoyage est opportuniste : l'absence de sessionStorage ne doit pas
    // empêcher le rendu d'une page.
  }
}

function isChunkLoadError(error) {
  const message = String(error?.message ?? error ?? "");
  return CHUNK_ERROR_PATTERN.test(message);
}

function recoverableLazy(load, key) {
  return lazy(async () => {
    try {
      const result = await load();
      if (typeof window !== "undefined") {
        storageRemove(key);
      }
      return result;
    } catch (error) {
      if (typeof window !== "undefined" && isChunkLoadError(error)) {
        if (storageGet(key) !== "1") {
          const canRememberReload = storageSet(key, "1");
          if (canRememberReload) {
            window.location.reload();
            return new Promise(() => {});
          }
        }
      }
      throw error;
    }
  });
}

const MentionsLegales = recoverableLazy(
  () => import("./pages/MentionsLegales"),
  "mentions-legales"
);
const Confidentialite = recoverableLazy(
  () => import("./pages/Confidentialite"),
  "confidentialite"
);
const CGV = recoverableLazy(() => import("./pages/CGV"), "cgv");
const CGU = recoverableLazy(() => import("./pages/CGU"), "cgu");

/**
 * Un composant paresseux par article. Le Markdown, le moteur de rendu et les
 * métadonnées ne sont téléchargés que si la page est visitée : ArticlePage va
 * chercher lui-même l'article dans le manifeste, à partir de sa route.
 */
function articleRoute(route) {
  const loadBody = BODY_LOADERS[route];

  return recoverableLazy(async () => {
    const [{ default: ArticlePage }, body] = await Promise.all([
      import("./pages/ArticlePage"),
      loadBody().then((m) => stripFrontmatter(m.default)),
    ]);
    return { default: () => <ArticlePage route={route} body={body} /> };
  }, route);
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
  Component: recoverableLazy(async () => {
    const { default: IndexPage } = await import("./pages/IndexPage");
    return { default: () => <IndexPage route={route} /> };
  }, route),
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
  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 px-5">
        <div className="mx-auto max-w-[760px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-3 w-28 rounded-full bg-primary/20" />
          <div className="mt-5 h-8 w-4/5 rounded-xl bg-slate-100" />
          <div className="mt-3 h-8 w-2/3 rounded-xl bg-slate-100" />
          <div className="mt-8 space-y-3">
            <div className="h-4 rounded-full bg-slate-100" />
            <div className="h-4 rounded-full bg-slate-100" />
            <div className="h-4 w-3/4 rounded-full bg-slate-100" />
          </div>
        </div>
      </main>
    </div>
  );
}

class RouteErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
        <Navbar />
        <main className="flex-1 pt-28 px-5">
          <div className="mx-auto max-w-[640px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark">
              Chargement interrompu
            </p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
              La page n'a pas pu se charger.
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Rechargez la page pour récupérer la dernière version du site.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
            >
              Recharger
            </button>
          </div>
        </main>
      </div>
    );
  }
}

// Agnostique du routeur : monté sous BrowserRouter côté client et sous
// StaticRouter au prérendu (voir entry-server.jsx).
export function AppRoutes() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <RouteErrorBoundary resetKey={location.pathname}>
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
      </RouteErrorBoundary>
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
