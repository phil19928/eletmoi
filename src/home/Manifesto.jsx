import { Fragment, useRef } from "react";
import { gsap, prefersReduced, useIsoLayoutEffect } from "./motion.jsx";

/*
  « Une soirée, deux scénarios » : la même soirée racontée deux fois, en fil de
  messages. À gauche un blocage classique, à droite El&Moi. Scénario illustratif
  (aucun chiffre, aucune promesse) : il montre la mécanique, pas un résultat.
  Vocabulaire : « divertissement » / « épisode », jamais « jeu ».
*/
const SCENES = [
  {
    time: "20:47",
    caption: "Le temps d'écran est écoulé.",
    without: [
      { t: "sys", text: "Temps écoulé. L'écran devient noir." },
      { t: "kid", text: "Encore 5 minutes, s'il te plaît !" },
      { t: "parent", text: "Non. On avait dit 20h30." },
      { t: "kid", text: "C'est trop injuste." },
    ],
    with: [
      { t: "app", text: "Ta cagnotte de divertissement est à 0 min." },
      { t: "app", text: "10 min d'apprentissage = 20 min de plus.", strong: true },
      { t: "kid", text: "OK, je fais une leçon de Duolingo." },
    ],
  },
  {
    time: "21:05",
    caption: "Un quart d'heure plus tard.",
    without: [
      { t: "kid", text: "Tous mes amis sont encore connectés." },
      { t: "note", text: "La porte de sa chambre claque." },
      { t: "parent", text: "Encore une soirée qui finit mal…" },
    ],
    with: [
      { t: "gain", text: "+2 min · +2 min · +2 min…" },
      { t: "app", text: "Cagnotte : 20 min.", strong: true },
      { t: "kid", text: "Trop bien, je regarde un épisode." },
    ],
  },
  {
    time: "Le lendemain",
    caption: "Même heure.",
    without: [
      { t: "note", text: "Même heure, même négociation." },
      { t: "note", text: "Il a surtout appris à insister." },
    ],
    with: [
      { t: "note", text: "Il connaît la règle. Il commence par sa leçon." },
      { t: "note", text: "Et au passage, un peu d'anglais." },
    ],
  },
];

const FINAL = ["Bloquer", "ne", "suffit", "plus.", "Au", "lieu", "d'interdire,", "*préparons-les.*"];

function Bubble({ b }) {
  if (b.t === "app" || b.t === "gain") {
    return (
      <div className={`st__b st__b--app ${b.t === "gain" ? "st__b--gain" : ""} ${b.strong ? "is-strong" : ""}`}>
        <img src="/img/logo.png" alt="" width="22" height="22" />
        <span>{b.text}</span>
      </div>
    );
  }
  return <div className={`st__b st__b--${b.t}`}>{b.text}</div>;
}

export default function Manifesto() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      // Chaque carte déroule ses messages quand elle arrive à l'écran.
      gsap.utils.toArray(".st__card").forEach((card) => {
        gsap.from(card.querySelectorAll(".st__b"), {
          opacity: 0,
          y: 16,
          scale: 0.96,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.32,
          scrollTrigger: { trigger: card, start: "top 78%", once: true },
        });
      });
      gsap.utils.toArray(".st__time").forEach((t) => {
        gsap.from(t, {
          opacity: 0, x: -20, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: t, start: "top 82%", once: true },
        });
      });
      // Le fil du temps se remplit avec le défilement.
      gsap.fromTo(".st__rail span", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: ".st__scenes", start: "top 70%", end: "bottom 60%", scrub: true },
      });
      gsap.from(".st__final .mf__tok", {
        opacity: 0, y: 14, filter: "blur(6px)", duration: 0.9, ease: "power3.out", stagger: 0.06,
        scrollTrigger: { trigger: ".st__final", start: "top 82%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifeste" className="manifesto st" ref={root}>
      <div className="wrap">
        <div className="st__head">
          <p className="eyebrow"><span className="eyebrow__dot" />Pourquoi El&amp;Moi</p>
          <h2 className="display h2">Une soirée,<br />deux scénarios.</h2>
          <p className="st__intro">Léo, 11 ans. Même soir, même téléphone. Seule la règle change.</p>
        </div>

        <div className="st__cols" aria-hidden="true">
          <span />
          <span className="st__col st__col--without">Blocage classique</span>
          <span className="st__col st__col--with">Avec El&amp;Moi</span>
        </div>

        <div className="st__scenes">
          <div className="st__rail" aria-hidden="true"><span /></div>
          {SCENES.map((s) => (
            <div className="st__scene" key={s.time}>
              <div className="st__time">
                <b>{s.time}</b>
                <span>{s.caption}</span>
              </div>
              <div className="st__card st__card--without">
                <span className="st__label">Blocage classique</span>
                {s.without.map((b, i) => <Bubble b={b} key={i} />)}
              </div>
              <div className="st__card st__card--with">
                <span className="st__label">Avec El&amp;Moi</span>
                {s.with.map((b, i) => <Bubble b={b} key={i} />)}
              </div>
            </div>
          ))}
        </div>

        <p className="st__final display">
          {FINAL.map((w, i) => (
            <Fragment key={i}>
              <span className={`mf__tok ${w.startsWith("*") ? "mf__accent" : ""}`}>{w.replace(/\*/g, "")}</span>{" "}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
