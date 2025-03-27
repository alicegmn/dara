import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import timeConverter from "@/helpers/timeConverter";
import { usePlayerStore } from "@/store/playerStore";

type Props = {
  artist: {
    name: string;
    popularity: number;
    external_urls: string;
    genres: string[];
    image: string;
    topTracks: {
      album: {
        image: string;
        name: string;
        release_date: string;
      };
      artists: { name: string }[];
      duration_ms: number;
      name: string;
      uri: string;
    }[];
  };
  handlePlayTrack: (uri: string) => void; // 🔹 Ta emot funktionen som en prop
};

const ArtistCard: FC<Props> = ({ artist, handlePlayTrack }) => {
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  return (
    <section className="w-3/4 max-w-4xl m-auto">
      <Card className="bg-container border-4 border-border text-text">
        <CardHeader>
          <CardContent className="flex justify-center">
            <img
              src={artist.image}
              alt={artist.name}
              className="max-w-[300px] rounded-full border-border border-4"
            />
          </CardContent>
          <CardTitle className="text-4xl text-center">{artist.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <article className="flex flex-col gap-4">
            {artist.topTracks.map((track) => (
              <Card
                key={track.uri}
                onClick={() => {
                  handlePlayTrack(track.uri);
                  togglePlay(true);
                }}
                className="grid grid-cols-6 cursor-pointer border-border border-4 hover:bg-hoveredButton rounded-2xl align-center"
              >
                {/* Album cover */}
                <div className="col-span-2 row-span-1">
                  <img
                    src={track.album.image}
                    alt="Album image"
                    className="justify-center rounded-2xl"
                  />
                </div>

                {/* Text content */}
                <div className="col-span-4 p-4 flex flex-col justify-center gap-1">
                  <CardTitle className="text-base font-semibold">
                    {track.name}
                  </CardTitle>
                  <CardDescription className="text-sm font-semibold">
                    Artist:{" "}
                    {Array.isArray(track.artists)
                      ? track.artists.map((artist) => artist.name).join(", ")
                      : "Unknown Artist"}
                  </CardDescription>
                  <CardDescription className="text-sm">
                    Album: {track.album.name}
                  </CardDescription>
                  <CardDescription className="text-sm">
                    Release Date: {track.album.release_date}
                  </CardDescription>
                  <CardDescription className="text-sm">
                    Duration: {timeConverter(track.duration_ms)}
                  </CardDescription>
                </div>
              </Card>
            ))}
          </article>
        </CardContent>
      </Card>
    </section>
  );
};

export default ArtistCard;
