export default function FAQ() {
  const faqs = [
    {
      question: "Est-ce du contrôle parental ?",
      answer: "Non. El&Moi est un cadre éducatif qui encourage l'autonomie avec des règles simples."
    },
    {
      question: "C'est disponible sur iPhone ?",
      answer: "Pas encore. La bêta est Android uniquement pour le moment."
    },
    {
      question: "Mon enfant peut contourner ?",
      answer: "On réduit les contournements avec des règles cohérentes et des plages horaires. Aucun système n'est magique, mais le cadre aide."
    },
    {
      question: "Comment télécharger ?",
      answer: "Via le lien de téléchargement Android (bêta) ci-dessus."
    }
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#EAF2FB]/60 dark:bg-primary-very-light/10" id="faq">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">
          Questions fréquentes
        </h2>
        <div className="space-y-3 max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="faq-item group rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-surface-dark overflow-hidden"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
                <span className="font-semibold text-slate-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <span className="transition group-open:rotate-180 flex-shrink-0 text-slate-400">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-slate-700">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
