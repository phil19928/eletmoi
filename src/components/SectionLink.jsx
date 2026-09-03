import SiteLink from "./SiteLink";

/**
 * Lien « En savoir plus » sous une section de l'accueil.
 *
 * Les sections de l'accueil sont des résumés ; le contenu de référence vit sur
 * une page dédiée. Sans ce lien, ces pages n'étaient atteignables que par la
 * navigation, et le visiteur n'avait aucune raison de deviner qu'elles
 * existaient.
 */
export default function SectionLink({ to, children }) {
  return (
    <div className="mt-12 text-center">
      <SiteLink
        to={to}
        className="group inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-white/80 px-6 py-3 text-sm font-semibold text-primary-dark shadow-sm hover:border-primary/50 hover:shadow-md transition-all"
      >
        {children}
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </SiteLink>
    </div>
  );
}
