import {useState, useEffect} from "react";
import "./SimilarFilms.css"
import Typography from '@mui/joy/Typography';
import { FaSquareArrowUpRight } from 'react-icons/fa6';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import ReactCardFlip from 'react-card-flip';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import { getSimilarFilms } from "../../api";
import { releaseYear } from "../../format";

const cardStyle = { minHeight: '308px', minWidth: '200px', position: 'relative', margin: 0, padding: 0 };
const shade = 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)';

// The corner button that flips a card between its poster and its overview.
const FlipButton = ({ onClick }) => (
    <>
        <div style={{ position: 'absolute', backgroundColor: 'white', height: 13, width: 13, top: 0, right: 0, marginTop: 1, marginRight: 1, zIndex: 2}}>
        </div>
        <IconButton className="flip-icon" size="md" aria-label="Flip card" onClick={onClick} style={{ position: 'absolute', margin: 0, padding: 0, right: 0, top: 0, color: 'black', marginTop: -10, marginRight: -10, zIndex: 2}} >
            <FaSquareArrowUpRight />
        </IconButton>
    </>
);

export const SimilarFilms = ({ filmId, onOpenFilm }) => {
    const [films, setFilms] = useState([])
    const [loading, setLoading] = useState(true)
    const [flipped, setFlipped] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        getSimilarFilms(filmId)
            .then(({ results }) => {
                // Longer titles don't fit on a card
                if (!cancelled) setFilms(results.filter((film) => film.title.length < 21));
            })
            .catch(() => {
                if (!cancelled) setFilms([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    },[filmId]);

    function flip(id) {
      setFlipped(flipped === id ? null : id)
    }

    const getMoviePoster = movie => {
        return (
          <ReactCardFlip key={movie.id} isFlipped={flipped === movie.id}
            flipDirection="vertical">
          <div>
          <Card sx={cardStyle} >
            <FlipButton onClick={() => flip(movie.id)} />
            <CardCover>
              <img
                src={movie.poster_url}
                loading="lazy"
                alt=""
              />
            </CardCover>
            <CardCover sx={{ background: shade }} />
            <CardContent sx={{ justifyContent: 'flex-end' }}>
              <Link
                component="button"
                aria-label={`Open ${movie.title}`}
                onClick={() => onOpenFilm(movie.id)}
                overlay
                underline="none"
                sx={{ color: 'text.tertiary' }}
              ></Link>
              <div className="movie-title">
              <Typography display="inline" paddingRight="0.5em" level="title-lg" textColor="#fff">
              {movie.title}
              </Typography>
              <Typography display="inline" textColor="neutral.300">
                {releaseYear(movie.release_date)}
              </Typography>
              </div>
            </CardContent>
          </Card>
          </div>
          <div>
          <Card sx={cardStyle} >
            <FlipButton onClick={() => flip(movie.id)} />
            <CardCover>
              <div className="card-back" style={{ "--img": `url(${movie.poster_url}),
      linear-gradient(#e66465, #9198e5)`}}></div>
            </CardCover>
            <CardCover sx={{ background: shade }} />
            <CardContent sx={{ justifyContent: 'flex-end' }}>
              <Typography display="inline" padding="0.5em" level="body-md" textColor="#fff">
              {movie.overview}
              </Typography>
            </CardContent>
          </Card>
          </div>
          </ReactCardFlip>
        )
    }

    return (
        <div className="similar-page">
        {!loading && films.length > 0 &&
        <div className="poster-container">
            {films.map(getMoviePoster)}
        </div>
        }
        {!loading && films.length === 0 &&
        <Typography level="body-sm" textAlign="center">No similar films found.</Typography>
        }
        </div>
    )
}
