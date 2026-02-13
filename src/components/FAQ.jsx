export default function FAQ() {
  const faqs = [
    {
      question: "Sur quels appareils l'application fonctionne-t-elle ?",
      answer: "El&Moi est compatible avec les smartphones et tablettes iOS (iPhone, iPad) et Android. L'application parent peut gérer des appareils enfants sur des systèmes différents."
    },
    {
      question: "Est-ce que l'enfant peut désinstaller l'app ?",
      answer: "Non, l'application installe un profil de sécurité (MDM) qui empêche la suppression sans le code parent. Nous avons conçu le système pour résister aux petits hackers les plus malins."
    },
    {
      question: "L'application accède-t-elle aux messages privés ?",
      answer: "Absolument pas. Nous respectons la vie privée de votre enfant. Nous ne surveillons que le temps passé par application, pas le contenu des conversations ou de la navigation."
    },
    {
      question: "Y a-t-il une période d'essai ?",
      answer: "Oui, vous bénéficiez de 14 jours d'essai gratuit pour tester toutes les fonctionnalités Premium sans engagement."
    }
  ]

  return (
    <section className="py-24 bg-white dark:bg-surface-dark" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Questions fréquentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-background-light dark:bg-background-dark rounded-xl">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6">
                <span className="text-slate-900 dark:text-white font-semibold">{faq.question}</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="text-slate-600 dark:text-slate-400 mt-0 px-6 pb-6 text-sm leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
