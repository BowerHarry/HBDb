import "./SearchResult.css";
import { releaseYear } from "../../format";

export const SearchResult = ({ result, onSelect }) => {
    return (
        <div className='search-result' onClick={() => onSelect(result.id)}>
            <div className='result-title'>{result.title}</div>
            <div className='result-year'>{releaseYear(result.release_date)}</div>
        </div>
    )
}
