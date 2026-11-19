import { Fragment, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;
export const getLenis = () => lenis;

export function initSmoothScroll() {
  if (prefersReduced()) return () => {};
  lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  const raf = (t) => lenis.raf(t * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenis = null;
  };
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/* Split a string into masked words for line-by-line reveals. */
export function Words({ text, className = "w" }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      <span className="mask"><span className={className}>{word}</span></span>{" "}
    </Fragment>
  ));
}

// useLayoutEffect côté client, useEffect au prérendu (pas d'avertissement SSR).
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export { gsap, ScrollTrigger };
