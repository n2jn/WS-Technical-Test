import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { TabParamList } from "./_layout";
import { RootStackParamList } from "../_layout";
import { useCallback } from "react";
import { HomeContainer } from "../../screens/home";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";
import * as Haptics from 'expo-haptics';

type HomeNavigationProp = CompositeNavigationProp<
    MaterialTopTabNavigationProp<TabParamList, 'Home'>,
    StackNavigationProp<RootStackParamList>
>;

export const Home = () => {
    const navigation = useNavigation<HomeNavigationProp>();

    const goToDetailWithId = useCallback(async (id: string | number) => {
        navigation.navigate('Detail', {
            id
        })
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={{ top: 'maximum', bottom: 'off' }}>
            <HomeContainer goToDetail={goToDetailWithId} />
        </SafeAreaView>
    )
}