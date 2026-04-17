import { useRouter } from "expo-router";
import { FavoriteContainer } from "../../screens/favorites";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";
import * as Haptics from 'expo-haptics';
import { useCallback } from "react";

const Favorites = () => {
  const router = useRouter();

  const goToDetailWithId = useCallback(async (id: string | number) => {
    router.push({
      pathname: '/detail',
      params: { id: String(id) }
    });
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, [router])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={{ top: 'maximum', bottom: 'off' }}>
      <FavoriteContainer goToDetail={goToDetailWithId} />
    </SafeAreaView>
  )
}

export default Favorites