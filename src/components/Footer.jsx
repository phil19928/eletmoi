import elephantLogo from '../assets/Main El&Moi.png'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-slate-100 dark:border-slate-800 pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3 md:mb-4">
              <img 
                src={elephantLogo} 
                alt="Logo El&Moi" 
                className="h-7 md:h-8 w-auto"
              />
              <span className="font-bold text-lg md:text-xl tracking-tight text-slate-900 dark:text-white">El&Moi</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-md mx-auto md:mx-0">
              L'application qui réconcilie les parents, les enfants et les écrans.
            </p>
          </div>
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 md:pt-8 text-center text-xs md:text-sm text-slate-500 dark:text-slate-400">
          <p>© 2023 El&Moi SAS. Tous droits réservés. Fabriqué avec <span className="text-red-500">♥</span> en France.</p>
        </div>
      </div>
    </footer>
  )
}
