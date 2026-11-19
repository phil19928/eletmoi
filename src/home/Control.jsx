import { useRef } from "react";
import { gsap, useIsoLayoutEffect } from "./motion.jsx";
import { Phone } from "./ui.jsx";

const PARENT_BG = "#f8f9f7";
const CARDS = [
  {
    kind: "scroll", src: "/ui/p_dashboard_long.jpg", bg: PARENT_BG,
    title: "Tout sur un seul écran.",
    text: "Temps d'écran passé, divertissement restant, minutes gagnées en apprenant, et un reporting sur 7 jours.",
    tag: "Accès Parent",
  },
  {
    kind: "block", src: "/ui/p_block_btn.jpg", after: "/ui/p_block_after.jpg", bg: PARENT_BG,
    title: "Tout bloquer, en un geste.",
    text: "« Bloquer toutes les applications », depuis votre téléphone ou votre ordi. Matin, journée, nuit : vous décidez.",
    tag: "Accès Parent",
  },
  {
    video: "/clips/o_ytpause",
    title: "Et chez lui, c'est immédiat.",
    text: "YouTube se met en pause sur son téléphone : « Pause parentale active ». L'écran explique pourquoi.",
    tag: "App enfant",
  },
  {
    src: "/ui/p_slots_editor.jpg", bg: PARENT_BG,
    title: "Des plages horaires.",
    text: "Soir, nuit, école. Pendant ces créneaux, les applis de divertissement restent fermées.",
    tag: "Accès Parent",
  },
  {
    video: "/clips/k_blockduo",
    title: "La nuit, c'est la nuit.",
    text: "Plage « Nuit » active : l'appli ne s'ouvre pas, et il sait jusqu'à quelle heure.",
    tag: "App enfant",
  },
  {
    src: "/ui/p_appcontrol.jpg", bg: PARENT_BG,
    title: "App par app.",
    text: "Divertissement, apprentissage, autre : vous classez chaque appli, vous la bloquez ou l'autorisez.",
    tag: "Accès Parent",
  },
];

export default function Control() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current.querySelector(".ctl__track");
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray(".ctl__card .phone").forEach((ph) => {
          gsap.fromTo(ph, { rotate: 6, y: 40 }, {
            rotate: -4, y: -20, ease: "none",
            scrollTrigger: { trigger: ph, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="controle" className="ctl" ref={root}>
      <div className="ctl__track">
        <div className="ctl__intro">
          <p className="eyebrow eyebrow--light"><span className="eyebrow__dot" />Contrôle parental</p>
          <h2 className="display h2">Le contrôle,<br /><span className="sage">quand il le faut.</span></h2>
          <p className="ctl__lead">
            La Smartloop responsabilise. Mais c'est vous qui gardez la main, depuis votre navigateur, sans rien installer.
          </p>
          <p className="ctl__hint" aria-hidden="true"><span className="hint-desk">Faites défiler</span><span className="hint-touch">Glissez</span> <span className="arr">→</span></p>
        </div>
        {CARDS.map((c, i) => (
          <article className="ctl__card" key={i}>
            <div className="ctl__phone-wrap">
              {c.kind === "scroll" ? (
                <Phone bg={c.bg}>
                  {/* Tableau de bord complet qui défile doucement dans le téléphone */}
                  <img className="ctl-scroll" src={c.src} alt={c.title} loading="eager" decoding="async" />
                </Phone>
              ) : c.kind === "block" ? (
                <Phone bg={c.bg}>
                  {/* Avant / après le bouton « Bloquer toutes les applications » */}
                  <img className="screen ctl-zoom" src={c.src} alt={c.title} loading="eager" decoding="async" />
                  <img className="screen ctl-zoom ctl-after" src={c.after} alt="" loading="eager" decoding="async" />
                  <span className="ctl-tap" aria-hidden="true" />
                </Phone>
              ) : (
                <Phone src={c.src} video={c.video} bg={c.bg} alt={c.title} eager />
              )}
            </div>
            <div className="ctl__text">
              <span className="ctl__tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
            <span className="ctl__index" aria-hidden="true">0{i + 1}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
