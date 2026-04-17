import { useRouter } from "expo-router";
import { useCallback } from "react";
import { HomeContainer } from "../../screens/home";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";
import * as Haptics from 'expo-haptics';

const Home = () => {
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
            <HomeContainer goToDetail={goToDetailWithId} />
        </SafeAreaView>
    )
}

export default Home