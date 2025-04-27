# Dara Music App

A modern music application built with the Spotify API, focused on real-time search, favorites management, and user-friendly navigation.

Made by:[alicegmn](https://github.com/alicegmn), [AntonAthley](https://github.com/AntonAthley), [TheUnseenBug](https://github.com/TheUnseenBug) & [Rhibro](https://github.com/Rhibro).

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Main Components](#main-components)
- [State Management](#state-management)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Installation](#installation)
- [Development](#development)
- [Future Improvements](#future-improvements)

---

## Overview

Dara Music App allows users to authenticate with Spotify, search for artists and tracks, manage a list of favorites, and navigate through their top music selections seamlessly.

---

## Features

- Spotify OAuth authentication
- Real-time, debounced search
- Top artists and top tracks display
- Add/remove favorite songs (persisted in localStorage)
- Responsive, accessible UI with Tailwind CSS
- Error handling for API requests
- Modular and scalable component structure

---

## Architecture

- **Frontend Framework:** React (with TypeScript)
- **Routing:** React Router
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Authentication:** Spotify OAuth 2.0
- **Persistence:** localStorage (for favorites)

---

## Main Components

### Pages

- **Home (`/src/pages/Home.tsx`)**  
  Handles authentication redirects, toggles between login and search views, and renders search results.

- **Favorites (`/src/pages/Favorites.tsx`)**  
  Displays the list of favorited tracks, retrieved from the global store.

- **Artist (`/src/pages/Artist.tsx`)**  
  Displays artist-specific information based on the selected artist.

- **SignIn (`/src/pages/SignIn.tsx`)**  
  Redirects users to Spotify’s login.

- **Reset (`/src/pages/Reset.tsx`)**  
  Optional page for resetting the app state.

- **NotFound (`/src/pages/NotFound.tsx`)**  
  Fallback 404 page for unmatched routes.

### Components

- **SearchBar (`/src/components/SearchBar.tsx`)**  
  Real-time search input with debounced API calls, displaying both artists and tracks separately.

- **SongItem (`/src/components/SongItem.tsx`)**  
  Displays individual song information and integrates the favorite button.

- **FavoriteButton (`/src/components/FavoriteButton.tsx`)**  
  Handles adding/removing tracks from favorites and updates the UI dynamically.

- **Header (`/src/components/layouts/Header.tsx`)**  
  Navigation bar with logo and logout functionality.

- **LogoutModal (`/src/components/layouts/LogoutModal.tsx`)**  
  Modal that confirms logout actions.

- **RootLayout (`/src/components/layouts/RootLayout.tsx`)**  
  Wraps all pages with shared layout elements like the header.

---

## State Management

- Zustand is used for managing:
  - Access tokens (authentication state)
  - Global favorites list (with persistence to localStorage)

> Favorite Store (`/src/store/favoriteStore.ts`)  
> Access Store (`/src/store/useAccessStore.ts`)

---

## Authentication

- OAuth 2.0 authentication flow with Spotify.
- Tokens are securely handled and stored in the application state.
- Automatic redirection after successful login.

---

## Error Handling

- Robust error management for API requests.
- Graceful fallbacks when no search results are found.
- User feedback in case of network or authentication errors.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/dara-music-app.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables for Spotify API credentials:

```bash
VITE_SPOTIFY_CLIENT_ID=your-client-id
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/
```

4. Start the development server:

```bash
npm run dev
```

---

## Development

To continue development:

- Make sure you have a valid Spotify Developer account and app.
- All components are modular and easy to extend.
- Project follows an agile development style with regular sprints and standups.

---

## Future Improvements

- **Playback Integration:**  
  [Get Information About the User’s Current Playback](https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback)

- **User Playlists:**  
  [Get a List of Current User's Playlists](https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists)

- **Featured Playlists:**  
  [Get Featured Playlists](https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists)

- **Personalized Recommendations:**  
  [Get Recommendations Based on Seeds](https://developer.spotify.com/documentation/web-api/reference/get-recommendations)

---

## User Flow

1. The user logs in via Spotify.
2. Upon successful authentication, the user lands on the Home page.
3. Home page displays two lists:
   - **Top Artists:**
     - Scrollable list, clickable artists leading to the Artist Page.
   - **Top Tracks:**
     - Scrollable list, clickable tracks redirecting to Spotify for playback.
4. Users can favorite tracks, which are saved across sessions.
5. Users can log out via the Header.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

# 🚀 Happy Coding!
