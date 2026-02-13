export default function Footer() {
  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-slate-100 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <span className="material-icons">account_balance_wallet</span>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">El&Moi</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              L'application qui réconcilie les parents, les enfants et les écrans.
            </p>
            <div className="flex space-x-4">
              <a className="text-slate-400 hover:text-primary" href="#"><span className="material-icons text-xl">facebook</span></a>
              <a className="text-slate-400 hover:text-primary" href="#"><span className="material-icons text-xl">share</span></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Produit</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a className="hover:text-primary" href="#">Fonctionnalités</a></li>
              <li><a className="hover:text-primary" href="#">Tarifs</a></li>
              <li><a className="hover:text-primary" href="#">Pour les écoles</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a className="hover:text-primary" href="#">Blog Éducation</a></li>
              <li><a className="hover:text-primary" href="#">Guide parental</a></li>
              <li><a className="hover:text-primary" href="#">Centre d'aide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a className="hover:text-primary" href="#">Confidentialité</a></li>
              <li><a className="hover:text-primary" href="#">CGU</a></li>
              <li><a className="hover:text-primary" href="#">Mentions légales</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 text-center text-sm text-slate-500 dark:text-slate-500">
          <p>© 2023 El&Moi SAS. Tous droits réservés. Fabriqué avec <span className="text-red-500">♥</span> à Paris.</p>
        </div>
      </div>
    </footer>
  )
}
