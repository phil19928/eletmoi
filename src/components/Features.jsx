export default function Features() {
  const features = [
    {
      icon: "schedule",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600",
      title: "Restrictions horaires",
      description: "Définissez des plages de sommeil et de devoirs incompressibles."
    },
    {
      icon: "tune",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600",
      title: "Ajustements en temps réel",
      description: "Accordez ou retirez du temps instantanément depuis votre téléphone."
    },
    {
      icon: "insights",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600",
      title: "Insights d'usage",
      description: "Comprenez vraiment comment votre enfant utilise ses écrans."
    },
    {
      icon: "camera_alt",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-600",
      title: "Validation photo",
      description: "Demandez une photo (ex: chambre rangée) pour valider une mission."
    }
  ]

  return (
    <section className="py-24 bg-white dark:bg-surface-dark" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Header Column */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">
              Tout ce dont vous avez besoin pour <span className="text-primary">l'harmonie numérique</span>.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 md:mb-8 text-base md:text-lg">
              El&Moi offre un panneau de contrôle complet mais simple, conçu pour les parents d'aujourd'hui.
            </p>
            <a className="inline-flex items-center text-primary font-semibold hover:text-primary-dark group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 -mx-2 -my-1" href="#features">
              Explorer toutes les fonctionnalités
              <span className="material-icons ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
          {/* Grid Column */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-5 md:p-6 rounded-xl bg-background-light dark:bg-background-dark border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                <div className={`w-11 h-11 md:w-12 md:h-12 ${feature.iconBg} ${feature.iconColor} rounded-lg flex items-center justify-center mb-3 md:mb-4`}>
                  <span className="material-icons text-lg md:text-xl">{feature.icon}</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base md:text-lg mb-2">{feature.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
