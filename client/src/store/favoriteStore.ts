// Import the create function from Zustand and the persist middleware for state persistence
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

/**
 * Song interface defines the structure of a song object.
 */
export interface Song {
  id: string;
  name: string;
  images: { url: string }[];
  uri: string;
}

/**
 * FavoriteState interface defines the shape of the favorite store.
 * - favorites: An array holding the favorite songs.
 * - addFavorite: Function to add a song to the favorites.
 * - removeFavorite: Function to remove a song from the favorites using its id.
 */
interface FavoriteState {
  favorites: Song[];
  addFavorite: (song: Song) => void;
  removeFavorite: (songId: string) => void;
}

// Define the persist options type for the favorite store
type FavoritePersist = PersistOptions<FavoriteState>;

/**
 * useFavoriteStore is a global Zustand store with persistence.
 * It stores the user's favorite songs and provides functions to add or remove songs.
 * The state is persisted to localStorage under the key "favorite-store".
 */
export const useFavoriteStore = create<FavoriteState>()(
  persist<FavoriteState, [], FavoritePersist>(
    (set) => ({
      // Initialize favorites as an empty array
      favorites: [],
      // Adds a song to the favorites array
      addFavorite: (song: Song) =>
        set((state) => ({
          favorites: [...state.favorites, song],
        })),
      // Removes a song from the favorites array by filtering out the song with the given id
      removeFavorite: (songId: string) =>
        set((state) => ({
          favorites: state.favorites.filter((song) => song.id !== songId),
        })),
    }),
    {
      // Name of the key used in localStorage for persistence
      name: "favorite-store",
    }
  )
);
