import SiteLink from "../components/SiteLink";
import Footer from "../sections/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <div className="flex-1 flex items-center justify-center px-5 py-24">
        <div className="text-center max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-dark">
            Erreur 404
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Cette page n'existe pas.
          </h1>
          <p className="mt-4 text-slate-500 leading-relaxed">
            Le lien est peut-être erroné, ou la page a été déplacée.
          </p>
          <SiteLink
            to="/"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-semibold shadow-md shadow-primary/20 hover:bg-primary-dark transition-colors"
          >
            ← Retour à l'accueil
          </SiteLink>
        </div>
      </div>
      <Footer />
    </div>
  );
}
