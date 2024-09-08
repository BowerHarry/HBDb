import React from "react";
import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, movieDetails, setMovieDetails, setResults, setMovie, setVidsrcLink, setUserMovieDetails }) => {
    return (
        <div className="results-list">
            {
                results.map((result, id) => {
                    return <SearchResult result={result} key={id} movieDetails={movieDetails} setMovieDetails={setMovieDetails} setResults={setResults} setMovie={setMovie} setVidsrcLink={setVidsrcLink} setUserMovieDetails={setUserMovieDetails} />;
                })
            }
        </div>
    )
}