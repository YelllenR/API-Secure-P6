**Projet 6 - Piiquante**

**Context du projet:**
Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.

**Livrables:** 
API Routes
- Toutes les routes sauce pour les sauces doivent disposer d’une autorisation (le token est envoyé par le front-end avec l'en-tête d’autorisation : « Bearer <token> »). Avant que l'utilisateur puisse apporter des modifications à la route sauce, le code
doit vérifier si l'userId actuel correspond à l'userId de la sauce et si ce n'est pas le cas, renvoyer le bon code d'erreur. 

- Le mot de passe de l'utilisateur doit être haché.
- L'authentification doit être renforcée sur toutes les routes sauce requises.
- Les adresses électroniques dans la base de données sont uniques et un plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler
les erreurs.
- La sécurité de la base de données MongoDB (à partir d'un service tel que MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la
machine d'un utilisateur.
- Un plugin Mongoose doit assurer la remontée des erreurs issues de la base de données.
- Les versions les plus récentes des logiciels sont utilisées avec des correctifs
de sécurité actualisés.
- Le contenu du dossier images ne doit pas être téléchargé sur GitHub.

**Projet validé** en Septembre 2022 avec l'évaluation suivante: 

Points forts :
- Utilisation de Bcrypt
- Utilisation de Helmet
- Code du projet indenté et commenté
- Utilisation de postman

**Soutenance**
Remarques :
Aurelie a bien expliqué le travail réalisé. Elle a démontré une connaissance des compétences évaluées dans le projet.
