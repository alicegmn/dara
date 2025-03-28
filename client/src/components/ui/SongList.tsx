import SongItem from "../ui/SongItem";

interface Song {
  id: string;
  name: string;
  images: { url: string }[];
  uri: string;
}

interface SongListProps {
  songs: Song[];
  handlePlayTrack: (uri: string) => void;
  togglePlay: (play: boolean) => void;
}

export default function SongList({
  songs,
  handlePlayTrack,
  togglePlay,
}: SongListProps) {
  return (
    <ul className="mt-4">
      {songs.length > 0 ? (
        songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            handlePlayTrack={handlePlayTrack}
            togglePlay={togglePlay}
          />
        ))
      ) : (
        <p>No songs found.</p>
      )}
    </ul>
  );
}
