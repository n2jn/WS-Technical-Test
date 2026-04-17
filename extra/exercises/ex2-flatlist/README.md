# Exercice 2 : Optimisation FlatList

## Objectif

Optimiser une FlatList affichant 10 000 produits qui est lente au scroll.

### 1. **Filtrage dans le render**
```javascript
// ❌ AVANT
data={products.filter(p => p.name.includes(filter))}
```
Le filtrage s'exécute à chaque render, recalculant 10 000 éléments.

solution:  filtrer via l'api, avec de préference une pagination.

```typescript
// ✅ APRÈS
// data s'update au refetch
 const { data, loading, refetch } = useFetch<ProductResponse>("https://api.example.com/products", {
        params: {
            limit: PRODUCT_LIMIT,
            offset: 0
        }
    })

const [filter, setFilter] = useState<string>('')

// debounce pour ne pas aggresser l'api
const debouncedRefetch = useMemo(
    () => debounce(({name, offset}: {name: string, offset: number}) => {
        refetch({
            params: {
                name: name,
                limit: PRODUCT_LIMIT,
                offset: offset
            },
        });
    }, 500),
    [refetch]
);

// on call l'api avec un text filtrer
const handleOnChangeText = useCallback((rawText: string) => {
    const sanitizedText = rawText.trimEnd().trimStart()
    setFilter(rawText);
    debouncedRefetch({ name: sanitizedText, offset: 0 });
}, [debouncedRefetch])

 return (
    <View>
        <TextInput value={filter} onChangeText={handleOnChangeText} />
    </View>
    ...
)


```

### 2. **renderItem inline**
```javascript
// ❌ AVANT
renderItem={({ item }) => ( ... )}
```
Créé une nouvelle fonction à chaque render, empêchant React de mémoriser les items.

solution: mémoriser dans un useCallback

```typescript
// ✅ APRÈS
  const renderItem = useCallback(({ item }: ListRenderItemInfo<Product>) => {
        return <View style={{ flexDirection: 'row', height: PRODUCT_ITEM_HEIGHT }}>
            <Image source={{ uri: item.imageUrl }} style={{ width: 80, height: 80 }} />
            <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                <Text>{item.price} €</Text>
            </View>
        </View>
    }, [])

...

renderItem={renderItem}
```

### 3. **Pas de keyExtractor**
Sans `keyExtractor`, React utilise l'index comme clé, causant des re-renders inutiles lors des mises à jour.

Solution: Utilise l'ID unique du produit pour identifier chaque item de manière stable.

```
keyExtractor={(item) => item.id.toString()}
```

### 4. **onEndReached non utiliser**
Tout charger d'un coup sature la mémoire et freeze l'interface.

Solution: Pagination

```typescript
const handleOnEndReached = useCallback(() => {
    if (!data) return;
    
    const { total, offset, product } = data;
    
    if (total > 0 && total <= offset) {
        return
    }

    const newOffset = product.length + offset < total
    ? offset + PRODUCT_LIMIT
    : total

    debouncedRefetch({ name: filter, offset: newOffset });
}, [data, filter])

...

onEndReached={handleOnEndReached}
onEndReachedThreshold={0.7}
```

### 5. **windowSize**

utiliser windowSize pour eviter de load trop d'item
```
windowSize={5} // a 21 par default
```

### 6. **Pas de getItemLayout**
FlatList ne connaît pas la hauteur des items, empêchant les optimisations de virtualisation.

Solution: Indique à FlatList la hauteur exacte de chaque item, permettant le scroll instantané et la virtualisation optimale.

```
const getItemLayout = useCallback((_data, index) => ({
  length: PRODUCT_ITEM_HEIGHT,
  offset: PRODUCT_ITEM_HEIGHT * index,
  index,
}), [])
```
