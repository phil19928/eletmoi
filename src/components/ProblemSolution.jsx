export default function ProblemSolution() {
  return (
    <section className="py-20 bg-white dark:bg-surface-dark border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-12 md:mb-16">
          Ni laxiste, ni dictateur. <span className="text-primary">La troisième voie.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {/* Bad Way */}
          <div className="p-6 md:p-8 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 opacity-70 hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-200 rounded-full flex items-center justify-center mb-4 md:mb-6">
              <span className="material-icons text-2xl md:text-3xl">block</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">Blocage Total</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Crée de la frustration, des cris et des contournements. L'enfant ne comprend pas pourquoi.</p>
          </div>
          {/* El&Moi Way */}
          <div className="relative p-8 md:p-10 rounded-3xl bg-white dark:bg-background-dark border-2 border-primary shadow-2xl shadow-primary/20 md:scale-105 z-10">
            <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold tracking-wide">EL&MOI</div>
            <div className="w-18 h-18 md:w-20 md:h-20 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 md:mb-6">
              <span className="material-icons text-3xl md:text-4xl">balance</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">Échange Équitable</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">L'enfant gagne son temps de loisir par l'effort. C'est clair, motivant et éducatif.</p>
          </div>
          {/* Bad Way 2 */}
          <div className="p-6 md:p-8 rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 opacity-70 hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-orange-100 dark:bg-orange-800 text-orange-600 dark:text-orange-200 rounded-full flex items-center justify-center mb-4 md:mb-6">
              <span className="material-icons text-2xl md:text-3xl">hourglass_disabled</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">Open Bar</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Conduit à la sédentarité, aux problèmes de sommeil et à l'addiction aux écrans.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
