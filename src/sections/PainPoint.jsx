import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Container from "../components/Container";
import mascotConfused from "../assets/confused.png";

const lines = [
  {
    text: "Vous connaissez cette scène.",
    className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-white",
    delay: 0,
  },
  {
    text: "Il est 19h. Votre enfant est sur TikTok depuis une heure. Vous dites encore 5 minutes. Il acquiesce. Vingt minutes plus tard, c'est le conflit.",
    className: "text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed",
    delay: 0.2,
  },
  {
    text: "Ce n'est pas un problème de discipline. C'est un problème d'organisation.",
    className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-400",
    delay: 0.4,
  },
  {
    text: "Et si le téléphone avait des règles claires, acceptées par toute la famille ?",
    className: "text-xl sm:text-2xl text-white/80 font-medium max-w-xl",
    delay: 0.6,
  },
];

export default function PainPoint() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-dark" />

      {/* Subtle background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-light/6 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <Container className="relative z-10">
        <div
          ref={ref}
          className="flex flex-col items-center text-center gap-8 sm:gap-10"
        >
          {/* Confused mascot */}
          <motion.img
            src={mascotConfused}
            alt="Mascotte El&Moi confuse"
            className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          />

          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: line.delay, ease: "easeOut" }}
              className={line.className}
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </Container>
    </section>
  );
}
