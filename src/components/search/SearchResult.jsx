import React, {useState} from 'react';
import "./SearchResult.css";

export const SearchResult = ({ result, movieDetails, setMovieDetails, setResults, setMovie, setVidsrcLink, setUserMovieDetails }) => {

    async function loadMovie() {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcwZDJlYWU4NGQyMWNhYjRhZWUzZjc5MjJjNDI5NiIsIm5iZiI6MTcyNTM5NDMxMy4yMzI1NjcsInN1YiI6IjY2ZDc2OWYyZjU5ZjE2Y2JkODE4MDBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pkZ0jEoWHF6KwGxAzqdpCiPzIvgZJ0Xi-JTX5Jp6IcA'
            }
          };

        const opt = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcwZDJlYWU4NGQyMWNhYjRhZWUzZjc5MjJjNDI5NiIsIm5iZiI6MTcyNTcxMDQwNi44MzQ3MDMsInN1YiI6IjY2ZDc2OWYyZjU5ZjE2Y2JkODE4MDBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ivIBfrIjGNqBH58YGdrNmISJUsdzjomvAVXxUQUQoGU'
        }
        };

        const user = await fetch(`https://api.themoviedb.org/3/movie/${result.id}/account_states`, opt)
        const decodedUserJson = await user.json()
        setUserMovieDetails(decodedUserJson)

        const movie = await fetch(`https://api.themoviedb.org/3/movie/${result.id}?language=en-US`, options)
        const decodedMovieJson = await movie.json()
        setMovieDetails(decodedMovieJson)
        setVidsrcLink(`https://vidsrc.xyz/embed/movie?imdb=${decodedMovieJson.imdb_id}`) 
        
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
