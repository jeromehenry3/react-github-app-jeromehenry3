# Dashboard Github

## Objectifs

* Travailler avec une véritable API
* Pratiquer la gestion de state avec Redux
* Utiliser un framework React pour gagner du temps (Semantic UI)

## L'application

Un certain client, qui souhaite rester anonyme, souhaite fournir à ses élèves un tableau de bord Github. Il se trouve (hum hum) que le client est une école, et qu'il forme des personnes qui souhaitent devenir développeu.r.se.s, à distance.

**Fonctionnalités**

* Connexion à github à l'aide d'un token personnel
* Chercher des repos sur github
* Voir le contenu d'un repo sur Github
* Mettre des repos en favoris

**Pages accessibles via un menu**

* Welcome
* Search
* A propos

### Welcome

Si l'utilisateur n'est pas connecté, cette page affiche un formulaire pour se connecter à l'aide d'un token github.

Si l'user est connecté, cette page affiche :

* Le profil de l'user
* Un bouton pour se déconnecter
* Les derniers repos de l'user (je peux cliquer dessus pour voir le contenu)
* Les repos mis en favoris (je peux cliquer dessus pour voir le contenu)

### Search

Cette page est à réutiliser depuis le challenge de l'episode 9 de l'api Github. Je veux pouvoir chercher des repos, et au clic sur un repo, je veux voir son contenu.

### A propos

Juste une page présentant le site avec un petit texte et pourquoi pas une / des jolies images

**Demandes client**

* J'aimerais que l'interface dispose d'une indication de loading lors des requêtes
* Chaque page de repo doit afficher son titre, et la liste de ses dossiers / fichiers
* Chaque page de repo permet de le mettre / retirer en favori
* Quand je me déconnecte je veux que seul les menu "welcome" et "à propos" soient visibles
* La page welcome, si déconnecté, affiche un formulaire pour se logger avec un token github

### Connexion avec un token

Github permet à chaque user de se créer un token personnel. C'est un code, unique et personnel, qui permet de se logger sans avoir à saisir mail ou mdp.

Pour créer le votre: https://github.com/settings/tokens

Une fois que notre application aura en mémoire notre token (après l'avoir saisi dans un formulaire), il suffit de le renseigner pour chaque requête que nous feront, dans le header de la requête, et nous serons automatiquement considérés comme authentifiés.

**Exemple pour obtenir les infos de l'user connecté:**

```javascript
axios.get('https://api.github.com/me', {
  headers: {
    Authorization: `token ${store.getState().userToken}`,
  }
})
```

### Recommandations (donc pas obligation)

* Utliser semantic-ui-react
* Commencer par le menu et l'affichage de différents composants en fonction de la view choisie
* Faire la page a propos
* Continuer par la page search, en essayant de faire fonctionner un par un les composants déjà créés (input, reposResults, repoDetail etc.)
* Terminer par la page welcome
* Faire des recherches sur l'API de github :) (la doc, youtube etc.)


## Bonus

* Quand on est sur la page pour voir le contenu d'un repo (dossiers fichiers), récupérer le contenu du readme et essayer de l'afficher (des libraires existent pour convertir du markdown et l'afficher)
* rajouter un bouton sur chaque résultat de recherche pour ouvrir ce repo directement sur github plutôt que dans notre app.

## TOUT ce qui n'est pas précisé est libre, donc faites vous plaisir !!

