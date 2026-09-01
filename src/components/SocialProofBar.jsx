import { useEffect, useRef, useState } from "react";
import { Stars } from "./ReviewCard";
import StoreLogo from "./StoreLogo";
import reviewsData from "../data/reviews.json";
import { APP_STORE_URL, PLAY_STORE_URL } from "../config";

// Source unique : aucun de ces chiffres n'est écrit en dur dans le JSX.
const SOCIAL_PROOF = reviewsData.stats;

/**
 * Compteur animé à l'entrée dans le viewport.
 *
 * L'état part de la valeur **finale**, pas de zéro : le HTML prérendu et le
 * premier rendu client sont donc déjà justes. Rien à hydrater de travers,
 * rien qui bouge dans la mise en page, et le chiffre reste lisible sans JS.
 *
 * La valeur est une chaîne libre (« 100+ », « 1 200+ ») : on n'anime que la
 * partie numérique et la dernière image d'animation réaffiche la chaîne
 * d'origine, telle qu'elle est écrite dans reviews.json.
 */
function useCountUp(raw, ref) {
  const [display, setDisplay] = useState(raw);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    // Espaces fines / insécables comprises : « 1 200+ » doit fonctionner.
    const match = String(raw).match(/\d[\d\s\u202f\u00a0]*/);
    if (!match) return undefined;

    const target = Number(match[0].replace(/\D/g, ""));
    if (!target) return undefined;

    const prefix = raw.slice(0, match.index);
    const suffix = raw.slice(match.index + match[0].length);
    const duration = 1200;
    let frame = 0;
    let startedAt = 0;

    const step = (now) => {
      if (!startedAt) startedAt = now;
      const progress = Math.min((now - startedAt) / duration, 1);

      if (progress < 1) {
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(`${prefix}${Math.round(target * eased)}${suffix}`);
        frame = requestAnimationFrame(step);
      } else {
        setDisplay(raw);
      }
    };

    // Une seule fois : on se débranche dès le premier passage.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setDisplay(`${prefix}0${suffix}`);
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [raw, ref]);

  return display;
}

const ITEM = "flex h-full flex-col items-center px-2 text-center sm:px-6";
const VALUE = "font-extrabold tracking-tight text-slate-900 tabular-nums";
const VALUE_SIZE = "text-2xl sm:text-3xl";
const ORNAMENT = "mt-1.5 flex items-center gap-3 text-slate-500";
const LABEL = "mt-auto pt-1.5 text-xs leading-snug text-slate-500";

/**
 * Les trois colonnes suivent le même rythme : chiffre, ornement, libellé.
 * Sans cette icône la première colonne sautait l'ornement et laissait un vide
 * sous « 100+ », les libellés étant alignés en bas.
 */
function DownloadIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

export default function SocialProofBar() {
  const downloadsRef = useRef(null);
  const downloads = useCountUp(SOCIAL_PROOF.downloads, downloadsRef);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 px-2 py-6 shadow-sm sm:px-5">
      <div className="grid grid-cols-3 divide-x divide-slate-200">
        <div className={ITEM}>
          <span ref={downloadsRef} className={`${VALUE} ${VALUE_SIZE}`}>
            {downloads}
          </span>
          <span className={ORNAMENT}>
            <DownloadIcon className="w-4 h-4 sm:w-[1.15rem] sm:h-[1.15rem]" />
          </span>
          <span className={LABEL}>{SOCIAL_PROOF.downloadsLabel}</span>
        </div>

        <div className={ITEM}>
          <span className={`${VALUE} ${VALUE_SIZE}`}>{SOCIAL_PROOF.rating}</span>
          <Stars rating={5} className="mt-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {/* Le volume qualifie la note : « 5,0 » seul ne dit pas sur
              combien d'avis elle porte. */}
          <span className={LABEL}>
            note moyenne sur {SOCIAL_PROOF.reviewCount} avis
          </span>
        </div>

        <div className={ITEM}>
          <span className={`${VALUE} text-sm leading-tight sm:text-xl lg:text-2xl`}>
            iOS &amp; Android
          </span>
          <div className={ORNAMENT}>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="El&Moi sur l'App Store"
              className="transition-colors hover:text-slate-900"
            >
              <StoreLogo source="app_store" className="w-4 h-4 sm:w-[1.15rem] sm:h-[1.15rem]" />
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="El&Moi sur Google Play"
              className="transition-colors hover:text-slate-900"
            >
              <StoreLogo source="google_play" className="w-4 h-4 sm:w-[1.15rem] sm:h-[1.15rem]" />
            </a>
          </div>
          <span className={LABEL}>disponible sur les 2 stores</span>
        </div>
      </div>
    </div>
  );
}
