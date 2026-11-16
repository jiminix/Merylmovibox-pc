# MerylMoviBox V3

Premier écran de la version web, inspiré de la capture mobile V2. Le site web se trouve dans `web/`. L’application Windows à la racine et l’ancien site restent indépendants.

## Démarrer

Depuis la racine du dépôt, ouvrir le dossier `web/`. Node.js 24 est recommandé.

```sh
cd web
npm ci
npm test
npm run build
npm run dev
```

## Déploiement sur le nouveau Firebase Hosting

Dans la console Firebase, vérifier que le projet et le site Hosting sont bien identifiés par `merylmovibox`. Si le projet et le site portent des identifiants différents, vérifier la console et adapter l’alias de projet avant de lancer la commande. Depuis `web/`, avec la Firebase CLI installée et un accès au nouveau projet :

```sh
firebase login
firebase hosting:sites:list --project merylmovibox
npm ci
npm test
npm run build
firebase deploy --only hosting --project merylmovibox
```

L’adresse prévue est https://merylmovibox.web.app. Cette configuration ne comporte ni règles Firestore ni accès aux données. Ne pas copier les secrets ou la configuration de l’ancien projet.

## Point de reprise

- Première version locale de l’accueil, avec cinq colonnes sur mobile, deux barres de navigation, compteurs de démonstration, rubriques, recherche et fiches sommaires.
- Les cartes colorées sont provisoires. Le logo est extrait de la capture fournie. Le catalogue est embarqué et ne représente pas la bibliothèque réelle.
- L’ajout, la mise à jour, l’administration, les statistiques et la connexion ne sont pas implémentés. Aucun import ou transfert de données n’a été fait.
- Prochaine étape : vérifier l’accès au nouveau site Firebase Hosting, publier cette démo, puis définir le premier parcours à tester. Garder la reconstruction et la migration de bibliothèque séparées.
