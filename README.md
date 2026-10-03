# HBDb

A personal film site for searching films, comparing their ratings, rating them yourself and keeping a watchlist.

**Status:** abandoned. Last worked on in December 2024, not deployed anywhere, kept for reference.

![HBDb sign-in screen with the poster carousel](docs/images/login.png)

<sub>Screenshots use the built-in demo mode: the films and poster art are made up.</sub>

## Why it exists

Looking up a film usually means checking several sites: one for the details, others for what critics and audiences thought, and another to remember what you wanted to watch. HBDb was my attempt to put those on one page, behind a login, for me and a few people I'd give access to.

## What it does

- Searches films as you type, using [TMDB](https://www.themoviedb.org/).
- Shows a film's details with its IMDb, Letterboxd and Rotten Tomatoes ratings side by side, a trailer, and a row of similar films on flip cards.
- Lets you rate a film in half-stars and add it to or remove it from your watchlist.
- Lists your watchlist and your rated films ("History") with posters, runtimes and your ratings.
- Has a sign-in screen with request-access and password-reset forms, a light/dark toggle and an animated poster carousel.

The "Films" and "TV" tabs are placeholders; TV shows were planned but never built.

| Watch list | History |
| --- | --- |
| ![Watch list](docs/images/watchlist.png) | ![History of rated films](docs/images/history.png) |

## Technical highlights

- **No film database of its own.** Watchlist and ratings are stored in a TMDB account through TMDB's API, so the app only has to manage users.
- **Separate backend for accounts.** A small Express service ([HBDb-WS](https://github.com/BowerHarry/HBDb-WS)) handles login against Firestore, access requests by email, and a password-reset flow using single-use tokens that are stored hashed and expire after 24 hours.
- **Looping carousel as a custom hook.** `usePosterAnimation` gives the sign-in poster slider an endless loop by appending a copy of the first poster and jumping back with the transition switched off, and it restarts the auto-advance timer and blocks clicks while a slide is in motion.
- **Three rating sources on one page.** Ratings from IMDb, Letterboxd and Rotten Tomatoes are fetched per film through [MDBList](https://mdblist.com/) and shown next to TMDB's details.

**Stack:** React 18, Vite 5, MUI Joy and Material UI, a mix of JSX and TypeScript; Node/Express, Firestore and Nodemailer on the backend.

---

## For developers

### Requirements

- Node.js 18 or newer, and npm
- For anything beyond demo mode:
  - a running copy of the [HBDb-WS](https://github.com/BowerHarry/HBDb-WS) backend, with a user account in its Firestore `users` collection
  - API credentials for TMDB, MDBList and the YouTube Data API

### Run it in demo mode

Demo mode needs no backend and no API keys. It answers the app's network requests with a dozen fictional films and generated posters, and keeps rating and watchlist changes in memory until you reload.

```bash
git clone https://github.com/BowerHarry/HBDb.git
cd HBDb
npm install
VITE_DEMO=1 npm run dev
```

Open the `http://localhost:5173` address Vite prints and sign in with any username and password. Trailer playback is switched off in demo mode.

Demo mode only exists on the dev server. The code lives in `src/demo/` and is left out of production builds. It was added in 2026 with an AI coding agent to make the screenshots above.

### Run it against the backend

```bash
npm install
npm run dev
```

This serves the app over HTTPS using a locally trusted certificate from `vite-plugin-mkcert`, which may ask for your password the first time to install its certificate authority.

The backend address is set at the top of `helper-functions.js`: `liveService = true` points at the App Engine deployment (no longer running), `false` at `http://localhost:8080`.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server, reachable on your local network |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Serve the built app |
| `npm run lint` | Run ESLint |

### Project structure

```
index.html
helper-functions.js        backend URL, request helpers, SHA-256 helper
src/
  main.jsx                 entry point; renders Login
  Login.tsx                sign-in screen; renders App once signed in
  App.jsx                  tab layout: Watch List, History, Films, TV, Search
  hooks/usePosterAnimation.ts
  styles/login.styles.ts
  components/
    login/                 sign-in, request-access and reset-password forms
    search/                search bar, results, film details, similar films
    watchlist/             watchlist tab
    history/               rated films tab
    films/                 placeholder
  demo/                    demo mode: mock data, request mocks, poster generator
bin/                       logo images used in the UI
```

How the pieces talk to each other:

```
Browser (this repo)
  ├── HBDb-WS backend ── Firestore (users, reset tokens), email
  ├── TMDB API ───────── search, film details, similar films, watchlist, ratings
  ├── MDBList API ────── IMDb / Letterboxd / Rotten Tomatoes ratings
  └── YouTube Data API ─ trailer lookup
```

### Known limitations

- Not deployed, and the hosted backend is offline, so outside demo mode you need to run HBDb-WS yourself.
- The "Films" and "TV" tabs are placeholders.
- Search only returns English-language films, and only matches lower-case input.
- Selecting a film in History switches to the Search tab but doesn't open that film.
- The request-access form on the sign-in screen doesn't submit anywhere yet; the backend has its own form at `/request`.
- The layout is built for desktop widths.

### Credits

- Film data, images, watchlist and rating storage: [TMDB](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.
- Aggregated ratings: [MDBList](https://mdblist.com/).
- Trailers: YouTube Data API.
- UI: [MUI](https://mui.com/) (Joy UI and Material UI), [react-icons](https://react-icons.github.io/react-icons/), [react-card-flip](https://github.com/AaronCCWong/react-card-flip).

### Licence

GPL-3.0. See [LICENSE](LICENSE).
