import {  FlatListProps } from "react-native"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import * as Haptics from 'expo-haptics';
import { useCallback } from "react";

type OptimizedListProps<T extends { id: string | number } > = Pick<FlatListProps<T>, 'renderItem' | 'data' | 'onEndReached' | 'getItemLayout' | 'ListEmptyComponent' | 'style' | 'contentContainerStyle' | 'accessibilityLabel' >

export const OptimizedList = <T extends { id: string | number }>({data, renderItem, getItemLayout, onEndReached, ListEmptyComponent, style, contentContainerStyle, accessibilityLabel}: OptimizedListProps<T>) => {
    const scrollY = useSharedValue(0);
    const lastCheckpoint = useSharedValue(0);
    const CHECKPOINT_INTERVAL = 208; // size of storeItem + gap should calculate dynamically with getItemLayout

    const triggerHaptic = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }, []);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;

            const currentCheckpoint = Math.floor(
                event.contentOffset.y / CHECKPOINT_INTERVAL
            );

            if (currentCheckpoint !== lastCheckpoint.value) {
                lastCheckpoint.value = currentCheckpoint;
                scheduleOnRN(triggerHaptic);
            }
        },
    });

    return  <Animated.FlatList
    accessible={true}
    accessibilityRole="list"
    accessibilityLabel={accessibilityLabel}
    data={data}
    renderItem={renderItem}
    style={style}
    contentContainerStyle={contentContainerStyle}
    keyExtractor={item => item.id.toString()}
    getItemLayout={getItemLayout}
    onEndReached={onEndReached}
    onEndReachedThreshold={0.7}
    windowSize={3}
    initialNumToRender={10}
    maxToRenderPerBatch={5}
    updateCellsBatchingPeriod={50}
    removeClippedSubviews={true}
    ListEmptyComponent={ListEmptyComponent}
    onScroll={scrollHandler}
    scrollEventThrottle={16}
/>
}