import { StyleSheet, Text, View } from "react-native";

export const Map = ({ style, children }: any) => {
    return (
        <View style={[styles.container, style]}>
          <Text style={styles.text}>🗺️ Map non disponible sur web</Text>
          {children}
        </View>
      );
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#E8EFF5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: '#9A9590',
      fontSize: 14,
    },
  });