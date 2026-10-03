import {useEffect} from "react";
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"
import { searchFilms } from "../../api";

export const SearchBar = ({ query, setQuery, setResults }) => {

    useEffect(() => {
        const term = query.trim().toLowerCase();
        if (!term) {
            setResults([]);
            return;
        }

        // Ignore the response if the query has changed by the time it arrives.
        let cancelled = false;
        searchFilms(term)
            .then(({ results }) => {
                if (cancelled) return;
                const matches = results.filter((film) => {
                    return (
                    film.title &&
                    film.original_language == "en" &&
                    film.title.toLowerCase().includes(term)
                    )
                });
                setResults(matches.sort((a, b) => b.popularity - a.popularity));
            })
            .catch(() => {
                if (!cancelled) setResults([]);
            });
        return () => { cancelled = true; };
    }, [query, setResults]);

    return (
    <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input id="search-bar" aria-label="Search films" placeholder="Type to search..." value={query} onChange={(e) => setQuery(e.target.value)}/>
    </div>
    )
}
