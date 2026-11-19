import { useRef, useState } from "react";
import { gsap, prefersReduced, useIsoLayoutEffect } from "./motion.jsx";
import { UNIVERS } from "./data.js";
import { Phone } from "./ui.jsx";
import SiteLink from "../components/SiteLink";

// Nombre de cours publiés dans l'app (le dossier source contient 35 titres : à vérifier).
const TOTAL = 34;

export default function Lumen() {
  const root = useRef(null);
  const [open, setOpen] = useState(0);

  useIsoLayoutEffect(() => {
    const el = root.current;
    const ctx = gsap.context((self) => {
      // Flashlight: the cursor lights up the section (Lumen = la lumière).
      if (!prefersReduced() && window.matchMedia("(pointer: fine)").matches) {
        const x = gsap.quickTo(el, "--lx", { duration: 0.8, ease: "power3.out" });
        const y = gsap.quickTo(el, "--ly", { duration: 0.8, ease: "power3.out" });
        const move = (e) => {
          const r = el.getBoundingClientRect();
          x(e.clientX - r.left);
          y(e.clientY - r.top);
        };
        el.addEventListener("pointermove", move);
        self.add(() => () => el.removeEventListener("pointermove", move));
      }
      if (!prefersReduced()) {
        gsap.from(".lm__title .w", {
          yPercent: 115, duration: 1, stagger: 0.06, ease: "power4.out",
          scrollTrigger: { trigger: ".lm__title", start: "top 80%" },
        });
        gsap.from(".lm__row", {
          y: 50, opacity: 0, stagger: 0.08, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".lm__list", start: "top 80%" },
        });
        gsap.from(".lm__stat b", {
          textContent: 0, duration: 1.6, ease: "power2.out", snap: { textContent: 1 }, stagger: 0.15,
          scrollTrigger: { trigger: ".lm__stats", start: "top 85%" },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="lumen" className="lm" ref={root}>
      <div className="lm__light" aria-hidden="true" />
      <div className="wrap lm__layout">
        <div className="lm__head">
          <p className="eyebrow eyebrow--gold">
            <img src="/img/lumen.png" alt="" width="22" height="22" /> Lumen · cybersécurité
          </p>
          <h2 className="display h2 lm__title">
            <span className="mask"><span className="w">Bloquer</span></span>{" "}
            <span className="mask"><span className="w">ne</span></span>{" "}
            <span className="mask"><span className="w">prépare</span></span>{" "}
            <span className="mask"><span className="w">à</span></span>{" "}
            <span className="mask"><span className="w">rien.</span></span>
            <br />
            <span className="mask"><span className="w gold">Lumen,</span></span>{" "}
            <span className="mask"><span className="w gold">si.</span></span>
          </h2>
          <p className="lm__lead">
            À 18 ans, plus personne ne bloquera rien. Lumen prépare votre enfant à être seul en ligne,
            avec des modules courts intégrés à El&amp;Moi. Et chaque module terminé lui fait gagner du temps.
          </p>
          <div className="lm__stats">
            <div className="lm__stat"><b>{UNIVERS.length}</b><span>univers</span></div>
            <div className="lm__stat"><b>{TOTAL}</b><span>cours</span></div>
            <div className="lm__stat"><b>3</b><span>tranches d'âge</span></div>
          </div>
          <div className="lm__ages">
            <span>8–11 ans</span><span>12–14 ans</span><span>15–17 ans</span>
          </div>
          <SiteLink to="/lumen" className="morelink morelink--gold">Découvrir les parcours Lumen <span aria-hidden="true">→</span></SiteLink>
        </div>

        <div className="lm__phone">
          <Phone playlist={["/clips/l_univers", "/clips/l_menaces", "/clips/l_course1"]} alt="Lumen dans l'app enfant : choix de l'univers puis cours" bg="#fffbea" />
        </div>

        <ul className="lm__list">
          {UNIVERS.map((u, i) => {
            const isOpen = open === i;
            return (
              <li key={u.title} className={`lm__row ${isOpen ? "is-open" : ""}`} onMouseEnter={() => window.matchMedia("(pointer: fine)").matches && setOpen(i)}>
                <button
                  className="lm__row-head"
                  aria-expanded={isOpen}
                  aria-controls={`univers-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="lm__idx">0{i + 1}</span>
                  <span className="lm__name">{u.title}</span>
                  <span className="lm__plus" aria-hidden="true" />
                </button>
                <div className="lm__body" id={`univers-${i}`}>
                  <div className="lm__body-inner">
                    {u.modules.map((m) => <span className="lm__mod" key={m}>{m}</span>)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
