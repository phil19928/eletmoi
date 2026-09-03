import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "../components/Section";
import Container from "../components/Container";
import SectionLink from "../components/SectionLink";

function Check() {
  return (
    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.12" />
      <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dash() {
  return (
    <svg className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.08" />
      <path d="M5.5 8h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

const ESSENTIEL = [
  "Smartloop complète",
  "Contrôle app par app",
  "Donner / retirer du temps",
  "Plages horaires et blocage",
  "Notifications",
  "Suggestions d'apps",
  "1 module Lumen offert",
];

const FAMILLE = [
  "Tout dans Essentiel",
  "Modules Lumen en illimité",
  "Parents illimités",
  "Enfants et appareils illimités",
];

export default function Pricing() {
  const [billing, setBilling] = useState("annuel");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const isAnnual = billing === "annuel";

  return (
    <Section id="tarifs">
      <Container>
        <div ref={ref}>
          {/* Header */}
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-sm font-semibold tracking-wide mb-4"
            >
              Tarifs
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight text-balance"
            >
              Un prix simple.{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Pas de surprise.
              </span>
            </motion.h2>
          </div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-10"
          >
            <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-slate-200 shadow-sm">
              <button
                onClick={() => setBilling("mensuel")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  !isAnnual
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setBilling("annuel")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isAnnual
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Annuel
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold transition-all duration-200 ${
                    isAnnual
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary-dark"
                  }`}
                >
                  −37%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {/* Essentiel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col shadow-sm"
            >
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">El&amp;Moi</p>
                <h3 className="text-2xl font-bold font-display text-slate-900 mb-1">Essentiel</h3>
                <p className="text-slate-500 text-sm">Tout ce qu'il faut pour commencer.</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold font-display text-slate-900 leading-none">0</span>
                  <span className="text-xl text-slate-400 mb-1">€</span>
                </div>
                <p className="text-sm text-slate-400 mt-2">Gratuit, pour toujours.</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {ESSENTIEL.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check />
                    {f}
                  </li>
                ))}
                <li className="flex items-start gap-2.5 text-sm text-slate-400 pt-1 border-t border-slate-100 mt-1">
                  <Dash />
                  1 parent · 1 enfant · 1 appareil
                </li>
              </ul>

            </motion.div>

            {/* Famille */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl border-2 border-primary p-8 flex flex-col shadow-lg shadow-primary/10 relative"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                  Recommandé
                </span>
              </div>

              <div className="mb-6 mt-2">
                <p className="text-xs font-semibold text-primary-dark uppercase tracking-widest mb-2">El&amp;Moi</p>
                <h3 className="text-2xl font-bold font-display text-slate-900 mb-1">Famille</h3>
                <p className="text-slate-500 text-sm">Pour toute la famille.</p>
              </div>

              <div className="mb-8 min-h-[72px]">
                {isAnnual ? (
                  <>
                    <div className="flex items-end gap-3 mb-1">
                      <div className="flex items-end gap-1">
                        <span className="text-5xl font-bold font-display text-slate-900 leading-none">59,99</span>
                        <span className="text-xl text-slate-400 mb-1">€/an</span>
                      </div>
                      <span className="text-sm text-slate-400 line-through mb-1.5">95,88 €</span>
                    </div>
                    <p className="text-sm text-primary-dark font-semibold">
                      Soit 4,99 €/mois — économisez 37%
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-5xl font-bold font-display text-slate-900 leading-none">7,99</span>
                      <span className="text-xl text-slate-400 mb-1">€/mois</span>
                    </div>
                    <p className="text-sm text-slate-400">
                      Passez à l'annuel et économisez 37%.
                    </p>
                  </>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {FAMILLE.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>

            </motion.div>
          </div>

          {/* Reassurance */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-center text-sm text-slate-400 mt-8"
          >
            Sans engagement · Annulez quand vous voulez · Pas de carte bancaire requise pour l'offre gratuite
          </motion.p>
        </div>
        <SectionLink to="/tarifs">Voir le détail des formules</SectionLink>
      </Container>
    </Section>
  );
}
