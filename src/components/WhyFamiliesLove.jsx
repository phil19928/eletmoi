export default function WhyFamiliesLove() {
  const benefits = [
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWed6LPt7ihDYNZd2Ieb3YqxhNgKxP-1bCbPOYgcILSBzj7ihFyUC9Q7sJhaHoDteEBydvtzuXNDh_yYx59Kk1oC-ZY9MbaRwnaUrGQaoWOdoAFYFJPXSJ0JI7munxZTnUYoUjajjvs9oClh5LDLNWk9JmnXXr4JAaAxrGSsH-BNrec5WeHZ_hwWVJzP1OgTV7VfAXdNhkHxSyjvi_EcPI2lPxanL-mC1Kd3sJI5JYCD5NUVHoVwnfP68961X-UMFmVVnNfR-ncGE",
      overlayBg: "bg-primary/20",
      icon: "visibility",
      title: "Clarté",
      description: "Les règles sont définies par l'app. Ce n'est plus \"Papa a dit non\", c'est \"L'app a dit non\"."
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmdv2Yco97hhruZrxfCstdKr3wDmsiUgM6kyiBzcNVz3pkwryly_EuC5vIxJVYBlyM6nGhqvBvOvUUnd5VKtXIdXJ4Ljuhb-zUUw6TE6J4N_nhOOBlm5EpbFROqd_s9d4_T_Eroh8pm-dhM61D7hIVVVH-wAGLxZJX1e2cDY-bHD4me1deIHCX6DwrVETSRCSqbVbvJjph5u65WVQ3UWVIIeXCV5ynRD74pjHtK9xm0yEvzq-B4nznlqYKwONUQJyM79jlDrEW36Y",
      overlayBg: "bg-accent-coral/20",
      icon: "emoji_events",
      title: "Motivation",
      description: "Votre enfant devient acteur. Il comprend que l'effort apporte une récompense immédiate."
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfJMFaXNXVeZmdiDRWTh9Up1Hz6oqoE6cFtcNfEuY8uDKt-wTanp8SK8_f0pdmDWKwA0Ifb3opD0w9ZH9btjWS1L5QWjO-HMhwdr0tDUfq_fPCk4FmP3GAxUXmOBi0gWTlDJAC_rjn8rDZJ24uWcBtom6R5PleisSBXli7JYZsMbO8nOB-lQTrP_71uK5-r3MTgkSGSmL6I_nFHZlmbLl9ziw6G5yOqqbtw-535AVILycjm7ohGEMHNmqdKNrgplCMH_vqx0r90MA",
      overlayBg: "bg-purple-500/20",
      icon: "favorite",
      title: "Relation",
      description: "Finis les chantages et les négotiations interminables. Retrouvez des moments de qualité."
    }
  ]

  return (
    <section className="py-24 bg-primary/5 dark:bg-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Pourquoi les familles adorent</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm text-center">
              <div className="w-48 h-32 mx-auto mb-6 rounded-lg overflow-hidden relative">
                <img 
                  alt={index === 0 ? "Clear blue sky with clouds representing clarity" : index === 1 ? "Person holding a trophy or medal, representing achievement" : "Parent and child holding hands or hugging"} 
                  className="w-full h-full object-cover opacity-80" 
                  src={benefit.image}
                />
                <div className={`absolute inset-0 flex items-center justify-center ${benefit.overlayBg} backdrop-blur-[2px]`}>
                  <span className="material-icons text-white text-5xl drop-shadow-lg">{benefit.icon}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{benefit.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
