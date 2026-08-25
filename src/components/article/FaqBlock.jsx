import { useState } from "react";
import { slugifyHeading } from "../../lib/slugify";

/**
 * Accordéon de FAQ.
 *
 * Différence volontaire avec l'accordéon de la page d'accueil : les réponses
 * sont **toujours montées dans le DOM** et seulement masquées en CSS. Un
 * accordéon qui ne monte le contenu qu'à l'ouverture rend ses réponses
 * invisibles dans le HTML prérendu — donc invisibles pour les moteurs, alors
 * que c'est justement du texte riche en intentions de recherche.
 *
 * L'animation passe par grid-template-rows : elle fonctionne sans hauteur
 * connue à l'avance et n'exige aucun calcul JavaScript.
 */
export default function FaqBlock({ items = [], title = "Questions fréquentes" }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (items.length === 0) return null;
  const titleId = slugifyHeading(title);

  return (
    <section aria-labelledby={titleId} className="mt-14">
      <h2
        id={titleId}
        className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 scroll-mt-24"
      >
        {title}
      </h2>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <div
              key={item.q}
              className={`rounded-2xl border bg-white overflow-hidden transition-colors ${
                isOpen ? "border-primary/30" : "border-slate-200"
              }`}
            >
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center gap-4 p-5 text-left font-semibold text-slate-900 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                >
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-primary text-white rotate-180"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-slate-600 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
