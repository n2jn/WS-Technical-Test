import { Ionicons } from "@expo/vector-icons"
import { Pressable, Text, View } from "react-native"

type DetailHeaderProps = {
  title: string
  sub: string
  onIconPress: () => void
  icon: "star" | "star-outline"
}

export const DetailHeader = ({ onIconPress, icon, title, sub }: DetailHeaderProps) => {
  return (
    <View style={{ backgroundColor: '#F7F5F0', borderRadius: 24, paddingHorizontal: 24, paddingVertical: 16, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ gap: 2, flexGrow: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: '900' }}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 2 }}>
          <Ionicons accessible={false} name="pin" size={14} color="black" />
          <Text style={{ fontSize: 12, color: '#9A9590', lineHeight: 18 }}>{sub}</Text>
        </View>
      </View>
      <Pressable onPress={onIconPress}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Ajouter ${title} aux favoris`}
        accessibilityHint="Appuyez deux fois pour ajouter ce magasin à vos favoris"
        accessibilityState={{ selected: icon === 'star' ? true : false }}>
        <View style={{ backgroundColor: 'rgba(247, 0, 0, 0.04)', borderWidth: 1, borderColor: 'red', borderRadius: 8, padding: 8 }}>
          <Ionicons accessible={false} name={icon} size={24} color="black" />
        </View>
      </Pressable>
    </View>

  )
}