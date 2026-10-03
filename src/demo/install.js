// Demo mode: run the app with no backend and no API keys.
//   VITE_DEMO=1 npm run dev
// Replaces fetch/axios responses with the fictional films in films.js and keeps
// watchlist/rating changes in memory. Only active on the dev server; the guard
// below is statically false in production builds, so none of this is bundled.
import axios from 'axios';
import { films, initialWatchlist, initialRatings } from './films.js';

if (import.meta.env.DEV && import.meta.env.VITE_DEMO === '1') {
  const watchlist = new Set(initialWatchlist);
  const ratings = new Map(Object.entries(initialRatings).map(([id, value]) => [Number(id), value]));

  const byId = (id) => films.find((film) => film.id === Number(id));
  const summary = (film) => ({
    id: film.id,
    title: film.title,
    original_language: 'en',
    release_date: film.release_date,
    overview: film.overview,
    popularity: film.popularity,
    poster_path: `/${film.id}`,
  });
  const details = (film) => ({
    ...summary(film),
    imdb_id: film.imdb_id,
    runtime: film.runtime,
    genres: film.genres.map((name, id) => ({ id, name })),
  });
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

  function tmdb(path, query, method, body) {
    let match;
    if (path === '/3/configuration') return { images: { base_url: '/demo-posters' } };
    if (path === '/3/search/movie') {
      const q = (query.get('query') || '').toLowerCase();
      return { results: q ? films.filter((film) => film.title.toLowerCase().includes(q)).map(summary) : [] };
    }
    if (/^\/3\/account\/\d+\/watchlist\/movies$/.test(path)) {
      return { results: [...watchlist].map(byId).map(summary) };
    }
    if (/^\/3\/account\/\d+\/rated\/movies$/.test(path)) {
      return { results: [...ratings.keys()].map(byId).map(summary) };
    }
    if (/^\/3\/account\/\d+\/watchlist$/.test(path)) {
      if (body.watchlist) watchlist.add(body.media_id);
      else watchlist.delete(body.media_id);
      return { success: true };
    }
    if ((match = /^\/3\/movie\/(\d+)\/account_states$/.exec(path))) {
      const id = Number(match[1]);
      return { id, rated: ratings.has(id) ? { value: ratings.get(id) } : false, watchlist: watchlist.has(id) };
    }
    if ((match = /^\/3\/movie\/(\d+)\/rating$/.exec(path))) {
      if (method === 'DELETE') ratings.delete(Number(match[1]));
      else ratings.set(Number(match[1]), body.value);
      return { success: true };
    }
    if ((match = /^\/3\/movie\/(\d+)\/similar$/.exec(path))) {
      return { results: films.filter((film) => film.id !== Number(match[1])).map(summary) };
    }
    if ((match = /^\/3\/movie\/(\d+)$/.exec(path))) return details(byId(match[1]));
    return {};
  }

  const realFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url, window.location.href);
    const method = (init.method || 'GET').toUpperCase();
    const body = typeof init.body === 'string' ? JSON.parse(init.body) : {};

    if (url.pathname === '/tmdb/movies/posters') {
      return json(films.map((film) => `/demo-posters/w780/${film.id}.jpg`));
    }
    if (url.hostname === 'api.themoviedb.org') return json(tmdb(url.pathname, url.searchParams, method, body));
    if (url.hostname === 'mdblist.com') {
      const provider = url.pathname.split('/').pop();
      const film = films.find((f) => f.imdb_id === body.ids[0]);
      return json({ rating: { [film.imdb_id]: film.ratings[provider] } });
    }
    if (url.hostname === 'www.googleapis.com') return json({ items: [{ id: { videoId: 'demo' } }] });
    if (url.hostname === 'example.com') return new Response('<title>OK</title>');
    return realFetch(input, init);
  };

  // Login.tsx talks to the backend through axios. Any username/password signs in.
  axios.defaults.adapter = async (config) => {
    const data = config.url.endsWith('/login') ? { username: 'demo', tmdbAPIKey: 'demo', active: true } : {};
    return { data, status: 200, statusText: 'OK', headers: {}, config };
  };

  // Demo mode never loads third-party iframes; show a placeholder instead.
  const placeholder = `<body style="margin:0;height:100vh;display:grid;place-items:center;background:#16181d;
    color:#9aa0aa;font:16px Helvetica,Arial,sans-serif">Video player disabled in demo mode</body>`;
  new MutationObserver(() => {
    document.querySelectorAll('iframe:not([srcdoc])').forEach((frame) => {
      frame.srcdoc = placeholder;
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
}
