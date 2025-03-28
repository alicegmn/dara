// Import necessary components and hooks from the project and external libraries
import SongItem from "@/components/ui/SongItem";
import { NavLink } from "react-router-dom";
import { useFavoriteStore, Song } from "@/store/favoriteStore";
import { usePlayerStore } from "@/store/playerStore";

// Favorites component displays the user's favorite songs in a list.
// It fetches the favorite songs from the global Zustand store and provides
// playback functionality via the player store.
export default function Favorites() {
  // Retrieve the list of favorite songs from the global favorite store.
  // Use a fallback empty array if the store value is undefined.
  const favorites = useFavoriteStore((state) => state.favorites) ?? [];

  // Retrieve functions from the player store to control track playback.
  const setTrackUri = usePlayerStore((state) => state.setTrackUri);
  const togglePlay = usePlayerStore((state) => state.togglePlay);

  // Handler to update the current track URI in the player store, which initiates playback.
  const handlePlayTrack = (uri: string) => {
    setTrackUri(uri);
  };

  return (
    <div className="p-4">
      {/* Header for the Favorites page */}
      <h2 className="text-3xl font-bold mb-4 text-center text-heading">
        Your Favorite Songs
      </h2>
      {/* Conditional rendering: If no favorite songs exist, display a message with a link to the home page.
          Otherwise, render a list of favorite songs using the SongItem component. */}
      {favorites.length === 0 ? (
        <p className="text-text text-center">
          Go{" "}
          <NavLink to="/" className="font-bold underline">
            find your favorite songs
          </NavLink>{" "}
          to view them in this list!
        </p>
      ) : (
        <ul>
          {favorites.map((song: Song) => (
            // Render each favorite song as a SongItem.
            // Pass necessary props including the song object and playback handlers.
            <SongItem
              key={song.id}
              song={song}
              handlePlayTrack={handlePlayTrack}
              togglePlay={togglePlay}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
