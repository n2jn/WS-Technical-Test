# Exercice 2 : Optimisation FlatList

## 🎯 Objectif

Optimiser une FlatList affichant 10 000 produits qui est lente au scroll.

## ❌ Problèmes identifiés

### 1. **Filtrage dans le render**
```javascript
// ❌ AVANT
data={products.filter(p => p.name.includes(filter))}
```
Le filtrage s'exécute à chaque render, recalculant 10 000 éléments.

### 2. **renderItem inline**
```javascript
// ❌ AVANT
renderItem={({ item }) => ( ... )}
```
Créé une nouvelle fonction à chaque render, empêchant React de mémoriser les items.

### 3. **Pas de keyExtractor**
Sans `keyExtractor`, React utilise l'index comme clé, causant des re-renders inutiles lors des mises à jour.

### 4. **Chargement de 10 000 items**
Tout charger d'un coup sature la mémoire et freeze l'interface.

### 5. **onEndReached sans seuil**
```javascript
// ❌ AVANT
onEndReached={() => console.log('end')}
```
Sans `onEndReachedThreshold`, le callback se déclenche trop tard.

### 6. **Pas de getItemLayout**
FlatList ne connaît pas la hauteur des items, empêchant les optimisations de virtualisation.

### 7. **Styles inline**
```javascript
// ❌ AVANT
style={{ flexDirection: 'row', padding: 10 }}
```
Créé un nouvel objet à chaque render.

## ✅ Solutions appliquées

### 1. **Filtrage côté serveur** (lignes 33-41 commentées)
Déplacé le filtrage de `useMemo` vers l'API avec paramètre `name`.

### 2. **renderItem mémorisé** (ligne 69)
```javascript
const renderItem = useCallback(({ item }) => { ... }, [])
```
Empêche la re-création de la fonction, permet à React de mémoriser les items.

### 3. **keyExtractor unique** (ligne 109)
```javascript
keyExtractor={(item) => item.id.toString()}
```
Utilise l'ID unique du produit pour identifier chaque item de manière stable.

### 4. **Pagination** (lignes 79-93)
```javascript
onEndReached={handleOnEndReached}
onEndReachedThreshold={0.7}
```
Charge 20 items à la fois au lieu de 10 000. Se déclenche quand 70% de la liste est scrollée.

### 5. **windowSize optimisé** (ligne 114)
```javascript
windowSize={5}
```
Réduit le nombre d'items rendus hors écran (5 écrans au lieu de 21 par défaut).

### 6. **getItemLayout** (ligne 117)
```javascript
const getItemLayout = useCallback((_data, index) => ({
  length: PRODUCT_ITEM_HEIGHT,
  offset: PRODUCT_ITEM_HEIGHT * index,
  index,
}), [])
```
Indique à FlatList la hauteur exacte de chaque item, permettant le scroll instantané et la virtualisation optimale.

## 📊 Résultats

- **Avant** : 10 000 items chargés, scroll laggy
- **Après** : 20 items initiaux, chargement progressif, scroll fluide à 60fps
