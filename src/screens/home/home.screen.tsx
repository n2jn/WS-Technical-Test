import { ActivityIndicator, FlatList, ListRenderItemInfo, RefreshControl } from "react-native"
import { Store } from "../../types/store"
import { useCallback, useMemo } from "react";
import { theme } from "../../theme";
import { STORE_ITEM_HEIGHT, StoreItem } from "../../components/StoreItem";
import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";
import { Empty } from "../../components/Empty";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { OptimizedList } from "../../components/Optimizedlist";


type HomeScreenProps = {
    error: boolean
    onEndReached: () => void
    onChangeText: (text: string) => void
    onItemPress: (id: string | number) => void
    searchValue: string
    stores: Store[]
    totalStores: number
}

export const HomeScreen = ({ onItemPress, stores, onEndReached, onChangeText, searchValue, totalStores, error }: HomeScreenProps) => {
    const getItemLayout = useCallback((_data: any, index: number) => ({
        length: STORE_ITEM_HEIGHT,
        offset: STORE_ITEM_HEIGHT * index,
        index,
    }), [])

   
    const renderItem = useCallback(({ item }: ListRenderItemInfo<Store>) => {
        return <StoreItem store={item} onPress={onItemPress} />
    }, [onItemPress])

    const emptyProps = useMemo(() => {
        if (error) {
            return { title: "Impossible de charger les magasins", sub: "Vérifiez votre connexion et réessayez." }
        }
        if (searchValue !== '') {
            return { title: "Aucun magasin trouvé", sub: "Essayez avec un autre mot-clé" }
        }
        return { title: "Aucun magasin disponible", sub: "Il n'y a pas encore de magasin dans votre zone. Revenez bientôt !" }
    }, [searchValue])

    return (
        <>
            <Header
                title1="Nos"
                title2={"Magasins"}
                sub={`${totalStores} adresses`}
                variant="home"
            />
            <SearchBar onChangeText={onChangeText} value={searchValue} />
            <OptimizedList
                accessibilityLabel={"Liste des magasins"}
                data={stores}
                renderItem={renderItem}
                style={{ paddingHorizontal: theme.spacing.xl }}
                contentContainerStyle={{ paddingTop: 12, gap: 8, paddingBottom: 100, flexGrow: 1 }}
                getItemLayout={getItemLayout}
                onEndReached={onEndReached}
                ListEmptyComponent={
                    <Empty {...emptyProps} />
                }
            />
        </>
    )
}