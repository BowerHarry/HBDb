// All network access goes through the HBDb-WS backend, which holds the API keys.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// The session token lives in memory only, so a page reload signs you out.
let token = null;
let signedOutHandler = () => {};

export function onSignedOut(handler) {
  signedOutHandler = handler;
}

async function request(path, { method = 'GET', body } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body) headers['Content-Type'] = 'application/json';

  const response = await fetch(API_URL + path, { method, headers, body: body && JSON.stringify(body) });
  if (response.status === 401 && token) {
    token = null;
    signedOutHandler();
  }
  if (!response.ok) {
    const error = new Error(`${method} ${path} failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  const type = response.headers.get('Content-Type') || '';
  return type.includes('application/json') ? response.json() : null;
}

// Account
export async function signIn(username, password) {
  const session = await request('/login', { method: 'POST', body: { username, password } });
  token = session.token;
}

export const requestAccess = (details) => request('/request', { method: 'POST', body: details });
export const requestPasswordReset = (email) => request('/reset', { method: 'POST', body: { email } });
export const getPosters = () => request('/api/posters');

// Films
export const searchFilms = (query) => request(`/api/films/search?query=${encodeURIComponent(query)}`);
export const getFilm = (id) => request(`/api/films/${id}`);
export const getSimilarFilms = (id) => request(`/api/films/${id}/similar`);

// Ratings use TMDB's scale: 0.5 to 10.
export const rateFilm = (id, value) => request(`/api/films/${id}/rating`, { method: 'PUT', body: { value } });
export const removeRating = (id) => request(`/api/films/${id}/rating`, { method: 'DELETE' });

// Lists
export const getWatchlist = () => request('/api/watchlist');
export const getHistory = () => request('/api/history');
export const setWatchlisted = (id, watchlisted) =>
  request(`/api/watchlist/${id}`, { method: watchlisted ? 'PUT' : 'DELETE' });
