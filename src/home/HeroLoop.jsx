import { useRef } from "react";
import { gsap, prefersReduced, useIsoLayoutEffect } from "./motion.jsx";
import { Lock } from "./ui.jsx";

/*
  Animation d'ouverture du hero mobile : la Smartloop en une boucle de ~8 s.
  Duolingo → « +2 min » dans la cagnotte (0 → 20), Instagram ← « −1 min »
  (20 → 0), puis « Bloqué ». Affichée uniquement sous 600 px (CSS) et jouée
  seulement à cette largeur. Chiffres illustratifs, comme dans les reels.
*/
const R = 40;
const C = 2 * Math.PI * R;
const MAX = 20;

const CAPTIONS = [
  "Il apprend : sa cagnotte se remplit.",
  "Il scrolle : elle se vide.",
  "À zéro, les applis de divertissement sont bloquées.",
];

export default function HeroLoop() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(max-width: 599px)", () => {
        const num = el.querySelector(".hloop__num");
        const ring = el.querySelector(".hloop__ring-bar");
        const cap = el.querySelector(".hloop__cap");
        const learn = el.querySelector(".hloop__app--learn");
        const fun = el.querySelector(".hloop__app--fun");
        const stage = el.querySelector(".hloop__stage");
        const state = { v: 0 };

        const draw = () => {
          num.textContent = Math.round(state.v);
          ring.style.strokeDashoffset = C * (1 - state.v / MAX);
        };
        const caption = (i) => {
          cap.textContent = CAPTIONS[i];
          gsap.fromTo(cap, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3 });
        };
        // Pastille qui vole d'une tuile vers la cagnotte (ou l'inverse).
        const chip = (up) => {
          const c = document.createElement("span");
          c.className = `hloop__chip ${up ? "hloop__chip--up" : "hloop__chip--down"}`;
          c.textContent = up ? "+2 min" : "−1 min";
          stage.appendChild(c);
          const from = up ? { left: "16%" } : { left: "50%" };
          const to = up ? { left: "50%" } : { left: "84%" };
          gsap.fromTo(c, { ...from, top: "20%", opacity: 0, scale: 0.6 }, {
            keyframes: [
              { opacity: 1, scale: 1, duration: 0.12 },
              { ...to, top: up ? "16%" : "20%", duration: 0.45, ease: "power2.inOut" },
              { opacity: 0, scale: 0.7, duration: 0.15 },
            ],
            onComplete: () => c.remove(),
          });
        };

        if (prefersReduced()) { state.v = MAX; draw(); caption(0); return; }

        // Positions absolues (secondes) : ~3,6 s de remplissage, ~2,6 s de vidage, 2 s bloqué.
        const tl = gsap.timeline({ repeat: -1, delay: 0.9 });
        tl.call(() => {
          state.v = 0; draw();
          el.classList.remove("is-blocked", "is-spend");
          el.classList.add("is-learn");
          caption(0);
        }, null, 0);
        for (let i = 1; i <= 10; i++) {
          const t = 0.3 + (i - 1) * 0.3;
          tl.call(() => chip(true), null, t);
          tl.to(state, { v: i * 2, duration: 0.15, onUpdate: draw }, t + 0.5);
        }
        const t2 = 0.3 + 10 * 0.3 + 0.8;
        tl.call(() => { el.classList.remove("is-learn"); el.classList.add("is-spend"); caption(1); }, null, t2);
        for (let i = 1; i <= MAX; i++) {
          const t = t2 + 0.3 + (i - 1) * 0.11;
          if (i % 2 === 1) tl.call(() => chip(false), null, t); // une pastille sur deux : plus lisible
          tl.to(state, { v: MAX - i, duration: 0.08, onUpdate: draw }, t);
        }
        const t3 = t2 + 0.3 + MAX * 0.11 + 0.4;
        tl.call(() => { el.classList.remove("is-spend"); el.classList.add("is-blocked"); caption(2); }, null, t3);
        tl.to({}, { duration: 2.2 }, t3);
        return () => tl.kill();
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="hloop" ref={root} aria-hidden="true">
      <div className="hloop__stage">
        <div className="hloop__app hloop__app--learn">
          <img src="/ui/icon_duolingo.png" alt="" width="52" height="52" />
          <span>Apprentissage</span>
        </div>
        <div className="hloop__pot">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={R} className="hloop__ring-track" />
            <circle cx="50" cy="50" r={R} className="hloop__ring-bar" strokeDasharray={C} strokeDashoffset={C} />
          </svg>
          <div className="hloop__pot-txt">
            <b className="hloop__num">0</b>
            <small>min</small>
          </div>
          <span className="hloop__pot-label">Cagnotte</span>
        </div>
        <div className="hloop__app hloop__app--fun">
          <img src="/ui/icon_instagram.png" alt="" width="52" height="52" />
          <span>Divertissement</span>
          <em className="hloop__lock"><Lock size={12} /> Bloqué</em>
        </div>
      </div>
      <p className="hloop__cap">{CAPTIONS[0]}</p>
    </div>
  );
}
