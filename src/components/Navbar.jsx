import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GOOGLE_PLAY_URL } from "../config";
import elephantMascot from "../assets/Main El&Moi.png";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "glass shadow-lg shadow-slate-900/5 border-b border-white/40"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <a href="#" className="flex items-center gap-2.5 group">
                    <img src={elephantMascot} alt="El&Moi" className="w-8 h-8" />
                    <span className="text-xl font-bold tracking-tight font-display text-slate-900">
                        El<span className="text-primary group-hover:text-primary-dark transition-colors">&</span>Moi
                    </span>
                </a>

                <div className="flex items-center gap-4">
                    <a href="#how" className="hidden md:inline text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                        Comment ça marche
                    </a>
                    <a href="#features" className="hidden md:inline text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                        Fonctionnalités
                    </a>
                    <a href="#faq" className="hidden md:inline text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                        FAQ
                    </a>

                    <motion.a
                        href={GOOGLE_PLAY_URL}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-200"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span className="hidden sm:inline">Télécharger</span>
                    </motion.a>
                </div>
            </div>
        </motion.nav>
    );
}
