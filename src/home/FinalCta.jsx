import { Fragment, useRef } from "react";
import { gsap, prefersReduced, useIsoLayoutEffect } from "./motion.jsx";
import { SignupButton, StoreBadges } from "./ui.jsx";

export default function FinalCta() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 85%", end: "center center", scrub: 0.6 },
      });
      tl.fromTo(".fc__panel", { clipPath: "inset(12% 8% 12% 8% round 48px)" }, { clipPath: "inset(0% 0% 0% 0% round 32px)", ease: "none" })
        .from(".fc__mascot", { yPercent: 60, rotate: -12, ease: "none" }, 0);
      gsap.from(".fc__title .w", {
        yPercent: 115, stagger: 0.06, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: ".fc__title", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const words = ["Ce", "soir,", "le", "temps", "d'écran", "change", "de", "règle."];

  return (
    <section className="fc" ref={root}>
      <div className="fc__panel">
        <div className="fc__glow" aria-hidden="true" />
        <div className="wrap fc__layout">
          <div className="fc__copy">
            <h2 className="display h1 fc__title">
              {words.map((w, i) => (
                <Fragment key={i}><span className="mask"><span className={`w ${i >= 5 ? "sage" : ""}`}>{w}</span></span>{" "}</Fragment>
              ))}
            </h2>
            <ol className="fc__steps">
              <li><b>1</b> Créez votre Accès Parent, dans le navigateur.</li>
              <li><b>2</b> Installez l'app sur le téléphone de votre enfant.</li>
              <li><b>3</b> Scannez le QR code. C'est parti.</li>
            </ol>
            <div className="fc__ctas">
              <SignupButton size="btn--xl" label="Créer mon Accès Parent gratuit" />
            </div>
            <div className="fc__stores">
              <span>App enfant</span>
              <StoreBadges />
            </div>
          </div>
          <img className="fc__mascot" src="/img/mascot.png" alt="El, la mascotte d'El&Moi" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
