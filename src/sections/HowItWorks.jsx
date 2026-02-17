import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Section from "../components/Section";
import Container from "../components/Container";

const steps = [
    {
        num: "01",
        title: "Échange équitable",
        description:
            "L'enfant gagne son temps de divertissement en apprenant. Exemple : 10 min d'apprentissage → 20 min de divertissement (ratio réglable).",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary">
                <path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
        ),
        gradient: "from-blue-500/10 to-primary/10",
    },
    {
        num: "02",
        title: "Missions réelles",
        description:
            "Vous créez des missions (lit, devoirs…). L'enfant envoie une photo, vous validez, et du temps bonus s'ajoute.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary">
                <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        gradient: "from-primary/10 to-primary-light/10",
    },
    {
        num: "03",
        title: "Plages horaires",
        description:
            "École, nuit, repas : le divertissement se bloque automatiquement aux moments définis. Sans rappels, sans négociation.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary">
                <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        gradient: "from-primary-light/10 to-cyan-300/10",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
    }),
};

export default function HowItWorks() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <Section alt id="how" curve curveColor="white">
            <Container>
                <div className="text-center mb-14">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-4">
                        Comment ça marche
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        Simple comme <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">1, 2, 3</span>
                    </h2>
                </div>

                <div ref={ref} className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.num}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className={`relative bg-white rounded-3xl p-8 shadow-sm border border-slate-100 card-hover group overflow-hidden`}
                        >
                            {/* Hover gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-2xl bg-primary-very-light flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        {step.icon}
                                    </div>
                                    <span className="text-sm font-bold text-primary/30 group-hover:text-primary/50 transition-colors">
                                        {step.num}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
