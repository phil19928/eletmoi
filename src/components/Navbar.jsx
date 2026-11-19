import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SiteLink from "./SiteLink";
import { PARENT_APP_URL } from "../config";
import { gsap, prefersReduced, lockScroll, scrollToId } from "../home/motion.jsx";
import { Magnetic, Arrow } from "../home/ui.jsx";

/**
 * Navigation du site (refonte 2026).
 *
 * Les entrées Smartloop / Contrôle / Lumen / Tarifs ramènent aux sections de
 * l'accueil : « /#smartloop » plutôt que « #smartloop », sinon depuis
 * /blog/un-article le lien ne mènerait nulle part. Sur l'accueil, le clic fait
 * défiler en douceur au lieu de recharger. « Blog » est une vraie page.
 */
const SECTIONS = [
  { id: "smartloop", label: "Smartloop" },
  { id: "controle", label: "Contrôle" },
  { id: "lumen", label: "Lumen" },
  { id: "tarifs", label: "Tarifs" },
];
const LOGIN_URL = "https://eletmoi.app/";

export default function Navbar() {
  const bar = useRef(null);
  const progress = useRef(null);
  const menu = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const onBlog = pathname === "/blog" || pathname.startsWith("/blog/");

  // Pill compacte après 40 px, masquée en descendant, réaffichée en remontant.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const el = bar.current;
      if (!el) return;
      el.classList.toggle("is-scrolled", y > 40);
      el.classList.toggle("is-hidden", y > lastY && y > 500);
      lastY = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Section courante (accueil uniquement).
  useEffect(() => {
    if (!onHome) { setActive(""); return; }
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  // Menu mobile plein écran.
  useEffect(() => {
    lockScroll(open);
    const el = menu.current;
    if (!el) return;
    const d = prefersReduced() ? 0 : 1;
    if (open) {
      gsap.set(el, { visibility: "visible" });
      gsap.timeline()
        .fromTo(el, { clipPath: "circle(0% at 92% 4%)" }, { clipPath: "circle(150% at 92% 4%)", duration: 0.7 * d, ease: "power3.inOut" })
        .fromTo(el.querySelectorAll(".menu__link"), { yPercent: 110 }, { yPercent: 0, stagger: 0.06, duration: 0.6 * d, ease: "power3.out" }, "-=0.3")
        .fromTo(el.querySelectorAll(".menu__foot > *"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 * d }, "-=0.4");
      const onKey = (e) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    gsap.to(el, { clipPath: "circle(0% at 92% 4%)", duration: 0.5 * d, ease: "power3.inOut", onComplete: () => gsap.set(el, { visibility: "hidden" }) });
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const goSection = (id) => (e) => {
    setOpen(false);
    if (!onHome) return; // laisse SiteLink naviguer vers /#id
    e.preventDefault();
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <header ref={bar} className="nav" data-menu={open}>
        <div className="nav__inner">
          <SiteLink to="/" className="nav__logo" aria-label="El&Moi, retour à l'accueil">
            <img src="/img/logo.png" alt="" width="34" height="34" />
            <span>El&amp;Moi</span>
          </SiteLink>
          <nav className="nav__links" aria-label="Navigation principale">
            {SECTIONS.map(({ id, label }) => (
              <SiteLink key={id} to={`/#${id}`} onClick={goSection(id)} className={active === id ? "is-active" : ""}>
                {label}
              </SiteLink>
            ))}
            <SiteLink to="/blog" aria-current={onBlog ? "page" : undefined} className={onBlog ? "is-active" : ""}>
              Blog
            </SiteLink>
          </nav>
          <div className="nav__actions">
            <a href={LOGIN_URL} className="nav__login">Se connecter</a>
            <Magnetic href={PARENT_APP_URL} className="btn btn--primary btn--sm" strength={0.25}>
              <span className="btn__label">Commencer gratuitement</span>
            </Magnetic>
            <button
              type="button"
              className={`burger ${open ? "is-open" : ""}`}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span /><span />
            </button>
          </div>
          <div className="nav__progress" ref={progress} />
        </div>
      </header>

      <div id="mobile-menu" ref={menu} className="menu" aria-hidden={!open}>
        <nav className="menu__list" aria-label="Menu mobile">
          {SECTIONS.map(({ id, label }, i) => (
            <SiteLink key={id} to={`/#${id}`} onClick={goSection(id)} tabIndex={open ? 0 : -1}>
              <span className="mask"><span className="menu__link"><em>0{i + 1}</em>{label}</span></span>
            </SiteLink>
          ))}
          <SiteLink to="/blog" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            <span className="mask"><span className="menu__link"><em>05</em>Blog</span></span>
          </SiteLink>
        </nav>
        <div className="menu__foot">
          <a href={PARENT_APP_URL} className="btn btn--primary btn--lg" tabIndex={open ? 0 : -1}>
            <span className="btn__label">Créer mon Accès Parent</span>
            <span className="btn__arrow"><Arrow /></span>
          </a>
          <a href={LOGIN_URL} className="menu__login" tabIndex={open ? 0 : -1}>J'ai déjà un compte — se connecter</a>
        </div>
      </div>
    </>
  );
}
