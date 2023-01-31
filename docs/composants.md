---
order: -2
icon: apps
---

# Composants

## Listes des composants

1. CommandConsole.vue
2. EnvChecker.vue
3. LanguageSelector.vue
4. Loader.vue
5. Navbar.vue
6. PlanPricing.vue
7. ProfilTool.vue
8. Sidebar.vue
9. ThemeSwitcher.client.vue
10. Tools.vue
11. UsersTable.vue

---
## Comment créer un composant

!!!
Pour créer un nouveau composant dans notre application, vous pouvez suivre les étapes suivantes :
!!!

1. Dans le dossier src/components, créez un nouveau fichier .vue pour votre composant
2. Dans le fichier .vue, définissez la structure HTML pour votre composant à l'aide des balises template
3. Définissez les styles CSS pour votre composant à l'aide de la section style
4. Définissez le comportement de votre composant à l'aide de la section script
5. Importer votre nouveau composant dans les pages où vous souhaitez l'utiliser en ajoutant l'instruction import et en l'intégrant dans le template à l'aide de la balise component.

Exemple :

```html
<template>
    <div>
        <!-- Contenu du composant -->
    </div>
</template>

<style>
    /* Styles du composant */
</style>

<script>
    export default {
        data () {
            return {
                // Données utilisées dans le composant
            }
        },
        methods: {
            // Méthodes utilisées dans le composant
        }
    }
</script>
```
