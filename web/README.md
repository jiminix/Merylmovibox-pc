# MerylMoviBox V3 — site web

Ce dossier contient le **nouveau site web V3**, séparé de l'application Electron Windows située à la racine du dépôt.

- Cible prévue : https://merylmovibox.web.app
- Projet Firebase prévu : `merylmovibox`
- Aucun accès Firestore ni import de données V2 n'est configuré.
- La page est une première maquette fonctionnelle des onglets, pas encore une reproduction complète de V2.
- Aucun déploiement automatique n'est activé : la configuration GitHub Actions et les autorisations Google Cloud seront ajoutées après vérification.

Pour déployer manuellement avec une identité Firebase CLI déjà autorisée :

```sh
firebase deploy --project merylmovibox --only hosting --config web/firebase.json
```

Le site V2 (`merylmoviesbox.web.app`) et l'application PC existante restent inchangés.
