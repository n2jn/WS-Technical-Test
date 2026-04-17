
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/app/_layout'
import { FavoritesProvider } from './src/provider/FavoriteProvider';
export default function App() {

  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <Navigator />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}

