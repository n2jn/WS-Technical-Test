import { Store } from "../../types/store";
import {  Image, Platform, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { MAP_HEIGHT, styles } from "./detail.style";
import { DetailHeader } from "../../components/DetailHeader";
import { OpeningHourCard } from "../../components/OpeningHourCard";
import { Map } from "../../components/Map";

type DetailScreenProps = {
  store: Store
  isFavorite: boolean
  onFavoritePress: () => void
}

export const DetailScreen = ({ store, onFavoritePress, isFavorite }: DetailScreenProps) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const mapStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, MAP_HEIGHT * 0.6],
      [1, 0],
      Extrapolation.CLAMP
    ),
    transform: [{
      translateY: interpolate(
        scrollY.value,
        [0, MAP_HEIGHT],
        [0, -MAP_HEIGHT / 2],
        Extrapolation.CLAMP
      ),
    }],
  }));


  return (
    <>
      <Animated.View style={[styles.mapContainer, mapStyle]}
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel={`Détail du magasin ${store.name}`}
      >
        {Platform.OS === 'web' ?
          <Image source={{uri: store.imageUrl}} resizeMode="cover" style={{height: MAP_HEIGHT, width: "100%"}}/>
          :
          <Map latitude={store.latitude} longitude={store.longitude}/>
        }
        <LinearGradient
          colors={['rgba(247, 245, 240, 0)', 'rgba(247, 245, 240, 1)']}
          style={styles.gradient}
        />
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={StyleSheet.absoluteFill}
        contentContainerStyle={{ marginTop: MAP_HEIGHT, flexGrow: 1 }}
      >
        <DetailHeader
          title={store.name}
          sub={store.address}
          onIconPress={onFavoritePress}
          icon={isFavorite ? 'star' : 'star-outline'}
        />

        <OpeningHourCard
          title={"Horaires d\'ouverture"}
          openingHours={store.openingHours}
        />
      </Animated.ScrollView>
    </>
  );
};

