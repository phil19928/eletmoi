import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Section from "../components/Section";
import Container from "../components/Container";

const features = [
    {
        title: "Deux applis, un cadre",
        description: "Une app parent, une app enfant. Chacun son espace, règles claires.",
        emoji: "📱",
    },
    {
        title: "Temps gagné visible",
        description: "Un compteur simple : l'enfant voit ce qu'il gagne et ce qu'il dépense.",
        emoji: "⏱",
    },
    {
        title: "Ratio réglable",
        description: "Vous choisissez la règle : 1→2, 1→3… selon votre famille.",
        emoji: "⚙️",
    },
    {
        title: "Validation photo",
        description: "Mission accomplie → photo → validation → bonus.",
        emoji: "📸",
    },
    {
        title: "Blocage par plages",
        description: "École, nuit, repas : le divertissement se bloque automatiquement.",
        emoji: "🔒",
    },
    {
        title: "Sans bruit",
        description: "Moins de notifications, moins de négociations : le cadre fait le travail.",
        emoji: "🤫",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
};

export default function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <Section id="features" curve curveColor="alt">
            <Container>
                <div className="text-center mb-14">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-4">
                        Fonctionnalités
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        Tout ce qu'il faut.{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">Rien de plus.</span>
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">
                        Des outils simples pour un cadre efficace, sans complexité inutile.
                    </p>
                </div>

                <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="bg-white rounded-3xl p-7 border border-slate-100 card-hover group cursor-default"
                        >
                            <motion.div
                                className="w-14 h-14 rounded-2xl bg-primary-very-light flex items-center justify-center mb-5 text-2xl"
                                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                transition={{ duration: 0.4 }}
                            >
                                {feature.emoji}
                            </motion.div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
