import { frenchDate, isoDateTime } from "../../lib/date";

/**
 * Encadré « Mise à jour du … », en tête des articles d'actualité (cluster A).
 *
 * Sur un sujet réglementaire, la question du lecteur est « est-ce encore à
 * jour ? ». Y répondre au-dessus de la ligne de flottaison est autant un
 * service qu'un signal de fraîcheur.
 */
export default function UpdateNotice({ date, children }) {
  if (!date) return null;

  return (
    <aside className="my-8 rounded-2xl border border-secondary/30 bg-secondary-very-light/60 p-5">
      <p className="flex items-center gap-2 text-sm font-semibold text-secondary-dark mb-1">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 2" />
        </svg>
        Mise à jour du{" "}
        <time dateTime={isoDateTime(date)}>{frenchDate(date)}</time>
      </p>
      {children ? (
        <div className="text-sm text-slate-700 leading-relaxed [&>p]:mb-0">
          {children}
        </div>
      ) : null}
    </aside>
  );
}
