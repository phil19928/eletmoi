import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import Hero from "./sections/Hero";
import Smartloop from "./sections/Smartloop";
import Lumen from "./sections/Lumen";
import FAQ from "./sections/FAQ";
import CTABanner from "./sections/CTABanner";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white font-sans antialiased">
        <Navbar />
        <Hero />
        <Smartloop />
        <Lumen />
        <FAQ />
        <CTABanner />
        <Footer />
        <CookieBanner />
      </div>
    </MotionConfig>
  );
}
