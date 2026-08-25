import { Link } from "react-router-dom";
import { frenchDate, isoDateTime } from "../../lib/date";

/**
 * « Publié le … · Mis à jour le … · Par … »
 *
 * Les dates sont visibles à l'écran, pas seulement dans le JSON-LD : c'est ce
 * qu'un lecteur — et un évaluateur qualité — regarde pour juger de la
 * fraîcheur. La date de mise à jour n'est affichée que si elle diffère
 * réellement de la publication, sinon elle donne une fausse impression de
 * révision.
 */
export default function ArticleMeta({ datePublished, dateModified, author, readingTime }) {
  const updated = dateModified && dateModified !== datePublished;

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
      <span>
        Publié le{" "}
        <time dateTime={isoDateTime(datePublished)} className="text-slate-600">
          {frenchDate(datePublished)}
        </time>
      </span>

      {updated ? (
        <>
          <span aria-hidden="true" className="text-slate-300">
            ·
          </span>
          <span>
            Mis à jour le{" "}
            <time dateTime={isoDateTime(dateModified)} className="text-slate-600">
              {frenchDate(dateModified)}
            </time>
          </span>
        </>
      ) : null}

      {readingTime ? (
        <>
          <span aria-hidden="true" className="text-slate-300">
            ·
          </span>
          <span>{readingTime} min de lecture</span>
        </>
      ) : null}

      {author ? (
        <>
          <span aria-hidden="true" className="text-slate-300">
            ·
          </span>
          <span>
            Par{" "}
            <Link
              to={author.url ?? "/a-propos"}
              className="text-primary-dark hover:underline underline-offset-2"
            >
              {author.name}
            </Link>
          </span>
        </>
      ) : null}
    </div>
  );
}
