// Import React and its useState hook
import React, { useState } from "react";
// Import the access token store from the global store
import useAccessStore from "@/store/store";
// Import the favorite store and the Song type definition
import { useFavoriteStore, Song } from "@/store/favoriteStore";

/**
 * Props for the FavoriteButton component.
 * - song: The Song object to be favorited or unfavorited.
 * - onClick: Optional event handler to stop event propagation.
 */
interface FavoriteButtonProps {
  song: Song;
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * FavoriteButton component allows the user to add or remove a song from favorites.
 * It interacts with Spotify API to update the user's favorites and updates the global favorite store.
 */
const FavoriteButton: React.FC<FavoriteButtonProps> = ({ song, onClick }) => {
  // Retrieve the access token from the global store
  const accessToken = useAccessStore().accessToken;
  // Retrieve the current list of favorite songs from the favorite store
  const favorites = useFavoriteStore((state) => state.favorites);
  // Retrieve the functions to add and remove a song from favorites
  const addFavorite = useFavoriteStore((state) => state.addFavorite);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);
  // Local state to manage the loading state of the button
  const [isLoading, setIsLoading] = useState(false);

  // Check if the song is already in the favorites list based on its id
  const isFavorited = favorites.some((fav) => fav.id === song.id);

  /**
   * Toggles the favorite status of the song.
   * If the song is not favorited, it sends a PUT request to add it to favorites.
   * If it is already favorited, it sends a DELETE request to remove it.
   * @param e - MouseEvent for potential event propagation control.
   */
  const toggleFavorite = async (e: React.MouseEvent) => {
    // Invoke the onClick handler to stop propagation if provided
    onClick && onClick(e);
    setIsLoading(true);
    if (!isFavorited) {
      // If the song is not in favorites, add it via a PUT request
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/tracks?ids=${song.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          // Update the global favorite store with the new song
          addFavorite(song);
          console.log("Song added to favorites!");
        } else {
          console.error("Error adding song to favorites:", response);
        }
      } catch (error) {
        console.error("Error adding track to favorites:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // If the song is already in favorites, remove it via a DELETE request
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/tracks?ids=${song.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          // Update the global favorite store by removing the song
          removeFavorite(song.id);
          console.log("Song removed from favorites!");
        } else {
          console.error("Error removing song from favorites:", response);
        }
      } catch (error) {
        console.error("Error removing track from favorites:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`px-2 py-1 text-md rounded text-black ${
        // Apply different background colors based on favorite status
        isFavorited ? "bg-favorite " : "bg-activeFavorite"
      }`}
    >
      {/* Show loading text while processing, otherwise show appropriate label */}
      {isLoading ? "Processing..." : isFavorited ? "Unfavorite" : "Favorite"}
    </button>
  );
};

export default FavoriteButton;
