import { APP_DOWNLOAD_URL } from '../config'
import elephantMascot from '../assets/Main El&Moi.png'

export default function FooterCTA() {
  return (
    <section className="relative min-h-[420px] sm:min-h-[480px] md:min-h-[520px] bg-[#EAF2FB]/60 dark:bg-primary-very-light/10 overflow-hidden">
      {/* Contenu au-dessus du slime (z-10) */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-12 pb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
          Prêt à essayer El&Moi ?
        </h2>
        <a
          href={APP_DOWNLOAD_URL}
          rel="noopener noreferrer"
          target="_blank"
          className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-bold text-white bg-primary hover:bg-primary-dark shadow-lg shadow-primary/30 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
        >
          Télécharger
        </a>
        {/* Mascot éléphant — posé au-dessus du slime (chevauche la vague) */}
        <div className="mt-6 -mb-[140px] sm:-mb-[160px] md:-mb-[200px] w-full flex justify-center">
          <img
            src={elephantMascot}
            alt="Mascotte El&Moi"
            className="w-[260px] sm:w-[300px] md:w-[380px] lg:w-[420px] max-w-[90vw] h-auto object-contain elephant-float"
          />
        </div>
      </div>

      {/* Slime / vague bleue en bas — SVG absolute */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[220px] sm:h-[260px] md:h-[320px] z-0"
        aria-hidden
      >
        <defs>
          <linearGradient id="slime-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8EB6D8" />
            <stop offset="70%" stopColor="#6D98C2" />
            <stop offset="100%" stopColor="#4F7FAE" />
          </linearGradient>
        </defs>
        <path
          fill="url(#slime-gradient)"
          d="M0,224 C240,160 420,160 720,224 C1020,288 1200,288 1440,224 L1440,320 L0,320 Z"
        />
      </svg>
    </section>
  )
}
