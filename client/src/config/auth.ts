const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri =
  import.meta.env.VITE_REDIRECT_URI || "http://localhost:5173/";
const scope =
  "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-top-read";

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
  scope
)}`;
