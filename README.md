# El&Moi Landing Page

Landing page React + Vite + Tailwind CSS pour El&Moi, reproduisant fidèlement le design original.

## 🚀 Installation et développement

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## 📦 Déploiement sur Netlify

### Configuration automatique

Le fichier `netlify.toml` est déjà configuré avec :
- **Build command** : `npm run build`
- **Publish directory** : `dist`
- **Redirects** : Toutes les routes redirigent vers `index.html` (SPA)

### Étapes de déploiement

1. **Connecter le repository** sur Netlify
   - Allez sur [Netlify](https://app.netlify.com)
   - Cliquez sur "Add new site" → "Import an existing project"
   - Connectez votre repository Git (GitHub, GitLab, Bitbucket)

2. **Vérifier les paramètres de build** (devraient être détectés automatiquement)
   - Build command : `npm run build`
   - Publish directory : `dist`
   - Node version : Netlify utilisera automatiquement la version définie dans `.nvmrc` si présent, sinon la dernière LTS

3. **Configurer la variable d'environnement** (optionnel)
   - Si vous souhaitez utiliser une variable d'environnement pour `APP_DOWNLOAD_URL`, vous pouvez :
     - Aller dans "Site settings" → "Environment variables"
     - Ajouter `VITE_APP_DOWNLOAD_URL` (avec le préfixe `VITE_` pour Vite)
     - Modifier `src/config.js` pour utiliser `import.meta.env.VITE_APP_DOWNLOAD_URL`

4. **Déployer**
   - Cliquez sur "Deploy site"
   - Netlify construira et déploiera automatiquement votre site

### Configuration manuelle de APP_DOWNLOAD_URL

Par défaut, `APP_DOWNLOAD_URL` est défini dans `src/config.js` avec la valeur `"#"`.

Pour le modifier :
1. Ouvrez `src/config.js`
2. Remplacez `"#"` par l'URL réelle (ex: `"https://apps.apple.com/app/el-et-moi"` ou `"https://play.google.com/store/apps/details?id=com.eletmoi"`)

## 🎨 Structure du projet

```
el-et-moi-landing/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ProblemSolution.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Features.jsx
│   │   ├── WhyFamiliesLove.jsx
│   │   ├── FAQ.jsx
│   │   ├── FinalCTA.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── config.js
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
└── README.md
```

## 📝 Notes

- La police **Inter** est chargée depuis Google Fonts
- Les icônes **Material Icons** sont utilisées via Google Fonts
- Le design est **pixel-perfect** par rapport au HTML original
- Tous les textes "L et moi" ont été remplacés par "El&Moi"
- Les CTA pointent vers `APP_DOWNLOAD_URL` défini dans `src/config.js`
- Le dark mode est supporté via les classes `dark:*` (pas de toggle implémenté pour l'instant)

## 🔧 Technologies utilisées

- **React 18** - Bibliothèque UI
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Framework CSS utility-first
- **PostCSS** - Traitement CSS
- **Autoprefixer** - Ajout automatique des préfixes navigateurs
