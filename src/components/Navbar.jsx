import { APP_DOWNLOAD_URL } from '../config'
import elephantLogo from '../assets/Main El&Moi.png'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-100 dark:border-white/5">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
        <a href="#" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1 -m-1">
          <img src={elephantLogo} alt="Logo El&Moi" className="h-8 w-auto" />
          <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">El&Moi</span>
        </a>
        <a
          href={APP_DOWNLOAD_URL}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-primary hover:bg-primary-dark shadow-md hover:shadow-lg shadow-primary/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Télécharger (Android — bêta)
        </a>
      </div>
    </nav>
  )
}
