import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Année du build, figée dans les deux bundles (client et SSR).
    //
    // Le pied de page appelait `new Date().getFullYear()` : la valeur était
    // calculée une fois au prérendu et une seconde fois dans le navigateur.
    // Tant que le site n'est pas redéployé après le 1er janvier, les deux
    // divergent — React considère alors l'hydratation invalide et re-rend
    // toute la page côté client, en jetant le HTML prérendu.
    __BUILD_YEAR__: new Date().getFullYear(),
  },
})
