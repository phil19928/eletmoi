import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PARENT_APP_URL, CHILD_APK_URL } from "../config";
import elephantMascot from "../assets/Main El&Moi.png";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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
                        Fonctionnalites
                    </a>
                    <a href="#faq" className="hidden md:inline text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                        FAQ
                    </a>

                    {/* Download dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <motion.button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-200"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            <span className="hidden sm:inline">Telecharger</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
                                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 overflow-hidden"
                                >
                                    <a
                                        href={PARENT_APP_URL}
                                        className="flex items-center gap-3 px-4 py-3.5 hover:bg-primary-very-light/50 transition-colors group"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-primary-very-light flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="#6D98C2" strokeWidth="1.5" className="w-5 h-5">
                                                <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">App Parent</p>
                                            <p className="text-xs text-slate-400">Application web</p>
                                        </div>
                                    </a>
                                    <div className="mx-4 h-px bg-slate-100" />
                                    <a
                                        href={CHILD_APK_URL}
                                        className="flex items-center gap-3 px-4 py-3.5 hover:bg-emerald-50/50 transition-colors group"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100/80 transition-colors">
                                            <svg viewBox="0 0 24 24" fill="#10B981" className="w-5 h-5">
                                                <path d="M17.523 2.226a.75.75 0 010 1.06l-1.706 1.707A6.467 6.467 0 0118.5 10.5h-13a6.467 6.467 0 012.683-5.507L6.477 3.286a.75.75 0 011.06-1.06l1.96 1.96a6.43 6.43 0 015.006 0l1.96-1.96a.75.75 0 011.06 0zM8.25 8.25a.75.75 0 100 1.5.75.75 0 000-1.5zm7.5 0a.75.75 0 100 1.5.75.75 0 000-1.5zM5.5 12v5.5A2.5 2.5 0 008 20h8a2.5 2.5 0 002.5-2.5V12h-13z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">App Enfant</p>
                                            <p className="text-xs text-slate-400">Fichier Android APK</p>
                                        </div>
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
