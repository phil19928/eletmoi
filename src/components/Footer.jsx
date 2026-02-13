import elephantLogo from '../assets/Main El&Moi.png'

export default function Footer() {
  return (
    <footer className="bg-primary-very-light/40 dark:bg-background-dark border-t border-slate-200 dark:border-white/10 py-10 sm:py-12">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src={elephantLogo} alt="Logo El&Moi" className="h-8 w-auto" />
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">El&Moi</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Fabriqué avec amour en France.
        </p>
      </div>
    </footer>
  )
}
