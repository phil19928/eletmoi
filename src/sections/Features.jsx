import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Section from "../components/Section";
import Container from "../components/Container";

const features = [
  {
    title: "Deux applis, un seul cadre",
    description:
      "L'app Parent (web) contrôle. L'app Enfant (Android) applique. Connectées par QR code en 5 mins.",
    visual: (
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        {/* Parent phone */}
        <div className="w-20 sm:w-24 h-36 sm:h-44 rounded-2xl border-2 border-primary/30 bg-primary-very-light/50 flex flex-col items-center justify-center gap-2 relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7A9E88"
            strokeWidth="1.5"
            className="w-8 h-8"
          >
            <path
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[10px] font-semibold text-primary-dark">
            Parent
          </span>
        </div>
        {/* QR code */}
        <div className="flex flex-col items-center gap-1">
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center bg-white"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7A9E88"
              strokeWidth="1.5"
              className="w-7 h-7"
            >
              <path
                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <span className="text-[9px] text-slate-400 font-medium">QR Code</span>
        </div>
        {/* Child phone */}
        <div className="w-20 sm:w-24 h-36 sm:h-44 rounded-2xl border-2 border-secondary/30 bg-secondary-very-light/50 flex flex-col items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" fill="#6D98C2" className="w-8 h-8">
            <path d="M17.523 2.226a.75.75 0 010 1.06l-1.706 1.707A6.467 6.467 0 0118.5 10.5h-13a6.467 6.467 0 012.683-5.507L6.477 3.286a.75.75 0 011.06-1.06l1.96 1.96a6.43 6.43 0 015.006 0l1.96-1.96a.75.75 0 011.06 0zM8.25 8.25a.75.75 0 100 1.5.75.75 0 000-1.5zm7.5 0a.75.75 0 100 1.5.75.75 0 000-1.5zM5.5 12v5.5A2.5 2.5 0 008 20h8a2.5 2.5 0 002.5-2.5V12h-13z" />
          </svg>
          <span className="text-[10px] font-semibold text-secondary-dark">
            Enfant
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Chaque minute est visible",
    description:
      "Compteur en temps réel. Temps gagné, temps dépensé, temps restant. Pas de surprise.",
    visual: (
      <div className="flex flex-col items-center gap-4">
        {/* Timer display */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#EAF2FB"
              strokeWidth="8"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#6D98C2"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 52}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 52 * 0.35 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-2xl sm:text-3xl font-bold text-slate-900 font-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              42
            </motion.span>
            <span className="text-[10px] text-slate-400 font-medium">
              min restantes
            </span>
          </div>
        </div>
        {/* Mini stats */}
        <div className="flex gap-4 text-center">
          <div>
            <p className="text-sm font-bold text-emerald-600">+30</p>
            <p className="text-[10px] text-slate-400">gagnées</p>
          </div>
          <div className="w-px bg-slate-200" />
          <div>
            <p className="text-sm font-bold text-amber-500">-18</p>
            <p className="text-[10px] text-slate-400">utilisées</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Il ne peut pas tricher",
    description:
      "Protection anti-désinstallation. Blocage par plages horaires. Même hors ligne, les règles s'appliquent.",
    visual: (
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className="relative w-24 h-24 sm:w-28 sm:h-28"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Shield shape */}
            <motion.path
              d="M50 8 L88 28 L88 56 C88 76 68 92 50 96 C32 92 12 76 12 56 L12 28 Z"
              fill="#EDF3F0"
              stroke="#7A9E88"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            {/* Lock icon inside */}
            <rect x="38" y="46" width="24" height="20" rx="3" fill="#7A9E88" />
            <path
              d="M44 46 V38 C44 34 47 31 50 31 C53 31 56 34 56 38 V46"
              fill="none"
              stroke="#7A9E88"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="50" cy="56" r="3" fill="white" />
          </svg>
        </motion.div>
        <div className="flex gap-2">
          {["École", "Nuit", "Repas"].map((label) => (
            <span
              key={label}
              className="px-2.5 py-1 rounded-full bg-red-50 text-red-400 text-[10px] font-semibold border border-red-100"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

export default function Features() {
  return (
    <Section id="features">
      <Container>
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-4">
            Fonctionnalités
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Tout ce dont vous avez besoin.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              Rien de superflu.
            </span>
          </h2>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {features.map((feature, i) => (
            <FeatureRow key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FeatureRow({ feature, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
    >
      {/* Text */}
      <motion.div
        className={`${isEven ? "lg:order-1" : "lg:order-2"}`}
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          {feature.title}
        </h3>
        <p className="text-lg text-slate-500 leading-relaxed">
          {feature.description}
        </p>
      </motion.div>

      {/* Visual */}
      <motion.div
        className={`flex justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      >
        <div className="w-full max-w-sm p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-primary-very-light/30 border border-slate-100">
          {feature.visual}
        </div>
      </motion.div>
    </div>
  );
}
