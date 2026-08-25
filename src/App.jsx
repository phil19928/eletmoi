import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import Hero from "./sections/Hero";
import Smartloop from "./sections/Smartloop";
import Lumen from "./sections/Lumen";
import FAQ from "./sections/FAQ";
import CTABanner from "./sections/CTABanner";
import Pricing from "./sections/Pricing";
import Footer from "./sections/Footer";
import NotFound from "./pages/NotFound";

// Chargées à la demande : elles embarquent react-markdown + remark-gfm (48 Ko
// gzip) dont la page d'accueil n'a aucun besoin. Le prérendu les résout au
// build (renderToPipeableStream attend les frontières Suspense), donc leur
// contenu reste présent dans le HTML statique.
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const Confidentialite = lazy(() => import("./pages/Confidentialite"));
const CGV = lazy(() => import("./pages/CGV"));
const CGU = lazy(() => import("./pages/CGU"));

function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <Hero />
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
