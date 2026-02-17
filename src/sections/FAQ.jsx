import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Section from "../components/Section";
import Container from "../components/Container";

const faqs = [
    {
        question: "Est-ce du contrôle parental ?",
        answer:
            "Non. El&Moi n'espionne pas : il pose un cadre simple et motivateur. L'enfant garde de l'autonomie, vous gardez les règles.",
    },
    {
        question: "C'est dispo sur iPhone ?",
        answer:
            "Pas encore. La bêta est disponible sur Android uniquement. On annoncera iOS quand ce sera prêt.",
    },
    {
        question: "Mon enfant peut contourner ?",
        answer:
            "Comme tout cadre, ça dépend du téléphone et des réglages. On vous guide avec des recommandations simples pour limiter les contournements.",
    },
    {
        question: "Comment télécharger ?",
        answer:
            "Téléchargez via Google Play (bêta) ou via le lien web (APK). Ça prend 2 minutes.",
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
