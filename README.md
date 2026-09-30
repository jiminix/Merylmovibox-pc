# MerylMoviesBox PC

Version Windows portable de MerylMoviesBox.

- Fenêtre de départ : **761 × 765 px**
- Aucun installateur : l'application est générée en **.exe portable**
- Le contenu affiché vient directement de **https://merylmoviesbox.web.app**
- Les mises à jour du site sont donc visibles automatiquement dans l'application PC
- Les liens externes s'ouvrent dans le navigateur par défaut

## Télécharger la version portable

Dans GitHub :

1. Ouvrir l'onglet **Actions**
2. Ouvrir le dernier workflow **Build Windows portable**
3. Télécharger l'artifact **MerylMoviesBox-PC-Portable**
4. Décompresser puis lancer le fichier `MerylMoviesBox-PC-Portable-1.0.0.exe`

## Développement local

```bash
npm install
npm start
```

## Générer le .exe portable

```bash
npm run dist
```
