import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Remet la page en haut à chaque navigation — sauf si l'URL porte une ancre.
 *
 * La navigation pointe des ancres de l'accueil (/#smartloop). Depuis une page
 * d'article, React Router change de route puis pose le hash : sans ce
 * traitement, on arriverait en haut de l'accueil au lieu de la section visée.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // La section peut ne pas être encore montée au moment de la navigation.
    const target = document.getElementById(hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const timer = setTimeout(() => {
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
