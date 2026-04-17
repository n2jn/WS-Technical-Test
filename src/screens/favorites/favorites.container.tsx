import { ActivityIndicator } from "react-native"
import { useFavorites } from "../../provider/FavoriteProvider"
import { FavoriteScreen } from "./favorites.screen"

type FavoriteContainerProps = {
    goToDetail: (id: string | number) => void
}

export const FavoriteContainer = ({goToDetail}: FavoriteContainerProps) => {
    const {favorites, loading, error, removeFavorite} = useFavorites()
    
    if (loading) return <ActivityIndicator style={{flex: 1}}/>;

    return <FavoriteScreen favorites={favorites} onItemPress={goToDetail} error={!!error} onActionPress={removeFavorite} />
}