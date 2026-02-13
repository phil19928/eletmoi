import { APP_DOWNLOAD_URL } from '../config'
import elephantLogo from '../assets/Main El&Moi.png'

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#" className="flex-shrink-0 flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1 -m-1">
            <img 
              src={elephantLogo} 
              alt="Logo El&Moi" 
              className="h-8 w-auto"
            />
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">El&Moi</span>
          </a>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1" href="#how-it-works">Comment ça marche</a>
            <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1" href="#features">Fonctionnalités</a>
            <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1" href="#faq">FAQ</a>
          </div>
          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-primary-dark shadow-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" href={APP_DOWNLOAD_URL}>
              <span className="hidden lg:inline">Télécharger (Android — bêta)</span>
              <span className="lg:hidden">Télécharger</span>
            </a>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-slate-500 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2" type="button" aria-label="Menu">
              <span className="material-icons">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
