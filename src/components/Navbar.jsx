import { APP_DOWNLOAD_URL } from '../config'

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
              <span className="material-icons text-2xl">account_balance_wallet</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">El&Moi</span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#how-it-works">Comment ça marche</a>
            <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#features">Fonctionnalités</a>
            <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#faq">FAQ</a>
          </div>
          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-primary-dark shadow-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-200" href={APP_DOWNLOAD_URL}>
              Télécharger l'app
            </a>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-slate-500 hover:text-slate-600 focus:outline-none" type="button">
              <span className="material-icons">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
