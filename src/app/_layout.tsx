import { Stack, useRouter } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '../provider/FavoriteProvider';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="index"/>
          <Stack.Screen name="(tabs)"/>
          <Stack.Screen
            name="detail"
            options={{
              presentation: 'modal',
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerLeft: () => null,
              headerRight: () => {
                const router = useRouter();
                return (
                  <Pressable accessible onPress={() => router.back()}>
                    <View style={{padding: 8}}>
                      <Ionicons name="close" size={24} color="black" />
                    </View>
                  </Pressable>
                );
              }
            }}
          />
        </Stack>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}