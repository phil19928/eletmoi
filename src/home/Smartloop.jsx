import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced, useIsoLayoutEffect } from "./motion.jsx";
import { Phone, Lock } from "./ui.jsx";
import SiteLink from "../components/SiteLink";

/*
  Same mechanic as Reel A, on the real child home screen ("Salut, Léo"):
  01 Duolingo → "+2 min" chips fly from Apprentissage into the cagnotte (0 → 20)
  02 Instagram → "−1 min" chips fly from the cagnotte to Divertissement (20 → 0)
  03 Cagnotte à zéro → blocked screen.
  Desktop: driven by scroll (pinned). Mobile / touch: plays by itself in a loop when visible.
  Numbers are illustrative, as in the reels.
*/
const W = 720, H = 1486;
const BOX = {
  counter: { l: 168, t: 246, w: 290, h: 52, bg: "#d3f4e1" },
  fun: { l: 98, t: 800, w: 230, h: 56, bg: "#fee3cd" },
  learn: { l: 392, t: 800, w: 230, h: 56, bg: "#c8efef" },
};
const CARD = {
  counter: { l: 40, t: 192, w: 640, h: 130 },
  fun: { l: 74, t: 646, w: 278, h: 264 },
  learn: { l: 368, t: 646, w: 278, h: 264 },
};
const POS = { learn: [470, 828], counter: [300, 272], fun: [176, 828] };
const pct = (b) => ({ left: `${(b.l / W) * 100}%`, top: `${(b.t / H) * 100}%`, width: `${(b.w / W) * 100}%`, height: `${(b.h / H) * 100}%` });

const LEARN_END = 0.4;   // 0 → 0.4  : learning, cagnotte 0 → 20
const SPEND_END = 0.86;  // 0.4 → 0.86 : scrolling, cagnotte 20 → 0
const MAX = 20;
const CHIPS_UP = 10;     // ten "+2"
const CHIPS_DOWN = 20;   // twenty "−1"

const STEPS = [
  {
    title: "Il apprend : +2, +2, +2.",
    text: "Duolingo, Quizlet, un cours Lumen… Chaque minute passée sur une appli d'apprentissage remplit sa cagnotte. Ici, 1 min apprise = 2 min gagnées.",
  },
  {
    title: "Il scrolle : −1, −1, −1.",
    text: "Instagram, YouTube, ses jeux : chaque minute de divertissement est retirée de la cagnotte. Il voit son compteur descendre en direct.",
  },
  {
    title: "À zéro, ça bloque.",
    text: "Cagnotte vide : les applis de divertissement se verrouillent. Pas de négociation. Pour regagner du temps, il sait quoi faire : apprendre.",
  },
];

const stateAt = (p) => {
  if (p < LEARN_END) {
    const k = p / LEARN_END;
    return { stage: 0, learn: 10 * k, counter: MAX * k, fun: 0, blocked: false };
  }
  if (p < SPEND_END) {
    const k = (p - LEARN_END) / (SPEND_END - LEARN_END);
    return { stage: 1, learn: 10, counter: MAX * (1 - k), fun: MAX * k, blocked: false };
  }
  return { stage: 2, learn: 10, counter: 0, fun: MAX, blocked: p > SPEND_END + 0.03 };
};

export default function Smartloop() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    const q = (s) => el.querySelector(s);
    const content = q(".sl__visual .phone__content");
    const val = { learn: q('[data-v="learn"]'), counter: q('[data-v="counter"]'), fun: q('[data-v="fun"]') };
    const hl = { learn: q('[data-hl="learn"]'), counter: q('[data-hl="counter"]'), fun: q('[data-hl="fun"]') };
    const steps = [...el.querySelectorAll(".sl__step")];
    const visual = q(".sl__visual");
    const big = q(".sl__big b");
    const ring = q(".sl__ring-bar");
    const C = 2 * Math.PI * 46;
    const reduce = prefersReduced();

    const chip = (kind) => {
      if (reduce) return;
      const up = kind === "up";
      const [x0, y0] = up ? POS.learn : POS.counter;
      const [x1, y1] = up ? POS.counter : POS.fun;
      const c = document.createElement("span");
      c.className = `lp__chip ${up ? "lp__chip--up" : "lp__chip--down"}`;
      c.textContent = up ? "+2 min" : "−1 min";
      content.appendChild(c);
      gsap.fromTo(c,
        { left: `${(x0 / W) * 100}%`, top: `${(y0 / H) * 100}%`, scale: 0.4, opacity: 0 },
        { keyframes: [
            { scale: 1.1, opacity: 1, duration: 0.18, ease: "back.out(3)" },
            { left: `${(x1 / W) * 100}%`, top: `${(y1 / H) * 100}%`, scale: 0.9, duration: 0.55, ease: "power2.inOut" },
            { opacity: 0, scale: 0.6, duration: 0.15 },
          ],
          onComplete: () => c.remove() });
      const target = up ? val.counter : val.fun;
      gsap.fromTo(target, { scale: 1 }, { scale: 1.18, duration: 0.12, yoyo: true, repeat: 1, delay: 0.7, transformOrigin: "left center" });
    };

    let last = 0;
    let stage = -1;
    const render = (p) => {
      const s = stateAt(p);
      // chips fire only when moving forward through a threshold
      if (p > last) {
        for (let i = 1; i <= CHIPS_UP; i++) { const t = (i / CHIPS_UP) * LEARN_END - 0.001; if (last < t && p >= t) chip("up"); }
        for (let i = 1; i <= CHIPS_DOWN; i++) { const t = LEARN_END + (i / CHIPS_DOWN) * (SPEND_END - LEARN_END) - 0.001; if (last < t && p >= t) chip("down"); }
      }
      last = p;
      val.learn.textContent = Math.round(s.learn);
      val.counter.textContent = Math.round(s.counter);
      val.fun.textContent = Math.round(s.fun);
      big.textContent = s.blocked ? "0" : Math.round(s.counter);
      ring.style.strokeDashoffset = C * (1 - s.counter / MAX);
      const active = s.stage === 0 ? "learn" : s.stage === 1 ? "fun" : null;
      Object.entries(hl).forEach(([k, n]) => n.classList.toggle("is-on", k === active || (k === "counter" && s.stage < 2)));
      q(".lp__blocked").classList.toggle("is-on", s.blocked);
      if (s.stage !== stage) {
        stage = s.stage;
        steps.forEach((n, i) => n.classList.toggle("is-active", i === stage));
        visual.dataset.stage = stage;
      }
      visual.classList.toggle("is-blocked", s.blocked);
      el.style.setProperty("--sl-progress", p);
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      // Desktop: scroll drives the loop.
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        render(0);
        gsap.timeline({
          scrollTrigger: {
            trigger: el, start: "top top", end: "+=320%", pin: ".sl__pin", scrub: 0.3,
            onUpdate: (self) => render(self.progress),
          },
        });
      });
      // Mobile / tablette : le téléphone reste collé en haut (CSS sticky) et le
      // défilement des étapes pilote l'animation, comme sur desktop. Fini la
      // boucle autonome qui ne correspondait pas à l'étape lue.
      mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", () => {
        last = 0;
        render(0);
        // Une « ligne de lecture » à 88 % de l'écran parcourt les étapes : l'étape
        // qu'elle traverse est l'étape active, et sa position dans l'étape fixe
        // l'avancement dans la phase correspondante (+2, −1, bloqué). L'étape
        // active reste ainsi lisible sous le téléphone collé en haut.
        const list = el.querySelector(".sl__steps");
        const RANGES = [[0, LEARN_END], [LEARN_END, SPEND_END], [SPEND_END, 1]];
        const prog = { p: 0 };
        const to = gsap.quickTo(prog, "p", { duration: 0.3, ease: "power1.out", onUpdate: () => render(prog.p) });
        ScrollTrigger.create({
          trigger: list,
          start: "top 88%",
          end: "bottom 88%",
          onUpdate: (self) => {
            const box = list.getBoundingClientRect();
            const tops = steps.map((n) => n.getBoundingClientRect().top - box.top);
            const y = self.progress * box.height;
            let i = steps.length - 1;
            while (i > 0 && tops[i] > y) i--;
            const top = tops[i];
            const h = i < steps.length - 1 ? tops[i + 1] - top : box.height - top;
            const f = Math.min(1, Math.max(0, (y - top) / h));
            const [a, b] = RANGES[i];
            to(a + f * (b - a));
          },
        });
      });
      if (reduce) render(SPEND_END - 0.2);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="smartloop" className="sl" ref={root}>
      <div className="sl__pin">
        <div className="wrap sl__layout">
          <div className="sl__copy">
            <div className="sl__head">
              <p className="eyebrow"><span className="eyebrow__dot" />La Smartloop</p>
              <h2 className="display h2">Une boucle.<br />Trois temps.</h2>
            </div>
            <ol className="sl__steps">
              {STEPS.map((s, i) => (
                <li className={`sl__step ${i === 0 ? "is-active" : ""}`} key={i}>
                  <span className="sl__num">0{i + 1}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <SiteLink to="/smartloop" className="morelink">Comment fonctionne la Smartloop <span aria-hidden="true">→</span></SiteLink>
          </div>

          <div className="sl__visual" data-stage="0" aria-hidden="true">
            <svg className="sl__ring" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" className="sl__ring-track" />
              <circle cx="50" cy="50" r="46" className="sl__ring-bar" strokeDasharray={2 * Math.PI * 46} strokeDashoffset={2 * Math.PI * 46} />
            </svg>

            <div className="sl__phone">
              <Phone bg="#fff">
                <img className="screen" src="/ui/child_home.jpg" alt="" />
                {Object.entries(CARD).map(([k, b]) => <span key={k} data-hl={k} className="lp__hl" style={pct(b)} />)}
                {Object.entries(BOX).map(([k, b]) => (
                  <span key={k} className="lp__val" style={{ ...pct(b), background: b.bg }}>
                    <b data-v={k}>0</b> min
                  </span>
                ))}
                <img className="screen lp__blocked" src="/ui/child_blocked.jpg" alt="" />
              </Phone>
            </div>

            <div className="sl__app sl__app--learn">
              <img src="/ui/icon_duolingo.png" alt="" />
              <span><small>En cours · Apprentissage</small><b>Duolingo</b></span>
              <em className="sl__app-tag sl__app-tag--up">+2 min / min</em>
            </div>
            <div className="sl__app sl__app--fun">
              <img src="/ui/icon_instagram.png" alt="" />
              <span><small>En cours · Divertissement</small><b>Instagram</b></span>
              <em className="sl__app-tag sl__app-tag--down">−1 min / min</em>
              <em className="sl__app-tag sl__app-tag--lock"><Lock size={13} /> Bloqué</em>
            </div>

            <div className="sl__big">
              <span>Cagnotte de divertissement</span>
              <span className="sl__big-num"><b>0</b><i>min</i></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
