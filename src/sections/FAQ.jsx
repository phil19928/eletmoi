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
    question:
      "Pourquoi l'app enfant n'est pas sur le Play Store pour l'instant ?",
    answer:
      "Parce qu'on teste en direct avec vous avant de la soumettre à Google. Google prend 3-5 jours pour valider chaque version — et vos retours sont trop importants pour attendre. En vous donnant l'app maintenant, on peut corriger les bugs et ajouter les features. Une fois qu'on est sûrs que tout marche parfaitement, on la publie sur le Play Store. C'est la même app — juste livrée plus vite.",
  },
  {
    question: "Comment j'installe l'app enfant sur son téléphone ?",
    answer:
      "Super simple. Une fois que vous vous connectez à l'app parent, elle vous guide pas à pas. Scanner le code QR depuis l'app parent avec le téléphone de votre enfant — ça ouvre le lien de téléchargement automatiquement. On est là si vous avez une question.",
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
    question: "Ça marche sur iPhone ?",
    answer:
      "Pas encore. La phase test est sur Android uniquement pour l'instant. On travaille sur iOS et on vous préviendra dès qu'elle est prête. L'app parent fonctionne sur navigateur (web), donc vous pouvez l'utiliser depuis n'importe quel téléphone.",
  },
  {
    question: "C'est vraiment gratuit?",
    answer:
      "Oui, complètement gratuit. Zéro abonnement, zéro limite. On vous demande juste vos retours pour améliorer l'app. Une fois qu'on sort du phase test, on annoncera la tarification.",
  },
  {
    question: "Que se passe-t-il si j'ai un problème ?",
    answer:
      "On est là. Vous pouvez nous contacter directement depuis l'app ou par email.",
  },
  {
    question:
      "Pourquoi je dois installer l'app enfant manuellement ? C'est pas automatique ?",
    answer:
      "L'installation manuelle fait partie du processus — c'est comme ça qu'on vous guide étape par étape. Une fois connecté à l'app parent, on vous montre exactement où cliquer. Comme l'app enfant n'est pas encore sur le Play Store (on la teste d'abord avec vous), elle se télécharge sous forme de fichier. Android va probablement afficher un message d'avertissement du type 'Cette source inconnue peut être dangereuse'. C'est normal — c'est juste Android qui vous prévient qu'elle ne vient pas du Play Store officiel. Pas de panique, c'est un comportement standard. On vous guide à chaque étape.",
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-primary/30 shadow-lg shadow-primary/5"
                    : "border-slate-200 hover:shadow-md hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-slate-900 pr-4">
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
                      <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">
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
