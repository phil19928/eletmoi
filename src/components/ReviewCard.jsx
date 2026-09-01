import { memo } from "react";
import StoreLogo, { STORE_LABELS } from "./StoreLogo";

/**
 * Carte d'avis : nom, étoiles, titre, commentaire, store. Rien d'autre —
 * pas de date, les stores n'en exposent pas de façon fiable et une date
 * approximative vaut moins que pas de date du tout.
 *
 * Mémoïsée : le carrousel met à jour son index actif à chaque défilement, et
 * il n'y a aucune raison que les cartes soient recalculées pour autant.
 */

const STAR_PATH =
  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

/**
 * Étoiles pleines jusqu'à `rating`, vides ensuite. Exportée pour que la barre
 * de statistiques affiche exactement les mêmes que les cartes.
 */
export function Stars({ rating, className = "w-4 h-4" }) {
  return (
    <span
      role="img"
      aria-label={`Noté ${String(rating).replace(".", ",")} sur 5`}
      className="inline-flex items-center gap-0.5"
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className={`${className} ${i <= rating ? "text-accent" : "text-slate-200"}`}
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review }) {
  const { author, rating, title, text, source } = review;

  return (
    <article className="flex h-full min-h-[17rem] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Pas de note ⇒ pas d'étoiles, et surtout rien à la place : inventer
          une note pour uniformiser les cartes serait inventer une donnée. */}
      {rating ? <Stars rating={rating} /> : null}

      {title ? (
        // Un <p> et non un <h3> : la base CSS force font-weight 500 sur les
        // titres, le gras demandé ne passerait pas.
        <p className="mt-3 font-bold text-slate-900">{title}</p>
      ) : null}

      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        {`\u00AB\u202F${text}\u202F\u00BB`}
      </p>

      {/* mt-auto : quelle que soit la longueur du commentaire, le pied reste
          collé en bas et les cartes d'une même vue s'alignent. */}
      <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-500">
        <span className="font-semibold">{author ?? "Utilisateur vérifié"}</span>
        <span aria-hidden="true" className="text-slate-300">·</span>
        <StoreLogo source={source} className="w-3.5 h-3.5" />
        <span>{STORE_LABELS[source]}</span>
      </div>
    </article>
  );
}

export default memo(ReviewCard);
