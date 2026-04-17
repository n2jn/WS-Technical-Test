import { Store } from "../../types/store"
import {  ListRenderItemInfo } from "react-native";
import { useCallback, useMemo } from "react";
import { STORE_ITEM_HEIGHT, StoreItem } from "../../components/StoreItem";
import { Header } from "../../components/Header";
import { theme } from "../../theme";
import { Empty } from "../../components/Empty";
import { OptimizedList } from "../../components/Optimizedlist";


type FavoritesScreenProps = {
    error: boolean
    favorites: Store[]
    onItemPress: (id: string | number) => void
    onActionPress: (id: string | number) => void
}

export const FavoriteScreen = ({ onItemPress, favorites, error, onActionPress }: FavoritesScreenProps) => {

    const getItemLayout = useCallback((_data: any, index: number) => ({
        length: STORE_ITEM_HEIGHT,
        offset: STORE_ITEM_HEIGHT * index,
        index,
    }), [])

    const renderItem = useCallback(({ item }: ListRenderItemInfo<Store>) => {
        return <StoreItem store={item} onPress={onItemPress} isFavorite={true} onActionPress={onActionPress} />
    }, [])

    const emptyProps = useMemo(() => {
        if (error) {
            return { title: "Impossible de charger vos magasins préférés", sub: "Vérifiez votre connexion et réessayez."}
        }
        return { title: "Vos magasins préférés ici", sub: "Explorez la liste et ajoutez vos adresses coup de cœur en appuyant sur l'étoile."}
    }, [error])


    return <>
        <Header
            title1="Mes"
            title2={"Favoris"}
            sub={`${favorites.length} magasins sauvegardés`}
            variant="favorites"
        />
        <OptimizedList
            accessibilityLabel={"Liste des magasins préférés"}
            data={favorites}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            style={{ paddingHorizontal: theme.spacing.xl }}
            contentContainerStyle={{ paddingTop: 12, gap: 8, paddingBottom: 100, flexGrow: 1 }}
            ListEmptyComponent={
                <Empty
                    {...emptyProps}
                />
            }
        />
    </>
}