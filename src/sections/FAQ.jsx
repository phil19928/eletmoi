import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Section from "../components/Section";
import Container from "../components/Container";

const faqs = [
    {
        question: "Qu'est-ce que la beta exactement ?",
        answer:
            "El&Moi est une app fonctionnelle, utilisable des maintenant. La beta signifie qu'on ameliore l'app chaque semaine grace aux retours des premiers utilisateurs. C'est gratuit, sans engagement, et vous pouvez desinstaller a tout moment.",
    },
    {
        question: "Pourquoi un APK et pas le Play Store ?",
        answer:
            "Pour aller vite et reagir a vos retours sans les delais de validation du store. Un APK c'est exactement la meme chose qu'une app du Play Store, juste telechargee directement. On vous guide pas a pas pour l'installation.",
    },
    {
        question: "Mon enfant peut contourner le systeme ?",
        answer:
            "El&Moi utilise une protection anti-desinstallation et fonctionne meme hors-ligne. Comme tout systeme, ca depend aussi des reglages du telephone. On vous guide avec des recommandations simples pour limiter les contournements.",
    },
    {
        question: "C'est du controle parental ?",
        answer:
            "Pas vraiment. El&Moi n'espionne pas et ne filtre pas le contenu. Il pose un cadre motivant : ton enfant gagne du temps d'ecran en apprenant. C'est un deal, pas une surveillance.",
    },
    {
        question: "Ca marche sur iPhone ?",
        answer:
            "Pas encore. La beta est disponible sur Android uniquement. On travaille sur la version iOS et on vous prereviendra des qu'elle sera prete.",
    },
    {
        question: "Mes donnees sont en securite ?",
        answer:
            "Oui. Vos donnees sont hebergees en Europe et ne sont jamais partagees avec des tiers. On collecte uniquement ce qui est necessaire au fonctionnement de l'app.",
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
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${isOpen
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
                                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen
                                                ? "bg-primary text-white"
                                                : "bg-slate-100 text-slate-400"
                                            }`}
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg fill="none" height="16" width="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
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
