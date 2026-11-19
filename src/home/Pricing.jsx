import { useRef, useState } from "react";
import { gsap, prefersReduced, useIsoLayoutEffect } from "./motion.jsx";
import { REGISTER_URL } from "./data.js";
import { Check, Magnetic, Arrow } from "./ui.jsx";
import SiteLink from "../components/SiteLink";

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
  const root = useRef(null);
  const [annual, setAnnual] = useState(true);

  useIsoLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(".pr__card", {
        y: 90, opacity: 0, rotate: (i) => (i ? 3 : -3), stagger: 0.12, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".pr__grid", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="tarifs" className="pr" ref={root}>
      <div className="wrap">
        <div className="pr__head">
          <p className="eyebrow"><span className="eyebrow__dot" />Tarifs</p>
          <h2 className="display h2">Gratuit pour commencer.<br /><span className="sage">Pour de vrai.</span></h2>
          <div className="toggle" role="radiogroup" aria-label="Facturation">
            <button role="radio" aria-checked={!annual} className={!annual ? "is-on" : ""} onClick={() => setAnnual(false)}>Mensuel</button>
            <button role="radio" aria-checked={annual} className={annual ? "is-on" : ""} onClick={() => setAnnual(true)}>Annuel <em>−37 %</em></button>
            <span className="toggle__pill" style={{ transform: `translateX(${annual ? "100%" : "0"})` }} />
          </div>
        </div>

        <div className="pr__grid">
          <article className="pr__card">
            <h3>Essentiel</h3>
            <p className="pr__desc">Un parent, un enfant. Un vrai produit complet, pas une version bridée.</p>
            <p className="pr__price"><b>0 €</b><span>pour toujours</span></p>
            <a href={REGISTER_URL} className="btn btn--ghost btn--block">Commencer gratuitement</a>
            <ul>{ESSENTIEL.map((f) => <li key={f}><Check />{f}</li>)}</ul>
          </article>

          <article className="pr__card pr__card--hot">
            <span className="pr__badge">Pour toute la famille</span>
            <h3>Famille</h3>
            <p className="pr__desc">Plusieurs enfants, plusieurs parents, et tout Lumen.</p>
            <p className="pr__price">
              <b key={annual ? "a" : "m"} className="pr__amount">{annual ? "59,99 €" : "7,99 €"}</b>
              <span>{annual ? "par an, soit 5 € / mois" : "par mois, sans engagement"}</span>
            </p>
            <Magnetic href={REGISTER_URL} className="btn btn--primary btn--block" strength={0.15}>
              <span className="btn__label">Créer mon compte</span>
              <span className="btn__arrow"><Arrow /></span>
            </Magnetic>
            <ul>{FAMILLE.map((f) => <li key={f}><Check />{f}</li>)}</ul>
          </article>
        </div>
        <p className="pr__more"><SiteLink to="/tarifs" className="morelink">Voir le détail des formules <span aria-hidden="true">→</span></SiteLink></p>
        <p className="pr__note muted">Éditeur : C&amp;S Associés SAS · Données hébergées en France · Aucune lecture des messages de l'enfant.</p>
      </div>
    </section>
  );
}
