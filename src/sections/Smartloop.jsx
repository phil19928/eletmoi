import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Section from "../components/Section";
import Container from "../components/Container";
import SmartloopDiagram from "../components/SmartloopDiagram";
import SectionLink from "../components/SectionLink";

/* ── Visuel 1 : Classification des apps ─────────────────────────── */
function ClassifyVisual({ isInView }) {
  const learning = ["Duolingo", "Khan Academy", "GeoGebra"];
  const fun = ["YouTube", "Instagram", "TikTok"];

  return (
    <div className="flex gap-2 w-full">
      {/* Colonne Apprentissage */}
      <div className="flex-1 rounded-xl bg-primary-very-light p-2.5 border border-primary/20">
        <div className="flex items-center gap-1 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <p className="text-[9px] font-bold text-primary-dark uppercase tracking-wider">Apprentissage</p>
        </div>
        <div className="space-y-1">
          {learning.map((app, i) => (
            <motion.div
              key={app}
              className="flex items-center gap-1.5 bg-white rounded-lg px-2 py-1 shadow-sm"
              initial={{ opacity: 0, x: -6 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/30 flex-shrink-0" />
              <span className="text-[10px] font-medium text-slate-600">{app}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Séparateur */}
      <div className="flex items-center">
        <svg viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-4 text-slate-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l8 8-8 8" />
        </svg>
      </div>

      {/* Colonne Fun */}
      <div className="flex-1 rounded-xl bg-amber-50 p-2.5 border border-amber-200/60">
        <div className="flex items-center gap-1 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <p className="text-[9px] font-bold text-amber-600 uppercase tracking-wider">Fun</p>
        </div>
        <div className="space-y-1">
          {fun.map((app, i) => (
            <motion.div
              key={app}
              className="flex items-center gap-1.5 bg-white rounded-lg px-2 py-1 shadow-sm"
              initial={{ opacity: 0, x: 6 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="w-2.5 h-2.5 rounded-sm bg-amber-300/70 flex-shrink-0" />
              <span className="text-[10px] font-medium text-slate-600">{app}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Visuel 2 : Multiplicateur ───────────────────────────────────── */
function MultiplierVisual({ isInView }) {
  const rows = [
    { multiplier: 1, active: false },
    { multiplier: 2, active: true },
    { multiplier: 3, active: false },
  ];

  return (
    <div className="w-full space-y-1.5">
      {rows.map((row, i) => (
        <motion.div
          key={i}
          className={`flex items-center gap-2 rounded-xl px-3 py-2 border ${
            row.active
              ? "bg-primary/[0.08] border-primary/25"
              : "bg-slate-50 border-slate-100"
          }`}
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: row.active ? 1 : 0.5, y: 0 } : {}}
          transition={{ delay: 0.2 + i * 0.15 }}
        >
          {/* Apprentissage */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span className="text-[10px] font-bold text-primary-dark">1 min</span>
          </div>

          {/* Multiplicateur */}
          <div className="flex-1 flex items-center justify-center gap-1">
            <div className="flex-1 h-px bg-slate-200" />
            <span className={`text-xs font-extrabold px-1 ${row.active ? "text-primary" : "text-slate-300"}`}>
              ×{row.multiplier}
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Fun */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
            </svg>
            <span className="text-[10px] font-bold text-amber-600">{row.multiplier} min</span>
          </div>
        </motion.div>
      ))}
      <p className="text-[9px] text-slate-400 text-center pt-0.5">Votre choix, modifiable à tout moment</p>
    </div>
  );
}

/* ── Visuel 3 : Compteur temps réel ─────────────────────────────── */
function CounterVisual({ isInView }) {
  const stats = [
    { label: "Gagné", value: "+30 min", pct: 75, bar: "bg-primary", bg: "bg-primary-very-light", text: "text-primary-dark" },
    { label: "Dépensé", value: "−18 min", pct: 45, bar: "bg-amber-400", bg: "bg-amber-50", text: "text-amber-600" },
    { label: "Restant", value: "12 min", pct: 30, bar: "bg-secondary", bg: "bg-secondary-very-light", text: "text-secondary-dark" },
  ];

  return (
    <div className="w-full space-y-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${stat.bg} border border-white/80`}
          initial={{ opacity: 0, x: 8 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 + i * 0.12 }}
        >
          {/* Label */}
          <span className="text-[10px] font-semibold text-slate-500 w-14 flex-shrink-0">{stat.label}</span>

          {/* Barre */}
          <div className="flex-1 h-1.5 rounded-full bg-white/70 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${stat.bar}`}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${stat.pct}%` } : { width: 0 }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: "easeOut" }}
            />
          </div>

          {/* Valeur */}
          <span className={`text-[11px] font-bold ${stat.text} w-14 text-right flex-shrink-0`}>{stat.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Data ────────────────────────────────────────────────────────── */
const steps = [
  {
    number: "01",
    title: "Vous classez les apps",
    description:
      "Duolingo, Khan Academy, GeoGebra → apprentissage. YouTube, Instagram, TikTok → divertissement. C'est vous qui décidez, app par app.",
    color: "primary",
    Visual: ClassifyVisual,
  },
  {
    number: "02",
    title: "Vous choisissez le multiplicateur",
    description:
      "Une minute d'apprentissage donne deux minutes de fun. Ou trois. Ou une. Votre famille, votre règle.",
    color: "primary",
    Visual: MultiplierVisual,
  },
  {
    number: "03",
    title: "Votre enfant voit tout en temps réel",
    description:
      "Un compteur simple : gagné, dépensé, restant. Il comprend la règle en dix secondes, et c'est lui qui gère son équilibre.",
    color: "secondary",
    Visual: CounterVisual,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2 + i * 0.15, ease: "easeOut" },
  }),
};

/* ── Features compactes ──────────────────────────────────────────── */
const compactFeatures = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: "Deux apps, un seul cadre",
    desc: "App Parent (web) + App Enfant (iOS & Android). Synchronisées, connectées par QR code en 5 minutes.",
    tag: "QR code · 5 min",
    iconColor: "text-primary-dark",
    iconBg: "bg-primary/10",
    accent: "from-primary to-primary-dark",
    bg: "bg-gradient-to-br from-primary-very-light to-white",
    border: "border-primary/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Chaque minute est visible",
    desc: "Compteur en temps réel : temps gagné, dépensé, restant. Votre enfant gère son solde lui-même.",
    tag: "Gagné · Dépensé · Restant",
    iconColor: "text-secondary-dark",
    iconBg: "bg-secondary/10",
    accent: "from-secondary to-secondary-dark",
    bg: "bg-gradient-to-br from-secondary-very-light to-white",
    border: "border-secondary/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Impossible à contourner",
    desc: "Anti-désinstallation, blocage par plages horaires. Fonctionne même hors ligne.",
    tag: "École · Nuit · Repas",
    iconColor: "text-slate-700",
    iconBg: "bg-slate-200/80",
    accent: "from-slate-400 to-slate-600",
    bg: "bg-gradient-to-br from-slate-50 to-white",
    border: "border-slate-200",
  },
];

/* ── Section ─────────────────────────────────────────────────────── */
export default function Smartloop() {
  const ref = useRef(null);
  const featRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const featInView = useInView(featRef, { once: true, margin: "-60px" });

  return (
    <Section id="smartloop" className="section-smartloop-bg overflow-hidden">
      <Container>
        {/* Pain hook + heading */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-slate-400 text-base sm:text-lg mb-4 italic"
          >
            Il est 19h. Votre enfant est sur TikTok depuis une heure.
            Pas de conflit — juste une règle claire.
          </motion.p>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-4">
            Smartloop
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight text-balance">
            La gestion du temps d'écran{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              en trois étapes simples.
            </span>
          </h2>
        </div>

        {/* Animated diagram */}
        <div className="mb-16">
          <SmartloopDiagram />
        </div>

        {/* Three illustrated steps */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => {
            const { Visual } = step;
            return (
              <motion.div
                key={step.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ y: -6 }}
                className={`group relative flex flex-col overflow-hidden p-5 rounded-2xl border shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200/70 ${
                  step.color === "secondary"
                    ? "bg-secondary-very-light/40 border-secondary/10"
                    : "bg-primary-very-light/40 border-primary/10"
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 opacity-60 transition-opacity duration-300 group-hover:opacity-100 ${
                    step.color === "secondary" ? "bg-secondary" : "bg-primary"
                  }`}
                />
                <div className="mb-5 mt-1">
                  <Visual isInView={isInView} />
                </div>
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span
                    className={`text-sm font-extrabold font-display flex-shrink-0 ${
                      step.color === "secondary" ? "text-secondary/40" : "text-primary/40"
                    }`}
                  >
                    {step.number}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Compact features grid */}
        <div ref={featRef} className="mt-12 pt-10 border-t border-slate-100">
          <div className="grid sm:grid-cols-3 gap-5 lg:gap-6">
            {compactFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={featInView ? { opacity: 1, y: 0 } : {}}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className={`relative overflow-hidden rounded-2xl p-6 border ${f.border} ${f.bg} shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                {/* Accent bar */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${f.accent}`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-4 ${f.iconColor}`}>
                  {f.icon}
                </div>

                <h4 className="font-extrabold text-slate-900 text-base mb-2">{f.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">{f.desc}</p>

                {/* Tag */}
                <div className="inline-flex items-center px-3 py-1.5 bg-white/80 rounded-lg border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">{f.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <SectionLink to="/smartloop">Comment fonctionne le Smartloop</SectionLink>
      </Container>
    </Section>
  );
}
