import { Text, View } from "react-native"
import { theme } from "../theme"

type EmptyProps = {
    title: string
    sub: string
}

export const Empty = ({sub, title}: EmptyProps) => {
    return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8}}>
    <Text style={[theme.typography.heading, { textAlign: 'center' }]}>
        {title}
    </Text>
    <Text style={[theme.typography.body, { textAlign: 'center' }]} >
        {sub}
    </Text>
</View>
}