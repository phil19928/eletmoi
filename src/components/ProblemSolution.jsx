export default function ProblemSolution() {
  return (
    <section className="py-20 bg-white dark:bg-surface-dark border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-16">
          Ni laxiste, ni dictateur. <span className="text-primary">La troisième voie.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Bad Way */}
          <div className="p-8 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 opacity-70 hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-200 rounded-full flex items-center justify-center mb-6">
              <span className="material-icons text-3xl">block</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Blocage Total</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Crée de la frustration, des cris et des contournements. L'enfant ne comprend pas pourquoi.</p>
          </div>
          {/* El&Moi Way */}
          <div className="relative p-10 rounded-3xl bg-white dark:bg-background-dark border-2 border-primary shadow-2xl shadow-primary/20 scale-105 z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">EL&MOI</div>
            <div className="w-20 h-20 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <span className="material-icons text-4xl">balance</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Échange Équitable</h3>
            <p className="text-slate-600 dark:text-slate-300">L'enfant gagne son temps de loisir par l'effort. C'est clair, motivant et éducatif.</p>
          </div>
          {/* Bad Way 2 */}
          <div className="p-8 rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 opacity-70 hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-800 text-orange-600 dark:text-orange-200 rounded-full flex items-center justify-center mb-6">
              <span className="material-icons text-3xl">hourglass_disabled</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Open Bar</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Conduit à la sédentarité, aux problèmes de sommeil et à l'addiction aux écrans.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
