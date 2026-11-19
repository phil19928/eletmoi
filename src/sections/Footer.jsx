import SiteLink from "../components/SiteLink";
import { PARENT_APP_URL, APP_STORE_URL, PLAY_STORE_URL } from "../config";
import { StoreBadges } from "../home/ui.jsx";

const LOGIN_URL = "https://eletmoi.app/";

/**
 * Pied de page (refonte 2026) — mêmes liens que l'ancien : pages produit,
 * blog, à propos et pages légales restent atteignables depuis chaque page.
 */
export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft__top">
          <div className="ft__brandcol">
            <SiteLink to="/" className="ft__brand">
              <img src="/img/logo.png" alt="" width="40" height="40" />
              <span>El&amp;Moi</span>
            </SiteLink>
            <p className="ft__about">
              El&amp;Moi — prononcé « El et Moi » — est une application de contrôle parental
              française qui limite le temps d'écran des enfants et le transforme en temps
              d'apprentissage. Données hébergées en France.
            </p>
            <StoreBadges className="ft__stores" />
            <div className="ft__social">
              <a href="mailto:contact@eletmoi.fr">contact@eletmoi.fr</a>
              <a
                href="https://www.instagram.com/eletmoi.app?igsh=MXJzZTkxcmF2OHU0ZQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram El&Moi"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
          <nav className="ft__cols" aria-label="Pages du site">
            <div>
              <h2>Produit</h2>
              <SiteLink to="/smartloop">La Smartloop</SiteLink>
              <SiteLink to="/lumen">Lumen</SiteLink>
              <SiteLink to="/tarifs">Tarifs</SiteLink>
              <SiteLink to="/a-propos">Qui sommes-nous</SiteLink>
            </div>
            <div>
              <h2>Ressources</h2>
              <SiteLink to="/blog">Blog</SiteLink>
              <a href={PARENT_APP_URL}>Créer un compte</a>
              <a href={LOGIN_URL}>Se connecter</a>
              <a href={APP_STORE_URL}>App Store</a>
              <a href={PLAY_STORE_URL}>Google Play</a>
            </div>
            <div>
              <h2>Légal</h2>
              <SiteLink to="/mentions-legales">Mentions légales</SiteLink>
              <SiteLink to="/confidentialite">Politique de confidentialité</SiteLink>
              <SiteLink to="/cgv">CGV</SiteLink>
              <SiteLink to="/cgu">CGU</SiteLink>
            </div>
          </nav>
        </div>
        <p className="ft__giant display" aria-hidden="true">El&amp;Moi</p>
        <div className="ft__bottom">
          <span>© {__BUILD_YEAR__} El&amp;Moi. Tous droits réservés.</span>
          <span className="ft__bottom-links">
            <a href="/llms.txt">llms.txt</a>
            <a href="https://www.cs-associes.fr" target="_blank" rel="noopener noreferrer">Un produit de C&amp;S Associés</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
