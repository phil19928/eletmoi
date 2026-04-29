import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Container from "../components/Container";

const valueProps = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
        ),
        text: "100% gratuit au lancement",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                <path d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
        ),
        text: "Accès direct aux développeurs",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
        ),
        text: "Vos idées dans la prochaine version",
    },
];

export default function BetaTesters() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section id="beta" className="relative py-24 sm:py-28 overflow-hidden bg-gradient-to-b from-primary-very-light/40 via-white to-white">
            {/* Subtle blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <Container className="relative z-10">
                <div ref={ref} className="max-w-2xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-6"
                    >
                        Lancement imminent
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
                    >
                        Vous ne téléchargez pas une app.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                            Vous construisez la vôtre.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="mt-6 text-lg text-slate-500 leading-relaxed"
                    >
                        El&Moi sort très bientôt. Vous faites partie des premiers parents à découvrir,
                        à critiquer, à façonner l'app. Votre avis change le produit.
                        Littéralement.
                    </motion.p>

                    {/* Value props strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0"
                    >
                        {valueProps.map((prop, i) => (
                            <div key={i} className="flex items-center gap-3">
                                {i > 0 && (
                                    <div className="hidden sm:block w-px h-8 bg-slate-200 mr-6" />
                                )}
                                <div className="w-10 h-10 rounded-xl bg-primary-very-light flex items-center justify-center flex-shrink-0">
                                    {prop.icon}
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{prop.text}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
