# Architecture du projet

## 🏛️ Vue d'ensemble

Ce projet suit une architecture en couches qui sépare clairement les responsabilités entre la navigation, la logique métier et le rendu.

## 📁 Structure des dossiers

```
src/
├── app/                    # Navigation (Expo Router)
│   ├── _layout.tsx        # Layout racine avec providers
│   ├── index.tsx          # Point d'entrée (initialisation MSW)
│   ├── (tabs)/            # Navigation par onglets
│   │   ├── _layout.tsx    # Layout des onglets (Material Top Tabs)
│   │   ├── home.tsx       # Écran Home
│   │   └── favorites.tsx  # Écran Favoris
│   └── detail.tsx         # Écran de détail (modal)
│
├── screens/                # Écrans avec pattern Container/Screen
│   ├── home/
│   │   ├── home.container.tsx  # Logique métier
│   │   ├── home.screen.tsx     # Rendu UI
│   │   └── index.ts            # Export
│   ├── favorites/
│   │   ├── favorites.container.tsx
│   │   ├── favorites.screen.tsx
│   │   └── index.ts
│   └── detail/
│       ├── detail.container.tsx
│       ├── detail.screen.tsx
│       ├── detail.style.ts
│       └── index.ts
│
├── components/             # Composants réutilisables
│   ├── Empty.tsx
│   ├── SearchBar.tsx
│   ├── DetailHeader.tsx
│   ├── StoreItem.tsx
│   └── Map.tsx / Map.web.tsx
│
├── provider/               # Context providers
│   └── FavoriteProvider.tsx
│
├── types/                  # Définitions TypeScript
│   └── store.ts
│
└── lib/                    # Utilitaires
    └── msw.ts             # Initialisation MSW
```

## 🎯 Pattern Container/Screen

### Pourquoi ce pattern ?

Ce projet utilise le pattern **Container/Screen** pour séparer les responsabilités :

#### **Container (.container.tsx)**
Responsabilités :
- ✅ Gestion de l'état local
- ✅ Appels API (via hooks comme `useFetch`)
- ✅ Logique métier et transformations de données
- ✅ Gestion des effets de bord
- ✅ Interaction avec les contexts/providers

```typescript
// Exemple: home.container.tsx
export const HomeContainer = ({ goToDetail }) => {
  const { data, loading, error } = useFetch<StoresResponse>(API_URL);
  const [search, setSearch] = useState('');

  const filteredStores = useMemo(() =>
    data?.stores.filter(store =>
      store.name.toLowerCase().includes(search.toLowerCase())
    ), [data, search]
  );

  if (loading) return <ActivityIndicator />;
  if (error) return <Empty title="Erreur" />;

  return <HomeScreen
    stores={filteredStores}
    search={search}
    onSearchChange={setSearch}
    onStorePress={goToDetail}
  />;
};
```

#### **Screen (.screen.tsx)**
Responsabilités :
- ✅ Rendu UI pur (composants visuels)
- ✅ Mise en page et styles
- ✅ Animations et interactions visuelles
- ✅ Accessibilité (labels, hints)
- ❌ Pas de logique métier
- ❌ Pas d'appels API

```typescript
// Exemple: home.screen.tsx
type HomeScreenProps = {
  stores: Store[];
  search: string;
  onSearchChange: (text: string) => void;
  onStorePress: (id: number) => void;
};

export const HomeScreen = ({
  stores,
  search,
  onSearchChange,
  onStorePress
}: HomeScreenProps) => (
  <View>
    <SearchBar value={search} onChangeText={onSearchChange} />
    <FlatList
      data={stores}
      renderItem={({ item }) => (
        <StoreItem store={item} onPress={() => onStorePress(item.id)} />
      )}
    />
  </View>
);
```

### Avantages

1. **Séparation des préoccupations** : La logique métier est isolée du rendu
2. **Testabilité** :
   - Container : Tests unitaires de la logique
   - Screen : Tests de rendu et snapshots
3. **Réutilisabilité** : Les screens peuvent être réutilisés avec différents containers
4. **Lisibilité** : Code plus facile à comprendre et maintenir
5. **Performance** : Optimisations ciblées (memo, useMemo) plus faciles

## 🧭 Architecture de navigation

### Expo Router (File-based routing)

Le projet utilise **Expo Router** pour sa navigation file-based, similaire à Next.js.

#### Pourquoi Expo Router ?

1. **Convention over configuration** : La structure des fichiers définit les routes
2. **Type-safe** : Routes typées automatiquement
3. **Deep linking natif** : Support intégré des liens profonds
4. **Server-side rendering** : Prêt pour le SSR (web)
5. **Migration facilitée** : Compatible avec React Navigation

#### Structure de navigation

```
app/
├── _layout.tsx          → Stack Navigator racine
├── index.tsx            → / (redirect vers /home)
├── (tabs)/
│   ├── _layout.tsx      → Material Top Tabs
│   ├── home.tsx         → /(tabs)/home
│   └── favorites.tsx    → /(tabs)/favorites
└── detail.tsx           → /detail?id=123 (modal)
```

### Material Top Tabs

Les onglets utilisent `@react-navigation/material-top-tabs` via `withLayoutContext` :

```typescript
// (tabs)/_layout.tsx
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  return (
    <MaterialTopTabs
      tabBar={TabBar}
      tabBarPosition="bottom"
      screenOptions={{ swipeEnabled: true }}
    >
      <MaterialTopTabs.Screen name="home" />
      <MaterialTopTabs.Screen name="favorites" />
    </MaterialTopTabs>
  );
}
```

**Avantages** :
- Swipe horizontal entre onglets
- TabBar personnalisé avec blur effect
- Animations fluides
- Lazy loading des onglets

## 🔄 Flux de données

### State Management

1. **État local** : `useState` pour les états UI simples
2. **Context API** : `FavoritesProvider` pour les favoris
3. **AsyncStorage** : Persistance locale des favoris
4. **React Query pattern** : Hook `useFetch` pour les appels API

### Providers

```typescript
// app/_layout.tsx
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <Stack>
          {/* Routes */}
        </Stack>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
```

## 🧪 Architecture de tests

### Mock Service Worker (MSW)

Le projet utilise MSW pour mocker les APIs en développement et en test :

```typescript
// src/lib/msw.ts
export function initializeMSW(): Promise<void> {
  if (Platform.OS === 'web') {
    // Service Worker pour le web
    const worker = setupWorker(...handlers);
    return worker.start();
  } else {
    // Server pour React Native
    server.listen();
  }
}
```

**Initialisation** : Dans `app/index.tsx` avant le premier render

### Tests

- **Composants** : Tests unitaires avec React Native Testing Library
- **Hooks** : Tests avec `renderHook`
- **Intégration** : Tests E2E avec MSW

## 🎨 Styling

- **StyleSheet API** : Styles natifs pour les performances
- **Theme centralisé** : `src/theme.ts`
- **Platform-specific** : `.web.tsx` pour les variations web
- **Responsive** : Utilisation de Dimensions et hooks

## 🚀 Performance

### Optimisations

1. **Lazy loading** : Onglets chargés à la demande
2. **Memoization** : `useMemo` et `useCallback` dans les containers
3. **FlatList** : Liste virtualisée pour les grandes listes
4. **Image optimization** : Lazy loading des images
5. **Code splitting** : Imports dynamiques via `import()`

### Patterns

- **Debounce** : Sur la recherche pour limiter les re-renders
- **Abort Controller** : Annulation des requêtes HTTP en cours
- **Suspense-ready** : Architecture prête pour React Suspense

## 📱 Accessibilité

Tous les composants incluent :
- `accessibilityLabel` : Description des éléments
- `accessibilityHint` : Indication de l'action
- `accessibilityRole` : Rôle sémantique
- `accessible` : Marquage des éléments interactifs

## 🔐 Sécurité

- **Type safety** : TypeScript strict
- **Input validation** : Validation côté client
- **Error boundaries** : Gestion des erreurs React
- **Secure storage** : AsyncStorage pour données sensibles
