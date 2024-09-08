import React, {useEffect, useState} from 'react';
import "./MovieWatchlist.css";
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import { styled } from '@mui/joy/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { DragDropContext } from 'react-beautiful-dnd';

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

export const MovieWatchlist = () => {
    const [films, setFilms] = useState("")
    const [loading, setLoading] = useState(true)
    const [config, setConfig] = useState("")

    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes }
      }

    useEffect(() => {
        setLoading(true)
        handleLoad();
    },[]);

    const getListElements = films => {
        let content = [];
        films.forEach (function(value, key) {
            content.push(getMovie(value));
            })
        return content;
      };

      const getMovie = movie => {
        const link = `${config.images.base_url}/w154/${movie.poster_path}.jpg`
        return (
            <Item>
                <Card orientation="horizontal" variant="outlined" sx={{}}>
                <CardOverflow>
                    <AspectRatio ratio="1" sx={{ width: 120 }}>
                    <img
                        src={link}
                        srcSet={link}
                        loading="lazy"
                        alt=""
                    />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography textColor="success.plainColor" sx={{ fontWeight: 'md' }}>
                    {movie.title}
                    </Typography>
                    <Typography display="inline" paddingRight={"0.5em"} level="body-xs">{new Date(movie.release_date).getFullYear()} · {toHoursAndMinutes(movie.runtime).hours}hr {toHoursAndMinutes(movie.runtime).minutes}mins</Typography>
                    <Typography level="body-sm">{movie.overview}</Typography>
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
                    //   borderColor: 'divider',
                    }}
                >
                    Ticket
                </CardOverflow>
                </Card>
                </Item>      
        )
    }

    function fetchConfig() {
        const opt = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcwZDJlYWU4NGQyMWNhYjRhZWUzZjc5MjJjNDI5NiIsIm5iZiI6MTcyNTcxMDQwNi44MzQ3MDMsInN1YiI6IjY2ZDc2OWYyZjU5ZjE2Y2JkODE4MDBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ivIBfrIjGNqBH58YGdrNmISJUsdzjomvAVXxUQUQoGU'
            }
          };

        fetch('https://api.themoviedb.org/3/configuration', opt)
        .then(response => response.json())
        .then(response => setConfig(response))
    }

    function fetchMovieWatchlist(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcwZDJlYWU4NGQyMWNhYjRhZWUzZjc5MjJjNDI5NiIsIm5iZiI6MTcyNTcxMDQwNi44MzQ3MDMsInN1YiI6IjY2ZDc2OWYyZjU5ZjE2Y2JkODE4MDBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ivIBfrIjGNqBH58YGdrNmISJUsdzjomvAVXxUQUQoGU'
            }
          };
          
          fetch('https://api.themoviedb.org/3/account/21498597/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc', options)
            .then(response => response.json())
            .then(response => {
                setFilms(new Map(Object.entries(response.results)))
                setLoading(false)
            })
            .catch(err => console.error(err));
    }

    function handleLoad() {
        fetchConfig()
        fetchMovieWatchlist()
    }
  

  return (
    <div className='container'>
        {!loading &&
        <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
                {getListElements(films)}
            </Stack>
        </Box> 
        }
    </div>
  );}