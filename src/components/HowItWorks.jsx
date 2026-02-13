export default function HowItWorks() {
  const steps = [
    {
      icon: "category",
      title: "1. Deux catégories",
      description: "Définissez les apps \"Apprentissage\" (Duolingo, Khan Academy) et les apps \"Loisirs\" (TikTok, YouTube)."
    },
    {
      icon: "swap_horiz",
      title: "2. Règle de conversion",
      description: "Vous fixez le taux de change. Exemple : 10 minutes de maths débloquent 30 minutes de vidéo."
    },
    {
      icon: "task_alt",
      title: "3. Missions réelles",
      description: "Ajoutez des missions hors-écran : \"Ranger sa chambre\" ou \"Vider le lave-vaisselle\" pour gagner du temps bonus."
    }
  ]

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark relative" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">Méthode simple</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Comment ça marche ?</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Un système vertueux qui responsabilise votre enfant en trois étapes simples.</p>
        </div>
        <div className="relative grid md:grid-cols-3 gap-12">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent border-t-2 border-dashed border-primary/30 z-0"></div>
          {/* Steps */}
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-2xl bg-white dark:bg-surface-dark shadow-lg flex items-center justify-center mb-8 border border-slate-100 dark:border-slate-700 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                <span className="material-icons text-4xl text-primary">{step.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
