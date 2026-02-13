import { APP_DOWNLOAD_URL } from '../config'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 hero-pattern z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Bêta Android
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              Moins de scroll. <br/>
              <span className="text-primary">Plus de progrès.</span> <br/>
              Sans guerre à la maison.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transformez le temps d'écran passif en opportunités d'apprentissage. El&Moi est la première application qui crée un échange équitable entre divertissement et éducation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <div className="flex flex-col items-center lg:items-start">
                <a className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl text-white bg-primary hover:bg-primary-dark shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" href={APP_DOWNLOAD_URL}>
                  <span className="material-icons mr-2">download</span>
                  Télécharger l'app
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center lg:text-left">Bêta Android uniquement.</p>
              </div>
              <a className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-200 dark:border-slate-700 text-base font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" href="#how-it-works">
                <span className="material-icons mr-2 text-slate-400">play_circle_outline</span>
                Voir comment ça marche
              </a>
            </div>
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="material-icons text-primary text-lg sm:text-xl">school</span>
                <span className="whitespace-nowrap">Approche éducative</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons text-primary text-lg sm:text-xl">camera_alt</span>
                <span className="whitespace-nowrap">Missions photo + validation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons text-primary text-lg sm:text-xl">schedule</span>
                <span className="whitespace-nowrap">Plages horaires (école/nuit)</span>
              </div>
            </div>
          </div>
          {/* Hero Image / Illustration */}
          <div className="relative lg:h-[600px] w-full flex items-center justify-center mt-8 lg:mt-0">
            {/* Abstract Background Shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-60"></div>
            <div className="relative w-full max-w-md mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                alt="Happy child looking at a tablet with educational content, smiling" 
                className="rounded-3xl shadow-2xl shadow-slate-200 dark:shadow-black/50 border-4 border-white dark:border-slate-800 object-cover w-full h-auto aspect-[4/5]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7eP5hOdBnEy9SF8iLfCJSuby8I_Y5jEl9nE7fOt8b_8ox9VX6E1IfjFmO7zsuqLFrk9yLPIc5anlKLAGUbmjIrMvxyRNkHq2EhRt2CJJCUlwYeEll8Hq8djmRFUcyNMvg7TQLnyeqWRPO229_KFHjYI3Y4XiLyA1uhouFAYOovvPRMmmyhddsXiScpd_yh8cZlW7zB8ZX7KJK4tHNnfkDAo8v0vqjKs_js0WjSAJHY7xbM25lcklMapCQM972HMsasmWlVsINKBk"
              />
              {/* Floating Card 1 */}
              <div className="hidden sm:block absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white dark:bg-surface-dark p-3 sm:p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 sm:gap-4 animate-bounce max-w-[180px] sm:max-w-none" style={{animationDuration: '3s'}}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  <span className="material-icons text-lg sm:text-xl">check</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Maths complétées</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">+15 min de YouTube</p>
                </div>
              </div>
              {/* Floating Card 2 */}
              <div className="hidden sm:block absolute top-8 sm:top-10 -right-4 sm:-right-8 bg-white dark:bg-surface-dark p-3 sm:p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2 sm:gap-3 animate-bounce max-w-[160px] sm:max-w-none" style={{animationDuration: '4s'}}>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent-coral flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  !
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Limite atteinte</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">Pause éducative</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
