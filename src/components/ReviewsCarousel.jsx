import { useCallback, useEffect, useRef, useState } from "react";
import ReviewCard from "./ReviewCard";
import reviewsData from "../data/reviews.json";

const REVIEWS = reviewsData.reviews;

/**
 * Carrousel d'avis, en scroll-snap natif plutôt qu'en translateX.
 *
 * Le navigateur gère le glissement tactile, l'inertie et l'aimantation : il
 * ne reste à écrire que l'autoplay, les flèches et les points. Aucune
 * dépendance.
 *
 * Toutes les cartes sont **montées en permanence** et jamais rendues
 * conditionnellement : une carte absente du HTML prérendu serait invisible
 * pour les moteurs, et les avis sont précisément ce qu'on veut voir indexé.
 */

/**
 * `false` au premier rendu : matchMedia n'existe pas au prérendu. On lit la
 * préférence dans un effet, comme partout ailleurs dans le dépôt.
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

// La piste se termine par une cale, qui n'est pas une diapositive.
const slidesOf = (track) => track.querySelectorAll('[role="group"]');

/** Positions de défilement réellement atteignables, à 1 px près. */
function lastReachable(track) {
  const slides = slidesOf(track);
  const first = slides[0];
  if (!first) return 0;

  const max = track.scrollWidth - track.clientWidth;
  let last = 0;
  for (let i = 0; i < slides.length; i += 1) {
    if (slides[i].offsetLeft - first.offsetLeft <= max + 1) last = i;
  }
  return last;
}

export default function ReviewsCarousel() {
  const count = REVIEWS.length;
  const trackRef = useRef(null);
  const activeRef = useRef(0); // miroir de `active`, lisible sans dépendance
  const pagesRef = useRef(count);
  const frameRef = useRef(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Sur mobile il n'y a pas de survol, donc aucun moyen de suspendre le
  // défilement : un avis qu'on est en train de lire disparaît. Au premier
  // geste tactile, le visiteur prend la main et l'autoplay ne revient pas.
  const [stopped, setStopped] = useState(false);
  const [pages, setPages] = useState(count);
  const reduced = usePrefersReducedMotion();

  // `goTo` doit rester stable pour que l'autoplay ne soit pas reconstruit à
  // chaque avance : la préférence de mouvement lui parvient par une référence.
  const reducedRef = useRef(false);
  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  /**
   * Le nombre de positions dépend du nombre de cartes visibles : à trois
   * cartes affichées sur cinq, les deux dernières partagent la même fin de
   * piste. Sans ce calcul, l'autoplay viserait une position que le navigateur
   * ramènerait au maximum, et resterait bloqué sur la dernière vue.
   *
   * Mesuré sur le DOM plutôt que déduit d'un point de rupture : le composant
   * n'a jamais à savoir quel média est actif.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const measure = () => {
      const next = lastReachable(track) + 1;
      pagesRef.current = next;
      setPages(next);

      // L'élargissement de la fenêtre réduit le nombre de positions : sans
      // ce recadrage, l'index actif pointerait sur un point qui n'existe plus.
      if (activeRef.current > next - 1) {
        activeRef.current = next - 1;
        setActive(next - 1);
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [count]);

  /**
   * Impératif : on écrit directement dans le défilement de la piste, sans
   * passer par un état. C'est ce qui permet à l'autoplay de n'entraîner aucun
   * rendu React à chaque tick.
   */
  const goTo = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;

    const slides = slidesOf(track);
    const total = pagesRef.current;
    const target = ((index % total) + total) % total;
    const slide = slides[target];
    const first = slides[0];
    if (!slide || !first) return;

    // Rembobiner en douceur du dernier au premier ferait défiler toute la
    // piste à l'envers : la boucle se referme d'un coup.
    const wraps =
      (target === 0 && activeRef.current === total - 1) ||
      (target === total - 1 && activeRef.current === 0);

    track.scrollTo({
      // Écart au premier élément : insensible au rembourrage de la piste,
      // qui change entre mobile et desktop.
      left: slide.offsetLeft - first.offsetLeft,
      behavior: reducedRef.current || wraps ? "auto" : "smooth",
    });
  }, []);

  /**
   * L'index actif est déduit du défilement réel, jamais l'inverse. Le
   * composant n'a donc pas à savoir combien de cartes sont visibles : 1, 2 ou
   * 3 selon le point de rupture, sans matchMedia ni écouteur de redimension.
   */
  const onScroll = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;

      const slides = slidesOf(track);
      if (!slides.length) return;

      const origin = slides[0].offsetLeft;
      const last = pagesRef.current - 1;
      let nearest = 0;
      let shortest = Infinity;

      // Bornée aux positions atteignables : en fin de piste, la carte la plus
      // proche visuellement peut être une carte qu'aucun défilement ne peut
      // amener en tête.
      for (let i = 0; i <= last; i += 1) {
        const distance = Math.abs(
          slides[i].offsetLeft - origin - track.scrollLeft
        );
        if (distance < shortest) {
          shortest = distance;
          nearest = i;
        }
      }

      activeRef.current = nearest;
      setActive(nearest); // même valeur ⇒ React ne re-rend pas
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  useEffect(() => {
    if (paused || stopped || reduced || pages < 2) return undefined;
    const id = setInterval(() => goTo(activeRef.current + 1), 6000);
    return () => clearInterval(id);
  }, [paused, stopped, reduced, pages, goTo]);

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeRef.current - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeRef.current + 1);
    }
  };

  if (count === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label="Avis des utilisateurs"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") setStopped(true);
      }}
    >
      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onScroll={onScroll}
        aria-label="Faites défiler les avis"
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-pl-5 px-5 pt-1 pb-2 sm:mx-0 sm:scroll-pl-0 sm:px-0"
      >
        {REVIEWS.map((review, i) => (
          <div
            key={review.id}
            role="group"
            aria-roledescription="diapositive"
            aria-label={`Avis ${i + 1} sur ${count}`}
            className="w-full flex-shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {pages > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(activeRef.current - 1)}
            aria-label="Avis précédent"
            className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition-colors hover:border-primary/40 hover:text-primary-dark lg:-left-5 lg:flex"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(activeRef.current + 1)}
            aria-label="Avis suivant"
            className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition-colors hover:border-primary/40 hover:text-primary-dark lg:-right-5 lg:flex"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Un point par position atteignable, pas par carte : sur desktop
              les dernières cartes partagent la même fin de piste. */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={REVIEWS[i].id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Aller à l'avis ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-7 bg-primary" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
