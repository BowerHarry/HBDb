import React, {useState} from 'react';
import "./SearchResult.css";

export const SearchResult = ({ result, movieDetails, setMovieDetails, setResults, setMovie, setVideoLink, setUserMovieDetails }) => {

    async function loadMovie() {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer REMOVED_TMDB_TOKEN'
            }
          };

        const opt = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer REMOVED_TMDB_TOKEN'
        }
        };

        const user = await fetch(`https://api.themoviedb.org/3/movie/${result.id}/account_states`, opt)
        const decodedUserJson = await user.json()
        setUserMovieDetails(decodedUserJson)

        const movie = await fetch(`https://api.themoviedb.org/3/movie/${result.id}?language=en-US`, options)
        const decodedMovieJson = await movie.json()
        setMovieDetails(decodedMovieJson)
        setVideoLink(`https://example.com/embed/movie?imdb=${decodedMovieJson.imdb_id}`) 
        
        setMovie(result);
        setResults([]);
        window.clearSearchBar();
    }

    return (
        <div className='search-result' onClick={(e) => loadMovie()}>
            <div className='result-title'>{result.title}</div>
            {/* <div className='result-year'>{result.year}</div> */}
        </div>
    )
}
