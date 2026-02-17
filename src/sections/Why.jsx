import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Section from "../components/Section";
import Container from "../components/Container";

const principles = [
    {
        title: "Clarté",
        description:
            "Des règles simples et visibles. L'enfant sait toujours où il en est.",
        color: "from-blue-500 to-primary",
        icon: "👁",
    },
    {
        title: "Motivation",
        description:
            "Il gagne son temps. C'est un deal, pas une punition.",
        color: "from-primary to-primary-light",
        icon: "🎯",
    },
    {
        title: "Relation",
        description:
            "Moins de négociation, plus de confiance. Le cadre fait le travail.",
        color: "from-primary-light to-cyan-400",
        icon: "🤝",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
    }),
};

export default function Why() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <Section alt id="why" curve curveColor="white">
            <Container>
                <div className="text-center mb-14">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-4">
                        Pourquoi El&Moi
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        Construire un cadre,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">pas un mur.</span>
                    </h2>
                </div>

                <div ref={ref} className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {principles.map((principle, i) => (
                        <motion.div
                            key={principle.title}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="relative bg-white rounded-3xl p-8 shadow-sm border border-slate-100 overflow-hidden group card-hover"
                        >
                            {/* Gradient top bar */}
                            <div
                                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${principle.color} transition-all duration-500 group-hover:h-2`}
                            />

                            <div className="flex items-center gap-3 mb-5 mt-2">
                                <motion.div
                                    className="w-12 h-12 rounded-2xl bg-primary-very-light flex items-center justify-center text-xl"
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                >
                                    {principle.icon}
                                </motion.div>
                                <h3 className="text-xl font-bold text-slate-900">
                                    {principle.title}
                                </h3>
                            </div>

                            <p className="text-slate-500 leading-relaxed">
                                {principle.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
