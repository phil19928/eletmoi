import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PARENT_APP_URL } from "../config";
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
                    <a href="#smartloop" className="hidden md:inline text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                        Smartloop
                    </a>
                    <a href="#features" className="hidden md:inline text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                        Fonctionnalités
                    </a>
                    <a href="#faq" className="hidden md:inline text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                        FAQ
                    </a>

                    {/* CTA button */}
                    <motion.a
                        href={PARENT_APP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-200"
                    >
                        <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                            </svg>
                        </span>
                        <span className="flex flex-col items-start leading-tight">
                            <span className="text-[9px] font-medium opacity-75 tracking-widest uppercase">Continuer sur la</span>
                            <span className="text-sm font-bold tracking-tight">Web-app</span>
                        </span>
                    </motion.a>
                </div>
            </div>
        </motion.nav>
    );
}
