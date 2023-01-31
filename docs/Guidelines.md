---
order: -4
icon: repo
---

# Guidelines de développement

==- 1. Convention de code ESLint
Notre projet utilise ESLint pour maintenir une convention de code cohérente et de haute qualité. Tous les développeurs sont encouragés à respecter les règles définies par la configuration ESLint.

Pour s'assurer que le code respecte les règles, veuillez exécuter npm run lint avant de faire une demande de fusion. Si des erreurs sont détectées, corrigez-les avant de continuer.

Il est important de noter que la configuration ESLint peut être modifiée si nécessaire pour s'adapter aux besoins du projet. Toute modification doit être approuvée par au moins un membre du personnel en charge du développement avant d'être apportée.
===
==- 2. Règles de nommage
1. Utiliser des noms descriptifs et significatifs pour les composants, les variables, les fonctions, les styles, etc.

2. Les noms de composants doivent être en PascalCase, tels que Navbar.vue ou ProfileTool.vue.

3. Les noms de variables et de fonctions doivent être en camelCase, tels que selectedOption ou calculateTotal.

4. Les noms de styles doivent être en kebab-case, tels que font-size ou background-color.

5. Éviter les abréviations et les acronymes dans les noms, sauf s'ils sont largement reconnus et utilisés, tels que HTML ou CSS.
===
==- 3. Structure de code
1. Suivre la structure de code standard pour chaque fichier.

2. Utiliser des commentaires pour documenter le code et expliquer les blocs de code importants.

3. Éviter les fonctions ou les blocs de code longs et complexes. Si nécessaire, les découper en sous-fonctions ou sous-blocs pour une meilleure lisibilité.

4. Éviter les codes redondants et les duplicatas. Utiliser les variables pour les valeurs répétées et les fonctions pour les blocs de code répétitifs.

5. Éviter les noms de variables ou de fonctions identiques dans des fichiers différents.
===
==- 4. Conventions de style
1. Suivre les conventions de style de la communauté pour les styles CSS et HTML.

2. Utiliser des classes CSS pour les styles plutôt que d'utiliser des styles inline dans les éléments HTML.

3. Éviter les styles globaux qui peuvent affecter d'autres éléments sur la page.

4. Éviter les sélecteurs descendants profonds (comme ul li a) et préférer les classes pour les styles spécifiques.

5. Utiliser des variables pour les couleurs, les tailles de police, etc. pour une meilleure maintenabilité.
===
==- 5. Test et validation
1. Écrire des tests pour vérifier le bon fonctionnement des composants, des fonctions, des algorithmes, etc.

2. Effectuer une validation des entrées pour éviter les erreurs et les violations de sécurité.

3. Exécuter les tests régulièrement pour détecter les erreurs et les bugs.

4. Corriger les erreurs et les bugs immédiatement après les avoir détectés.

5. Maintenir une couverture de test adéquate pour garantir la qualité du code.
===