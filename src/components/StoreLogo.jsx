/**
 * Logos App Store et Google Play, en SVG inline monochrome.
 *
 * Pas les badges officiels en PNG (déjà affichés dans le Hero) : ici le logo
 * n'est qu'une signature de provenance au pied d'un avis ou à côté d'un
 * libellé. Inline et en `currentColor`, il ne coûte aucune requête, se teinte
 * avec le texte qui l'entoure et ne peut pas décaler la mise en page.
 */

export const STORE_LABELS = {
  app_store: "App Store",
  google_play: "Google Play",
};

const PATHS = {
  app_store:
    "M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z",
  google_play:
    "M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.198 12l2.5-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z",
};

export default function StoreLogo({ source, className = "w-4 h-4" }) {
  const path = PATHS[source];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`flex-shrink-0 ${className}`}
    >
      <path d={path} />
    </svg>
  );
}
