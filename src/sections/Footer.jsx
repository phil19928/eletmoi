import { motion } from "framer-motion";
import { MENTIONS_LEGALES_URL } from "../config";

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
                            href={MENTIONS_LEGALES_URL}
                            className="hover:text-primary transition-colors"
                        >
                            Mentions légales
                        </a>
                        <a
                            href="mailto:eletmoi.app@gmail.com"
                            className="hover:text-primary transition-colors"
                        >
                            eletmoi.app@gmail.com
                        </a>
                    </motion.div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/30">
                    © {new Date().getFullYear()} El&Moi. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
