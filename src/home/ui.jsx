import { useEffect, useRef, useState } from "react";
import { gsap, prefersReduced } from "./motion.jsx";
import { REGISTER_URL, APP_STORE_URL, PLAY_STORE_URL } from "./data.js";

/* Real screen recording from the reels; plays only while visible (and while `active`). */
export function Screen({ video, poster, src, alt = "", active = true, className = "", playlist, eager = false, rate = 1 }) {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const list = playlist || (video ? [video] : null);
  useEffect(() => {
    const v = ref.current;
    if (!v || prefersReduced()) return;
    let visible = false;
    const sync = () => (visible && active ? v.play().catch(() => {}) : v.pause());
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.2 });
    io.observe(v);
    sync();
    return () => io.disconnect();
  }, [active, idx]);
  if (list) {
    const cur = list[idx];
    return (
      <video
        ref={ref}
        key={cur}
        className={`screen ${className}`}
        src={`${cur}.mp4`}
        poster={`${cur}.jpg`}
        muted
        playsInline
        loop={list.length === 1}
        preload={eager ? "auto" : "none"}
        aria-label={alt}
        onEnded={() => setIdx((i) => (i + 1) % list.length)}
        onLoadedMetadata={(e) => { e.currentTarget.playbackRate = rate; }}
        onPlay={(e) => { e.currentTarget.playbackRate = rate; }}
      />
    );
  }
  return <img className={`screen ${className}`} src={src || poster} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

/* Phone frame copied from the reels kit: graphite bezel, clean status bar, island, home bar. */
export function Phone({ className = "", bg = "#fff", children, ...screen }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone__body">
        <div className="phone__screen" style={{ background: bg }}>
          <div className="phone__status"><span className="phone__island" /></div>
          <div className="phone__content">{children || <Screen {...screen} />}</div>
          <div className="phone__chin"><span /></div>
        </div>
      </div>
    </div>
  );
}

/* A real UI card (screenshot) lifted out of the app. */
export function Card({ src, alt = "", className = "", ...rest }) {
  return (
    <div className={`uicard ${className}`} {...rest}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

/* Button that leans toward the cursor (desktop pointers only). */
export function Magnetic({ children, strength = 0.35, className = "", ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced() || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return (
    <a ref={ref} className={`magnetic ${className}`} {...props}>
      {children}
    </a>
  );
}

export function SignupButton({ label = "Créer mon Accès Parent", size = "", className = "" }) {
  return (
    <Magnetic href={REGISTER_URL} className={`btn btn--primary ${size} ${className}`}>
      <span className="btn__label">{label}</span>
      <span className="btn__arrow" aria-hidden="true">
        <Arrow />
      </span>
    </Magnetic>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Star({ size = 16 }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z" />
    </svg>
  );
}

export function Check() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" opacity=".14" />
      <path d="M6 10.4l2.6 2.6L14.2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Lock({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="10.5" width="16" height="10.5" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 018 0v3" />
    </svg>
  );
}

export function StoreBadges({ className = "" }) {
  return (
    <div className={`stores ${className}`}>
      <a href={APP_STORE_URL} aria-label="Télécharger l'application enfant El&Moi sur l'App Store">
        <img src="/img/appstore.png" alt="App Store" width="164" height="48" loading="lazy" />
      </a>
      <a href={PLAY_STORE_URL} aria-label="Télécharger l'application enfant El&Moi sur Google Play">
        <img src="/img/googleplay.png" alt="Google Play" width="164" height="48" loading="lazy" />
      </a>
    </div>
  );
}

export function Eyebrow({ children, tone = "" }) {
  return <p className={`eyebrow ${tone}`}><span className="eyebrow__dot" />{children}</p>;
}
