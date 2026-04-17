import { TextInput, View } from "react-native"
import { Ionicons } from "@expo/vector-icons";

type SearchBarProps = {
    value: string
    onChangeText: (_: string) => void
}

export const SearchBar = ({value, onChangeText}: SearchBarProps) => {
    return <View style={{ paddingHorizontal: 24, paddingVertical: 8 }}>
        <View style={{
            borderWidth: 1, borderRadius: 5, shadowColor: '#000',
            alignItems: 'center',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 3,
        }}>
            <View style={{ gap: 8, padding: 8, flexDirection: 'row' }}>
                <Ionicons accessible={false} name={"search"} size={18} color="black" />
                <TextInput
                    accessibilityRole="search"
                    accessibilityLabel="Rechercher un magasin"
                    accessibilityHint="Tapez le nom d'un magasin pour filtrer la liste"
                    placeholder="Rechercher..."
                    value={value} onChangeText={onChangeText}
                    style={{ fontSize: 16, flex: 1 }} />
            </View>
        </View>
    </View>
}