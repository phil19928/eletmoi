import { useRef } from "react";
import { gsap, prefersReduced, useIsoLayoutEffect } from "./motion.jsx";

// Tokens: plain words, *accent* words, or inline images.
const TEXT = [
  "Bloquer", "ne", "suffit", "plus.", "Un", "écran", "noir", "n'a", "jamais", "rien", "appris", "à", "personne.",
  "Au", "lieu", "d'interdire,", "*préparons*", "nos", "enfants\u00a0:", "ils", "*apprennent*,", "ils", "*gagnent*", "leur", "temps,",
  "et", "ils", "deviennent", "*autonomes*", "face", "aux", "écrans.",
];

export default function Manifesto() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      // Révélation douce, une seule fois : les mots se posent l'un après l'autre.
      gsap.from(".mf__tok", {
        opacity: 0,
        y: 14,
        filter: "blur(6px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.035,
        scrollTrigger: { trigger: ".mf__text", start: "top 78%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifeste" className="manifesto" ref={root}>
      <div className="wrap">
        <p className="eyebrow"><span className="eyebrow__dot" />Pourquoi El&amp;Moi</p>
        <p className="mf__text display">
          {TEXT.map((t, i) =>
            typeof t === "string" ? (
              <span key={i} className={`mf__tok ${t.startsWith("*") ? "mf__accent" : ""}`}>
                {t.replace(/\*/g, "")}{" "}
              </span>
            ) : (
              <span key={i} className={`mf__pic ${t.screen ? "mf__pic--screen" : ""}`} aria-hidden="true">
                <img src={t.img} alt={t.alt} loading="lazy" />
              </span>
            )
          )}
        </p>
      </div>
    </section>
  );
}
