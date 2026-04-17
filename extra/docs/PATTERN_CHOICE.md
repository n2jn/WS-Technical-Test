## Pattern Container/Screen

- liens utile medium: https://dev.to/vincent-delmotte/tout-savoir-sur-le-design-pattern-container-presentational-4951

### Pourquoi ce pattern ?

Ce projet utilise le pattern **Container/Screen** pour séparer les responsabilités :

#### **Container (.container.tsx)**
Responsabilités :
- Gestion de l'état local
- Appels API (via hooks comme `useFetch`)
- Logique métier et transformations de données
- Gestion des effets de bord
- Interaction avec les contexts/providers

```typescript
// detail.container.tsx
export const DetailContainer = ({id}: DetailContainerProps) => {
    const { data, loading, error } = useFetch<Store>(`https://api.example.com/stores/${id}`);
    const {toggleFavorite, isFavorite} = useFavorites()

    const handleOnFavoritePress = useCallback(async () => {
        if (!data) return
        await toggleFavorite(data)
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }, [data, toggleFavorite])


    if (loading && !data) return <ActivityIndicator style={{flex: 1}}/>;
    if (error) return <Empty title={'Magasin introuvable'} sub={'Ce magasin n\'existe pas ou n\'est plus disponible'}/>
    if (!data) return <Empty title={'Aucune donnée'} sub={'Impossible de charger les informations du magasin'}/>

    return <DetailScreen store={data} isFavorite={isFavorite(data.id)} onFavoritePress={handleOnFavoritePress}/>
}
```

#### **Screen (.screen.tsx)**

Responsabilités :
- Rendu UI pur (composants visuels)
- Mise en page et styles
- Animations et interactions visuelles
- Accessibilité (labels, hints)
- Pas de logique métier
- Pas d'appels API

```typescript
// detail.screen.tsx
type DetailScreenProps = {
  store: Store
  isFavorite: boolean
  onFavoritePress: () => void
}

export const DetailScreen = ({ store, onFavoritePress, isFavorite }: DetailScreenProps) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const mapStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, MAP_HEIGHT * 0.6],
      [1, 0],
      Extrapolation.CLAMP
    ),
    transform: [{
      translateY: interpolate(
        scrollY.value,
        [0, MAP_HEIGHT],
        [0, -MAP_HEIGHT / 2],
        Extrapolation.CLAMP
      ),
    }],
  }));


  return (
    <>
      <Animated.View style={[styles.mapContainer, mapStyle]}
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel={`Détail du magasin ${store.name}`}
      >
        {Platform.OS === 'web' ?
          <Image source={{uri: store.imageUrl}} resizeMode="cover" style={{height: MAP_HEIGHT, width: "100%"}}/>
          :
          <Map latitude={store.latitude} longitude={store.longitude}/>
        }
        <LinearGradient
          colors={['rgba(247, 245, 240, 0)', 'rgba(247, 245, 240, 1)']}
          style={styles.gradient}
        />
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={StyleSheet.absoluteFill}
        contentContainerStyle={{ marginTop: MAP_HEIGHT, flexGrow: 1 }}
      >
        <DetailHeader
          title={store.name}
          sub={store.address}
          onIconPress={onFavoritePress}
          icon={isFavorite ? 'star' : 'star-outline'}
        />

        <OpeningHourCard
          title={"Horaires d\'ouverture"}
          openingHours={store.openingHours}
        />
      </Animated.ScrollView>
    </>
  );
};
```

### Avantages

1. **Séparation des préoccupations** : La logique métier est isolée du rendu
2. **Testabilité** :
   - Container : Tests unitaires de la logique
   - Screen : Tests de rendu et snapshots
3. **Réutilisabilité** : Les screens peuvent être réutilisés avec différents containers
4. **Lisibilité** : Code plus facile à comprendre et maintenir
5. **Performance** : Optimisations ciblées (memo, useMemo) plus faciles

