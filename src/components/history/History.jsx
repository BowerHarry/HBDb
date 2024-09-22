import React, {useEffect, useState} from 'react';
import "./History.css";
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
import Rating from '@mui/material/Rating';
import Link from '@mui/joy/Link';



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

export const History = ( {setTabValue} ) => {
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

    function selectMovie(movieid) {
        setTabValue("search")
    }

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
                <Card orientation="horizontal" variant="outlined" >
                <CardOverflow>
                    <AspectRatio ratio="2/3" sx={{ width: 120 }}>
                    <img
                        src={link}
                        srcSet={link}
                        loading="lazy"
                        alt=""
                        sx={{ height: '100%', backgroundSize: 'cover' }}
                    />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography textColor="success.plainColor" sx={{ fontWeight: 'md' }}>
                    {movie.title}
                    </Typography>
                    <Typography display="inline" paddingRight={"0.5em"} level="body-xs">{new Date(movie.release_date).getFullYear()} · {toHoursAndMinutes(movie.vote_count).hours}hr {toHoursAndMinutes(movie.vote_count).minutes}mins</Typography>
                    <Rating
                        size="small"
                        display="inline"
                        name="simple-controlled"
                        readOnly
                        defaultValue={movie.vote_average ? (movie.vote_average/2) : 0}
                        precision={0.5}
                    />
                    <Typography level="body-sm">{movie.overview}</Typography>
                    <Link
                        overlay
                        underline="none"
                        // href="#interactive-card"
                        sx={{ color: 'text.tertiary' }}
                        component="button"
                        onClick={() => {
                            selectMovie(movie.id)
                        }}
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
            
                    //   borderColor: 'divider',
                    }}
                >
                    Film
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

    async function fetchRuntime(movieid) {
        const opt = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcwZDJlYWU4NGQyMWNhYjRhZWUzZjc5MjJjNDI5NiIsIm5iZiI6MTcyNTM5NDMxMy4yMzI1NjcsInN1YiI6IjY2ZDc2OWYyZjU5ZjE2Y2JkODE4MDBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pkZ0jEoWHF6KwGxAzqdpCiPzIvgZJ0Xi-JTX5Jp6IcA'
            }
          };
        
        const movie = await fetch(`https://api.themoviedb.org/3/movie/${movieid}?language=en-US`, opt)
        const decodedMovieJson = await movie.json()
        return decodedMovieJson.runtime
    }

    async function fetchUserRating(movieid) {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcwZDJlYWU4NGQyMWNhYjRhZWUzZjc5MjJjNDI5NiIsIm5iZiI6MTcyNTc4OTAzMi41NjE4MDQsInN1YiI6IjY2ZDc2OWYyZjU5ZjE2Y2JkODE4MDBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wyFvZFxkezyWw_t1uKrX5LXirF8V4sROEdk4MMfTaCM'
            }
          };
          
        const movie = await fetch(`https://api.themoviedb.org/3/movie/${movieid}/account_states`, options)
        const decodedMovieJson = await movie.json()
        return decodedMovieJson.rated.value

    }

    async function fetchMovieWatchlist(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcwZDJlYWU4NGQyMWNhYjRhZWUzZjc5MjJjNDI5NiIsIm5iZiI6MTcyNTcxMDQwNi44MzQ3MDMsInN1YiI6IjY2ZDc2OWYyZjU5ZjE2Y2JkODE4MDBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ivIBfrIjGNqBH58YGdrNmISJUsdzjomvAVXxUQUQoGU'
            }
          };
    
          const response = await fetch('https://api.themoviedb.org/3/account/21498597/rated/movies?language=en-US&page=1&sort_by=created_at.asc', options)
          const decodedResponse = await response.json()
          const list = new Map(Object.entries(decodedResponse.results))
          var i = 0
          list.forEach(async function(value, key) {
            const runtime = await fetchRuntime(list.get(key).id)
            const userRating = await fetchUserRating(list.get(key).id)
            console.log(userRating)
            list.get(key).vote_average = userRating
            list.get(key).vote_count = runtime
            i++
            if (list.size == i) {
                setFilms(list)
                setLoading(false)
            }
          })
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