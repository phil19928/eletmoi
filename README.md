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
eletmoi-main/
├── content/                   éditorial — source de vérité
│   ├── registry.json          les 62 articles planifiés, URLs figées
│   ├── authors.json           signaux E-E-A-T
│   ├── schema.mjs             frontmatter typé (zod)
│   ├── seo.config.mjs         limites, clusters, règles ajustables
│   └── {blog,comparatif,guides,lumen,brand}/*.md
├── scripts/
│   ├── content/               new · ingest · build · check · links · og · ping
│   ├── prerender.mjs          HTML statique + sitemap.xml + rss.xml
│   └── serve-dist.mjs         `npm run preview`, fidèle à Netlify
├── src/
│   ├── sections/              blocs de la page d'accueil
│   │   ├── Hero.jsx  Smartloop.jsx  Lumen.jsx
│   │   └── FAQ.jsx   Pricing.jsx    CTABanner.jsx  Footer.jsx
│   ├── components/            Navbar, Button, Container, Section…
│   │   └── article/           gabarits d'article (ArticleLayout, FaqBlock…)
│   ├── pages/                 ArticlePage, IndexPage, pages légales, 404
│   ├── lib/                   links, headings, slugify, date, markdown
│   ├── legal/*.md             CGU, CGV, confidentialité, mentions légales
│   ├── content/               ⚠️ GÉNÉRÉ — manifest, bodies, routes-index
│   ├── seo/routes.js          ⚠️ GÉNÉRÉ
│   ├── App.jsx                routage (articles en import paresseux)
│   └── entry-server.jsx       point d'entrée du prérendu
├── public/
│   ├── og/                    cartes sociales 1200×630 (`npm run content:og`)
│   └── media/                 médias d'article (MP4 + poster)
├── assets-src/                sources non déployées, voir son README
└── netlify.toml
```

Les fichiers marqués **GÉNÉRÉ** sont réécrits par `npm run content:build` : ne
jamais les éditer à la main. Le détail du pipeline éditorial est dans
[`content/README.md`](content/README.md) et les règles dans
[`CLAUDE.md`](CLAUDE.md).

## 📝 Notes

- La police **Roboto** est chargée depuis Google Fonts (`index.html`)
- Les CTA pointent vers `APP_DOWNLOAD_URL` défini dans `src/config.js`
- Toutes les routes sont **prérendues** : `npm run build` produit un fichier
  HTML statique par URL, avec ses métadonnées et son JSON-LD
- Ne pas utiliser `vite preview` — il ne résout pas les index de
  sous-répertoires. `npm run preview` passe par `scripts/serve-dist.mjs`

## 🔧 Technologies utilisées

- **React 18** - Bibliothèque UI
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Framework CSS utility-first
- **PostCSS** - Traitement CSS
- **Autoprefixer** - Ajout automatique des préfixes navigateurs
