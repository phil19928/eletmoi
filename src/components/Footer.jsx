export default function Footer() {
  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-slate-100 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4 text-primary">
              <span className="material-icons">account_balance_wallet</span>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">El&Moi</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              L'application qui réconcilie les parents, les enfants et les écrans.
            </p>
          </div>
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 text-center text-sm text-slate-500 dark:text-slate-500">
          <p>© 2023 El&Moi SAS. Tous droits réservés. Fabriqué avec <span className="text-red-500">♥</span> en France.</p>
        </div>
      </div>
    </footer>
  )
}
