# Architecture du projet

## Vue d'ensemble

Ce projet suit une architecture en couches qui sépare clairement les responsabilités entre la navigation, la logique métier et le rendu.

## Structure des dossiers

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




## [Architecture Navigation](./NAVIGATION_PATTERN_CHOICE.md)
## [Choix du pattern Container/Screen](./PATTERN_CHOICE.md)
## [Architecture de Tests](./TEST_PATTERN.md)

## [Choix Techniques](./TECHNICAL_CHOICES.md)