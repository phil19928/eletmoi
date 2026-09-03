# `src/data/reviews.json`

Source unique de la section de preuve sociale de l'accueil : la barre de
statistiques et le carrousel d'avis lisent tous deux ce fichier. Aucun de ces
chiffres n'est écrit en dur dans le JSX.

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
interdit par `CLAUDE.md`. Le libellé « Utilisateur vérifié » est uniquement un
texte d'interface pour les avis sans auteur public.

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
Le carrousel n'affiche que les avis commentés.

## Ce qui n'est volontairement pas fait

- **L'autoplay s'arrête définitivement au premier geste tactile.** Il n'y a pas
  de survol sur mobile, donc aucun autre moyen de suspendre le défilement : un
  avis qu'on est en train de lire disparaîtrait sous les doigts.
- **Pas de schema `Review` ni `AggregateRating`** pour ces avis externes, malgré
  la présence de `rating` et `reviewCount`. Les avis viennent de l'App Store et
  de Google Play : ils restent visibles sur la page, mais ne sont pas repris
  dans les données structurées du site.
- **Pas d'animation d'apparition** sur la section. Toutes les autres sections
  se révèlent au défilement via framer-motion, ce qui sérialise
  `style="opacity:0"` dans le HTML prérendu. Les avis doivent être peints dès
  le premier rendu, y compris sans JavaScript.

## Après modification

```bash
npm run build     # régénère le HTML statique et le JSON-LD de l'accueil
```

Aucun `npm run content:build` n'est nécessaire : ce fichier ne passe pas par le
codegen du registre éditorial. Les avis sont rendus par les composants React
depuis ce fichier, sans balisage JSON-LD `Review`.

---

# `src/data/home-faq.json`

Source unique de la FAQ de la page d'accueil. Deux consommateurs lisent ce
fichier, et aucun autre ne redéclare ces textes :

- `src/sections/FAQ.jsx` — l'accordéon affiché ;
- `scripts/content/jsonld.mjs` — le balisage `FAQPage` injecté au prérendu.

C'est ce qui garantit que le texte déclaré à Google est exactement celui que le
visiteur lit. Modifier une réponse ici suffit : les deux suivent.

## Ajouter ou modifier une question

```json
{
  "q": "La question, telle qu'un parent la poserait.",
  "a": "La réponse, en texte simple. Pas de Markdown : elle est rendue telle quelle."
}
```

Pas de Markdown ni de HTML dans `a` : la réponse est affichée en texte brut par
l'accordéon, et recopiée telle quelle dans le JSON-LD. Des balises y
apparaîtraient en clair à l'écran comme dans les données structurées.

## Pourquoi les réponses sont toujours dans le DOM

L'accordéon monte **toutes** les réponses et se contente de les replier en CSS
(`grid-template-rows`). Un accordéon qui ne monte son contenu qu'à l'ouverture
laisse ses réponses absentes du HTML prérendu : le visiteur ne voit pas la
différence, les moteurs si.
