### ANTON

# Dara Music App - Komponentöversikt

## Huvudkomponenter

### Home (`/src/pages/Home.tsx`)

Applikationens startsida som hanterar:

- Spotify-autentisering via URL-parametrar
- Växling mellan inloggnings- och sökvy
- Rendering av sökfält och resultatlistor

### SearchBar (`/src/components/SearchBar.tsx`)

Sökkomponent som möjliggör:

- Realtidssökning i Spotify's API
- Debounced sökfunktionalitet (500ms fördröjning)
- Visar både artist- och låtresultat
- Formaterar och presenterar sökresultat i två separata listor

## Hjälpfunktioner

### searchSpotify (`/src/helpers/searchSpotify.ts`)

API-integrationsfunktion som:

- Hanterar sökningar mot Spotify's API
- Begränsar resultat till 5 artister och 5 låtar
- Inkluderar felhantering och typning av resultat

## Layout och Navigation

### Router (`/src/router/Router.tsx`)

Definierar applikationens routingstruktur med följande routes:

- `/` - Startsida
- `/Player` - Musikspelare
- `/SignIn` - Inloggningssida
- `/artist/:id` - Artistsida
- `/reset` - Återställningssida
- `*` - 404-sida

### RootLayout (`/src/components/layouts/RootLayout.tsx`)

Huvudlayout som:

- Omsluter alla sidor
- Innehåller gemensam header
- Hanterar rendering av aktiv route

### Header (`/src/components/layouts/Header.tsx`)

Navigationshuvud som innehåller:

- App-logotyp med länk till startsidan
- Utloggningsfunktionalitet
- Integration med LogoutModal

### LogoutModal (`/src/components/layouts/LogoutModal.tsx`)

Modal-komponent för utloggning som:

- Visar bekräftelsedialog
- Hanterar bekräftelse/avbryt-actions
- Stilren design med mörkt tema

## Tekniska Detaljer

### State Management

- Använder Zustand för global state management (`useAccessStore`)
- Hanterar access tokens och autentiseringsstatus

### Styling

- Använder Tailwind CSS för styling
- Konsekvent färgschema med anpassade färger
- Responsiv design med flex-layouts

### Autentisering

- Implementerar Spotify OAuth-flöde
- Hanterar access tokens säkert
- Automatisk omdirigering efter autentisering

### Felhantering

- Omfattande felhantering i API-anrop
- Fallback-states för misslyckade sökningar
- Tydlig användarfeedback

## Användning

1. Användaren loggar in via Spotify
2. Efter autentisering visas sökgränssnittet
3. Sökresultat uppdateras automatiskt medan användaren skriver
4. Användaren kan logga ut via header-menyn

## Utveckling

För att utveckla vidare på dessa komponenter:

1. Se till att ha nödvändiga miljövariabler för Spotify API
2. Installera beroenden med `npm install`
3. Kör utvecklingsservern med `npm run dev`

Features we want in the app using spotify API
Search: https://developer.spotify.com/documentation/web-api/reference/search

Play: https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback

Playlists: https://developer.spotify.com/documentation/web-api/reference/get-playlist, get playlists: https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists

Get featured playlists: https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists

Get recommendations; https://developer.spotify.com/documentation/web-api/reference/get-recommendations

## Home Page

Once a user has signed-in they are taken to the Home Page where two lists appear 'Top Artists' & 'Top Tracks'

### Top Artists

- This shows a list of the users top artists which they can scroll through, and click on the artist to take them to the Artist Page.
- UI/UX includes responsiveness, cursor-pointer, and a hover effect

### Top Tracks

- This shows a list of the users top songs which they can scroll through, and click on the song to take them to the Spotify App or browser page to play the song.
- UI/UX includes responsiveness, cursor-pointer, and a hover effect

# Favorite list (Alice)

Add or remove songs from favorites. It leverages Zustand for state management with persistence in localStorage.

## Key Components

- **Favorite Store (`favoriteStore.ts`):**

  - Manages a list of full song objects.
  - Uses Zustand with persist middleware to save state in localStorage.
  - Provides `addFavorite` and `removeFavorite` functions.

- **FavoriteButton Component (`FavoriteButton.tsx`):**

  - Toggles a song’s favorite status via Spotify API (PUT to add, DELETE to remove).
  - Dynamically changes appearance and text based on favorite status.
  - Prevents event propagation to avoid interfering with other click events.

- **SongItem Component (`SongItem.tsx`):**

  - Displays individual song details.
  - Integrates the FavoriteButton for quick favoriting/unfavoriting.
  - Supports song playback via the global player store.

- **Favorites Page (`Favorites.tsx`):**
  - Retrieves and displays the list of favorite songs from the global store.
  - Renders songs using the SongItem component.
  - Provides a navigation link back to the home page if no favorites are present.

## Workflow

1. **Adding a favorite:**  
   The user clicks the FavoriteButton, which sends a PUT request to Spotify. Upon success, the song is added to the global favorite store and persisted.

2. **Removing a favorite:**  
   If a song is already favorited, clicking the button sends a DELETE request to Spotify and removes the song from the global store.

3. **Displaying favorites:**  
   The Favorites page renders the list of favorite songs, allowing users to view and play their selected tracks.

This modular design ensures a seamless user experience with persistent favorite song management across sessions.
