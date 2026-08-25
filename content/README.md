# content/ — pipeline éditorial

Tout ce qui se publie sur eletmoi.fr part d'ici.

## Organisation

```
content/
  registry.json        source de vérité : 61 articles planifiés
  authors.json         auteurs (signaux E-E-A-T) — jamais inventés
  schema.mjs           schéma Zod du frontmatter
  seo.config.mjs       règles ajustables (limites, domaines, expressions bannies)
  static-routes.mjs    accueil et pages légales, hors registre
  blog/ comparatif/ guides/ lumen/ brand/    un .md par article
```

Trois fichiers sont **générés** depuis ces sources, et ne doivent jamais être
édités à la main : `src/seo/routes.js`, `src/content/manifest.js`,
`src/content/bodies.js`. Régénérer avec `npm run content:build`.

## Publier un article brut — la procédure

### 1. Identifier l'article dans le registre

Chaque article a un `id` (`B2`, `C3`…). S'il n'y est pas, l'ajouter à
`registry.json` **avant** de rédiger : c'est lui qui fige l'URL.

```bash
npm run content:status     # voit ce qui reste à écrire, par priorité
```

### 2. Ingérer le brut

```bash
npm run content:ingest -- ~/brouillons/family-link.md --id=B2
```

Le script fusionne le frontmatter avec ce que le registre sait déjà, rétrograde
un éventuel H1 de corps en H2, corrige les sauts de niveau, détecte les liens
sortants et les qualifie, puis écrit dans `content/comparatif/google-family-link.md`
en statut `draft`.

Il ne place pas les liens internes dans le texte et ne rédige pas les sources :
c'est éditorial, il se contente de lister ce qui manque.

Pour partir d'une page blanche plutôt que d'un brut :

```bash
npm run content:new -- --id=B2
```

### 3. Compléter le frontmatter

Les champs marqués `À RÉÉCRIRE` doivent être remplis. Les contraintes sont
appliquées par le schéma :

| Champ | Contrainte |
|---|---|
| `metaTitle` | ≤ 60 caractères |
| `metaDescription` | 140 à 155 caractères |
| `datePublished` / `dateModified` / `author` | obligatoires |
| `internalLinks` | ≥ 3, dont 1 pilier de cluster et 1 page de conversion |
| `externalSources` | ≥ 2, dont ≥ 1 institutionnelle pour les clusters A, D, E |

Les liens internes se réfèrent par `id`, jamais par URL :

```yaml
internalLinks:
  - { id: "C3", anchor: "gérer le temps d'écran sur Android", context: "body" }
```

L'URL est résolue au build. Si la cible n'est pas encore publiée, le lien est
rendu **en texte simple** — jamais un lien mort en production.

### 4. Insérer les liens dans le corps

Les `internalLinks` alimentent le bloc « À lire aussi ». Les liens qui comptent
vraiment sont ceux **placés dans le texte**, avec une ancre descriptive :

```markdown
Le paramétrage diffère selon la plateforme : voir notre guide pour
[gérer le temps d'écran sur Android](/guides/temps-ecran-android/).
```

Jamais « cliquez ici » — le validateur le refuse.

### 5. Vérifier

```bash
npm run seo:check           # bloquant
npm run seo:check --links   # teste en plus que les liens externes répondent
```

Le script échoue sur : titre trop long, description hors gabarit, H1 dans le
corps, saut de niveau, dates ou auteur manquants, maillage insuffisant, source
institutionnelle absente, image sans `alt`, ancre non descriptive, « contrôle
parental » hors zones autorisées, id absent du registre, URL divergente.

Il alerte sans bloquer sur : chiffre sans source dans le paragraphe, lien vers
une cible non publiée, cluster sans pilier déclaré.

### 6. Publier

Passer `status: "published"`, puis :

```bash
npm run content:build
npm run content:links   # ne doit remonter aucun orphelin
npm run build
```

### 7. Créer le maillage entrant

Un article sans lien entrant est un orphelin : `content:links` le signale et
c'est un échec. Ajouter un `internalLinks` vers le nouvel article depuis un ou
deux articles publiés proches, et régénérer.

### 8. Après déploiement

```bash
npm run seo:ping        # IndexNow (Bing, Yandex)
```

Google n'a plus d'endpoint de ping depuis juin 2023 : c'est le `<lastmod>` du
sitemap et Search Console qui font le travail.

## Règle de marque

« Contrôle parental » est banni du corps de texte. Vocabulaire : encadrement,
temps gagné, autonomie, accompagnement numérique.

Exception autorisée en `metaTitle`, `metaDescription`, URL, JSON-LD, `alt`, et
une seule fois dans un titre **interrogatif** reprenant la question du lecteur.
Les zones autorisées sont listées dans `seo.config.mjs` → `BANNED_PHRASES`.

## Ce qu'on n'invente jamais

Un chiffre, une statistique, une source, une citation, une bio d'auteur. Les
champs `LOREM — à remplacer` de `authors.json` sont là pour être remplis par un
humain, pas comblés par une approximation plausible.
