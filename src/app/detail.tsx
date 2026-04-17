import { StackScreenProps } from "@react-navigation/stack";
import { DetailContainer } from "../screens/detail"
import { RootStackParamList } from "./_layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";

type DetailProps = StackScreenProps<RootStackParamList, 'Detail'>;

export const Detail = ({ route }: DetailProps) => {
    const params = route?.params
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={{ top: 'maximum', bottom: 'off' }}>
            <DetailContainer id={params.id} />
        </SafeAreaView>
    )
}