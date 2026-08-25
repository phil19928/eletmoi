# eletmoi.fr — Règles de contenu et de SEO

## Produit

El&Moi : application française d'encadrement du temps d'écran par l'éducation.

- **Smartloop** — le temps d'apprentissage passé sur de vraies applications tierces crédite du temps de divertissement, selon un ratio réglable par le parent.
- **Lumen** — micro-apprentissage de cybersécurité, par tranche d'âge.
- Application parent (PWA) + application enfant (iOS FamilyControls / Android), appairage par QR code, onboarding conversationnel guidé.
- Formule **Essentiel** gratuite ; formule **Famille** à 7,99 €/mois ou 59,99 €/an.
- Éditeur : **C&S Associés SAS**. Hébergement européen, pas de lecture des messages de l'enfant.

## Architecture d'URL (figée)

| Racine | Clusters |
|---|---|
| `/blog/` | A (loi & actualité), D (parentalité numérique) |
| `/comparatif/` | B (comparatifs, pages de conversion) |
| `/guides/` | C (tutoriels & configuration) |
| `/lumen/` | E (cybersécurité mineurs) |
| racine | F (pages de marque) |

Slugs en minuscules non accentuées, sans date. **Toute URL publiée est figée** :
un changement impose une redirection 301 dans `netlify.toml`.

## Source de vérité

`content/registry.json` décrit les 61 articles planifiés. Rien ne se publie sans
y figurer. Le registre alimente `src/seo/routes.js`, `src/content/manifest.js`
et `src/content/bodies.js` — **ces trois fichiers sont générés**, ne jamais les
éditer à la main.

## Non négociable sur chaque article

- `datePublished` et `dateModified` renseignés, **visibles à l'écran** et dans le JSON-LD
- `author` renseigné et présent dans `content/authors.json`
- **≥ 3 liens internes**, dont 1 vers le pilier du cluster et 1 vers une page de conversion (`/comparatif`, `/tarifs`, `/smartloop`, `/lumen`)
- **≥ 2 sources externes**, dont ≥ 1 institutionnelle pour les clusters A, D et E
- Liens sortants : concurrents et sites commerciaux en `nofollow noopener`, institutionnels en dofollow — appliqué automatiquement, ne pas l'écrire à la main
- **Aucun article orphelin** : le maillage entrant se crée à la publication
- Tableaux comparatifs en **HTML natif**, jamais en image
- Aucun chiffre sans source, aucune promesse de résultat, aucun vocabulaire médical ou diagnostique

## Marque

L'expression « contrôle parental » est bannie du corps de texte des articles.
Vocabulaire : *encadrement*, *temps gagné*, *autonomie*, *accompagnement
numérique*, *gestion du temps d'écran*.

Elle reste autorisée en `metaTitle`, `metaDescription`, URL, JSON-LD, `alt`, et
**une seule fois** dans un titre reprenant la question du lecteur (donc
interrogatif). La règle est appliquée par `npm run seo:check` sur `content/`.

> Le site vitrine existant (Hero, FAQ, Footer) contient encore trois
> occurrences, antérieures à cette règle. Elles sont volontairement hors du
> périmètre de la vérification — décision à trancher séparément.

## Interdits absolus

Inventer un chiffre, une statistique, une source ou une citation. Rédiger du
contenu de fond à la place de l'éditeur. Modifier une URL publiée sans 301.
Publier un article sans lien entrant.

## Avant tout commit

```bash
npm run seo:check      # doit passer
npm run content:links  # ne doit remonter aucun orphelin
```

## Commandes

| Commande | Rôle |
|---|---|
| `npm run content:new -- --id=B2` | échafaude le Markdown depuis le registre |
| `npm run content:ingest -- <f.md> --id=B2` | normalise un article brut et le range |
| `npm run content:build` | régénère routes.js, manifest.js, bodies.js |
| `npm run seo:check [--links]` | validation bloquante (`--links` teste le HTTP) |
| `npm run content:links` | orphelins, liens morts, cibles non publiées |
| `npm run content:status` | avancement par cluster et par vague |
| `npm run seo:ping` | IndexNow (Bing/Yandex) — voir note ci-dessous |
| `npm run build` | codegen + build + prérendu |
| `npm run preview` | sert `dist/` comme Netlify |

**Ne pas utiliser `vite preview`** : il ne résout pas les index de
sous-répertoires et sert l'accueil sur `/cgv`, ce qui provoque de fausses
erreurs d'hydratation. `npm run preview` passe par `scripts/serve-dist.mjs`,
fidèle à Netlify.

**Sur `seo:ping`** : Google a fermé son endpoint de ping sitemap en juin 2023.
Seul IndexNow est réellement consommé. Pour Google, ce qui compte est le
`<lastmod>` du sitemap et Search Console.
