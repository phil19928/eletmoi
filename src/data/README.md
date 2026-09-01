# `src/data/reviews.json`

Source unique de la section de preuve sociale de l'accueil : la barre de
statistiques, le carrousel d'avis et les données structurées `Review` lisent
toutes ce fichier. Aucun de ces chiffres n'est écrit en dur dans le JSX.

## Ajouter un avis

Coller un objet dans le tableau `reviews`. Aucun code à modifier.

```json
{
  "id": "gp-003",
  "author": "Prénom du parent",
  "source": "google_play",
  "rating": 5,
  "title": null,
  "text": "Le commentaire, tel qu'il est publié sur le store.",
  "helpful": null
}
```

| Champ | Obligatoire | Remarque |
|---|---|---|
| `id` | oui | unique, sert de clé React |
| `source` | oui | `"app_store"` ou `"google_play"` |
| `text` | oui | affiché entre guillemets français |
| `author` | non | `null` ⇒ « Utilisateur vérifié » à l'écran |
| `rating` | non | `null` ⇒ aucune étoile affichée |
| `title` | non | `null` ⇒ pas de titre |
| `helpful` | non | conservé, jamais affiché |

**L'ordre du tableau est l'ordre d'affichage** dans le carrousel. Il est
alterné entre les deux stores (Google, App Store, Google, App Store…) pour
qu'une même provenance ne s'enchaîne pas sur les premières cartes — à
maintenir en ajoutant un avis.

**Il n'y a pas de champ date, volontairement** : les stores n'exposent pas de
date fiable, et une date approximative sur un avis vaut moins que pas de date.

**Ne jamais combler un champ manquant.** Une note ou un auteur inventé est
interdit par `CLAUDE.md`, et le JSON-LD applique la même règle : `rating: null`
n'émet pas de `reviewRating`, `author: null` n'émet pas d'`author`. Le libellé
« Utilisateur vérifié » est un texte d'interface, il n'entre jamais dans les
données structurées.

## Mettre à jour les chiffres

Tout se passe dans `stats` :

| Clé | Rôle |
|---|---|
| `downloads` | chaîne libre — `"100+"`, `"1 200+"`. Le compteur animé isole le nombre et conserve le reste tel quel |
| `downloadsLabel` | libellé sous le chiffre |
| `rating` | note affichée, au format français (`"5,0"`) |
| `reviewCount` | nombre d'avis **notés** sur les deux stores |
| `lastUpdated` | date du dernier relevé, pour la traçabilité |

`stats.reviewCount` (10) et la longueur du tableau `reviews` (5) sont deux
volumes différents et c'est normal : tous les parents notent, peu commentent.
Le carrousel et le JSON-LD n'affichent que les avis commentés.

## Ce qui n'est volontairement pas fait

- **L'autoplay s'arrête définitivement au premier geste tactile.** Il n'y a pas
  de survol sur mobile, donc aucun autre moyen de suspendre le défilement : un
  avis qu'on est en train de lire disparaîtrait sous les doigts.
- **Pas d'`aggregateRating`** dans les données structurées, malgré la présence
  de `rating` et `reviewCount`. Agréger sur ce volume serait trompeur, et
  Google ignore voire sanctionne la déclaration. À rétablir quand le volume
  sera consolidé et vérifiable.
- **Pas d'animation d'apparition** sur la section. Toutes les autres sections
  se révèlent au défilement via framer-motion, ce qui sérialise
  `style="opacity:0"` dans le HTML prérendu. Les avis doivent être peints dès
  le premier rendu, y compris sans JavaScript.

## Après modification

```bash
npm run build     # régénère le HTML statique et le JSON-LD de l'accueil
```

Aucun `npm run content:build` n'est nécessaire : ce fichier ne passe pas par le
codegen du registre éditorial. Le JSON-LD est produit au prérendu par
`scripts/content/jsonld.mjs`, qui relit ce même fichier côté Node.
