import { useEffect, useState } from "react";
import axios from "axios";
import { usePlayerStore } from "@/store/playerStore";
import useAccessStore from "@/store/store";
import { Track } from "@/types";

export default function useSpotifyPlayer() {
  const { accessToken } = useAccessStore();
  const { trackUri, isPlaying, deviceId, setDeviceId, togglePlay } =
    usePlayerStore();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>(
    undefined
  );

  // Spela upp låt när trackUri ändras
  useEffect(() => {
    if (!trackUri) return;
    async function playTrack() {
      try {
        await axios.put(
          "https://api.spotify.com/v1/me/player/play",
          {
            uris: [trackUri],
            device_id: deviceId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Playback started successfully.");
      } catch (error) {
        console.error("Error starting playback:", error);
      }
    }
    playTrack();
  }, [trackUri, deviceId, accessToken]);

  // Initiera Spotify SDK när accessToken finns
  useEffect(() => {
    if (!accessToken) return;

    const initializePlayer = () => {
      console.log("Spotify Web Playback SDK Ready!");
      const spotifyPlayer = new window.Spotify.Player({
        name: "My Custom Spotify Player",
        getOAuthToken: (cb) => cb(accessToken),
        volume: 0.5,
      });

      setPlayer(spotifyPlayer);

      spotifyPlayer.addListener("ready", ({ device_id }) => {
        console.log("✅ Spotify Player is ready with Device ID:", device_id);
        setDeviceId(device_id);
        axios
          .put(
            "https://api.spotify.com/v1/me/player",
            { device_ids: [device_id] },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .catch((error) => console.error("Error updating device:", error));
      });

      spotifyPlayer.addListener("player_state_changed", (state) => {
        if (!state) return;
        console.log("🎵 Now Playing:", state.track_window.current_track);
        setCurrentTrack(state.track_window.current_track);
      });

      spotifyPlayer.connect().then((success) => {
        if (success) {
          console.log("✅ Spotify Player connected!");
        } else {
          console.error("❌ Failed to connect to Spotify Player");
        }
      });
    };

    if (window.Spotify) {
      initializePlayer();
    } else {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      script.onload = () => initializePlayer();
      document.body.appendChild(script);
    }
  }, [accessToken, setDeviceId]);

  const handlePlayPause = async () => {
    if (!player) return;
    if (isPlaying) {
      try {
        await player.pause();
        togglePlay(false);
        console.log("Paused playback.");
      } catch (error) {
        console.error("Error pausing playback:", error);
      }
    } else {
      try {
        await player.resume();
        togglePlay(true);
        console.log("Resumed playback.");
      } catch (error) {
        console.error("Error resuming playback:", error);
      }
    }
  };

  const handleNextTrack = () => {
    player?.nextTrack();
  };

  const handlePrevTrack = () => {
    player?.previousTrack();
  };

  return {
    currentTrack,
    handlePlayPause,
    handleNextTrack,
    handlePrevTrack,
    player,
  };
}
