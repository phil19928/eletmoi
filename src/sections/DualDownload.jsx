import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Section from "../components/Section";
import Container from "../components/Container";
import Button from "../components/Button";

const onboardingSteps = [
    { label: "On crée votre compte", note: null },
    { label: "On vous guide : configuration des deux apps", note: null },
    { label: "Téléchargez l'app Enfant", note: "Arrive bientôt sur App Store & Play Store" },
    { label: "C'est live !", note: null },
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
                        Prêt en{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                            5 à 10 minutes.
                        </span>
                    </h2>
                </div>

                <div ref={ref} className="max-w-xl mx-auto">

                    {/* Carte — Continuer sur la web-app (parcours onboarding) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="relative bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-primary/20 overflow-hidden group card-hover"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-dark to-primary transition-all duration-500 group-hover:h-2" />

                        <div className="flex items-center gap-4 mb-6 mt-2">
                            <div className="w-14 h-14 rounded-2xl bg-primary-very-light flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary-dark">
                                    <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Bientôt accessible</h3>
                                <p className="text-sm text-slate-400">Parcours guidé complet</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            {onboardingSteps.map((step, j) => (
                                <div key={j} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-very-light text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                                        {j + 1}
                                    </span>
                                    <div className="pt-0.5">
                                        <p className="text-slate-600 text-sm leading-relaxed">{step.label}</p>
                                        {step.note && (
                                            <p className="text-[11px] text-amber-600 mt-0.5 flex items-center gap-1">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 flex-shrink-0">
                                                    <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {step.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button href="https://eletmoi.app" className="w-full !justify-center !px-8 !py-4 !rounded-2xl !gap-4">
                            <span className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                                </svg>
                            </span>
                            <span className="text-lg font-normal tracking-tight">Commencer gratuitement</span>
                        </Button>

                        <p className="mt-4 text-xs text-slate-400 text-center">
                            App Enfant disponible très prochainement sur{" "}
                            <span className="text-primary-dark font-medium">App Store & Play Store.</span>
                        </p>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}
