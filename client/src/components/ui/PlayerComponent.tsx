import useSpotifyPlayer from "@/hooks/useSpotifyPlayer";
import { Slider } from "@radix-ui/react-slider";
import {
  PreviousButton,
  PlayButton,
  PauseButton,
  NextButton,
} from "./PlayerButtons";

const PlayerComponent = () => {
  const { currentTrack, handlePlayPause, handleNextTrack, handlePrevTrack } =
    useSpotifyPlayer();

  return (
    <div className="player-container fixed bottom-2 p-6 flex self-center justify-center rounded-md border-4 border-black bg-colors-customGreen lg:right-2">
      {currentTrack ? (
        <div className="flex items-stretch gap-3 self-center bg-colors-customYellow border-4 border-black rounded-md p-4">
          <img
            src={currentTrack.album.images[0]?.url}
            alt="Album Cover"
            className="rounded-md border-4 border-black w-1/3 self-center object-cover"
          />
          <div className="rounded-md border-4 border-black w-2/3 p-4 bg-colors-customPink text-left">
            <h2 className="text-1xl text-strong">{currentTrack.name}</h2>
            <h3 className="text-xl">
              {currentTrack.artists.map((artist) => artist.name).join(", ")}
            </h3>
            <p>{currentTrack.album.name}</p>
            <Slider
              min={0}
              max={currentTrack.duration_ms}
              defaultValue={[1]}
              step={1}
              className="w-full"
              aria-label="Volume"
            />
            <div className="flex gap-3 justify-center mt-4">
              <PreviousButton onClick={handlePrevTrack} />
              {/*
                Beroende på applikationens state kan du välja mellan Play och Pause-knappar,
                här antas att handlePlayPause hanterar växling.
              */}
              <PlayButton onClick={handlePlayPause} />
              <PauseButton onClick={handlePlayPause} />
              <NextButton onClick={handleNextTrack} />
            </div>
          </div>
        </div>
      ) : (
        <p>No song is playing at the moment :(</p>
      )}
    </div>
  );
};

export default PlayerComponent;
