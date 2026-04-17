## Navigation

### Q1 -> B — navigate ne fait rien si l'écran est déjà dans le stack, push ajoute toujours
### Q2 -> B — state manager global (Redux, Zustand, Context)
### Q3 -> D — onStateChange + initialState + storage

## State Management

### Q4 -> C — retourne un nouveau state en fonction d'une action
### Q5 -> B — action creator asynchrone, géré avec extraReducers via builder.addCase()
### Q6 -> C — UI → Dispatch → Middleware → Reducer → Store → UI
### Q7 -> A et C — re-renders excessifs + problèmes de performance sur listes longues

## API / Fetch / Async

### Q8 -> B — React Query gère cache, refetch, loading/error, deduplication, garbage collection
### Q9 -> B — AbortController + signal + abort() dans le cleanup
### Q10 -> B — queue de mutations persistée + rejouer à la reconnexion

## UI/UX & Styling

### Q11 -> B — StyleSheet.create() valide au build time et envoie les IDs au thread natif
### Q12 -> B — react-native-safe-area-context avec SafeAreaView ou useSafeAreaInsets()

## Performance

### Q13 -> B — FlatList pour listes plates, SectionList pour données groupées
### Q14 -> A — mémoïse le composant, contre-productif si props changent à chaque render
### Q15 -> B — useCallback mémoïse une fonction, useMemo mémoïse un résultat
### Q16 -> A — deux threads distincts, animations JS-side peuvent dropper des frames si bridge saturé

## Tests

### Q17 -> A — __mocks__/react-native-camera.js ou jest.mock('react-native-camera')
### Q18 -> B — waitFor() ou findBy*

## Transversales

### Q19 -> A — moteur JS optimisé, réduit TTI, consommation mémoire, bytecode précompilé
### Q20 -> A — supprime le bridge asynchrone au profit de JSI synchrone, rendu concurrent
