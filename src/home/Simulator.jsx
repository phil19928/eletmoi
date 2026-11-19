import { useEffect, useRef, useState } from "react";
import { gsap, prefersReduced, useIsoLayoutEffect } from "./motion.jsx";
import { SignupButton } from "./ui.jsx";

const RATIOS = [1, 2, 3];
const MAX = 60;

export default function Simulator() {
  const root = useRef(null);
  const out = useRef(null);
  const shown = useRef({ v: 30 });
  const [learn, setLearn] = useState(15);
  const [ratio, setRatio] = useState(2);
  const earned = learn * ratio;

  useEffect(() => {
    const tween = gsap.to(shown.current, {
      v: earned,
      duration: prefersReduced() ? 0 : 0.6,
      ease: "power3.out",
      onUpdate: () => { if (out.current) out.current.textContent = Math.round(shown.current.v); },
    });
    return () => tween.kill();
  }, [earned]);

  useIsoLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(".sim__card", {
        y: 80, opacity: 0, rotateX: 12, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sim" ref={root} aria-labelledby="sim-title">
      <div className="wrap">
        <div className="sim__card">
          <div className="sim__intro">
            <p className="eyebrow"><span className="eyebrow__dot" />À vous de régler</p>
            <h2 id="sim-title" className="display h3">Faites le calcul.</h2>
            <p className="muted">Le ratio, c'est vous qui le fixez dans l'Accès Parent. Modifiable à tout moment.</p>
          </div>

          <div className="sim__controls">
            <label className="sim__field">
              <span className="sim__field-top">
                <span>Temps d'apprentissage</span>
                <b>{learn} min</b>
              </span>
              <input
                type="range" min="0" max={MAX} step="5" value={learn}
                onChange={(e) => setLearn(+e.target.value)}
                style={{ "--fill": `${(learn / MAX) * 100}%` }}
              />
            </label>

            <div className="sim__field" role="radiogroup" aria-label="Ratio">
              <span className="sim__field-top"><span>Ratio choisi par vous</span></span>
              <div className="seg">
                {RATIOS.map((r) => (
                  <button
                    key={r} role="radio" aria-checked={ratio === r}
                    className={ratio === r ? "is-on" : ""}
                    onClick={() => setRatio(r)}
                  >
                    <b>×{r}</b>
                    <small>1 min → {r} min</small>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sim__result" aria-live="polite">
            <span className="sim__result-label">Temps de divertissement gagné</span>
            <span className="sim__result-num">
              <b ref={out}>{earned}</b><i>min</i>
            </span>
            <div className="sim__bars" aria-hidden="true">
              <div><span style={{ width: `${(learn / (MAX * 3)) * 100}%` }} className="bar bar--learn" /><em>apprentissage</em></div>
              <div><span style={{ width: `${(earned / (MAX * 3)) * 100}%` }} className="bar bar--fun" /><em>divertissement</em></div>
            </div>
            <SignupButton label="Régler mon ratio" />
          </div>
        </div>
      </div>
    </section>
  );
}
