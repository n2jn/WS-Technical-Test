import { BlurView } from "expo-blur"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs"
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';

type TabButtonProps = {
    route: { name: string; key: string }
    isFocused: boolean
    onPress: (name: string, key: string, isFocused: boolean) => void
}

const TabButton = ({ route, isFocused, onPress }: TabButtonProps) => {
    let iconName: keyof typeof Ionicons.glyphMap = 'help-outline'
    if (route.name === 'home') {
        iconName = 'business-outline'
    } else if (route.name === 'favorites') {
        iconName = 'star-outline'
    }

    return (
        <TouchableOpacity
            key={route.key}
            onPress={() => onPress(route.name, route.key, isFocused)}
            style={styles.tabButton}
            activeOpacity={0.7}
        >
            <View style={{ opacity: isFocused ? 1 : 0.5 }}>
                <Ionicons accessible={false} name={iconName} size={28} color="black" />
            </View>
        </TouchableOpacity>
    )
}

export const TabBar = ({ state, navigation }: MaterialTopTabBarProps) => {

    return <View style={styles.tabBar}>
        <BlurView intensity={80} tint="systemThickMaterialLight" style={styles.blurContainer}>
            <View style={styles.tabsRow}>
            {state.routes.map((route, index) => {
            const isFocused = state.index === index

            const onPress = async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name)
              }
            }

            return (
              <TabButton key={route.key} route={route} isFocused={isFocused} onPress={onPress} />
            )
          })}
            </View>
        </BlurView>
    </View>
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 36,
        paddingHorizontal: 64,
        zIndex: 20,
    },
    blurContainer: {
        flexDirection: 'column',
        paddingHorizontal: 8,
        paddingVertical: 12,
        overflow: 'hidden',
        borderRadius: 20,
        position: 'relative',
    },
    tabsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
