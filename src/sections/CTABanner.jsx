import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GOOGLE_PLAY_URL } from "../config";
import Container from "../components/Container";
import Button from "../components/Button";
import elephantMascot from "../assets/Main El&Moi.png";

export default function CTABanner() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} className="relative py-24 sm:py-28 overflow-hidden">
            {/* Dark gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-dark animated-gradient" />

            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-light/8 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.04] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-white/[0.04] rounded-full" />

            <Container className="relative z-10">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-8"
                    >
                        <img
                            src={elephantMascot}
                            alt="Mascotte El&Moi"
                            className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl"
                            style={{ animation: "float 5s ease-in-out infinite" }}
                        />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight text-balance"
                    >
                        Prêt à changer les règles ?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-5 text-lg text-white/50 max-w-md mx-auto"
                    >
                        Rejoignez les familles qui construisent un cadre juste.
                        Gratuit pendant la bêta.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="mt-10"
                    >
                        <Button
                            href={GOOGLE_PLAY_URL}
                            className="!bg-white !text-slate-900 hover:!bg-slate-50 !shadow-xl !shadow-black/20 !px-8 !py-4 !text-base"
                            icon={
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                            }
                        >
                            Télécharger l'application Parent
                        </Button>
                    </motion.div>
                </div>
            </Container>

            {/* Shimmer */}
            <div className="absolute bottom-0 left-0 right-0 h-px shimmer overflow-hidden" />
        </section>
    );
}
