import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import Features from "./sections/Features";
import Why from "./sections/Why";
import FAQ from "./sections/FAQ";
import CTABanner from "./sections/CTABanner";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Why />
      <FAQ />
      <CTABanner />
      <Footer />
      <CookieBanner />
    </div>
  );
}
