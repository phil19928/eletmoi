import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Section from "../components/Section";
import Container from "../components/Container";
import faqData from "../data/home-faq.json";

/**
 * FAQ de l'accueil.
 *
 * Les questions/réponses vivent dans `src/data/home-faq.json` et non dans ce
 * fichier : le même JSON alimente le balisage `FAQPage` produit au prérendu
 * par `scripts/content/jsonld.mjs`. Une seule source, donc aucun risque que le
 * texte affiché et le texte déclaré à Google divergent.
 *
 * Comme dans `components/article/FaqBlock`, les réponses sont **toujours
 * montées dans le DOM** et seulement masquées en CSS : un accordéon qui ne
 * monte son contenu qu'à l'ouverture laisse ses réponses absentes du HTML
 * prérendu, donc invisibles pour les moteurs. L'animation passe par
 * `grid-template-rows`, qui n'exige aucune hauteur connue à l'avance ni le
 * moindre calcul JavaScript.
 */
const faqs = faqData.faqs;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section id="faq" alt className="!pt-10 sm:!pt-14">
      <Container>
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight text-balance">
            Questions fréquentes sur le contrôle parental
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Les réponses essentielles, sans jargon technique.
          </p>
        </div>

        <div ref={ref} className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-answer-${index}`;
            const buttonId = `faq-question-${index}`;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-primary/30 shadow-lg shadow-primary/5"
                    : "border-slate-200 hover:shadow-md hover:border-slate-300"
                }`}
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="font-semibold text-slate-900 pr-4 leading-snug">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-primary text-white rotate-180"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <svg
                        fill="none"
                        height="16"
                        width="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
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
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-500 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
