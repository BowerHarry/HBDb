import React, {useState} from "react";
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("")

    const fetchData = (value) => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer REMOVED_TMDB_TOKEN'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then((json) => {
                const results = json.results.filter((film) => {
                    return (
                    value && 
                    film && 
                    film.title && 
                    film.original_language == "en" &&
                    film.id &&
                    !localStorage.getItem(film.id) &&
                    film.title.toLowerCase().includes(value)
                    )
                });
                const sortedResults = (results.sort(function (a, b) {
                    return b.popularity - a.popularity;
             }))
                setResults(sortedResults);
            })

    }

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return (
    <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input id="search-bar" placeholder="Type to search..." value={input} onChange={(e) => handleChange(e.target.value)}/>
    </div>
    )
}