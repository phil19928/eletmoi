import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { slugifyHeading, nodeToText } from "../lib/slugify";
import { isInternalHref, qualifyRel } from "../lib/links";

/**
 * Table de rendu Markdown partagée par les pages légales et les articles.
 *
 * Extraite de LegalPage.jsx pour éviter deux styles divergents. Deux apports
 * par rapport à la version d'origine :
 *  - ancres stables sur H2/H3, calculées par le même helper que le sommaire ;
 *  - qualification automatique des liens sortants (nofollow pour les sites
 *    commerciaux, dofollow pour les institutionnels), pour qu'aucun lien du
 *    corps de texte n'échappe à la règle.
 */

/**
 * Titre ancré.
 *
 * L'`id` est indispensable — c'est lui que vise le sommaire — mais aucun
 * symbole de permalien n'est affiché : il encombrait la lecture pour un
 * service que personne n'utilise sur un site grand public.
 */
function Heading({ level, children }) {
  const Tag = `h${level}`;
  const id = slugifyHeading(nodeToText(children));
  const sizes = {
    2: "text-2xl sm:text-3xl font-bold text-slate-900 mt-14 mb-4 scroll-mt-24",
    3: "text-xl sm:text-2xl font-semibold text-slate-900 mt-10 mb-3 scroll-mt-24",
    4: "text-lg font-semibold text-slate-800 mt-8 mb-2 scroll-mt-24",
  };

  return (
    <Tag id={id} className={sizes[level]}>
      {children}
    </Tag>
  );
}

/**
 * Lien de corps de texte.
 * Interne → <Link> react-router (navigation sans rechargement).
 * Externe → rel/target calculés, jamais laissés au hasard.
 */
function MarkdownLink({ href = "", children }) {
  const className =
    "text-primary-dark underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors";

  if (isInternalHref(href)) {
    return href.startsWith("#") ? (
      <a href={href} className={className}>
        {children}
      </a>
    ) : (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  const { rel, target } = qualifyRel(href);
  return (
    <a href={href} rel={rel} target={target} className={className}>
      {children}
    </a>
  );
}

/**
 * Capture d'écran animée.
 *
 * Écrite `![alt](/media/nom.mp4 "légende")` dans le Markdown, comme une image :
 * l'auteur n'a pas à savoir que c'est une vidéo, et `seo:check` continue
 * d'exiger un alt. La même capture pèse 5 Mo en GIF contre 165 Ko en h264 —
 * seul le second format est acceptable pour le LCP d'une page d'article.
 *
 * Muette, en boucle, sans contrôles : elle se comporte comme un GIF. Sauf si le
 * système demande moins d'animations, auquel cas elle reste sur son poster et
 * rend les contrôles natifs, à la main du lecteur.
 */
function Capture({ src, alt }) {
  // `matchMedia` n'existe pas au prérendu : on part du comportement par défaut
  // (animé) et on corrige au montage, côté navigateur uniquement.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <video
      src={src}
      poster={src.replace(/\.mp4$/, ".jpg")}
      aria-label={alt}
      autoPlay={!reduced}
      controls={reduced}
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full rounded-2xl border border-slate-200"
    />
  );
}

/**
 * Paragraphe de corps de texte.
 *
 * Markdown emballe une image seule dans un paragraphe. Or notre rendu d'image
 * est un `<figure>`, contenu de type bloc : `<p><figure>…</figure></p>` est du
 * HTML invalide, que le navigateur corrige en fermant le `<p>` avant la figure.
 * Le DOM obtenu ne correspondrait plus au HTML prérendu et React signalerait une
 * divergence d'hydratation. Dans ce cas précis, on rend donc sans `<p>`.
 */
function Paragraph({ node, children, className }) {
  const content = (node?.children ?? []).filter(
    (n) => n.type !== "text" || n.value.trim() !== ""
  );
  const isLoneImage = content.length === 1 && content[0].tagName === "img";

  return isLoneImage ? <>{children}</> : <p className={className}>{children}</p>;
}

/** Base commune : typographie de lecture longue. */
const base = {
  h1: ({ children }) => (
    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 mt-2 text-balance">
      {children}
    </h1>
  ),
  h2: ({ children }) => <Heading level={2}>{children}</Heading>,
  h3: ({ children }) => <Heading level={3}>{children}</Heading>,
  h4: ({ children }) => <Heading level={4}>{children}</Heading>,
  p: (props) => (
    <Paragraph {...props} className="text-slate-700 leading-[1.75] mb-5" />
  ),
  ul: ({ children }) => (
    <ul className="list-disc marker:text-primary text-slate-700 mb-5 space-y-2 pl-6 leading-[1.75]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal marker:text-primary marker:font-semibold text-slate-700 mb-5 space-y-2 pl-6 leading-[1.75]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-[1.75]">{children}</li>,
  a: MarkdownLink,
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-900">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/40 bg-primary-very-light/40 rounded-r-xl px-5 py-3 my-6 text-slate-700 [&>p]:mb-0">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-slate-200 my-10" />,
  code: ({ children }) => (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-slate-800">
      {children}
    </code>
  ),
  img: ({ src = "", alt, title }) => (
    // Le alt est obligatoire : seo:check échoue sur une image sans alternative.
    <figure className="my-8">
      {/\.mp4$/.test(src) ? (
        <Capture src={src} alt={alt ?? ""} />
      ) : (
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          decoding="async"
          className="w-full rounded-2xl border border-slate-200"
        />
      )}
      {title ? (
        <figcaption className="mt-2 text-sm text-slate-500 text-center">
          {title}
        </figcaption>
      ) : null}
    </figure>
  ),
  // Tableaux en HTML natif : c'est ce qu'extraient les moteurs et les
  // assistants IA. Le conteneur scrollable évite tout débordement horizontal.
  table: ({ children }) => (
    <div className="overflow-x-auto my-8 rounded-2xl border border-slate-200">
      <table className="w-full text-sm text-left border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-primary-very-light/60">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-900 align-top">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-slate-100 px-4 py-3 text-slate-700 align-top">
      {children}
    </td>
  ),
};

/** Variante compacte pour les pages légales (titres plus sobres). */
export const legalComponents = {
  ...base,
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold font-display text-gray-900 mb-6 mt-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold font-display text-gray-800 mb-3 mt-8">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">{children}</h3>
  ),
  p: (props) => (
    <Paragraph {...props} className="text-gray-700 leading-relaxed mb-4" />
  ),
};

export const articleComponents = base;
