import {useEffect, useState} from 'react';
import "./FilmCardList.css";
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import { styled } from '@mui/joy/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import Rating from '@mui/material/Rating';
import Link from '@mui/joy/Link';
import { releaseYear, formatRuntime } from '../format';

const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography['body-sm'],
    textAlign: 'left',
    fontWeight: theme.fontWeight.md,
    color: theme.vars.palette.text.secondary,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: theme.spacing(1),
    borderRadius: theme.radius.md,
  }));

const FilmCard = ({ film, onOpenFilm }) => (
    <Item>
        <Card orientation="horizontal" variant="outlined" >
        <CardOverflow>
            <AspectRatio ratio="2/3" sx={{ width: 120 }}>
            {film.poster_url
                ? <img src={film.poster_url} loading="lazy" alt="" />
                : <div />
            }
            </AspectRatio>
        </CardOverflow>
        <CardContent>
            <Typography textColor="success.plainColor" sx={{ fontWeight: 'md' }}>
            {film.title}
            </Typography>
            <Typography display="inline" paddingRight={"0.5em"} level="body-xs">{releaseYear(film.release_date)} · {formatRuntime(film.runtime)}</Typography>
            {film.rating != null &&
            <Rating
                size="small"
                name={`rating-${film.id}`}
                readOnly
                value={film.rating / 2}
                precision={0.5}
            />
            }
            <Typography level="body-sm">{film.overview}</Typography>
            <Link
                overlay
                underline="none"
                sx={{ color: 'text.tertiary' }}
                component="button"
                aria-label={`Open ${film.title}`}
                onClick={() => onOpenFilm(film.id)}
            >
            </Link>
        </CardContent>
        <CardOverflow
            variant="soft"
            color="primary"
            sx={{
            px: 0.2,
            writingMode: 'vertical-rl',
            justifyContent: 'center',
            fontSize: 'xs',
            fontWeight: 'xl',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            borderLeft: '1px solid',
            }}
        >
            Film
        </CardOverflow>
        </Card>
    </Item>
);

// A scrolling list of film cards, used by the Watch List and History tabs.
// `load` fetches the films; a film with a `rating` shows it as stars.
export const FilmCardList = ({ load, emptyMessage, onOpenFilm }) => {
    const [films, setFilms] = useState(null)
    const [failed, setFailed] = useState(false)

    useEffect(() => {
        let cancelled = false;
        load()
            .then(({ results }) => {
                if (!cancelled) setFilms(results);
            })
            .catch(() => {
                if (!cancelled) setFailed(true);
            });
        return () => { cancelled = true; };
    },[load]);

    if (failed) {
        return <div className='film-card-list-message'><Typography level="body-md">Couldn&apos;t load this list. Try again.</Typography></div>
    }
    if (films === null) {
        return <div className='film-card-list-message'><CircularProgress /></div>
    }
    if (films.length === 0) {
        return <div className='film-card-list-message'><Typography level="body-md">{emptyMessage}</Typography></div>
    }

    return (
        <div className='film-card-list'>
            <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                    {films.map((film) => <FilmCard key={film.id} film={film} onOpenFilm={onOpenFilm} />)}
                </Stack>
            </Box>
        </div>
    );
}
