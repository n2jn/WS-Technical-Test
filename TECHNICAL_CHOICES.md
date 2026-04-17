# Choix techniques

Ce document justifie les choix de librairies et technologies utilisées dans le projet.

## 🎯 Framework principal

### React Native + Expo (~54.0.33)

**Pourquoi Expo ?**

✅ **Avantages** :
- Développement rapide avec Expo Go
- Over-the-air updates (OTA)
- Accès aux APIs natives sans éjection
- Tooling moderne (Metro, Fast Refresh)
- Web support natif
- New Architecture activée (`newArchEnabled: true`)

❌ **Inconvénients** :
- Taille de l'app légèrement plus grande
- Certaines libs natives nécessitent des plugins custom

**Alternative considérée** : React Native CLI (rejeté car nécessite plus de configuration native)

---

## 🧭 Navigation

### Expo Router (~6.0.23)

**Pourquoi Expo Router ?**

✅ **Avantages** :
- File-based routing (comme Next.js)
- Deep linking natif
- Type-safe routes
- SEO-friendly (web)
- Layouts imbriqués
- Migration facile depuis React Navigation

❌ **Inconvénients** :
- Plus récent (moins de ressources communautaires)
- Courbe d'apprentissage si habitué à React Navigation

**Alternative considérée** : React Navigation seul (rejeté car Expo Router offre plus de fonctionnalités avec moins de configuration)

### @react-navigation/material-top-tabs (^7.4.23)

**Pourquoi Material Top Tabs ?**

✅ **Avantages** :
- Swipe horizontal fluide
- Compatible Expo Router via `withLayoutContext`
- TabBar personnalisable
- Animations natives
- Lazy loading

❌ **Inconvénients** :
- Dépendance supplémentaire

**Alternative considérée** : Tabs natifs d'Expo Router (rejeté car moins de customisation pour la TabBar avec blur)

---

## 🎨 UI/UX

### @expo/vector-icons (^15.0.3)

**Pourquoi ?**

✅ Icônes vectorielles (Ionicons, Material, FontAwesome)
✅ Pas de configuration supplémentaire avec Expo
✅ Tree-shakeable

**Alternative considérée** : react-native-vector-icons (rejeté car nécessite linking natif)

### expo-blur (~15.0.8)

**Pourquoi ?**

✅ Effet de flou natif pour la TabBar
✅ Performances optimales
✅ Support iOS/Android/Web

**Alternative considérée** : BlurView custom avec SVG (rejeté car performances moindres)

### expo-linear-gradient (~15.0.8)

**Pourquoi ?**

✅ Gradients natifs performants
✅ Support multi-plateforme
✅ API simple

**Alternative considérée** : react-native-linear-gradient (rejeté car Expo fournit déjà cette fonctionnalité)

### react-native-reanimated (~4.1.1)

**Pourquoi ?**

✅ Animations 60fps garanties
✅ Worklets pour animations complexes
✅ Shared values pour state partagé
✅ Utilisé dans `detail.screen.tsx` pour le parallax

**Alternative considérée** : Animated API native (rejeté car performances limitées pour animations complexes)

### expo-haptics (~15.0.8)

**Pourquoi ?**

✅ Feedback haptique natif
✅ Améliore l'UX sur mobile
✅ API simple et multiplateforme

---

## 🗺️ Maps

### react-native-maps (1.20.1)

**Pourquoi ?**

✅ Standard de facto pour les cartes React Native
✅ Support Google Maps (Android) et Apple Maps (iOS)
✅ Customisable

❌ **Inconvénients** :
- Nécessite configuration API keys
- Pas de support web natif (d'où `Map.web.tsx` avec image)

**Alternative considérée** : expo-maps (rejeté car moins mature)

---

## 🔄 State Management

### @react-redux (^9.2.0) + @reduxjs/toolkit (^2.11.2)

**Pourquoi Redux Toolkit ?**

✅ **Avantages** :
- Boilerplate réduit vs Redux classique
- Immer intégré (immutabilité simplifiée)
- DevTools puissants
- RTK Query pour data fetching (non utilisé ici mais disponible)
- TypeScript first-class

❌ **Inconvénients** :
- Peut être overkill pour petit état
- Courbe d'apprentissage

**Alternative considérée** :
- Zustand (rejeté car Redux Toolkit fait partie des exercices)
- Context API seul (utilisé pour FavoritesProvider, suffisant pour ce cas)

### redux-persist (^6.0.0)

**Pourquoi ?**

✅ Persistance automatique du state Redux
✅ Intégration avec AsyncStorage
✅ Rehydratation au démarrage

**Alternative considérée** : Gestion manuelle avec AsyncStorage (rejeté car code boilerplate)

### @react-native-async-storage/async-storage (2.2.0)

**Pourquoi ?**

✅ Storage local asynchrone
✅ API simple key-value
✅ Performant et sécurisé
✅ Utilisé par redux-persist

**Alternative considérée** : expo-secure-store (rejeté car pas de besoin de chiffrement pour les favoris)

---

## 🧪 Testing

### Jest (~29.7.0) + jest-expo (^55.0.16)

**Pourquoi Jest ?**

✅ Standard pour React/React Native
✅ Snapshots, mocks, coverage
✅ Fast refresh en mode watch
✅ jest-expo préconfigure Jest pour Expo

**Alternative considérée** : Vitest (rejeté car moins de support React Native)

### @testing-library/react-native (^13.3.3)

**Pourquoi React Native Testing Library ?**

✅ Tests centrés sur le comportement utilisateur
✅ Encourage les bonnes pratiques
✅ Queries accessibles (`getByLabelText`, etc.)
✅ Community standard

**Alternative considérée** : Enzyme (rejeté car déprécié)

### MSW (^1.3.5)

**Pourquoi Mock Service Worker ?**

✅ **Avantages majeurs** :
- Mocks API au niveau réseau (pas de mock fetch)
- Même handlers pour dev et test
- Support web (Service Worker) et native (server)
- Réponses réalistes
- Pas d'impact sur le code de production

**Implémentation** :
```typescript
// Web: Service Worker
const worker = setupWorker(...handlers);
worker.start();

// Native: Node server
const server = setupServer(...handlers);
server.listen();
```

**Alternative considérée** :
- fetch mocks manuels (rejeté car fragile et répétitif)
- Nock (rejeté car pas de support React Native)

---

## 🛠️ Développement

### TypeScript (~5.9.2)

**Pourquoi TypeScript ?**

✅ Type safety compile-time
✅ Meilleure DX (autocomplete, refactoring)
✅ Détection d'erreurs précoce
✅ Documentation implicite
✅ Standard moderne

**Alternative considérée** : JavaScript (rejeté pour projet professionnel)

### @swc/jest (^0.2.39)

**Pourquoi SWC ?**

✅ Transpilation ultra-rapide (Rust)
✅ Remplace Babel pour les tests
✅ Réduit le temps de build de ~50%

**Alternative considérée** : Babel (plus lent mais plus configurable)

### Babel + babel-preset-expo (^55.0.17)

**Pourquoi ?**

✅ Transpilation pour React Native
✅ Support des dernières features JS
✅ Plugins Expo intégrés

---

## 🌐 Web

### react-native-web (^0.21.2)

**Pourquoi ?**

✅ Permet de run React Native sur web
✅ Réutilisation du code mobile
✅ Performance comparable à React

**Alternative considérée** : Codebase séparée web (rejeté car duplication de code)

---

## 📦 Autres dépendances

### lodash (^4.18.1)

**Pourquoi ?**

✅ Utilitaires éprouvés
✅ Tree-shakeable
✅ Fonctions complexes déjà optimisées

❌ **Inconvénient** : Taille du bundle (mais tree-shaking aide)

**Alternative considérée** : Implémentation custom (rejeté car réinvention de la roue)

### fast-text-encoding (^1.0.6)

**Pourquoi ?**

✅ Polyfill TextEncoder/TextDecoder pour React Native
✅ Requis par MSW

### react-native-url-polyfill (^3.0.0)

**Pourquoi ?**

✅ Polyfill URL API pour React Native
✅ Requis par certaines libs (MSW, etc.)

---

## 🚫 Librairies évitées

### Styled-components / Emotion
**Raison** : StyleSheet natif suffit + meilleures performances

### React Query / SWR
**Raison** : Hook `useFetch` custom suffisant pour ce projet + exercice pédagogique

### NativeBase / React Native Paper
**Raison** : Composants custom pour plus de contrôle + bundle size

### Formik / React Hook Form
**Raison** : Pas de formulaires complexes dans ce projet

---

## 📊 Résumé des décisions

| Besoin | Solution choisie | Raison principale |
|--------|-----------------|-------------------|
| Framework | Expo | DX + Tooling moderne |
| Navigation | Expo Router | File-based + Type-safe |
| Onglets | Material Top Tabs | Swipe + Customisation |
| Animations | Reanimated | Performance 60fps |
| State global | Redux Toolkit | Standard + Exercices |
| Storage | AsyncStorage | Simple + Efficace |
| Tests | Jest + RTL | Standard React |
| API Mocking | MSW | Réalisme + DX |
| Types | TypeScript | Safety + DX |
| Maps | react-native-maps | Standard RN |

---

## 🔮 Évolutions futures possibles

1. **React Query** : Pour remplacer `useFetch` si l'app scale
2. **Zustand** : Alternative légère à Redux si besoin simplifié
3. **Expo Router API Routes** : Backend intégré pour l'app web
4. **Sentry** : Monitoring d'erreurs en production
5. **Detox** : Tests E2E pour scénarios complexes
