import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced, useIsoLayoutEffect, scrollToId } from "./motion.jsx";

/*
  « De 9 à 18 ans » : une ligne horizontale pleine largeur, un enfant dessiné au
  trait qui marche de gauche à droite. À chaque âge il grandit, garde la tête un
  peu plus baissée sur son téléphone, et les écrans s'accumulent autour de lui.
  À 18 ans : « connecté 24h/24 » (figure de style, pas une statistique), puis le
  message. Joué une fois quand la scène arrive à l'écran, sans section figée :
  aucun défilement ajouté, sur mobile non plus.
*/
const STOPS = [
  { age: 9, at: 14, scale: 0.62, tilt: 0, caption: "Son premier téléphone." },
  { age: 12, at: 38, scale: 0.74, tilt: 8, caption: "Les réseaux sociaux arrivent." },
  { age: 15, at: 62, scale: 0.87, tilt: 16, caption: "L'écran s'invite la nuit." },
  { age: 18, at: 82, scale: 1, tilt: 24, caption: "Connecté 24h/24. Et plus personne pour bloquer." },
];

function Child() {
  return (
    <svg className="wk__kid" viewBox="0 0 80 130" aria-hidden="true">
      <g className="wk__leg wk__leg--back"><path d="M40 78 L33 104 L31 124" /><path d="M31 124 L24 124" /></g>
      <g className="wk__leg wk__leg--front"><path d="M40 78 L47 104 L49 124" /><path d="M49 124 L56 124" /></g>
      <path className="wk__body" d="M40 40 L40 78" />
      <g className="wk__arm wk__arm--back"><path d="M40 46 L30 64 L31 76" /></g>
      <g className="wk__arm wk__arm--front"><path d="M40 46 L50 58 L54 50" /></g>
      <g className="wk__phone"><rect x="51" y="40" width="9" height="15" rx="2" /><line x1="53.5" y1="43" x2="57.5" y2="43" /></g>
      <g className="wk__head"><circle cx="40" cy="25" r="12" /><path d="M45 27 Q46 29 44 30" /></g>
    </svg>
  );
}

const Icon = {
  bell: <path d="M6 15h12l-1.5-2V9a4.5 4.5 0 00-9 0v4L6 15zm4 2a2 2 0 004 0" />,
  heart: <path d="M12 19s-7-4.4-7-9.2A3.8 3.8 0 0112 7.6a3.8 3.8 0 017 2.2C19 14.6 12 19 12 19z" />,
  laptop: <path d="M5 6h14v9H5zM3 18h18" />,
  moon: <path d="M15 4a7 7 0 108 10A6 6 0 0115 4z" />,
  tablet: <path d="M7 3h10a1 1 0 011 1v16a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zm4 15h2" />,
  tv: <path d="M3 6h18v11H3zM9 20h6M12 17v3" />,
  headset: <path d="M5 14v-2a7 7 0 0114 0v2M5 14h3v5H5zM16 14h3v5h-3z" />,
};

// Écrans qui apparaissent autour de l'enfant, par âge (positions relatives à lui).
const SCREENS = [
  { age: 12, icon: "bell", x: 74, y: 4 },
  { age: 12, icon: "heart", x: 92, y: 22 },
  { age: 15, icon: "laptop", x: -22, y: 30 },
  { age: 15, icon: "moon", x: 10, y: -14 },
  { age: 18, icon: "tablet", x: -34, y: 2 },
  { age: 18, icon: "tv", x: 98, y: -6 },
  { age: 18, icon: "headset", x: 60, y: -22 },
];

export default function Manifesto() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    const ctx = gsap.context(() => {
      const kid = el.querySelector(".wk__walker");
      const fill = el.querySelector(".wk__fill");
      const cap = el.querySelector(".wk__caption");
      const capAge = cap.querySelector("b");
      const capTxt = cap.querySelector("span");
      const head = el.querySelector(".wk__head");
      const glow = el.querySelector(".wk__glow");

      gsap.set(kid, { left: "2%", x: 0, xPercent: -50, scale: 0.62 });
      gsap.set(cap, { opacity: 0 });

      // Timeline pilotée par le défilement : l'enfant avance quand on descend,
      // s'arrête quand on s'arrête, recule (tourné) quand on remonte.
      const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
      const arrivals = [];
      STOPS.forEach((s, i) => {
        const prev = i === 0 ? 2 : STOPS[i - 1].at;
        const d = 0.6 + (s.at - prev) / 60;
        tl.to(kid, { left: `${s.at}%`, scale: s.scale, duration: d })
          .to(fill, { scaleX: s.at / 100, duration: d }, "<")
          .to(head, { rotate: s.tilt, duration: d * 0.6, svgOrigin: "40 37" }, "<0.2");
        arrivals.push(tl.duration());
        tl.to(glow, { opacity: 0.25 + i * 0.22, scale: 0.7 + i * 0.25, duration: 0.3 })
          .to(el.querySelectorAll(`.wk__scr[data-age="${s.age}"]`), { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06, ease: "back.out(2)" }, "<")
          .to({}, { duration: 1.1 }); // pause pour lire la légende de chaque âge
      });
      tl.fromTo(el.querySelector(".wk__end"), { opacity: 0.22, y: 8 }, { opacity: 1, y: 0, duration: 0.6 });
      tl.to({}, { duration: 1 });

      // Légende et repères suivent l'âge atteint (dans les deux sens).
      const ticks = el.querySelectorAll(".wk__tick");
      let stage = -2;
      const sync = () => {
        const t = tl.time();
        let reached = -1;
        arrivals.forEach((a, i) => { if (t >= a - 0.001) reached = i; });
        if (reached === stage) return;
        stage = reached;
        ticks.forEach((tk, i) => tk.classList.toggle("is-on", i <= reached));
        if (reached < 0) { gsap.to(cap, { opacity: 0, duration: 0.2 }); return; }
        capAge.textContent = `${STOPS[reached].age} ans`;
        capTxt.textContent = STOPS[reached].caption;
        gsap.fromTo(cap, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, overwrite: true });
      };
      tl.eventCallback("onUpdate", sync);

      if (prefersReduced()) { tl.progress(1); sync(); return; }

      let still;
      // La scène reste à l'écran pendant la marche : elle commence à 9 ans quand
      // la section occupe l'écran, et se libère une fois le message allumé.
      const mobile = window.matchMedia("(max-width: 899px)").matches;
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => "+=" + Math.round(window.innerHeight * (mobile ? 1.3 : 1.6)),
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
        scrub: 0.6,
        onUpdate: (self) => {
          el.classList.add("is-walking");
          el.classList.toggle("is-back", self.direction === -1);
          clearTimeout(still);
          still = setTimeout(() => el.classList.remove("is-walking"), 160);
        },
      });
      return () => clearTimeout(still);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifeste" className="manifesto wk" ref={root}>
      <div className="wrap wk__top">
        <p className="eyebrow"><span className="eyebrow__dot" />Pourquoi El&amp;Moi</p>
        <p className="wk__caption" aria-live="polite"><b>9 ans</b> <span>Son premier téléphone.</span></p>
      </div>

      <div className="wk__stage" aria-hidden="true">
        <div className="wk__line"><span className="wk__fill" /></div>
        {STOPS.map((s) => (
          <span className="wk__tick" key={s.age} style={{ left: `${s.at}%` }}><i />{s.age} ans</span>
        ))}
        <div className="wk__walker">
          <span className="wk__glow" />
          {SCREENS.map((sc, i) => (
            <svg key={i} className="wk__scr" data-age={sc.age} viewBox="0 0 24 24" style={{ left: `${sc.x}%`, top: `${sc.y}%` }}>{Icon[sc.icon]}</svg>
          ))}
          <Child />
        </div>
      </div>

      <div className="wrap wk__end">
        <h2 className="display h2">Arrêtons de les bloquer.<br /><span className="sage">Aidons-les à grandir avec le numérique.</span></h2>
        <p className="wk__lead">
          À 18 ans, plus aucun contrôle parental ne bloquera rien. El&amp;Moi propose autre chose :
          aider votre enfant à construire, dès maintenant, une meilleure relation avec ses écrans.
        </p>
        <div className="wk__actions">
          <a href="#smartloop" className="morelink" onClick={(e) => { e.preventDefault(); scrollToId("smartloop"); }}>
            Voir comment <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
