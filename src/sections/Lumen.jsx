import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "../components/Button";
import lumenAvatar from "../assets/Lumen2.png";
import SectionLink from "../components/SectionLink";
import { PARENT_APP_URL } from "../config";


// ─── Icons ───────────────────────────────────────────────────────────────────

function IconParent() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

// ─── Données ─────────────────────────────────────────────────────────────────

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

const TOTAL_FORMATIONS = univers.reduce((n, u) => n + u.formations.length, 0);
const PUBLICS = [...new Set(univers.flatMap((u) => u.formations.flatMap((f) => f.ages)))];

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
                Les microformations Lumen sont intégrées à El&Moi — rien à installer, rien à classer.{" "}
                <span className="text-slate-700 font-medium">Lumen propose, l'enfant s'engage, le temps se débloque.</span>
            </motion.p>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10 grid grid-cols-3 divide-x divide-slate-200 max-w-xl mx-auto"
            >
                {[
                    { num: String(TOTAL_FORMATIONS), label: "microformations", sub: "5–8 min · quiz final" },
                    { num: String(univers.length), label: "univers cyber", sub: "cybersec & numérique" },
                    { num: String(PUBLICS.length), label: "publics cibles", sub: PUBLICS.join(" · ") },
                ].map((s, i) => (
                    <motion.div
                        key={s.num}
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.45, delay: 0.65 + i * 0.1 }}
                        className="flex flex-col items-center text-center px-4 py-2"
                    >
                        <div className="text-3xl sm:text-4xl font-extrabold text-primary-dark tracking-tight">{s.num}</div>
                        <div className="text-sm font-semibold text-slate-800 mt-1">{s.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5 leading-snug">{s.sub}</div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

function CatalogueSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

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
                    {univers.length} univers de microformation
                </h3>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="mb-6 flex flex-wrap justify-center gap-2.5"
            >
                {[
                    `${TOTAL_FORMATIONS} microformations`,
                    `${PUBLICS.length} publics`,
                    "5–8 min",
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
            desc: "Microformations complétées, quiz réussis, temps gagné — tout est visible depuis l'Accès Parent.",
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
                                Accès Parent
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
                            Rejoignez les premières familles qui placent l'apprentissage et la préparation au cœur de la relation de leurs enfants avec les écrans.
                        </p>
                        <Button href={PARENT_APP_URL} className="w-full sm:w-auto !px-8 !py-4 !rounded-2xl">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                            </svg>
                            Accès Parent
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
                <SectionLink to="/lumen">Découvrir les parcours Lumen</SectionLink>
            </div>
        </section>
    );
}
