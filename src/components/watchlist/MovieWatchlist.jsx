import { FilmCardList } from '../FilmCardList';
import { getWatchlist } from '../../api';

export const MovieWatchlist = ({ onOpenFilm }) => {
    return <FilmCardList load={getWatchlist} emptyMessage="Your watch list is empty." onOpenFilm={onOpenFilm} />
}
