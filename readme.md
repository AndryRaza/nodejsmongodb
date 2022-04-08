# TP Simplon Nodejs/Mongo

## Description

On imagine qu'on travaille pour une agence de soutiens scolaires. On crée l'étudiant et on lui attribue un tuteur et les cours qu'il souhaite suivre. À tout moment, on peut modifier ses affectations, ou ses informations personnelles. 

## Commandes shell

Installer les modules nécessaires
> npm install

Lancer le serveur
> npm start 

Pour peupler la bdd : "Teachers" et "Lessons"
> npm run seed

Lancer les tests qui concerne l'entité "Person"
> npm test

## Packages installés

- Express
- mongoose (gérer les requêtes avec la bdd)
- dotenv (utiliser des variables d'environnement)
- nodemon (actualiser le serveur à chaque modification du code)
- mocha (pouvoir faire des tests)
- chai (pouvoir faire des 'assertions')

## Améliorations à faire mais flemme 

- Ranger les fonctions des routes 
- Tenter d'utiliser la méthode lean() de mongoose qui accélère les recherches askip
- Faire des suppressions en cascade