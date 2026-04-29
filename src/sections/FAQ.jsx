import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Section from "../components/Section";
import Container from "../components/Container";

const faqs = [
  {
    question: "Comment ça marche ? Il y a vraiment deux apps ?",
    answer:
      "Oui, deux apps complémentaires : une pour vous (parent), une pour votre enfant. Vous téléchargez d'abord l'app parent sur votre téléphone — c'est votre tableau de bord. Une fois connecté, l'app vous guide pour installer l'app enfant sur le téléphone de votre enfant. Vous pouvez scanner un QR code directement depuis l'app parent, ou télécharger le lien manuellement. Les deux apps communiquent ensemble : vous gérez le temps, votre enfant le voit en temps réel.",
  },
  {
    question: "Comment j'installe l'app enfant sur son téléphone ?",
    answer:
      "Super simple. Une fois que vous vous connectez à l'app parent, elle vous guide pas à pas. Scannez le QR code depuis l'app parent avec le téléphone de votre enfant — ça ouvre l'App Store ou le Play Store directement. On est là si vous avez une question.",
  },
  {
    question: "Mes données sont sécurisées ?",
    answer:
      "Oui. Vos données (comptes, paramètres, temps écran) sont hébergées en France chez OVH, un leader européen de l'hébergement sécurisé. Elles ne sont jamais partagées avec des tiers. On collecte uniquement les infos nécessaires au fonctionnement : pas d'espionnage, pas de tracking comportemental. Vous contrôlez vos données.",
  },
  {
    question: "Mon enfant peut contourner le système ?",
    answer:
      "El&Moi utilise une protection contre la désinstallation et fonctionne même hors ligne. Mais comme tout système parental, c'est un cadre — pas une prison. On vous guide avec des recommandations simples pour éviter les contournements basiques (réinitialiser le téléphone, emprunter un autre appareil, etc.). C'est un deal motivant, pas de la surveillance : votre enfant gagne du temps en apprenant et en atteignant ses objectifs.",
  },
  {
    question: "C'est du contrôle parental classique ?",
    answer:
      "Non. El&Moi n'espionne pas, ne filtre pas le contenu, et ne bloque pas les appels d'urgence. C'est un cadre motivant : vous décidez du temps écran, votre enfant le gère en échange d'apprentissage ou de tâches. C'est transparent — il voit exactement ce qu'il a gagné ou perdu. Un deal, pas une surveillance.",
  },
  {
    question: "Sur quels appareils ça fonctionne ?",
    answer:
      "L'app Enfant est disponible sur iOS (App Store) et Android (Play Store). L'app Parent fonctionne sur navigateur web, depuis n'importe quel téléphone ou ordinateur.",
  },
  {
    question: "C'est vraiment gratuit?",
    answer:
      "Oui, complètement gratuit. Zéro abonnement, zéro limite. La tarification sera annoncée prochainement.",
  },
  {
    question: "Que se passe-t-il si j'ai un problème ?",
    answer:
      "On est là. Vous pouvez nous contacter directement depuis l'app ou par email.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section id="faq">
      <Container>
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Des questions ?
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Les réponses essentielles, sans jargon technique.
          </p>
        </div>

        <div ref={ref} className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
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
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-slate-900 pr-4 leading-snug">
                    {faq.question}
                  </span>
                  <motion.span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isOpen
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
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
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div id={`faq-answer-${index}`} className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-500 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
