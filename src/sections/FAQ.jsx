import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Section from "../components/Section";
import Container from "../components/Container";

const faqs = [
  {
    question: "Comment ça marche concrètement ?",
    answer:
      "Vous avez deux apps. L'app parent, c'est votre tableau de bord — elle fonctionne dans votre navigateur web, sur téléphone ou ordinateur, rien à installer. L'app enfant s'installe sur le téléphone de votre enfant depuis l'App Store ou le Play Store. Une fois les deux connectés, vous définissez les règles de temps d'écran et votre enfant les voit en temps réel sur son téléphone.",
  },
  {
    question: "C'est quoi la différence avec Family Link ou Screen Time ?",
    answer:
      "Family Link et Screen Time bloquent. Quand le temps est écoulé, écran noir, fin de la discussion. El&Moi fonctionne différemment : votre enfant peut regagner du temps en apprenant. Il utilise une app éducative ou suit une formation Lumen, et son compteur remonte. C'est un échange, pas une punition. Il comprend les règles, il voit son compteur, il décide de ce qu'il en fait.",
  },
  {
    question: "C'est quoi Lumen ?",
    answer:
      "Lumen, c'est notre catalogue de micro-formations sur le numérique, intégré dans l'app. Des formations courtes sur des sujets concrets : créer un bon mot de passe, reconnaître une arnaque en ligne, protéger ses données sur les réseaux sociaux. Chaque contenu est adapté à l'âge de votre enfant — un enfant de 9 ans ne reçoit pas la même formation qu'un ado de 15 ans. Compléter une formation, c'est gagner du temps de divertissement. Et vous aussi, en tant que parent, vous avez accès à toutes les formations depuis votre app. Comme ça, vous savez exactement ce que votre enfant apprend et vous pouvez en discuter ensemble.",
  },
  {
    question: "C'est pour quel âge ?",
    answer:
      "El&Moi est conçu pour les enfants et ados de 6 à 17 ans. Les formations Lumen s'adaptent automatiquement à trois tranches d'âge : 6-8 ans, 9-12 ans et 13-17 ans. Le vocabulaire, les exemples et la complexité changent selon l'âge de votre enfant.",
  },
  {
    question: "Est-ce que ça fonctionne sur iPhone et Android ?",
    answer:
      "Oui, l'app enfant est disponible sur les deux. Il y a une petite différence : sur Android, vous voyez le temps passé app par app. Sur iPhone, Apple ne permet pas ce niveau de détail, donc on fonctionne par catégories d'apps (jeux, réseaux sociaux, éducation, etc.) en utilisant les outils natifs d'Apple. Le résultat pour votre enfant est le même — la Smartloop fonctionne de la même façon sur les deux.",
  },
  {
    question: "C'est vraiment gratuit ?",
    answer:
      "L'offre El&Moi Essentiel est gratuite, sans limite de durée. Un parent, un enfant, la Smartloop complète, le contrôle du temps d'écran, les plages horaires, le blocage, et une formation Lumen pour découvrir. C'est un vrai produit complet, pas une version bridée. L'offre El&Moi Famille à 4,99 euros par mois, c'est pour les familles qui veulent ajouter un deuxième parent, plusieurs enfants, ou accéder à toutes les formations Lumen en illimité.",
  },
  {
    question: "Est-ce que El&Moi espionne mon enfant ?",
    answer:
      "Non. On ne lit pas ses messages. On ne regarde pas ses photos. On ne suit pas sa localisation. On n'enregistre pas son historique de navigation. La seule chose qu'on mesure, c'est le temps passé sur chaque app ou catégorie d'apps. C'est tout. Vos données sont hébergées en France chez OVH, elles ne sont jamais partagées avec des tiers.",
  },
  {
    question: "Mon enfant peut contourner le système ?",
    answer:
      "On a mis en place des protections techniques contre la désinstallation et le contournement. Mais on va être honnête : aucun système n'est infaillible, et un ado motivé trouvera toujours un moyen. C'est pour ça qu'El&Moi ne mise pas tout sur le contrôle. La Smartloop donne à votre enfant une raison de jouer le jeu plutôt que de le contourner. Pourquoi tricher quand tu peux gagner du temps en apprenant ?",
  },
  {
    question: "J'ai une question, je fais comment ?",
    answer:
      "Vous pouvez nous écrire directement depuis l'app parent ou par email. On est une petite équipe, on lit tout, et on répond vraiment.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section id="faq" className="!pt-10 sm:!pt-14">
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
                      <div
                        id={`faq-answer-${index}`}
                        className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-500 text-sm leading-relaxed"
                      >
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
