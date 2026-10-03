import { useState } from 'react'
import './App.css'
import { SearchBar } from './components/search/SearchBar';
import { SearchResultsList } from './components/search/SearchResultsList';
import { FilmDetails } from './components/search/FilmDetails';
import { History } from './components/history/History';
import { NavigationBar } from './components/NavigationBar';
import { MovieWatchlist } from './components/watchlist/MovieWatchlist';
import { FilmList } from './components/films/FilmList';
import { getFilm } from './api';
import '@fontsource/inter';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import tmdbLogo from './assets/tmdb-logo.svg';

function App() {

  const [tabValue, setTabValue] = useState('search');
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Opens a film on the Search tab, from a search result, a list or a similar film.
  async function openFilm(id) {
    setTabValue('search');
    setQuery("");
    setResults([]);
    setError("");
    setLoading(true);
    try {
      setFilm(await getFilm(id));
    } catch {
      setFilm(null);
      setError("Couldn't load that film. Try again.");
    } finally {
      setLoading(false);
    }
  }

  // Keeps the open film in step after the user rates it or changes their watchlist.
  function updateFilmUser(changes) {
    setFilm((current) => ({ ...current, user: { ...current.user, ...changes } }));
  }

  return (
    <div className="App">
      { tabValue == "watch list" &&
        <div className='watchlist-container'>
          <MovieWatchlist onOpenFilm={openFilm} />
        </div>
      }
      { tabValue == "history" &&
        <div className='history-container'>
          <History onOpenFilm={openFilm} />
        </div>
      }
      { tabValue == "tv" &&
        <div>
          TV
        </div>
      }
      { tabValue == "films" &&
        <div>
          <FilmList />
        </div>
      }

      { tabValue == "search" &&
        <div>
          <div className='search-bar-container'>
            <SearchBar query={query} setQuery={setQuery} setResults={setResults} />
            <SearchResultsList results={results} onSelect={openFilm} />
          </div>
          <div className='film-details-container'>
            <FilmDetails film={film} loading={loading} error={error} onOpenFilm={openFilm} onUserChange={updateFilmUser} />
          </div>
        </div>
      }

      <div className='navigation-bar-container'>
        <NavigationBar tabValue={tabValue} setTabValue={setTabValue} />
      </div>

      <div className='references'>
          <img className='tmdb-logo' src={tmdbLogo} width="22px" height="22px" alt="Film data from TMDB" />
      </div>

    </div>
  )
}

export default App
