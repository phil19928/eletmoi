import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white/60 py-12">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                    >
                        <span className="text-lg font-bold text-white font-display">
                            El<span className="text-primary">&</span>Moi
                        </span>
                        <span className="hidden sm:inline text-sm">·</span>
                        <span className="text-sm">Fabriqué avec ❤️ en France</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-6 text-sm"
                    >
                        <a
                            href="mailto:contact@eletmoi.fr"
                            className="hover:text-primary transition-colors"
                        >
                            contact@eletmoi.fr
                        </a>
                        <a
                            href="https://www.instagram.com/eletmoi.app?igsh=MXJzZTkxcmF2OHU0ZQ%3D%3D&utm_source=qr"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram El&Moi"
                            className="hover:text-primary transition-colors"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                    </motion.div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-3">
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/50">
                        <Link to="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</Link>
                        <Link to="/confidentialite" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
                        <Link to="/cgv" className="hover:text-primary transition-colors">CGV</Link>
                        <Link to="/cgu" className="hover:text-primary transition-colors">CGU</Link>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-xs text-white/30">
                        <a href="https://www.cs-associes.fr" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">Un produit de C&amp;S Associés</a>
                        <span>© {new Date().getFullYear()} El&amp;Moi. Tous droits réservés.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
