import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import mascotThumbsup from "../assets/mascot-thumbsup.png";

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
                            src={mascotThumbsup}
                            alt="Mascotte El&Moi"
                            className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl"
                            style={{ animation: "float 5s ease-in-out infinite" }}
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-primary-light text-sm font-semibold tracking-widest uppercase mb-4"
                    >
                        Bientôt disponible
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance"
                    >
                        Votre famille mérite<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">
                            mieux que des conflits.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="mt-5 text-lg text-white/50 max-w-lg mx-auto leading-relaxed"
                    >
                        Rejoignez les premières familles qui testent El&amp;Moi.
                        Suivez le lancement sur Instagram.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="mt-10 flex justify-center"
                    >
                        <Button
                            href="https://www.instagram.com/eletmoi.app?igsh=MXJzZTkxcmF2OHU0ZQ%3D%3D&utm_source=qr"
                            className="!bg-white !text-slate-900 hover:!bg-slate-50 !shadow-xl !shadow-black/20 !px-8 !py-4 !rounded-2xl !gap-4"
                        >
                            <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                                    <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                                </svg>
                            </span>
                            <span className="flex flex-col items-start leading-tight">
                                <span className="text-[10px] font-medium text-slate-400 tracking-widest uppercase">Arrive très vite —</span>
                                <span className="text-lg font-bold tracking-tight text-slate-900">Suivre le lancement</span>
                            </span>
                        </Button>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-6 text-sm text-white/30"
                    >
                        Aucune carte requise.
                    </motion.p>
                </div>
            </Container>

            {/* Shimmer */}
            <div className="absolute bottom-0 left-0 right-0 h-px shimmer overflow-hidden" />
        </section>
    );
}
