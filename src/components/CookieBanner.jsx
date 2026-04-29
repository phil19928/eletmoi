import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENTIONS_LEGALES_URL } from "../config";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setVisible(false);
    };

    const handleRefuse = () => {
        localStorage.setItem("cookie-consent", "refused");
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
                >
                    <div className="max-w-2xl mx-auto glass rounded-2xl border border-white/50 shadow-2xl shadow-slate-900/10 p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    Nous utilisons des cookies essentiels pour le fonctionnement du site.{" "}
                                    <a
                                        href={MENTIONS_LEGALES_URL}
                                        className="text-primary hover:text-primary-dark underline underline-offset-2 transition-colors"
                                    >
                                        Mentions légales
                                    </a>
                                </p>
                            </div>
                            <div className="flex w-full sm:w-auto items-center gap-2.5 flex-shrink-0">
                                <motion.button
                                    onClick={handleRefuse}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex-1 sm:flex-none px-5 py-2 rounded-xl text-sm font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                                >
                                    Refuser
                                </motion.button>
                                <motion.button
                                    onClick={handleAccept}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex-1 sm:flex-none px-5 py-2 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-dark shadow-md shadow-primary/20 transition-colors cursor-pointer"
                                >
                                    Accepter
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
