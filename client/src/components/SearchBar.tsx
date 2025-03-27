import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import searchSpotify from "../helpers/searchSpotify";
import useAccessStore from "@/store/store";
import SongList from "./ui/SongList";
import ArtistList from "./ui/ArtistList";
// Importera spelarens store för att kunna styra uppspelning
import { usePlayerStore } from "@/store/playerStore";

interface SpotifyTrack {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
    // Om albumets namn finns kan det läggas till
    name: string;
    artists: { name: string }[];
    release_date: string;
    type: string;
  };
  artists: { name: string }[];
}

interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface SearchResults {
  tracks: {
    items: SpotifyTrack[];
  };
  artists: {
    items: SpotifyArtist[];
  };
}

type TabOption = "songs" | "artists" | "albums";

export default function SearchBar() {
  // State för sökterm, sökresultat, laddningsstatus och aktiv vy
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults>({
    tracks: { items: [] },
    artists: { items: [] },
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabOption>("songs");
  const accessToken = useAccessStore().accessToken;

  // Hämta funktioner från spelarens store
  const setTrackUri = usePlayerStore((state) => state.setTrackUri);
  const togglePlay = usePlayerStore((state) => state.togglePlay);

  // Funktion för att spela en låt via den inbyggda spelaren
  const handlePlayTrack = (uri: string) => {
    setTrackUri(uri);
  };

  // Sök med fördröjning när användaren skriver
  useEffect(() => {
    // Om söktermen är tom, återställ state och sluta
    if (!searchTerm) {
      setSearchResults({ tracks: { items: [] }, artists: { items: [] } });
      setLoading(false);
      return;
    }

    // Visa laddningsindikator direkt när användaren skriver
    setLoading(true);

    const delayDebounceFn = setTimeout(() => {
      async function performSearch() {
        if (accessToken) {
          try {
            const results = await searchSpotify(searchTerm, accessToken);
            setSearchResults(results);
          } catch (error) {
            console.error("Error during search:", error);
            setSearchResults({ tracks: { items: [] }, artists: { items: [] } });
          }
        } else {
          setSearchResults({ tracks: { items: [] }, artists: { items: [] } });
        }
        setLoading(false);
      }
      performSearch();
    }, 500); // 500ms fördröjning

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, accessToken]);

  // Formatera spårsresultaten för Songs
  const formattedSongs = searchResults.tracks.items.map((track) => ({
    id: track.id,
    name: track.name,
    images: track.album.images,
    uri: `spotify:track:${track.id}`, // Korrekt formaterat Spotify URI för uppspelning
  }));

  // Formatera artistresultaten för Artists
  const formattedArtists = searchResults.artists.items.map((artist) => ({
    id: artist.id,
    name: artist.name,
    images: artist.images,
  }));

  // Extrahera unika album från spårsresultaten för Albums-vyn
  const formattedAlbums = (() => {
    const albumMap = new Map<
      string,
      {
        id: string;
        name: string;
        images: { url: string }[];
        artists: { name: string }[];
      }
    >();
    searchResults.tracks.items.forEach((track) => {
      // Använder albumets första bild URL som unik nyckel om inget album-id finns
      const key = track.album.images[0]?.url;
      if (key && !albumMap.has(key)) {
        albumMap.set(key, {
          id: track.id, // Om det fanns ett album-id skulle du använda det här
          name: track.album.name || track.name, // Prioritera albumets namn om tillgängligt
          images: track.album.images,
          artists: track.album.artists, // Lägg till albumets artister
        });
      }
    });
    return Array.from(albumMap.values());
  })();

  // Hjälpfunktion för att rendera resultat beroende på vald flik
  function renderResults() {
    if (loading) {
      return (
        <p className="text-text text-2xl mt-4">
          "Loading vibes... please hold the groove!"
        </p>
      );
    }

    switch (activeTab) {
      case "songs":
        return (
          <SongList
            songs={formattedSongs}
            handlePlayTrack={handlePlayTrack}
            togglePlay={togglePlay}
          />
        );
      case "artists":
        return <ArtistList artists={formattedArtists} />;
      case "albums":
        return (
          <div className="w-full">
            {formattedAlbums.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formattedAlbums.map((album) => (
                  <div
                    key={album.id}
                    className="rounded-2xl border-4 border-border bg-card p-4 hover:bg-hoveredButton"
                  >
                    {album.images[0] && (
                      <img
                        src={album.images[0].url}
                        alt={album.name}
                        className="w-full h-auto rounded-2xl"
                      />
                    )}
                    <h3 className="text-text font-bold mt-2">{album.name}</h3>
                    <div className="artist-names mt-1">
                      {album.artists &&
                        album.artists.map((artist, index) => (
                          <p key={index} className="text-text">
                            {artist.name}
                          </p>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text">No albums found.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  }

  // Meny för att välja vilken vy som ska visas
  const tabs: { key: TabOption; label: string }[] = [
    { key: "songs", label: "Songs" },
    { key: "albums", label: "Albums" },
    { key: "artists", label: "Artists" },
  ];

  return (
    <div className="rounded-2xl border-4 border-border bg-container m-4 p-4 sm:w-full md:w-1/2 lg:w-1/3 h-[70vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-y-auto">
      <div className="w-full">
        <div className="flex justify-center w-full px-4">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="placeholder:text-text text-text mt-5 w-full sm:w-full md:w-[calc(100%-2rem)] lg:w-[calc(66.67%-2rem)]"
          />
        </div>
        {/* Toggle-meny */}
        {searchTerm && (
          <div className="flex justify-center gap-8 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-2xl border-4 transition-colors ${
                  activeTab === tab.key
                    ? "bg-button text-text font-medium border-border border-4"
                    : "bg-activeButton text-hoveredButton border-none hover:bg-hoveredButton"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Resultatcontainer */}
        {searchTerm && (
          <div className="p-2 flex flex-col items-center mt-4 w-full">
            {renderResults()}
          </div>
        )}
      </div>
    </div>
  );
}
