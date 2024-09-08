import React from "react";
import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, movieDetails, setMovieDetails, setResults, setMovie, setVideoLink, setUserMovieDetails }) => {
    return (
        <div className="results-list">
            {
                results.map((result, id) => {
                    return <SearchResult result={result} key={id} movieDetails={movieDetails} setMovieDetails={setMovieDetails} setResults={setResults} setMovie={setMovie} setVideoLink={setVideoLink} setUserMovieDetails={setUserMovieDetails} />;
                })
            }
        </div>
    )
}