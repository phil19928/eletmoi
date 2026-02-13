import { APP_DOWNLOAD_URL } from '../config'
import elephantLogo from '../assets/Main El&Moi.png'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center py-12 sm:py-14 overflow-hidden bg-white dark:bg-surface-dark">
      <div className="w-full max-w-[1040px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Moins de scroll.
              <br />
              <span className="text-primary">Plus de progrès.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              El&Moi aide les enfants à équilibrer divertissement et apprentissage grâce à un système de temps gagné.
            </p>
            <div className="mt-10 flex justify-center lg:justify-start">
              <a
                href={APP_DOWNLOAD_URL}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-white bg-primary hover:bg-primary-dark shadow-lg shadow-primary/30 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Télécharger
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center lg:text-left">
              Bêta Android uniquement — pas encore sur l'App Store.
            </p>
          </div>
          <div className="flex justify-center order-1 lg:order-2">
            <img
              src={elephantLogo}
              alt="El&Moi — équilibre écrans et apprentissage"
              className="w-full max-w-sm lg:max-w-md h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
