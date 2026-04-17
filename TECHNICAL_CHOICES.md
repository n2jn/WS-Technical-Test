# Choix techniques

Ce document justifie les choix de librairies et technologies utilisées dans le projet.

## Framework principal

### [Expo](https://docs.expo.dev)

**Pourquoi Expo ?**

- Développement rapide avec Expo Go
- Accès aux APIs expo-*
- Web support natif

---

## Navigation

### [Expo Router](https://docs.expo.dev/router/introduction)

- File-based routing (comme Next.js)
- Type-safe routes
- Web friendly

### [@react-navigation/material-top-tabs](https://reactnavigation.org/docs/material-top-tab-navigator)

- Swipe horizontal fluide
- Compatible Expo Router via `withLayoutContext`
- TabBar personnalisable
- Animations natives
- Lazy loading


---

## UI/UX

### [@expo/vector-icons](https://docs.expo.dev/guides/icons)

- Icônes vectorielles (Ionicons, Material, FontAwesome)
- Pas de configuration supplémentaire avec Expo

### [expo-blur](https://docs.expo.dev/versions/latest/sdk/blur-view)

- Effet de flou natif pour la TabBar
- Support iOS/Android/Web
- Pas de configuration supplémentaire avec Expo

### [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient)

- Gradients natifs performants
- Support multi-plateforme
- Pas de configuration supplémentaire avec Expo

### [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated)

- On en a besoin pour utiliser l'ui thread de react native
- Animations 60fps garanties
- Worklets pour animations complexes
- Shared values pour state partagé
- Utilisé dans `detail.screen.tsx` pour le parallax

### [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics)


- Feedback haptique natif
- Améliore l'UX sur mobile
- Pas de configuration supplémentaire avec Expo

---

## Maps

### [react-native-maps](https://docs.expo.dev/versions/latest/sdk/map-view)

- Standard de facto pour les cartes React Native
- Support Google Maps (Android) et Apple Maps (iOS)
- Customisable

**Inconvénients** :

- Nécessite configuration API keys pour la prod
- Pas de support web natif (d'où `Map.web.tsx` avec image)

---

## State Management

### [@react-native-async-storage/async-storage](https://docs.expo.dev/versions/latest/sdk/async-storage)

- Storage local asynchrone
- API simple key-value
- Performant et sécurisé

---

## Testing

### [Jest](https://jestjs.io) + [jest-expo](https://docs.expo.dev/develop/unit-testing)

- Standard pour React/React Native
- Snapshots, mocks, coverage
- Fast refresh en mode watch
- jest-expo préconfigure Jest pour Expo

### [@testing-library/react-native](https://testing-library.com/docs/react-native-testing-library/intro)

- Tests centrés sur le comportement utilisateur
- Encourage les bonnes pratiques
- Queries accessibles (`getByLabelText`, etc.)
- Community standard

### [MSW](https://mswjs.io)

- Mocks API au niveau réseau (pas de mock fetch)
- Même handlers pour dev et test
- Support web (Service Worker) et native (server)
- Réponses réalistes
- Pas d'impact sur le code de production

**Alternative considérée** :
- fetch mocks manuels (rejeté car fragile et répétitif)

---

## Autres dépendances

### lodash

- Utilitaires éprouvés
- Tree-shakeable
- Fonctions complexes déjà optimisées

**Inconvénient** : Taille du bundle (mais tree-shaking aide)

**Alternative considérée** : Implémentation custom (rejeté car réinvention de la roue)

