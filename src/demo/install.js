// Demo mode: run the app with no backend and no API keys.
//   VITE_DEMO=1 npm run dev
// Answers the app's backend requests with the films saved in films.js and keeps
// watchlist/rating changes in memory. Posters load from TMDB's image host and
// trailers from YouTube, as they do in the real app. Only active on the dev server; the
// guard below is statically false in production builds, so none of this is bundled.
import { API_URL } from '../api.js';
import { films, initialWatchlist, initialRatings } from './films.js';

if (import.meta.env.DEV && import.meta.env.VITE_DEMO === '1') {
  const watchlist = new Set(initialWatchlist);
  const ratings = new Map(Object.entries(initialRatings).map(([id, value]) => [Number(id), value]));

  const IMAGE_URL = 'https://image.tmdb.org/t/p/';

  const byId = (id) => films.find((film) => film.id === Number(id));
  const summary = (film) => ({
    id: film.id,
    title: film.title,
    original_language: film.original_language,
    release_date: film.release_date,
    overview: film.overview,
    popularity: film.popularity,
    poster_url: IMAGE_URL + 'w342' + film.poster_path,
  });
  const listed = (film) => ({ ...summary(film), runtime: film.runtime });
  const details = (film) => ({
    ...listed(film),
    imdb_id: film.imdb_id,
    genres: film.genres,
    user: { rating: ratings.get(film.id) ?? null, watchlist: watchlist.has(film.id) },
    ratings: film.ratings,
    trailer: film.trailer,
  });

  // Stand-in for TMDB's similar films: the others that share a genre, closest first.
  function similarTo(film) {
    const shared = (other) => other.genres.filter((genre) => film.genres.includes(genre)).length;
    return films
      .filter((other) => other.id !== film.id && shared(other) > 0)
      .sort((a, b) => shared(b) - shared(a) || b.popularity - a.popularity);
  }

  // Mirrors the HBDb-WS routes the app uses. Returns undefined for anything else.
  function respond(path, query, method, body) {
    let match;
    if (path === '/login') return { token: 'demo', username: body.username };
    if (path === '/request' || path === '/reset') return null;
    if (path === '/api/posters') return films.map((film) => IMAGE_URL + 'w780' + film.poster_path);
    if (path === '/api/films/search') {
      const term = (query.get('query') || '').toLowerCase();
      return { results: films.filter((film) => film.title.toLowerCase().includes(term)).map(summary) };
    }
    if (path === '/api/watchlist') return { results: [...watchlist].map(byId).map(listed) };
    if (path === '/api/history') {
      return { results: [...ratings].map(([id, rating]) => ({ ...listed(byId(id)), rating })) };
    }
    if ((match = /^\/api\/watchlist\/(\d+)$/.exec(path))) {
      if (method === 'PUT') watchlist.add(Number(match[1]));
      else watchlist.delete(Number(match[1]));
      return null;
    }
    if ((match = /^\/api\/films\/(\d+)\/rating$/.exec(path))) {
      if (method === 'PUT') ratings.set(Number(match[1]), body.value);
      else ratings.delete(Number(match[1]));
      return null;
    }
    if ((match = /^\/api\/films\/(\d+)\/similar$/.exec(path))) {
      return { results: similarTo(byId(match[1])).map(summary) };
    }
    if ((match = /^\/api\/films\/(\d+)$/.exec(path))) return details(byId(match[1]));
  }

  const realFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const address = typeof input === 'string' ? input : input.url;
    if (!address.startsWith(API_URL)) return realFetch(input, init);

    const url = new URL(address);
    const body = init.body ? JSON.parse(init.body) : {};
    const result = respond(url.pathname, url.searchParams, init.method || 'GET', body);
    if (result === undefined) return new Response(null, { status: 404 });
    if (result === null) return new Response(null, { status: 204 });
    return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
  };
}
