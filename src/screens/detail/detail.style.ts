import { StyleSheet } from "react-native";

export const MAP_HEIGHT = 300;

export const styles = StyleSheet.create({
    mapContainer: {
      position: 'absolute',
      top: 0, left: 0, right: 0,
      height: MAP_HEIGHT,
    },
    gradient: {
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      height: 80,
    },
  });