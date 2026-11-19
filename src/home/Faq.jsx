import { useState } from "react";
import { FAQ } from "./data.js";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq">
      <div className="wrap faq__layout">
        <div className="faq__head">
          <p className="eyebrow"><span className="eyebrow__dot" />FAQ</p>
          <h2 className="display h2">Questions<br />fréquentes<span className="faq__sub">sur le contrôle parental</span></h2>
          <img className="faq__mascot" src="/img/mascot-why.png" alt="" loading="lazy" />
        </div>
        <ul className="faq__list">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className={`faq__item ${isOpen ? "is-open" : ""}`}>
                <button aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{f.q}</span>
                  <span className="faq__icon" aria-hidden="true" />
                </button>
                <div className="faq__body" id={`faq-${i}`} role="region">
                  <div><p>{f.a}</p></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
