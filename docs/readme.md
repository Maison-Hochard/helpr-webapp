---
order: 1
icon: home
---

![](/logo.png)

# Introduction

### Bienvenue dans la documentation technique de l'application web
Cette documentation est destinée aux développeurs qui vont travailler sur l'application web. Il est important de comprendre les concepts de base et les technologies utilisées pour pouvoir travailler efficacement sur le code.

L'application web permet de créer des actions pour plusieurs services. Elle utilise les technologies suivantes :

- Framework front-end: Vue.js
- Préprocesseur CSS: SASS
- Style Guide: BEM
- Gestionnaire de paquets npm: npm
- ESLint pour la convention de code JavaScript

Avant de commencer, veuillez vous assurer que vous avez installé les outils nécessaires pour développer sur l'application. Vous pouvez trouver la liste des outils requis dans le fichier package.json.

Le code source est disponible sur un dépôt Git. Veuillez suivre les processus de contrôle de version définis lorsque vous travaillez sur le code.

Nous espérons que cette documentation vous aidera à vous familiariser avec l'application et à vous lancer dans le développement. N'hésitez pas à nous contacter si vous avez des questions ou des préoccupations.

---
## Pour Commencer
Pour démarrer avec le code source de l'application, suivez les étapes ci-dessous.

- Avoir installé Git
- Avoir installé Node.js

+++ Étape 1
### Cloner le référentiel
```bash
git clone git@github.com:hugoRCD/nuxt3-boilerplate.git
```
+++ Étape 2
### Installer les dépendances
```bash
pnpm install
```
Notez qu'il n'y a pas besoin d'utiliser l'option --shamefully-hoist ici car les dépendances sont définies à true par défaut dans le fichier .npmrc.
+++ Étape 3
### Démarrer le serveur de développement
```bash
pnpm dev
```
Vous pouvez maintenant ouvrir l'application dans votre navigateur à l'adresse http://localhost:3000, à moins que vous ne modifiiez le port par défaut.
+++ Étape 4
### Démarrer la documentation
```bash
retype watch
```
Vous pouvez accéder à la documentation en direct à l'adresse https://hugorcd.github.io/nuxtjs-boilerplate/.
+++

---

### Installation des dépendances
1. Se placer dans le répertoire du projet avec la commande cd helpr-webapp
2. Lancer la commande npm install ou pnpm install pour installer toutes les dépendances nécessaires
### Configuration de la base de données
1. Configurer les paramètres de connexion à la base de données dans le fichier server/database/schema.prisma
2. Lancer la commande pnpm run prisma:generate pour générer les schémas de données nécessaires
3. Lancer la commande pnpm run prisma:pull pour récupérer les données sur la base de données
4. Lancer la commande pnpm run prisma:migrate dev pour migrer les modifications sur la base de données
### Lancer le serveur de développement
1. Lancer la commande pnpm run dev pour lancer le serveur de développement
2. Ouvrir un navigateur web et accéder à l'adresse http://localhost:3000 pour accéder à l'application
### Lancer les tests
Il n'y a pas de commande définie pour les tests dans le fichier package.json. Il faudra donc les écrire manuellement.

### Construire l'application pour la production
1. Lancer la commande pnpm run build pour construire l'application pour la production
2. Lancer la commande pnpm run start pour démarrer le serveur de production
### Formater le code
1. Lancer la commande pnpm run format pour formater le code selon les conventions définies dans prettier
### Technologies utilisées
- Nuxt.js - Le framework JavaScript progressif
- Prisma - Alternative open-source à Firebase pour la gestion de bases de données
- pnpm - Gestionnaire de paquets rapide et efficient en termes d'espace disque
- TypeScript - Langage de programmation typé pour JavaScript
- ESLint - Outil de linting pour JavaScript et TypeScript