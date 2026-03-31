import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import Hero from "./sections/Hero";
import PainPoint from "./sections/PainPoint";
import Smartloop from "./sections/Smartloop";
import Features from "./sections/Features";
import BetaTesters from "./sections/BetaTesters";
import DualDownload from "./sections/DualDownload";
import FAQ from "./sections/FAQ";
import CTABanner from "./sections/CTABanner";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <Hero />
      <PainPoint />
      <Smartloop />
      <Features />
      <BetaTesters />
      <DualDownload />
      <FAQ />
      <CTABanner />
      <Footer />
      <CookieBanner />
    </div>
  );
}
