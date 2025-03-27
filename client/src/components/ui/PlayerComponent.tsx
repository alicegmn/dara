import { useEffect, useRef, useState } from "react";
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

  const [isExpanded, setIsExpanded] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const toggleExpand = (
    e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => {
    e?.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  // ✅ Focus trap & ESC for expanded player
  useEffect(() => {
    if (!isExpanded) return;

    const modal = modalRef.current;
    const focusableEls = modal?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstEl = focusableEls?.[0];
    const lastEl = focusableEls?.[focusableEls.length - 1];

    firstEl?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
      }

      if (e.key === "Tab" && focusableEls && firstEl && lastEl) {
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  // ⛔ Don't render if nothing is playing
  if (!currentTrack) return null;

  // ✅ Expanded player
  if (isExpanded) {
    return (
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 bg-container flex items-center justify-center p-4 overflow-auto"
        onClick={toggleExpand}
        role="dialog"
        aria-modal="true"
        aria-label="Expanded player"
      >
        <div
          className="relative bg-player border-4 border-border rounded-2xl p-6 max-w-[80vw] max-h-[80vh] w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(e);
            }}
            className="absolute top-4 right-4 text-text text-4xl focus:outline focus:outline-2 focus:outline-focus rounded-xl"
            aria-label="Close expanded player"
          >
            ✕
          </button>

          <div className="flex flex-col items-center gap-4">
            <img
              src={currentTrack.album.images[0]?.url}
              alt={`Album cover for ${currentTrack.name}`}
              className="w-3/5 rounded-2xl border-4 border-border"
            />
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold text-white text-center">
                {currentTrack.name}
              </h2>
              <h3 className="text-2xl text-white text-center">
                {currentTrack.artists.map((artist) => artist.name).join(", ")}
              </h3>
              <p className="text-text text-xl text-center">
                {currentTrack.album.name}
              </p>
            </div>
          </div>

          <div className="w-full mt-6 px-2">
            <Slider
              min={0}
              max={currentTrack.duration_ms}
              value={[progress]}
              step={1}
              className="w-full"
              aria-label="Track position"
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

  // ✅ Minimized player
  return (
    <div
      className="fixed bottom-0 w-screen bg-player border-t-4 p-6 border-border h-16 cursor-pointer"
      onClick={toggleExpand}
      role="button"
      tabIndex={0}
      aria-label="Expand player"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); // förhindra scroll vid space
          toggleExpand();
        }
      }}
    >
      <div className="flex items-center h-full px-4">
        <img
          src={currentTrack.album.images[0]?.url}
          alt={`Album cover for ${currentTrack.name}`}
          className="w-12 h-12 rounded-xl border-2 border-border mr-4"
        />
        <div className="text-text">
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
