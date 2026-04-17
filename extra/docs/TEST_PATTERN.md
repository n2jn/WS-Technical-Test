## Architecture de tests

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