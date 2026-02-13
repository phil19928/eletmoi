import { APP_DOWNLOAD_URL } from '../config'

export default function FinalCTA() {
  return (
    <section className="py-24 bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Prêt à retrouver la paix à la maison ?</h2>
            <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">Rejoignez 50 000+ familles qui ont choisi l'éducation positive plutôt que la répression. {/* TODO: Vérifier ce chiffre */}</p>
            <a 
              href={APP_DOWNLOAD_URL}
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full text-white bg-accent-coral hover:bg-accent-coral-hover shadow-lg shadow-black/20 transform hover:-translate-y-1 transition-all duration-200"
            >
              Commencer avec El&Moi
              <span className="material-icons ml-2">arrow_forward</span>
            </a>
            <p className="mt-4 text-sm text-white/70">Essai gratuit 14 jours • Sans carte bancaire</p>
          </div>
        </div>
      </div>
    </section>
  )
}
