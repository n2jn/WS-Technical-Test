import { ActivityIndicator } from "react-native";
import { useFetch } from "../../../extra/exercises/ex1-useFetch";
import { Store } from "../../types/store";
import { DetailScreen } from "./detail.screen"
import { useFavorites } from "../../provider/FavoriteProvider";
import { useCallback } from "react";
import * as Haptics from 'expo-haptics';
import { Empty } from "../../components/Empty";

type DetailContainerProps = {
    id: string | number
}

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