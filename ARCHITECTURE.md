# Olympic Game FrontEnd

Architecture générale (résumé) L'application est une SPA Angular (TypeScript) structurée en couches claires : couche de présentation (pages + composants), couche de services (DataService), couche « core » pour le traitement transversal (intercepteur d'erreurs, notifications) et modèles de domaine (Country / Participation). Le bootstrap se fait via AppModule → Router → pages/components. Les composants sont majoritairement déclarés comme standalone (Angular moderne).

Composants clés et organisation (avec chemins)

° Point d'entrée / bootstrap
    + src/main.ts — démarrage de l'application
    + src/app/app.module.ts — AppModule : fournit HttpClient avec interceptors (errorInterceptor) et animations (provideAnimationsAsync).
° Routage
    src/app/app-routing.module.ts — routes :
      +  '' → DashboardComponent
      +  'country/:countryName' → CountrydetailComponent
      +  'not-found' et '**' → NotFoundComponent
° Pages (contiennent/agrègent des composants)
    + src/app/pages/dashboard/dashboard.component.ts — page d'accueil (importe HomeComponent, HeaderComponent)
    + src/app/pages/countrydetail/countrydetail.component.ts — page détail pays (importe CountryComponent, HeaderComponent)
    + src/app/pages/not-found — page 404
° Composants réutilisables / UI
    + src/app/components/home/home.component.ts — construit un graphique (Chart.js), récupère les données via DataService, gère la navigation vers la page country/:countryName au clic sur un segment du camembert.
    + src/app/components/country/* — composants liés à l'affichage d'un pays
    + src/app/components/header/* — header global
° Services et logique métier légère
    + src/app/services/data.services.ts — DataService : récupère les données depuis ./assets/mock/olympic.json via HttpClient (getTousDonnees() retourne Observable<Country[]>).
    + src/app/models/olympic.model.ts — interfaces Participation et Country (types pour le modèle de données).
° Core / comportements transverses
    + src/app/core/error-handling/error.interceptor.ts — intercepteur HTTP qui capte les erreurs, extrait un message et le délègue au service de notification.
    + src/app/core/error-handling/notification.service.ts — encapsule MatSnackBar pour afficher erreurs / succès.
° Assets & configuration
    + ./assets/mock/olympic.json — source de données mock (utilisée par DataService).
    + src/environments/ — fichiers d'environnement (API endpoints / flags).
    + angular.json, tsconfig*.json, package.json, karma.conf.js — configuration de build et test.

Flux d'exécution et flux de données

1. Bootstrap : main.ts initialise l'AppModule. Router charge DashboardComponent sur la route racine.
2. Dashboard compose la vue en incluant HomeComponent et HeaderComponent.
3. HomeComponent appelle DataService.getTousDonnees() (HttpClient) pour récupérer le JSON mock dans assets, s'abonne à l'Observable, transforme les participations en jeux de données (somme des médailles) et construit un graphique Chart.js.
4. Interaction utilisateur : clic sur un segment du camembert → router.navigate(['country', countryName]) → route vers CountrydetailComponent.
5. Interception des appels HTTP : errorInterceptor intercepte les erreurs HTTP, calcule un message lisible et appelle NotificationService.afficherErreur() pour montrer un snackbar Material.
6. Types TypeScript (Country / Participation) garantissent la structure des données tout au long du flux.

Principales dépendances qui façonnent l'architecture

° Angular (version 18.x) — module system, router, DI
° @angular/material & @angular/cdk — snackbar / composants UI
° Chart.js — rendu des graphiques
° RxJS — Observables pour la communication asynchrone
° Bootstrap (présent dans package.json) — styles/utilitaires

Responsive

Bootstrap est choisi et utilisé pour développer et garantir la resposivité de l'application.
