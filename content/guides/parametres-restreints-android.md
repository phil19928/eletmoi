---
id: C2
slug: parametres-restreints-android
cluster: C
route: /guides/parametres-restreints-android
status: published
template: guide
metaTitle: 'Paramètres restreints Android : comment les autoriser'
metaDescription: >-
  Android bloque certains réglages pour certaines applications. Découvrez
  pourquoi ce message apparaît et comment autoriser les paramètres restreints.
h1: 'Paramètres restreints Android : à quoi ça sert, comment les autoriser'
keywordPrimary: paramètres restreints android
keywordsSecondary:
  - autoriser les paramètres restreints
  - accessibilité android bloquée
  - paramètre non disponible android
searchIntent: informational
canonical: 'https://eletmoi.fr/guides/parametres-restreints-android/'
noindex: false
datePublished: '2026-09-03'
dateModified: '2026-09-03'
reviewCycle: quarterly
author: philippe
internalLinks:
  - id: C3
    anchor: 'Contrôle parental Android : le guide complet'
    context: body
  - id: C1
    anchor: 'Installer El&Moi en 5 minutes, pas à pas'
    context: body
  - id: F1
    anchor: 'La Smartloop : comment ça marche'
    context: cta
externalSources:
  - accessedOn: '2026-09-03'
    title: Modifier les paramètres restreints d'une application
    publisher: Google (assistance Android)
    url: 'https://support.google.com/android/answer/12623953'
  - accessedOn: '2026-09-03'
    title: Google Family Link
    publisher: Google
    url: 'https://families.google/familylink/'
faq:
  - q: 'Autoriser les paramètres restreints, est-ce dangereux ?'
    a: >-
      Cela dépend uniquement de l'application. La permission d'accessibilité
      donne accès à ce qui s'affiche à l'écran : ne l'accordez qu'à une
      application que vous avez choisie et installée vous-même.
  - q: Comment annuler l'autorisation ?
    a: >-
      Dans Paramètres → Accessibilité, désactivez le service concerné. Vous
      pouvez aussi désinstaller l'application, ce qui révoque tout.
  - q: Pourquoi mon téléphone ne propose pas ce menu ?
    a: >-
      Sur Android 12 et les versions antérieures, ce mécanisme n'existe pas sous
      cette forme. Sur Android 13 et les versions ultérieures, l'option peut
      également ne pas apparaître si l'application n'est pas concernée par une
      restriction, ou selon la version du système et le constructeur.
  - q: Mon enfant peut-il retirer l'autorisation lui-même ?
    a: >-
      Oui, si le téléphone n'est pas verrouillé par un code qu'il ignore.
      Protégez l'accès aux réglages par un code que vous êtes seul à connaître.
  - q: Faut-il refaire la manipulation après une mise à jour ?
    a: >-
      Non pour une mise à jour classique. Oui si vous changez de téléphone et
      que vous transférez les applications au lieu de les réinstaller.
howToSteps:
  - name: ouvrez les Paramètres
    text: Ouvrez Paramètres sur le téléphone concerné.
  - name: ouvrez la liste des applications
    text: >-
      Appuyez sur Applications. Si vous ne voyez pas la liste complète, cherchez
      « Voir toutes les applications » ou « Informations sur les applications ».
  - name: sélectionnez l'application à débloquer
    text: Sélectionnez dans la liste l'application à débloquer.
  - name: autorisez les paramètres restreints
    text: >-
      En haut à droite, ouvrez le menu ⋮ (trois points), puis « Autoriser les
      paramètres restreints ».
  - name: confirmez votre identité
    text: >-
      Confirmez avec le code de déverrouillage ou l'empreinte. C'est volontaire
      : Android veut être certain que c'est bien vous, et pas quelqu'un au
      téléphone en train de vous guider.
  - name: activez le service d'accessibilité
    text: >-
      Revenez dans Paramètres → Accessibilité → Applications installées et
      activez le service. C'est l'étape qu'on oublie le plus facilement :
      autoriser ne suffit pas, il faut ensuite activer.
cta:
  label: Télécharger El&Moi gratuitement
  target: stores
  utm: organic_c_parametres-restreints-android
ogImage: /og/parametres-restreints-android.png
imageAlt: >-
  Écran Android affichant le menu « Autoriser les paramètres restreints » d'une
  application
---

Si Android vous affiche « Pour votre sécurité, ce paramètre n'est pas disponible pour le moment », votre téléphone considère que l'application a été installée depuis une source qu'il ne reconnaît pas. Il faut alors l'autoriser manuellement : **Paramètres → Applications → l'application concernée → menu ⋮ → Autoriser les paramètres restreints**.

Voici ce que cette manipulation change vraiment, et quoi faire quand l'option est absente ou grisée.

## Ce que sont les paramètres restreints

Depuis Android 13, Android applique des restrictions supplémentaires à certaines autorisations sensibles pour les applications installées depuis certaines sources. Le mécanisme concernait notamment l'**accessibilité** (qui permet à une application de lire ce qui s'affiche à l'écran) et l'**accès aux notifications**, puis a été étendu dans les versions récentes d'Android à d'autres autorisations sensibles.

La raison est simple. Ces deux permissions sont exactement celles que réclament les faux SMS de livraison et les fausses applications bancaires. Google a donc décidé qu'un fichier installé à la main ne pourrait plus y accéder d'un simple clic. C'est une bonne mesure, et elle attrape parfois des applications parfaitement légitimes au passage.

## Pourquoi vous tombez dessus alors que vous avez installé depuis le Play Store

C'est un cas qui peut notamment apparaître après un changement de téléphone ou le transfert d'applications d'un ancien appareil.

Avec **Samsung Smart Switch**, les outils de transfert Xiaomi ou certaines restaurations de sauvegarde, une application peut ne pas être considérée comme fraîchement installée depuis le Play Store. Android peut alors appliquer les paramètres restreints, alors même que vous aviez bien téléchargé l'application depuis la boutique officielle sur l'ancien téléphone.

Si c'est votre cas, la solution la plus propre n'est pas d'autoriser quoi que ce soit : désinstallez l'application, puis réinstallez-la depuis le Play Store. Dans ce cas, le blocage peut disparaître après la réinstallation.

## La procédure, étape par étape

1. Ouvrez **Paramètres** sur le téléphone concerné.
2. Appuyez sur **Applications**. Si vous ne voyez pas la liste complète, cherchez **Voir toutes les applications** ou **Informations sur les applications**.
3. Sélectionnez l'application à débloquer.
4. En haut à droite, ouvrez le menu **⋮** (trois points), puis **Autoriser les paramètres restreints**.
5. Confirmez avec le code de déverrouillage ou l'empreinte. C'est volontaire : Android veut être certain que c'est bien vous, et pas quelqu'un au téléphone en train de vous guider.
6. Revenez dans **Paramètres → Accessibilité → Applications installées** et activez le service. C'est l'étape qu'on oublie le plus facilement : autoriser ne suffit pas, il faut ensuite activer.

> **À savoir** : le menu ⋮ n'apparaît que si une application a réellement demandé une permission restreinte. S'il est absent, c'est bon signe, vous n'avez rien à faire.

## Si ça ne marche pas

**L'option « Autoriser les paramètres restreints » est grisée ou absente.**
Sur Android 15 et Android 16, le mécanisme des paramètres restreints a été étendu à davantage d'autorisations sensibles. Selon la version d'Android et le constructeur, le menu peut donc se présenter différemment. Si l'application est disponible sur Google Play, commencez par la désinstaller puis la réinstaller directement depuis le Play Store avant de réessayer.

**« Une application superposée bloque l'accès aux paramètres ».**
Android empêche de modifier un réglage sensible quand une application est autorisée à s'afficher par-dessus les autres. Désactivez temporairement cette autorisation pour les applications concernées (**Paramètres → Applications → Accès spécial → Applications pouvant s'afficher par-dessus d'autres applications**), faites la manipulation, puis rétablissez le réglage.

**Le chemin ne correspond pas à votre téléphone.**
Chaque constructeur range ces menus à sa façon. Sur Samsung, tout est dans Paramètres → Applications. Sur Xiaomi, passez par Paramètres → Applications → Gérer les applications, et l'accessibilité se trouve dans Paramètres supplémentaires. Sur OPPO, realme et Honor, cherchez Gestion des applications. Le détail marque par marque figure dans notre [guide du contrôle parental Android](/guides/controle-parental-android/).

**Vous avez tout suivi, l'écran affiche toujours le blocage.**
Redémarrez le téléphone. Android met parfois plusieurs minutes à prendre en compte le changement de statut.

## Ce qu'il faut dire à votre enfant

Cette étape se fait sur son téléphone, souvent devant lui. Autant qu'elle serve à quelque chose.

Ce que vous pouvez lui expliquer, dans ses mots : « Android bloque certains réglages parce que des arnaques s'en servent pour prendre la main sur les téléphones. Je débloque celui-ci parce que je sais quelle application le demande et pourquoi. Toi, si une application ou quelqu'un au téléphone te demande de faire cette manipulation, tu ne la fais jamais seul, tu viens me voir. »

En une phrase, vous venez de lui transmettre un réflexe de sécurité utile face à de nombreuses arnaques mobiles. Nous en avons fait un module complet dans [Lumen](/lumen/), nos modules de cybersécurité par tranche d'âge, intégrés à El&Moi.

## Et avec El&Moi

Ces étapes sont guidées une par une dans El&Moi pour vous aider à trouver et activer les réglages nécessaires. Tout est détaillé dans notre [guide d'installation](/guides/installation/).

Pour aller plus loin : [le guide du contrôle parental Android](/guides/controle-parental-android/), et [l'installation pas à pas d'El&Moi](/guides/installation/).
