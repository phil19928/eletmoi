import { useEffect, useRef } from "react";
import { ScrollTrigger } from "./motion.jsx";
import { REGISTER_URL } from "./data.js";
import { Arrow } from "./ui.jsx";

/* Sticky sign-up bar on phones, shown after the hero and hidden over the final CTA. */
export default function MobileCta() {
  const ref = useRef(null);
  useEffect(() => {
    const show = (on) => ref.current?.classList.toggle("is-on", on);
    const a = ScrollTrigger.create({ trigger: "#manifeste", start: "top 60%", endTrigger: ".fc", end: "top 80%", onToggle: (s) => show(s.isActive) });
    return () => a.kill();
  }, []);
  return (
    <div className="mcta" ref={ref}>
      <a href={REGISTER_URL} className="btn btn--primary btn--block">
        <span className="btn__label">Commencer gratuitement</span>
        <span className="btn__arrow"><Arrow /></span>
      </a>
    </div>
  );
}
