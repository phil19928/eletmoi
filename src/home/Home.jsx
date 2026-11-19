import { useEffect } from "react";
import { initSmoothScroll, getLenis, ScrollTrigger } from "./motion.jsx";
import Hero from "./Hero.jsx";
import Manifesto from "./Manifesto.jsx";
import Smartloop from "./Smartloop.jsx";
import Simulator from "./Simulator.jsx";
import Control from "./Control.jsx";
import Reviews from "./Reviews.jsx";
import Lumen from "./Lumen.jsx";
import Pricing from "./Pricing.jsx";
import Faq from "./Faq.jsx";
import FinalCta from "./FinalCta.jsx";
import MobileCta from "./MobileCta.jsx";

/**
 * Accueil (refonte 2026). Le défilement lissé (Lenis) n'est actif que sur
 * cette page : les articles gardent le défilement natif du navigateur.
 */
export default function Home() {
  useEffect(() => {
    const stop = initSmoothScroll();
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    // Arrivée depuis une autre page sur /#section : on attend que les sections
    // épinglées aient calculé leur hauteur, puis on saute directement dessus
    // (le défilement natif « smooth » serait interrompu par Lenis).
    const hash = window.location.hash.slice(1);
    const jump = hash && setTimeout(() => {
      const el = document.getElementById(hash);
      if (!el) return;
      ScrollTrigger.refresh();
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el, { offset: -20, immediate: true, force: true });
      else el.scrollIntoView();
    }, 250);

    return () => {
      clearTimeout(jump);
      stop();
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <div className="home">
      <main>
        <Hero />
        <Manifesto />
        <Smartloop />
        <Simulator />
        <Control />
        <Reviews />
        <Lumen />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <MobileCta />
    </div>
  );
}
