import { useState } from "react";
import useSpotifyPlayer from "@/hooks/useSpotifyPlayer";
import { Slider } from "@radix-ui/react-slider";
import {
  PreviousButton,
  PlayButton,
  PauseButton,
  NextButton,
} from "./PlayerButtons";

const PlayerComponent = () => {
  const {
    currentTrack,
    isPlaying,
    handlePlayPause,
    handleNextTrack,
    handlePrevTrack,
  } = useSpotifyPlayer();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Toggle between expanded and minimized view
  const toggleExpand = (
    e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => {
    // If event exists, stop its propagation to avoid triggering other actions
    e?.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`rounded-md bg-colors-customGreen border-4 p-6 border-black transition-all duration-300 ${
        isExpanded ? "h-5/6" : "h-20"
      }`}
      onClick={toggleExpand}
    >
      {currentTrack ? (
        <>
          {/* Toggle Button: Arrow icon in top right corner */}
          <button
            onClick={(e) => toggleExpand(e)}
            className="absolute top-2 right-2 text-white text-7xl focus:outline-none"
          >
            {isExpanded ? "˯" : "˰"}
          </button>

          {/* Minimized view: Show only summary */}
          {!isExpanded && (
            <div className="flex items-center h-full px-4">
              <img
                src={currentTrack.album.images[0]?.url}
                alt="Album Cover"
                className="w-12 h-12 rounded-md border-2 border-black mr-4"
              />
              <div className="text-white">
                <p className="font-bold truncate">{currentTrack.name}</p>
                <p className="text-sm truncate">
                  {currentTrack.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </div>
          )}

          {/* Expanderad vy: Visa fulla kontroller och info */}
          {isExpanded && (
            <div className="p-4 bg-colors-customYellow border-4 border-black rounded-md flex flex-col items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={currentTrack.album.images[0]?.url}
                  alt="Album Cover"
                  className="w-5/6 rounded-md border-4 border-black"
                />
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold text-white">
                    {currentTrack.name}
                  </h2>
                  <h3 className="text-xl text-white">
                    {currentTrack.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                  </h3>
                  <p className="text-black">{currentTrack.album.name}</p>
                </div>
              </div>
              <div className="mt-4 w-full">
                <Slider
                  min={0}
                  max={currentTrack.duration_ms}
                  defaultValue={[1]}
                  step={1}
                  className="w-full"
                  aria-label="Spårposition"
                />
              </div>
              <div className="flex items-center gap-4 mt-4 justify-center">
                <PreviousButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevTrack();
                  }}
                />
                {isPlaying ? (
                  <PauseButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause();
                    }}
                  />
                ) : (
                  <PlayButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause();
                    }}
                  />
                )}
                <NextButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextTrack();
                  }}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-white">No song is playing at the moment :(</p>
        </div>
      )}
    </div>
  );
};

export default PlayerComponent;
