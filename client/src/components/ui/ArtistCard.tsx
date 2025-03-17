import { FC } from "react";
import PlayerComponent from "../PlayerComponent";
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
      <Card className="bg-customBlue border-none text-white">
        <CardHeader>
          <CardContent className="flex justify-center">
            <img
              src={artist.image}
              alt={artist.name}
              className="max-w-[300px] rounded-full border-4 border-black"
            />
          </CardContent>
          <CardTitle className="text-4xl">{artist.name}</CardTitle>
        </CardHeader>
        <div className="rounded-md border-4 border-black bg-colors-customYellow m-4 p-4">
          <CardContent>
            <article className="flex flex-col gap-4">
              {artist.topTracks.map((track) => (
                <Card
                  key={track.uri}
                  onClick={() => {
                    handlePlayTrack(track.uri);
                    togglePlay(true);
                  }}
                  className="grid grid-cols-4 cursor-pointer hover:bg-white/60 hover:text-blue-500 rounded-lg overflow-hidden"
                >
                  {/* Album cover */}
                  <div className="col-span-1">
                    <img
                      src={track.album.image}
                      alt="Album image"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text content */}
                  <div className="col-span-3 p-4 flex flex-col justify-center gap-1">
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
        </div>
      </Card>
      <PlayerComponent />
    </section>
  );
};

export default ArtistCard;
