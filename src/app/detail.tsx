import { useLocalSearchParams } from "expo-router";
import { DetailContainer } from "../screens/detail"
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";

export default function Detail() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={{ top: 'maximum', bottom: 'off' }}>
            <DetailContainer id={id} />
        </SafeAreaView>
    )
}