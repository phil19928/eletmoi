import { Link } from "react-router-dom";
import { frenchDate, isoDateTime } from "../../lib/date";

/**
 * Mention de transparence, obligatoire en tête des pages /comparatif/.
 *
 * Nous sommes juge et partie sur ces pages : le dire d'emblée est une
 * exigence de loyauté, et c'est aussi ce que les évaluateurs qualité de Google
 * cherchent sur une comparaison publiée par un acteur du marché.
 */
export default function TransparencyNotice({ verifiedOn }) {
  return (
    <aside className="my-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm text-slate-600 leading-relaxed mb-0">
        <span className="font-semibold text-slate-900">
          Nous éditons El&Moi.
        </span>{" "}
        Cette comparaison est donc écrite par une partie prenante.{" "}
        <Link
          to="/a-propos"
          className="text-primary-dark hover:underline underline-offset-2"
        >
          Voici notre méthode de comparaison
        </Link>
        , les critères retenus et la façon dont nous testons les solutions
        concurrentes.
        {verifiedOn ? (
          <>
            {" "}
            Informations vérifiées le{" "}
            <time dateTime={isoDateTime(verifiedOn)}>
              {frenchDate(verifiedOn)}
            </time>
            .
          </>
        ) : null}
      </p>
    </aside>
  );
}
