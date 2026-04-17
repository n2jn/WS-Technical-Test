import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { TabParamList } from "./_layout";
import { RootStackParamList } from "../_layout";
import { FavoriteContainer } from "../../screens/favorites";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";
import * as Haptics from 'expo-haptics';
import { useCallback } from "react";

type FavoriteNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TabParamList, 'Favorites'>,
  StackNavigationProp<RootStackParamList>
>;

export const Favorites = () => {
  const navigation = useNavigation<FavoriteNavigationProp>();

  const goToDetailWithId = useCallback(async (id: string | number) => {
    navigation.navigate('Detail', { id })
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={{ top: 'maximum', bottom: 'off' }}>
      <FavoriteContainer goToDetail={goToDetailWithId} />
    </SafeAreaView>
  )
}