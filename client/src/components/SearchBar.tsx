import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import searchSpotify from "../helpers/searchSpotify";
import useAccessStore from "@/store/store";
import SongList from "./ui/SongList";
import ArtistList from "./ui/ArtistList";

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
      { id: string; name: string; images: { url: string }[] }
    >();
    searchResults.tracks.items.forEach((track) => {
      // Använder albumets första bild URL som unik nyckel om inget album-id finns
      const key = track.album.images[0]?.url;
      if (key && !albumMap.has(key)) {
        albumMap.set(key, {
          id: track.id, // Om det fanns ett album-id skulle du använda det här
          name: track.album.name || track.name, // Prioritera albumets namn om tillgängligt
          images: track.album.images,
        });
      }
    });
    return Array.from(albumMap.values());
  })();

  // Hjälpfunktion för att rendera resultat beroende på vald flik
  function renderResults() {
    if (loading) {
      return (
        <p className="text-white text-2xl mt-4">
          "Loading vibes... please hold the groove!"
        </p>
      );
    }

    switch (activeTab) {
      case "songs":
        return <SongList songs={formattedSongs} />;
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
                    className="rounded-md border-4 border-black bg-colors-customBlue p-4"
                  >
                    {album.images[0] && (
                      <img
                        src={album.images[0].url}
                        alt={album.name}
                        className="w-full h-auto rounded-md"
                      />
                    )}
                    <h3 className="text-white font-bold mt-2">{album.name}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white">No albums found.</p>
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
    <div className="w-full">
      <div className="flex justify-center w-full px-4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="placeholder:text-white text-white mt-5 w-full sm:w-full md:w-[calc(100%-2rem)] lg:w-[calc(66.67%-2rem)]"
        />
      </div>
      {/* Toggle-meny */}
      {searchTerm && (
        <div className="flex justify-center gap-4 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md border transition-colors ${
                activeTab === tab.key
                  ? "bg-colors-customPink text-black font-medium border-black border-4"
                  : "bg-transparent text-white hover:bg-colors-customPink"
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
  );
}
