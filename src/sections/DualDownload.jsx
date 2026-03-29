import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PARENT_APP_URL, CHILD_APK_URL } from "../config";
import Section from "../components/Section";
import Container from "../components/Container";
import Button from "../components/Button";

const cards = [
    {
        title: "App Parent",
        subtitle: "Application web (PWA)",
        accentColor: "from-primary to-primary-dark",
        steps: [
            "Ouvrez le lien sur votre telephone",
            "Ajoutez a l'ecran d'accueil",
            "Connectez-vous, c'est pret",
        ],
        button: "Ouvrir l'app Parent",
        url: PARENT_APP_URL,
        note: "Fonctionne sur tout navigateur mobile",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary">
                <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
        ),
    },
    {
        title: "App Enfant",
        subtitle: "Application Android (APK)",
        accentColor: "from-emerald-500 to-teal-600",
        steps: [
            "Telechargez le fichier APK",
            "Autorisez l'installation (on vous guide)",
            "Scannez le QR code depuis l'app Parent",
        ],
        button: "Telecharger l'APK Enfant",
        url: CHILD_APK_URL,
        note: "Android 8+ requis",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-emerald-600">
                <path d="M17.523 2.226a.75.75 0 010 1.06l-1.706 1.707A6.467 6.467 0 0118.5 10.5h-13a6.467 6.467 0 012.683-5.507L6.477 3.286a.75.75 0 011.06-1.06l1.96 1.96a6.43 6.43 0 015.006 0l1.96-1.96a.75.75 0 011.06 0zM8.25 8.25a.75.75 0 100 1.5.75.75 0 000-1.5zm7.5 0a.75.75 0 100 1.5.75.75 0 000-1.5zM5.5 12v5.5A2.5 2.5 0 008 20h8a2.5 2.5 0 002.5-2.5V12h-13z"/>
            </svg>
        ),
    },
];

export default function DualDownload() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <Section id="download" alt>
            <Container>
                <div className="text-center mb-14">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-4">
                        Installation
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        Pret en{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                            2 minutes.
                        </span>
                    </h2>
                </div>

                <div ref={ref} className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            className="relative bg-white rounded-3xl p-8 shadow-sm border border-slate-100 overflow-hidden group card-hover"
                        >
                            {/* Gradient top bar */}
                            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${card.accentColor} transition-all duration-500 group-hover:h-2`} />

                            <div className="flex items-center gap-4 mb-6 mt-2">
                                <div className="w-14 h-14 rounded-2xl bg-primary-very-light flex items-center justify-center">
                                    {card.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
                                    <p className="text-sm text-slate-400">{card.subtitle}</p>
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="space-y-4 mb-8">
                                {card.steps.map((step, j) => (
                                    <div key={j} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-very-light text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                                            {j + 1}
                                        </span>
                                        <p className="text-slate-600 text-sm leading-relaxed pt-0.5">{step}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Button */}
                            <Button href={card.url} className="w-full !justify-center">
                                {card.button}
                            </Button>

                            {/* Note */}
                            <p className="mt-4 text-xs text-slate-400 text-center">{card.note}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
