import { Pressable, View, StyleSheet, Text, Platform, Image } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { Store } from "../types/store";
import { memo, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";

export const STORE_ITEM_HEIGHT = 200;
export const IMAGE_HEIGHT = 130;

type StoreItemProps = {
    store: Store
    onPress: (id: string | number) => void
    onActionPress?: (id: string | number) => void
    isFavorite?: boolean
}

export const StoreItem = memo(({ store, onPress, onActionPress, isFavorite }: StoreItemProps) => {

    return <Pressable onPress={() => onPress(store.id)}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        accessibilityRole="button"
        accessibilityLabel={`${store.name}, ${store.address}`}
        accessibilityHint="Appuyez deux fois pour voir les détails">
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image source={{ uri: store.imageUrl }} resizeMode="cover" style={{ width: '100%', height: IMAGE_HEIGHT }} />
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.textContainer}>
                    <Text style={{ fontSize: 16, lineHeight: 16, fontWeight: 700 }}>
                        {store.name}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: 500, color: '#9A9590' }}>
                        {store.address}
                    </Text>
                </View>

                {!!isFavorite ? <Pressable onPress={() => onActionPress?.(store.id)}
                    accessibilityRole="button"
                    style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                    accessibilityLabel={`${store.name}, ${store.address}`}
                    accessibilityHint="Appuyez deux fois pour supprimer des favoris"
                >
                    <View style={{ backgroundColor: 'rgba(247, 0, 0, 0.04)', borderWidth: 1, borderColor: 'red', borderRadius: 8, padding: 4 }}>
                        <Ionicons accessible={false} name={'trash'} size={24} color="black" />
                    </View>
                </Pressable> : null}
            </View>
        </View>
    </Pressable>
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        height: STORE_ITEM_HEIGHT,
        overflow: 'hidden',
        shadowColor: "#000000",
        borderWidth: 1.5,
        borderColor: '#E8E4DC',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
    topContainer: {
        height: IMAGE_HEIGHT,
    },
    bottomContainer: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textContainer: {
        gap: 3
    },
    map: {
        height: '100%',
        width: "100%"
    },
    mapPlaceholder: {
        backgroundColor: '#f0f0f0',
    }
})