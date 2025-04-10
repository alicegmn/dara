import FavoriteButton from "../FavoriteButton";

interface Song {
  id: string;
  name: string;
  images: { url: string }[];
  uri: string;
  artists: string[];
}

interface SongItemProps {
  song: Song;
  handlePlayTrack: (uri: string) => void;
  togglePlay: (play: boolean) => void;
}

export default function SongItem({
  song,
  handlePlayTrack,
  togglePlay,
}: SongItemProps) {
  const onClick = () => {
    handlePlayTrack(song.uri);
    togglePlay(true);
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <li
      className="flex justify-between p-2 gap-6 m-2 border-4 border-border rounded-2xl cursor-pointer bg-card hover:text-hoveredButton"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {song.images.length > 0 && (
          <img
            src={song.images[0].url}
            alt={song.name}
            className="w-12 h-12 rounded-full"
          />
        )}

        <p className="font-semibold">{song.name}</p>
      </div>
      <FavoriteButton song={song} onClick={stopPropagation} />
    </li>
  );
}
