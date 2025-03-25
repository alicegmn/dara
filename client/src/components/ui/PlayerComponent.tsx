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
    progress,
    handlePlayPause,
    handleNextTrack,
    handlePrevTrack,
  } = useSpotifyPlayer();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // If no track is playing, return null to not render the component
  if (!currentTrack) return null;

  // Toggle between expanded and minimized view
  const toggleExpand = (
    e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => {
    e?.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  // När expandad, rendera en fullskärms-overlay
  if (isExpanded && currentTrack) {
    return (
      <div
        className="fixed inset-0 z-50 bg-colors-customPink bg-opacity-95 flex items-center justify-center p-4 overflow-auto"
        onClick={toggleExpand} // Klicka utanför innehållet stänger expanderad vy
      >
        <div 
          className="relative bg-colors-customYellow border-4 border-black rounded-lg p-6 max-w-[90vw] max-h-[90vh] w-full mx-auto"
          onClick={(e) => e.stopPropagation()} // förhindrar att klick inom innehållet stänger overlayen
        >
          {/* Stäng-knapp */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(e);
            }}
            className="absolute top-4 right-4 text-white text-4xl focus:outline-none"
          >
            ✕
          </button>
          <div className="flex flex-col items-center gap-4">
            <img
              src={currentTrack.album.images[0]?.url}
              alt="Album Cover"
              className="w-full max-w-sm rounded-md border-4 border-black"
            />
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold text-white text-center">
                {currentTrack.name}
              </h2>
              <h3 className="text-2xl text-white text-center">
                {currentTrack.artists.map((artist) => artist.name).join(", ")}
              </h3>
              <p className="text-black text-xl text-center">{currentTrack.album.name}</p>
            </div>
          </div>
          <div className="w-full mt-6 px-2">
            <Slider
              min={0}
              max={currentTrack.duration_ms}
              value={[progress]}
              step={1}
              className="w-full"
              aria-label="Spårposition"
            />
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
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
      </div>
    );
  }

  // Standard view (minimized)
  return (
    <div
      className="fixed bottom-0 w-screen bg-colors-customGreen border-t-4 p-6 border-black h-16"
      onClick={toggleExpand}
    >
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
    </div>
  );
};

export default PlayerComponent;
