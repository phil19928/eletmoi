import { Fragment, useRef } from "react";
import { gsap, prefersReduced, scrollToId, useIsoLayoutEffect } from "./motion.jsx";
import { Phone, Card, SignupButton, Check, StoreBadges } from "./ui.jsx";
import { REVIEW_STATS } from "./data.js";
import MetricsLive, { IN_PHONE } from "./MetricsLive.jsx";

const LINES = [["Le", "temps"], ["d'écran,"], ["ça", "se", "gagne."]];
const ORDER = LINES.flat();

export default function Hero() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    const reduce = prefersReduced();
    const ctx = gsap.context(() => {
      // L'entrée (titre, textes, téléphones, cartes) est en CSS : elle démarre
      // à la première peinture du HTML prérendu, sans attendre l'hydratation.
      if (reduce) return;

      // Chiffres du tableau de bord parent : une journée qui défile en boucle.
      // L'enfant apprend (+2 min gagnées par minute), puis consomme (−1 min).
      const hooks = (k) => root.current.querySelectorAll(`[data-m="${k}"]`);
      const H = { passe: hooks("passe"), restant: hooks("restant"), conso: hooks("conso"), gagne: hooks("gagne"), bar: hooks("bar") };
      const day = { learn: 0, spent: 0 };
      const write = () => {
        const gagne = Math.round(day.learn) * 2;
        const conso = Math.round(day.spent);
        const passe = Math.round(day.learn) + conso;
        const set = (list, val) => list.forEach((n) => { n.textContent = val; });
        set(H.passe, passe); set(H.gagne, gagne); set(H.conso, conso); set(H.restant, 30 + gagne - conso);
        H.bar.forEach((n) => { n.style.transform = `scaleX(${Math.min(1, passe / 90)})`; });
      };
      const dayTl = gsap.timeline({ repeat: -1, repeatDelay: 0.3, delay: 2 })
        .to(day, { learn: 10, duration: 3.4, ease: "none", onUpdate: write })
        .to(day, { spent: 25, duration: 4, ease: "none", onUpdate: write }, "+=0.5")
        .to({}, { duration: 2.6 })
        .to(day, { learn: 0, spent: 0, duration: 0.7, ease: "power2.inOut", onUpdate: write });
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? dayTl.resume() : dayTl.pause()));
      io.observe(root.current.querySelector(".hero__stage"));

      gsap.to(".hero__mascot-img", { y: -10, rotate: 3, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.2 });

      // Scroll: the stage drifts and the two phones fan out.
      gsap.matchMedia().add("(min-width: 1000px)", () => {
        const s = { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 };
        gsap.to(".hero__phone-wrap--back", { xPercent: -18, rotate: -14, scrollTrigger: s });
        gsap.to(".hero__phone-wrap--front", { xPercent: 16, rotate: 10, yPercent: -8, scrollTrigger: s });
        gsap.to(".hero__card--rule", { yPercent: -60, scrollTrigger: s });
        gsap.to(".hero__card--metrics", { yPercent: -110, scrollTrigger: s });
        gsap.to(".hero__copy", { yPercent: 18, opacity: 0.2, scrollTrigger: s });
      });

      // Pointer parallax on the stage layers.
      if (window.matchMedia("(pointer: fine)").matches) {
        const layers = gsap.utils.toArray("[data-depth]").map((el) => ({
          d: parseFloat(el.dataset.depth),
          x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" }),
        }));
        const move = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => { l.x(nx * 36 * l.d); l.y(ny * 26 * l.d); });
        };
        window.addEventListener("pointermove", move);
        return () => { window.removeEventListener("pointermove", move); io.disconnect(); };
      }
      return () => io.disconnect();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid-lines" />
      </div>

      <div className="wrap hero__layout">
        <div className="hero__copy">
          <h1 className="hero__h1">
            <span className="display hero__title">
            {LINES.map((line, i) => (
              <span className="line" key={i}>
                {line.map((word) =>
                  word === "gagne." ? (
                    <span className="mask" key={word}>
                      <span className="w hl" style={{ "--i": ORDER.indexOf(word) }}>
                        <span className="hl__fill" />
                        <span className="hl__txt">gagne.</span>
                      </span>
                    </span>
                  ) : (
                    <Fragment key={word}>
                      <span className="mask"><span className="w" style={{ "--i": ORDER.indexOf(word) }}>{word}</span></span>{" "}
                    </Fragment>
                  )
                )}
              </span>
            ))}
            </span>
          </h1>

          <p className="lead hero__reveal" style={{ "--d": "650ms" }}>
            Votre enfant apprend 10 minutes, il gagne 20 minutes de divertissement.
            Vous fixez le ratio, il voit son compteur. <strong>Fini les négociations.</strong>
          </p>

          <div className="hero__ctas hero__reveal" style={{ "--d": "730ms" }}>
            <SignupButton size="btn--lg" />
            <a href="#smartloop" className="btn btn--ghost btn--lg" onClick={(e) => { e.preventDefault(); scrollToId("smartloop"); }}>
              Voir comment ça marche
            </a>
          </div>

          <div className="hero__stores hero__reveal" style={{ "--d": "770ms" }}>
            <span>Application enfant</span>
            <StoreBadges />
          </div>

          <ul className="hero__proof hero__reveal" style={{ "--d": "810ms" }}>
            <li><Check /> Gratuit, sans carte</li>
            <li><Check /> Rien à installer côté parent</li>
            <li><Check /> iPhone &amp; Android</li>
          </ul>

          <p className="hero__rating hero__reveal" style={{ "--d": "890ms" }}>
            <strong>{REVIEW_STATS.downloads}</strong> {REVIEW_STATS.downloadsLabel}
          </p>
        </div>

        <div className="hero__stage" aria-hidden="true">
          <div className="hero__halo" data-depth="0.2" />
          <div className="hero__phone-wrap hero__phone-wrap--back" data-depth="0.4">
            <Phone className="hero__phone hero__phone--back" bg="#f8f9f7">
              <img className="screen" src="/ui/p_dashboard.jpg" alt="" />
              <div className="ml-wrap" style={IN_PHONE}><MetricsLive /></div>
            </Phone>
            <span className="hero__tag">Accès Parent</span>
          </div>
          <div className="hero__phone-wrap hero__phone-wrap--front" data-depth="0.75">
            <Phone className="hero__phone hero__phone--front" video="/clips/o_cta" eager />
            <span className="hero__tag hero__tag--kid">App enfant</span>
          </div>
          <div className="hero__card hero__card--rule" data-depth="1.15">
            <Card src="/ui/el_smartloop.png" />
          </div>
          <div className="hero__card hero__card--metrics" data-depth="1.35">
            <div className="uicard">
              <img src="/ui/el_metrics.png" alt="" />
              <MetricsLive />
            </div>
          </div>
          <div className="hero__mascot" data-depth="1.6">
            <img className="hero__mascot-img" src="/img/mascot.png" alt="" width="820" height="820" />
          </div>
        </div>
      </div>

      <button className="scroll-cue" onClick={() => scrollToId("manifeste")} aria-label="Défiler vers la suite">
        <span />
      </button>
    </section>
  );
}
