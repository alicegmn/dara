import ArtistItem from "./ArtistItem";
import { Link } from "react-router";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface ArtistListProps {
  artists: Artist[];
}

export default function ArtistList({ artists }: ArtistListProps) {
  return (
    <ul className="mt-4">
      {artists.length > 0 ? (
        artists.map((artist) => <ArtistItem key={artist.id} artist={artist} />)
      ) : (
        <Link to="ArtistPage">
          <p>No artists found.</p>
        </Link>
      )}
    </ul>
  );
}
