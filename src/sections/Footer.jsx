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
                    </motion.div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/40 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                    <Link to="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</Link>
                    <span>·</span>
                    <Link to="/confidentialite" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
                    <span>·</span>
                    <Link to="/cgv" className="hover:text-primary transition-colors">CGV</Link>
                    <span>·</span>
                    <Link to="/cgu" className="hover:text-primary transition-colors">CGU</Link>
                    <span className="hidden sm:inline">·</span>
                    <span className="w-full sm:w-auto">© {new Date().getFullYear()} El&amp;Moi. Tous droits réservés.</span>
                </div>
            </div>
        </footer>
    );
}
