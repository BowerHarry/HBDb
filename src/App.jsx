import React, { useState } from 'react'
import './App.css'
import { SearchBar } from './components/search/SearchBar';
import { SearchResultsList } from './components/search/SearchResultsList';
import { VideoPlayer } from './components/search/VideoPlayer';
import { NavigationBar } from './components/NavigationBar';
import { MovieWatchlist } from './components/watchlist/MovieWatchlist';1
import '@fontsource/inter';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { FilmList } from './components/films/FilmList';
import tmdbLogo from '/bin/tmdb logo.svg';
// import searchExclude from '../imdb-exclude.json';




function App() {

  const [results, setResults] = useState([]);
  const [movieDetails, setMovieDetails] = useState("");
  const [userMovieDetails, setUserMovieDetails] = useState("");
  const [movie, setMovie] = useState("");
  const [tabValue, setTabValue] = useState('search');
  const [vidsrcLink, setVidsrcLink] = useState("");


  // const imdbExclude = []
  // searchExclude.searchExclude.forEach((key) => {
  //   imdbExclude.push(key.imdbid);
  // });


  return (
    <div className="App">
      { tabValue == "watch list" &&
      <div className='watchlist-container'>
        <MovieWatchlist />
      </div>
        
      }
      { tabValue == "history" &&
        <div>
          History
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
            <SearchBar setResults={setResults} />
            <SearchResultsList results={results} movieDetails={movieDetails} setMovieDetails={setMovieDetails} setResults={setResults} setMovie={setMovie} setVidsrcLink={setVidsrcLink} setUserMovieDetails={setUserMovieDetails} />
          </div>
          <div className='video-player-container'>
            <VideoPlayer movie={movie} movieDetails={movieDetails} setMovieDetails={setMovieDetails} setMovie={setMovie} vidsrcLink={vidsrcLink} setVidsrcLink={setVidsrcLink} userMovieDetails={userMovieDetails} setUserMovieDetails={setUserMovieDetails} />
          </div>
        </div>
      }
      
      <div className='navigation-bar-container'>
        <NavigationBar tabValue={tabValue} setTabValue={setTabValue} />
      </div>

      <div className='references'>
          <img className='tmdb-logo' src={tmdbLogo} width="22px" height="22px" />
      </div>
      
    </div>
  )
}

export default App
