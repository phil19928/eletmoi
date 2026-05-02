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
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import CGV from "./pages/CGV";
import CGU from "./pages/CGU";

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

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/cgu" element={<CGU />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}
