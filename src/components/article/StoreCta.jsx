import { APP_STORE_URL, PLAY_STORE_URL } from "../../config";
import badgeAppStore from "../../assets/badge--app-store.png";
import badgePlayStore from "../../assets/Google_Play_Store_badge_FR.svg.png";

/**
 * Double bouton de téléchargement.
 *
 * Les UTM portent la position dans la page (`position`) : sans ça, impossible
 * de savoir si les installations viennent du CTA d'introduction ou de celui de
 * fin d'article, et donc impossible d'arbitrer.
 */
function withUtm(url, campaign, position) {
  const target = new URL(url);
  target.searchParams.set("utm_source", "eletmoi.fr");
  target.searchParams.set("utm_medium", "organic");
  target.searchParams.set("utm_campaign", campaign);
  target.searchParams.set("utm_content", position);
  return target.toString();
}

export default function StoreCta({
  label = "Télécharger El&Moi gratuitement",
  note = "Formule Essentiel gratuite, sans limite de durée.",
  campaign = "organic_article",
  position = "body",
}) {
  return (
    <section className="my-12 rounded-2xl border border-primary/20 bg-primary-very-light/40 p-6 sm:p-8 text-center">
      <p className="text-lg sm:text-xl font-semibold text-slate-900 text-balance mb-1">
        {label}
      </p>
      {note ? <p className="text-sm text-slate-500 mb-5">{note}</p> : null}

      {/* Les stores ne distribuent que l'application enfant : l'Accès Parent
          est un espace web, rien à y installer. Sans cette précision, un
          parent croit que le badge télécharge son application à lui. */}
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Application enfant
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={withUtm(APP_STORE_URL, campaign, position)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={badgeAppStore}
            alt="Télécharger l'application enfant El&Moi sur l'App Store pour iPhone"
            width="109"
            height="36"
            loading="lazy"
            decoding="async"
            className="h-9 w-auto"
          />
        </a>
        <a
          href={withUtm(PLAY_STORE_URL, campaign, position)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={badgePlayStore}
            alt="Télécharger l'application enfant El&Moi sur Google Play pour Android"
            width="122"
            height="36"
            loading="lazy"
            decoding="async"
            className="h-9 w-auto"
          />
        </a>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        L'Accès Parent, lui, s'ouvre dans votre navigateur — rien à installer.
      </p>
    </section>
  );
}
