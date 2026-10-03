import { useState } from 'react';
import "./FilmInfo.css";
import Typography from '@mui/joy/Typography';
import {FaStar, FaRegPlusSquare, FaPlusSquare} from "react-icons/fa"
import imdbLogo from '../../assets/imdb.png';
import Box from '@mui/joy/Box';
import letterboxdLogo from '../../assets/letterboxd.png';
import tomatoesLogo from '../../assets/rotten-tomatoes.png';
import Chip from '@mui/joy/Chip';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/joy/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { rateFilm, removeRating, setWatchlisted } from '../../api';
import { releaseYear, formatRuntime } from '../../format';


export const FilmInfo = ({ film, onUserChange }) => {
    const [notice, setNotice] = useState({ open: false, message: "" });

    // TMDB rates out of 10; the stars show that out of 5.
    const stars = film.user.rating ? film.user.rating / 2 : null;
    const watchlisted = film.user.watchlist;
    const imdbLink = `https://www.imdb.com/title/${film.imdb_id}/`

    function notify(message) {
        setNotice({ open: true, message: message });
    }

    // Both handlers update the page straight away and undo the change if saving fails.
    async function changeRating(newStars) {
        const previous = film.user.rating;
        onUserChange({ rating: newStars === null ? null : newStars * 2 });
        try {
            if (newStars === null) {
                await removeRating(film.id);
                notify("Rating removed");
            }
            else {
                await rateFilm(film.id, newStars * 2);
                notify("Rating submitted");
            }
        } catch {
            onUserChange({ rating: previous });
            notify("Couldn't save your rating");
        }
    }

    async function toggleWatchlist() {
        onUserChange({ watchlist: !watchlisted });
        try {
            await setWatchlisted(film.id, !watchlisted);
            notify(watchlisted ? "Removed from watchlist" : "Added to watchlist");
        } catch {
            onUserChange({ watchlist: watchlisted });
            notify("Couldn't update your watchlist");
        }
    }

    return (
        <div className='info'>
            <Typography level="h2">{film.title}</Typography>
            <div className='detail-row'>
                <Typography display="inline" paddingRight={"0.5em"} textAlign={"center"} level="body-xs">{releaseYear(film.release_date)} · {formatRuntime(film.runtime)}</Typography>
                <Rating
                    size="small"
                    name="user-rating"
                    value={stars}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        changeRating(newValue)
                    }}
                />
                <IconButton size="sm" aria-label={watchlisted ? "Remove from watchlist" : "Add to watchlist"} onClick={toggleWatchlist} sx={{paddingLeft: 1 }} >
                    {watchlisted ? <FaPlusSquare /> : <FaRegPlusSquare />}
                </IconButton>
            </div>

            <Typography level="body-sm">{film.overview}</Typography>

            {film.ratings.imdb &&
            <div className='rating'>
                <a href={imdbLink} target="_blank" rel="noreferrer"><img src={imdbLogo} width="22px" height="22px" alt="IMDb" /></a> <div className='rating-text'>{film.ratings.imdb}</div> <FaStar className='star' style={{color: "#FFD43B",}} />
            </div>
            }
            {film.ratings.letterboxd &&
            <div className='rating'>
                <img src={letterboxdLogo} width="22px" height="22px" alt="Letterboxd" /> <div className='rating-text'>{film.ratings.letterboxd}</div> <FaStar className='star' style={{color: "#FFD43B",}} />
            </div>
            }
            {film.ratings.tomatoes &&
            <div className='rating'>
                <img src={tomatoesLogo} width="22px" height="22px" alt="Rotten Tomatoes" /> <div className='rating-text'>{film.ratings.tomatoes}%</div>
            </div>
            }
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {film.genres.map((genre) => <Chip variant="soft" key={genre}>{genre}</Chip>)}
            </Box>

            <Snackbar
                open={notice.open}
                autoHideDuration={2000}
                onClose={() => setNotice({ ...notice, open: false })}
            >
                <SnackbarContent
                    style={{
                        backgroundColor:'white',
                        color:'black',
                        outline: '1px inset royalblue'
                    }}
                    message={notice.message}
                />
            </Snackbar>
        </div>
    )
}
