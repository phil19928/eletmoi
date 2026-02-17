import { motion } from "framer-motion";
import { GOOGLE_PLAY_URL } from "../config";
import Container from "../components/Container";
import Button from "../components/Button";
import PhoneMockup from "../components/PhoneMockup";
import elephantMascot from "../assets/Main El&Moi.png";

const DownloadIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const floatingBadges = [
    { text: "📚 10 min d'apprentissage", x: "75%", y: "12%", delay: 1.2 },
    { text: "🎮 → 20 min gagnées !", x: "80%", y: "65%", delay: 1.8 },
];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-primary-very-light/30 to-white pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-16 lg:pb-0">
            {/* Animated background blobs */}
            <motion.div
                className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(109,152,194,0.12) 0%, transparent 70%)" }}
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(142,182,216,0.12) 0%, transparent 70%)" }}
                animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Spinning decorative ring */}
            <div className="absolute top-[15%] right-[8%] w-72 h-72 rounded-full border border-primary/[0.06] animate-spin-slow pointer-events-none hidden lg:block" />
            <div className="absolute bottom-[20%] left-[5%] w-48 h-48 rounded-full border border-primary/[0.04] animate-spin-slow pointer-events-none hidden lg:block" style={{ animationDirection: "reverse" }} />

            <Container className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left — Text */}
                    <div className="text-center lg:text-left order-2 lg:order-1">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold tracking-wide uppercase mb-8 border border-amber-200/50"
                        >
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            Bêta Android • Gratuit
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold tracking-tight text-slate-900 leading-[1.08] text-balance"
                        >
                            Moins de scroll.
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-blue-600 animated-gradient">
                                Plus de progrès.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-7 text-lg sm:text-xl text-slate-500 max-w-md mx-auto lg:mx-0 leading-relaxed"
                        >
                            Une règle simple : l'apprentissage fait gagner du temps de
                            divertissement. Moins de conflits, plus d'autonomie.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
                        >
                            {/* Single main CTA with pulse ring */}
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring pointer-events-none" />
                                <Button href={GOOGLE_PLAY_URL} icon={<DownloadIcon />} className="relative z-10 !px-8 !py-4 !text-base">
                                    Télécharger l'application Parent
                                </Button>
                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            className="mt-5 text-xs text-slate-400 text-center lg:text-left flex items-center gap-1.5 justify-center lg:justify-start"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Deux applis : une pour le parent, une pour l'enfant.
                        </motion.p>
                    </div>

                    {/* Right — Phone Mockup + Mascot */}
                    <div className="relative flex justify-center order-1 lg:order-2">
                        <PhoneMockup className="relative z-10" />

                        {/* Floating mascot */}
                        <motion.img
                            src={elephantMascot}
                            alt="Mascotte El&Moi — éléphant"
                            className="absolute -bottom-2 -left-4 sm:-left-10 w-28 sm:w-36 h-auto z-20 drop-shadow-xl"
                            initial={{ opacity: 0, x: -30, y: 20 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            style={{ animation: "float 5s ease-in-out 1.5s infinite" }}
                        />

                        {/* Floating badges */}
                        {floatingBadges.map((badge) => (
                            <motion.div
                                key={badge.text}
                                className="absolute hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/90 shadow-xl shadow-slate-900/8 text-xs font-semibold text-slate-700 border border-slate-100/80 backdrop-blur-sm z-30"
                                style={{ left: badge.x, top: badge.y }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: badge.delay, type: "spring" }}
                            >
                                {badge.text}
                            </motion.div>
                        ))}

                        {/* Large gradient blob behind phone */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[28rem] sm:h-[28rem] bg-gradient-to-br from-primary-very-light via-primary-light/20 to-cyan-100/30 rounded-full blur-3xl -z-0 pointer-events-none" />
                    </div>
                </div>
            </Container>

            {/* Curved divider */}
            <div className="curve-divider">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="#EAF2FB80">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6.01,71.42-16.31,105.56-28.91C957,34.44,1031.36,12.75,1100,21.72c32.35,4.22,63.58,14.68,100,27.53V0Z" />
                </svg>
            </div>
        </section>
    );
}
