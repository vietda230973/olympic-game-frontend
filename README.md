# Olympic Game

Application front-end Single Page (SPA) développée avec Angular et TypeScript, permettant de visualiser des tableaux de bord et le détail des performances olympiques par pays.

## Présentation

Ce projet est une interface client destinée à être exécutée dans le navigateur par les utilisateurs finaux, ou testée par les développeurs. Elle affiche un tableau de bord général ainsi que des pages de détail par pays.

## Stack technique

- **Langages** : TypeScript (principal), HTML, SCSS, un peu de JavaScript
- **Framework / runtime** : Angular (structure de projet Angular CLI : `angular.json`, `src/main.ts`, `app.module.ts`)
- **Bibliothèques notables** :
  - Packages du framework Angular (`@angular/core`, `@angular/router`, etc.)
  - RxJS (programmation réactive, pattern classique des applications Angular)
  - Karma (exécuteur de tests unitaires — `karma.conf.js`)

## Organisation du code

```
.angular.json                 # Configuration du workspace Angular CLI
package.json / package-lock.json
karma.conf.js                 # Configuration des tests Karma
tsconfig*.json                # Configurations TypeScript
src/
  main.ts                     # Bootstrap de l'application
  polyfills.ts
  index.html
  styles.scss
  assets/                     # Images et ressources statiques
  environments/               # Configurations d'environnement (endpoints API, flags)
  app/
    app.module.ts             # Module racine (NgModule)
    app-routing.module.ts     # Configuration du routing
    app.component.*           # Composant racine
    components/
      country/                # Composants liés à l'affichage d'un pays
      header/                 # Composant(s) d'en-tête
      home/                   # Petits composants de la page d'accueil
    pages/
      dashboard/              # Page du tableau de bord
      countrydetail/          # Page de détail d'un pays
      not-found/              # Page 404
    services/
      data.services.ts        # Accès aux données / client API
    models/
      olympic.model.ts        # Modèle(s) de domaine
    core/
      error-handling/         # Gestion centralisée des erreurs
    shared/
      modals/                 # Composants de modales partagés
README.md
```
## Architecture 

Il s'agit d'une SPA Angular classique :

- `src/main.ts` démarre l'application en chargeant l'`AppModule`.
- `app-routing.module.ts` définit les routes vers les pages (`dashboard`, `countrydetail`, `not-found`).
- L'interface est composée à partir des composants situés dans `src/app/components`, les pages étant regroupées dans `src/app/pages`.
- Les services (`src/app/services/data.services.ts`) fournissent les données aux composants.
- `models/olympic.model.ts` définit les types du domaine métier.
- Le dossier `environments/` contient la configuration propre à chaque build (URLs d'API, flags).
- Karma et le scaffolding de test associé prennent en charge les tests unitaires.

## Prérequis

- Node.js et npm installés
- Angular CLI (ou `npx`) disponible

## Installation et lancement

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npx ng serve
# ou, si un script "start" est défini dans package.json
npm start

# Lancer les tests unitaires (Karma)
npm test
```

## Configuration

Avant de lancer l'application contre un backend, vérifier le contenu de `src/environments/` pour les endpoints d'API ou toute variable d'environnement requise.