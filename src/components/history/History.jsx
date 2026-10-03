import { FilmCardList } from '../FilmCardList';
import { getHistory } from '../../api';

export const History = ({ onOpenFilm }) => {
    return <FilmCardList load={getHistory} emptyMessage="You haven't rated any films yet." onOpenFilm={onOpenFilm} />
}
