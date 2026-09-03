import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import elephantMascot from "../assets/logo-eletmoi.png";
import { PARENT_APP_URL } from "../config";

/**
 * La navigation ramène aux sections de l'accueil, pas aux pages produit.
 *
 * L'accueil est le parcours de présentation : cliquer « Smartloop » doit y
 * conduire, pas ouvrir une page de fond. Les pages produit restent
 * accessibles depuis le lien « En savoir plus » de chaque section et depuis le
 * pied de page. Seul « Blog » mène à une page, parce que c'est un univers à
 * part entière.
 *
 * Le chemin « / » devant l'ancre est indispensable : depuis /blog/un-article,
 * un simple « #smartloop » ne mènerait nulle part.
 */
const NAV_ITEMS = [
    { to: "/#smartloop", label: "Smartloop" },
    { to: "/#lumen", label: "Lumen" },
    { to: "/#tarifs", label: "Tarifs" },
    { to: "/blog", label: "Blog" },
];

const navLink =
    "hidden md:inline text-sm transition-colors font-medium";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            aria-label="Navigation principale"
            className={`animate-enter-nav fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "glass shadow-lg shadow-slate-900/5 border-b border-white/40"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <Link to="/" aria-label="Retour à l'accueil" className="flex items-center gap-2.5 group">
                    <img src={elephantMascot} alt="El&Moi" className="w-8 h-8" />
                    <span className="text-xl font-bold tracking-tight font-display text-slate-900">
                        El<span className="text-primary group-hover:text-primary-dark transition-colors">&</span>Moi
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Pages réelles, plus des ancres : depuis /blog/... une ancre
                        « #smartloop » ne mènerait nulle part. La page courante est
                        signalée, sinon on ne sait plus où l'on est. */}
                    {NAV_ITEMS.map((item) => {
                        // Seules les entrées qui mènent à une page peuvent
                        // être « courantes » ; une ancre ne l'est jamais.
                        const active =
                            !item.to.includes("#") &&
                            (pathname === item.to || pathname.startsWith(`${item.to}/`));
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                aria-current={active ? "page" : undefined}
                                className={`${navLink} ${
                                    active
                                        ? "text-primary-dark border-b-2 border-primary pb-0.5"
                                        : "text-slate-500 hover:text-primary"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    {/* CTA button */}
                    <motion.a
                        href={PARENT_APP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Ouvrir l'Accès Parent El&Moi"
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-md hover:shadow-lg hover:border-slate-300 transition-all duration-200"
                    >
                        <span className="w-7 h-7 rounded-lg bg-primary-very-light flex items-center justify-center flex-shrink-0 text-primary">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                            </svg>
                        </span>
                        <span className="text-sm font-normal tracking-tight text-slate-900">Accès Parent</span>
                    </motion.a>
                </div>
            </div>
        </nav>
    );
}
