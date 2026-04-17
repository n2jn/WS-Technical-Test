import { createContext, useContext, useEffect, useState } from "react";
import { Store } from "../types/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = 'favorites';

interface FavoritesContextType {
    error: unknown
    favorites: Store[];
    isFavorite: (id: number) => boolean;
    removeFavorite: (id: number | string) => void
    toggleFavorite: (store: Store) => Promise<void>;
    loading: boolean;
  }

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null)


    useEffect(() => {
        loadFavorites();
      }, []);

    const isFavorite = (id: number) => favorites.some(f => f.id === id);

    const loadFavorites = async () => {
        try {
          setError(null)
          const stored = await AsyncStorage.getItem(STORAGE_KEY);
          if (stored) setFavorites(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to load favorites', e);
          setError(e)
        } finally {
          setLoading(false);
        }
      };

      const updateFavorites = async (updated: Store[]) => {
        try {
          setError(null)
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          setFavorites(updated);
        } catch (e) {
          setError(e)
          console.error('Failed to save favorites', e);
        }
      };


      const addFavorite = async (store: Store) => {
        if (isFavorite(store.id)) return;
        await updateFavorites([...favorites, store]);
      };
    
      const removeFavorite = async (id: number | string) => {
        await updateFavorites(favorites.filter(f => f.id !== id));
      };

      const toggleFavorite = async (store: Store) => {
        isFavorite(store.id)
          ? await removeFavorite(store.id)
          : await addFavorite(store);
      };


      return (
        <FavoritesContext.Provider value={{
          error,
          favorites,
          isFavorite,
          removeFavorite,
          toggleFavorite,
          loading,
        }}>
          {children}
        </FavoritesContext.Provider>
      );
}


export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error('useFavorites must be used inside FavoritesProvider');
    return context;
  };