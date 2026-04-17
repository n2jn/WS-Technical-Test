[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/n2jn/WS-Technical-Test/tree/master)

# StoreTracker

Une application React Native permettant de visualiser et gérer des magasins avec leurs informations et horaires d'ouverture.

## 🚀 Démarrage rapide

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Expo CLI

### Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

### Commandes disponibles

#### Développement
```bash
npm start           # Démarre le serveur Expo
npm run android     # Lance sur émulateur/appareil Android
npm run ios         # Lance sur simulateur/appareil iOS
npm run web         # Lance la version web
```

#### Tests
```bash
npm test                # Lance tous les tests
npm run test:components # Tests des composants uniquement
npm run test:exercises  # Tests des exercices
npm run test:ex1        # Test du hook useFetch
npm run test:watch      # Mode watch (relance auto)
npm run test:coverage   # Rapport de couverture
```

## 📱 Fonctionnalités

- **Liste de magasins** : Affichage avec recherche et filtrage
- **Détails des magasins** : Vue détaillée avec carte et horaires
- **Favoris** : Gestion des magasins favoris avec AsyncStorage
- **Navigation** : Navigation fluide avec Expo Router et Material Top Tabs
- **Accessibilité** : Labels et hints pour une meilleure accessibilité

## 🏗️ Structure du projet

```
WS-Technical-Test/
├── src/
│   ├── app/              # Routing avec Expo Router
│   ├── components/       # Composants réutilisables
│   ├── screens/          # Écrans (container + screen)
│   ├── provider/         # Context providers
│   ├── types/            # Types TypeScript
│   └── lib/              # Utilitaires (MSW, etc.)
├── extra/
│   └── exercises/        # Exercices et tests associés
└── public/               # Assets statiques (MSW worker)
```

Pour plus de détails sur l'architecture, voir [ARCHITECTURE.md](./ARCHITECTURE.md).

## 📚 Documentation

- [Architecture](./ARCHITECTURE.md) - Architecture et patterns utilisés
- [Choix techniques](./TECHNICAL_CHOICES.md) - Justification des librairies

## 📝 Exercices

- [Exercice 1 : useFetch](./extra/exercises/ex1-useFetch) - Hook custom pour les appels API
- [Exercice 2 : Optimisation FlatList](./extra/exercises/ex2-flatlist) - Performance et virtualisation
- [Exercice 3 : Redux store](./extra/exercises/ex3-redux-store) - store redux
- [Exercice 4 : login form test](./extra/exercises/ex4-loginForm-tests) - test login form

## 🧪 Tests

Le projet utilise Jest et React Native Testing Library pour les tests unitaires et d'intégration.

Couverture actuelle :
- Composants : Empty, SearchBar, DetailHeader
- Hooks : useFetch (8 tests)
- Gestion des erreurs HTTP et réseau

## 🛠️ Technologies

- **React Native** + **Expo** - Framework mobile cross-platform
- **Expo Router** - Routing file-based
- **TypeScript** - Typage statique
- **MSW** - Mock Service Worker pour les tests
- **Redux Toolkit** - State management global
- **Jest** - Framework de test

## 📄 Licence

Projet privé
