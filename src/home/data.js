// Liens de conversion : mêmes cibles que src/config.js.
import { PARENT_APP_URL, APP_STORE_URL, PLAY_STORE_URL } from "../config";
import faqData from "../data/home-faq.json";
import reviewsData from "../data/reviews.json";

export { APP_STORE_URL, PLAY_STORE_URL };
export const REGISTER_URL = PARENT_APP_URL;
export const LOGIN_URL = "https://eletmoi.app/";

// Sections de l'accueil (ancres). « Blog » est une page : géré dans Navbar.
export const NAV = [
  { id: "smartloop", label: "Smartloop" },
  { id: "controle", label: "Contrôle" },
  { id: "lumen", label: "Lumen" },
  { id: "tarifs", label: "Tarifs" },
];

// Catalogue Lumen réel (dossier /Lumen, 34 modules)
export const UNIVERS = [
  {
    title: "Menaces & arnaques",
    modules: [
      "Hameçonnage : email, SMS, appel",
      "Les 9 signes d'un message suspect",
      "Arnaques aux achats en ligne",
      "Faux concours & cadeaux",
      "Faux support technique",
      "Vishing : arnaques au téléphone",
      "Ransomware",
      "Usurpation d'identité",
    ],
  },
  {
    title: "Sécurité personnelle",
    modules: [
      "Mots de passe : créer, ne pas partager",
      "Gestionnaire de mots de passe",
      "Double authentification (2FA)",
      "Mises à jour & correctifs",
      "Antivirus & protection de l'appareil",
      "Wi-Fi public : les risques",
      "Sauvegardes numériques",
    ],
  },
  {
    title: "Données & vie privée",
    modules: [
      "C'est quoi une donnée personnelle ?",
      "Empreinte numérique & réputation",
      "Cookies & trackers pub",
      "Géolocalisation : qui te suit ?",
      "Cambridge Analytica & scandales data",
      "Privacy by design & RGPD",
    ],
  },
  {
    title: "IA & désinformation",
    modules: [
      "C'est quoi l'IA ? En simple",
      "Comment fonctionne ChatGPT, Claude…",
      "Deepfakes : voir ne suffit plus",
      "Fake news & vérification de l'info",
      "Phishing par IA, voix clonée",
      "Biais algorithmiques",
      "IA, droit d'auteur & plagiat",
    ],
  },
  {
    title: "Réseaux sociaux & usages",
    modules: [
      "Algorithmes : pourquoi cette vidéo ?",
      "Bulles de filtre",
      "Temps d'écran & dopamine",
      "Profil public vs privé",
      "Cyberharcèlement : reconnaître & réagir",
      "Grooming & manipulation en ligne",
      "Signaler un contenu",
    ],
  },
];

// Avis réels et FAQ : mêmes sources que le reste du site (la FAQ alimente aussi
// le balisage FAQPage du prérendu — le texte affiché doit rester identique).
const SOURCE = { google_play: "Google Play", app_store: "App Store" };
export const REVIEW_STATS = reviewsData.stats;
export const REVIEWS = reviewsData.reviews.map((r) => ({
  author: r.author || `Avis ${SOURCE[r.source] || ""}`.trim(),
  source: SOURCE[r.source] || r.source,
  title: r.title,
  text: r.text,
}));
export const FAQ = faqData.faqs.map((f) => ({ q: f.q, a: f.a }));
