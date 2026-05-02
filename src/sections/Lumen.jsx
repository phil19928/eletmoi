import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Button from "../components/Button";
import lumenAvatar from "../assets/Lumen2.png";

const INSTAGRAM_URL =
    "https://www.instagram.com/eletmoi.app?igsh=MXJzZTkxcmF2OHU0ZQ%3D%3D&utm_source=qr";

// ─── Icons ───────────────────────────────────────────────────────────────────

function IconBook() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
    );
}

function IconShield() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
    );
}

function IconChat() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
    );
}

function IconStar() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
    );
}

function IconParent() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

function IconActivity() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
    );
}

function IconTask() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function IconFish() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ─── Données ─────────────────────────────────────────────────────────────────

const ways = [
    {
        icon: <IconBook />,
        color: "bg-secondary-very-light text-secondary-dark",
        accent: "border-secondary/30",
        bar: "from-secondary/20 via-secondary to-secondary/20",
        tag: "Smartloop",
        title: "Apps éducatives",
        subtitle: "Apprendre sur ses apps préférées",
        description:
            "Duolingo, Khan Academy, Photomath… Le temps passé sur les apps catégorisées comme apprentissage par le parent alimente directement le compteur Smartloop.",
        example: "10 min sur Duolingo → 20 min de Netflix",
    },
    {
        icon: <IconShield />,
        color: "bg-primary-very-light text-primary-dark",
        accent: "border-primary/30",
        bar: "from-primary/20 via-primary to-primary/20",
        tag: "Contenu expert",
        title: "Microformations",
        subtitle: "Des contenus adaptés à chaque public",
        description:
            "Un catalogue de microformations courtes (3–5 min) organisées en univers, sur la cybersécurité et l'éducation numérique. Chaque contenu est calibré pour les 8–11, 12–14, 15–17 ou adultes.",
        example: "Finir une microformation → gagner du temps",
    },
];

const ageTabs = [
    {
        label: "8–11 ans",
        emoji: "🐣",
        color: "bg-amber-50 text-amber-700 border-amber-200",
        activeColor: "bg-amber-500 text-white",
        cardColor: "bg-amber-50 border-amber-200/70",
        tagColor: "bg-amber-100 text-amber-700",
        title: "Langage simple, analogies ludiques",
        topic: "Exemple : Créer un mot de passe sécurisé",
        content:
            "Un mot de passe, c'est comme la clé de ta maison. Si tu la donnes à tout le monde, n'importe qui peut entrer chez toi. Ton mot de passe, c'est pareil — garde-le secret, même avec tes meilleurs amis !",
        badge: "Vocabulaire enfantin · Analogies du quotidien",
    },
    {
        label: "12–14 ans",
        emoji: "🚀",
        color: "bg-secondary-very-light text-secondary-dark border-secondary/30",
        activeColor: "bg-secondary text-white",
        cardColor: "bg-secondary-very-light border-secondary/20",
        tagColor: "bg-secondary/10 text-secondary-dark",
        title: "Exemples concrets, mise en pratique",
        topic: "Exemple : Créer un mot de passe sécurisé",
        content:
            "\"MonChien-Mange-3-Bananes!\" est 1 000 fois plus sûr que \"password123\". Pourquoi ? Il est long, mélange majuscules, chiffres et symboles, et n'est pas un vrai mot. N'utilise jamais le même mot de passe sur deux sites différents.",
        badge: "Exemples réels · Règles pratiques",
    },
    {
        label: "15–17 ans",
        emoji: "⚡",
        color: "bg-primary-very-light text-primary-dark border-primary/20",
        activeColor: "bg-primary-dark text-white",
        cardColor: "bg-primary-very-light border-primary/20",
        tagColor: "bg-primary/10 text-primary-dark",
        title: "Cas pratiques avancés, outils pros",
        topic: "Exemple : Créer un mot de passe sécurisé",
        content:
            "Utilise un gestionnaire de mots de passe (Bitwarden, 1Password). Active l'authentification à deux facteurs (2FA) partout où c'est possible. Ne réutilise jamais un mot de passe. Si un service est compromis, change immédiatement.",
        badge: "Outils réels · Cas avancés · Best practices",
    },
    {
        label: "Adulte",
        emoji: "🧭",
        color: "bg-slate-100 text-slate-700 border-slate-200",
        activeColor: "bg-slate-800 text-white",
        cardColor: "bg-slate-50 border-slate-200",
        tagColor: "bg-slate-200 text-slate-700",
        title: "Contexte parent, prévention et bons réflexes",
        topic: "Exemple : Créer un mot de passe sécurisé",
        content:
            "Pour protéger toute la famille, privilégiez un gestionnaire de mots de passe, activez la 2FA sur les comptes sensibles et vérifiez régulièrement les accès partagés. L'objectif est d'installer des réflexes simples, applicables au quotidien.",
        badge: "Vision parent · Prévention familiale · Actions concrètes",
    },
];

const univers = [
    {
        emoji: "🛡️",
        title: "Menaces & Arnaques",
        shortTitle: "Menaces",
        source: "source : cybermalveillance.gouv.fr",
        color: "bg-red-50 border-red-200/70",
        tagColor: "bg-red-100 text-red-700",
        accentColor: "from-red-400 to-red-500",
        pitch: "Déjouer les pièges avant le clic",
        mood: "Des scénarios du quotidien pour reconnaître les signaux faibles et éviter les arnaques.",
        takeaways: ["Messages suspects", "Faux cadeaux", "Achats en ligne"],
        formations: [
            { label: "Hameçonnage / Phishing — email, SMS, appel", ages: ["8–11", "12–14", "15–17", "Adulte"] },
            { label: "Les 9 signes d'un message suspect", ages: ["8–11", "12–14", "15–17", "Adulte"] },
            { label: "Arnaques aux faux concours & cadeaux", ages: ["8–11", "12–14", "15–17", "Adulte"] },
            { label: "Faux support technique (Microsoft, Apple qui appellent)", ages: ["12–14", "15–17", "Adulte"] },
            { label: "Usurpation d'identité", ages: ["12–14", "15–17", "Adulte"] },
            { label: "Ransomware (rançon numérique)", ages: ["15–17", "Adulte"] },
            { label: "Arnaques aux achats en ligne", ages: ["8–11", "12–14", "15–17", "Adulte"] },
            { label: "Vishing (arnaques par téléphone vocal)", ages: ["15–17", "Adulte"] },
        ],
    },
    {
        emoji: "🔐",
        title: "Sécurité personnelle",
        shortTitle: "Sécurité",
        source: null,
        color: "bg-primary-very-light border-primary/20",
        tagColor: "bg-primary/10 text-primary-dark",
        accentColor: "from-primary to-primary-dark",
        pitch: "Installer les bons réflexes de protection",
        mood: "Des gestes simples qui rendent les comptes, les appareils et les connexions plus sûrs.",
        takeaways: ["Mots de passe", "2FA", "Appareils protégés"],
        formations: [
            { label: "Mots de passe — créer, ne pas partager", ages: ["8–11", "12–14", "15–17", "Adulte"] },
            { label: "Double authentification (2FA)", ages: ["12–14", "15–17", "Adulte"] },
            { label: "Gestionnaire de mots de passe", ages: ["15–17", "Adulte"] },
            { label: "Wi-Fi public — les risques", ages: ["12–14", "15–17", "Adulte"] },
            { label: "Mises à jour & correctifs de sécurité", ages: ["15–17", "Adulte"] },
            { label: "Sauvegardes numériques", ages: ["15–17", "Adulte"] },
            { label: "Antivirus & protection de l'appareil", ages: ["12–14", "15–17", "Adulte"] },
        ],
    },
    {
        emoji: "📊",
        title: "Données & Vie privée",
        shortTitle: "Vie privée",
        source: null,
        color: "bg-secondary-very-light border-secondary/20",
        tagColor: "bg-secondary/10 text-secondary-dark",
        accentColor: "from-secondary to-secondary-dark",
        pitch: "Comprendre ce que l'on laisse derrière soi",
        mood: "Une lecture claire des données personnelles, de la géolocalisation et de la réputation numérique.",
        takeaways: ["Vie privée", "Cookies", "Réputation"],
        formations: [
            { label: "C'est quoi une donnée personnelle ?", ages: ["8–11", "12–14", "15–17"] },
            { label: "Privacy-by-design & RGPD", ages: ["15–17", "Adulte"] },
            { label: "Cookies & trackers pub", ages: ["12–14", "15–17", "Adulte"] },
            { label: "Géolocalisation — qui te suit ?", ages: ["8–11", "12–14", "15–17", "Adulte"] },
            { label: "Empreinte numérique & réputation", ages: ["12–14", "15–17", "Adulte"] },
            { label: "Cambridge Analytica & scandales data", ages: ["15–17", "Adulte"] },
        ],
    },
    {
        emoji: "🤖",
        title: "Intelligence artificielle & Désinformation",
        shortTitle: "IA & info",
        source: null,
        color: "bg-violet-50 border-violet-200/70",
        tagColor: "bg-violet-100 text-violet-700",
        accentColor: "from-violet-400 to-violet-600",
        pitch: "Garder son esprit critique face aux contenus",
        mood: "IA, deepfakes, biais et fake news deviennent concrets, sans jargon inutile.",
        takeaways: ["Deepfakes", "Fake news", "IA générative"],
        formations: [
            { label: "C'est quoi l'IA ? — en simple", ages: ["8–11", "12–14", "15–17", "Adulte"] },
            { label: "Comment fonctionne ChatGPT/Claude/etc. ?", ages: ["15–17", "Adulte"] },
            { label: "Deepfakes — voir ne suffit plus", ages: ["12–14", "15–17", "Adulte"] },
            { label: "Fake news & vérification de l'info", ages: ["12–14", "15–17", "Adulte"] },
            { label: "Biais algorithmiques", ages: ["15–17", "Adulte"] },
            { label: "IA & droit d'auteur, plagiat", ages: ["15–17", "Adulte"] },
            { label: "Phishing par IA (emails générés, voix clonée)", ages: ["15–17", "Adulte"] },
        ],
    },
    {
        emoji: "📱",
        title: "Réseaux sociaux & Usages",
        shortTitle: "Réseaux sociaux",
        source: null,
        color: "bg-amber-50 border-amber-200/70",
        tagColor: "bg-amber-100 text-amber-700",
        accentColor: "from-amber-400 to-amber-500",
        pitch: "Naviguer sans subir les plateformes",
        mood: "Des repères pour publier, signaler, gérer son temps et reconnaître les situations à risque.",
        takeaways: ["Profil privé", "Signalement", "Cyberharcèlement"],
        formations: [
            { label: "Profil public vs privé", ages: ["8–11", "12–14", "15–17", "Adulte"] },
            { label: "Algorithmes — pourquoi cette vidéo ?", ages: ["12–14", "15–17", "Adulte"] },
            { label: "Bulles de filtre", ages: ["15–17", "Adulte"] },
            { label: "Cyberharcèlement — reconnaître & réagir", ages: ["8–11", "12–14", "15–17", "Adulte"] },
            { label: "Signaler un contenu", ages: ["8–11", "12–14", "15–17", "Adulte"] },
            { label: "Temps d'écran & dopamine", ages: ["12–14", "15–17", "Adulte"] },
            { label: "Grooming & manipulation en ligne", ages: ["12–14", "15–17"] },
        ],
    },
];

// ─── Sub-sections ─────────────────────────────────────────────────────────────

function HeroLumen() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <div ref={ref} className="text-center max-w-3xl mx-auto">
            {/* Lumen badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-6 border border-primary/20"
            >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Notre Agent
            </motion.div>

            {/* Lumen avatar */}
            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 120 }}
                className="mb-6 flex justify-center"
            >
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl scale-110 pointer-events-none" />
                    <img
                        src={lumenAvatar}
                        alt="Lumen, l'agent IA d'El&Moi"
                        className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-xl shadow-primary/20 border-4 border-white"
                        style={{ animation: "float 5s ease-in-out infinite" }}
                    />
                    <span className="absolute -bottom-2 -right-2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-md border-2 border-white">
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                    </span>
                </div>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight text-balance"
            >
                Lumen — votre enfant choisit{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary-dark">
                    comment gagner son temps d'écran.
                </span>
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto"
            >
                Apps d'apprentissage ou formations numériques.{" "}
                <span className="text-slate-700 font-medium">Lumen propose, l'enfant s'engage, le temps se débloque.</span>
            </motion.p>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10 flex flex-wrap items-start justify-center gap-8 sm:gap-12"
            >
                {[
                    { num: "35", label: "microformations", sub: "3–5 min · quiz final" },
                    { num: "5", label: "univers cyber", sub: "cybersec & numérique" },
                    { num: "4", label: "publics cibles", sub: "8–11 · 12–14 · 15–17 · Adulte" },
                ].map((s, i) => (
                    <motion.div
                        key={s.num}
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.45, delay: 0.65 + i * 0.1 }}
                        className="text-center"
                    >
                        <div className="text-4xl sm:text-5xl font-extrabold text-primary-dark tracking-tight">{s.num}</div>
                        <div className="text-sm font-semibold text-slate-800 mt-1">{s.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

function WaysSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <div ref={ref} className="mt-20 sm:mt-24 -mx-5 border-y border-white/70 bg-white/45 px-5 py-10 backdrop-blur-sm sm:-mx-6 sm:px-6 sm:py-12 lg:-mx-8 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-4">
                    3 façons de gagner du temps
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                    Apprendre, c'est gagner
                </h3>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-5">
                {ways.map((way, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: i * 0.12 }}
                        className={`group relative overflow-hidden bg-white rounded-3xl p-6 border ${way.accent} shadow-sm hover:shadow-lg transition-all duration-300 card-hover`}
                    >
                        <div className={`absolute inset-x-8 top-0 h-1 rounded-b-full bg-gradient-to-r ${way.bar} opacity-80 transition-all duration-300 group-hover:inset-x-6`} />
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${way.color} mb-4`}>
                            {way.icon}
                        </div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 ${way.color} opacity-80`}>
                            {way.tag}
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">{way.title}</h4>
                        <p className="text-sm text-slate-500 font-medium mb-3">{way.subtitle}</p>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">{way.description}</p>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
                            <span className="text-[11px] text-slate-400 font-mono leading-relaxed">{way.example}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function CatalogueSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const totalFormations = univers.reduce((acc, u) => acc + u.formations.length, 0);

    return (
        <div ref={ref} className="mt-20 sm:mt-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-4">
                    Catalogue Lumen
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                    5 univers de microformation
                </h3>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="mb-6 flex flex-wrap justify-center gap-2.5"
            >
                {[
                    `${totalFormations} microformations`,
                    "4 publics",
                    "3–5 min",
                    "Quiz final",
                ].map((label) => (
                    <span key={label} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm">
                        {label}
                    </span>
                ))}
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3">
                {univers.map((u, i) => (
                    <motion.div
                        key={u.title}
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ duration: 0.45, delay: i * 0.08 }}
                        className={`group relative max-w-full overflow-hidden rounded-full border px-4 py-3 sm:px-5 sm:py-3.5 ${u.color} shadow-sm hover:shadow-lg hover:shadow-slate-200/70 transition-shadow duration-300`}
                    >
                        <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${u.accentColor} opacity-70 transition-opacity duration-300 group-hover:opacity-100`} />
                        <div className="relative z-10 flex min-w-0 flex-wrap items-center justify-center gap-2 sm:gap-3">
                            <span className="text-2xl leading-none" aria-hidden="true">{u.emoji}</span>
                            <span className="text-sm sm:text-base font-extrabold text-slate-900 sm:hidden">
                                {u.shortTitle}
                            </span>
                            <span className="hidden text-sm sm:inline sm:text-base font-extrabold text-slate-900 whitespace-nowrap">
                                {u.title}
                            </span>
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${u.tagColor}`}>
                                {u.formations.length} formations
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function AgeSection() {
    const [active, setActive] = useState(1);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const tab = ageTabs[active];

    return (
        <div ref={ref} className="mt-20 sm:mt-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-4">
                    Adapté à chaque âge
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                    Le même sujet.{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                        Quatre publics.
                    </span>
                </h3>
                <p className="mt-3 text-slate-500 max-w-xl mx-auto">
                    Lumen adapte le vocabulaire, les exemples et la profondeur de chaque microformation selon le public concerné.
                </p>
            </motion.div>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-wrap justify-center gap-2 mb-8"
            >
                {ageTabs.map((t, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-pressed={active === i}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            active === i
                                ? t.activeColor + " shadow-md"
                                : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                    >
                        <span>{t.emoji}</span>
                        {t.label}
                    </button>
                ))}
            </motion.div>

            {/* Card */}
            <div className="max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`rounded-3xl border p-7 sm:p-8 ${tab.cardColor}`}
                    >
                        <div className="flex items-start gap-4 mb-5">
                            <div className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl ${tab.tagColor} text-lg font-bold flex-shrink-0`}>
                                {tab.emoji}
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-0.5">{tab.topic}</p>
                                <h4 className="text-base font-bold text-slate-900">{tab.title}</h4>
                            </div>
                        </div>

                        {/* Chat bubble style */}
                        <div className="bg-white rounded-2xl p-5 border border-white shadow-sm mb-4">
                            <div className="flex items-start gap-3">
                                <img src={lumenAvatar} alt="Lumen" className="w-8 h-8 rounded-full object-cover border border-primary/20 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[11px] font-bold text-primary-dark uppercase tracking-widest mb-2">Lumen</p>
                                    <p className="text-slate-700 text-sm leading-relaxed">{tab.content}</p>
                                </div>
                            </div>
                        </div>

                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${tab.tagColor}`}>
                            {tab.badge}
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function ParentSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    const perks = [
        {
            title: "Accès au catalogue complet",
            desc: "Le parent voit toutes les microformations disponibles et peut se former lui-même sur les mêmes sujets.",
        },
        {
            title: "Suivi de progression en temps réel",
            desc: "Microformations complétées, quiz réussis, temps gagné — tout est visible dans le tableau de bord parent.",
        },
    ];

    return (
        <div ref={ref} className="mt-20 sm:mt-24">
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-primary-dark overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative z-10 p-8 sm:p-12">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold tracking-wide uppercase mb-6 border border-white/20">
                                <IconParent />
                                App Parent
                            </span>
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                                Le parent aussi<br />
                                <span className="text-primary-light">est dans la boucle</span>
                            </h3>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Vous savez exactement ce que votre enfant apprend. Et vous pouvez suivre les mêmes microformations pour en parler ensemble.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            {perks.map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.12 }}
                                    className="flex items-start gap-4 bg-white/8 rounded-2xl p-4 border border-white/10"
                                >
                                    <span className="w-8 h-8 rounded-xl bg-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary-light">
                                            <path d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </span>
                                    <div>
                                        <p className="text-white font-semibold text-sm mb-0.5">{p.title}</p>
                                        <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CTALumen() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mt-10 sm:mt-14 text-center"
        >
            <div className="inline-block max-w-xl w-full">
                <div className="relative rounded-3xl bg-gradient-to-br from-primary-very-light via-white to-secondary-very-light border border-primary/20 p-8 sm:p-10 overflow-hidden shadow-lg shadow-primary/10">
                    <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                    </div>
                    <div className="relative z-10">
                        <img src={lumenAvatar} alt="Lumen" className="w-16 h-16 rounded-full object-cover shadow-lg shadow-primary/20 border-2 border-white mx-auto mb-5" style={{ animation: "float 5s ease-in-out infinite" }} />
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                            Parmi les premières familles
                        </h3>
                        <p className="text-slate-500 mb-7 leading-relaxed">
                            Rejoignez la communauté El&Moi sur Instagram pour suivre le lancement de Lumen et être notifié en avant-première.
                        </p>
                        <Button href={INSTAGRAM_URL} className="w-full sm:w-auto !px-8 !py-4 !rounded-2xl">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                            Suivre le lancement sur Instagram
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function Lumen() {
    return (
        <section id="lumen" className="section-lumen-bg relative pt-20 sm:pt-24 lg:pt-28 pb-6 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/4 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/4 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
                <HeroLumen />
                <CatalogueSection />
                <ParentSection />
                <CTALumen />
            </div>
        </section>
    );
}
