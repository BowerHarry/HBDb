import React, {useState, useEffect} from 'react';
import "./MoviePlayerInfo.css";
import Typography from '@mui/joy/Typography';
import {FaImdb, FaPercent, FaStar, FaRegPlusSquare, FaPlusSquare} from "react-icons/fa"
import { FaXmark } from 'react-icons/fa6';
import imdbLogo from '/bin/IMDb.png';
import Box from '@mui/joy/Box';
import letterboxdLogo from '/bin/letterboxd.png';
import tomatoesLogo from '/bin/rotten-tomatoes.png';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Rating from '@mui/material/Rating';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { keyframes } from '@mui/system';


export const MoviePlayerInfo = ({ movieDetails, imddbRating, tomatoesRating, letterboxdRating, userMovieDetails, setUserMovieDetails }) => {
    const [userRating, setUserRating] = React.useState();
    const [watchlist, setWatchlist] = React.useState();
    const [ratingOpen, setRatingOpen] = React.useState(false);
    const [watchlistOpen, setWatchlistOpen] = React.useState(false);


    useEffect(() => {
    },[movieDetails, userMovieDetails]);

    const inAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const outAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;
const animationDuration = 600;

    const ratingSubmittedOpen = () => {
        setRatingOpen(false);
        setRatingOpen(true);
      };
    
      const ratingSubmittedClose = (event, reason) => {
        setRatingOpen(false);
      };

      const watchlistAddedOpen = () => {
        setWatchlistOpen(true);
      };
    
      const watchlistAddedClose = (event, reason) => {
        setWatchlistOpen(false);
      };


    const imdbLink = `https://www.imdb.com/title/${movieDetails.imdb_id}/`
    const genres = movieDetails.genres.map(({
        name
      }) => name);
      
      var renderedGenres = genres.map(item => <Chip variant="soft" key={item}>{item}</Chip>)
      
      //https://plainenglish.io/blog/javascript-convert-minutes-to-hours-and-minutes
      function toHoursAndMinutes(totalMinutes) {
        if (typeof watchlist === 'undefined') {
            setWatchlist(userMovieDetails.watchlist)
        }
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes }
      }

    function toggleWatchlist(e) {
        e.preventDefault();
        var newWatchlist = !watchlist
        setWatchlist(newWatchlist)
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcwZDJlYWU4NGQyMWNhYjRhZWUzZjc5MjJjNDI5NiIsIm5iZiI6MTcyNTcxMDQwNi44MzQ3MDMsInN1YiI6IjY2ZDc2OWYyZjU5ZjE2Y2JkODE4MDBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ivIBfrIjGNqBH58YGdrNmISJUsdzjomvAVXxUQUQoGU'
            },
            body: JSON.stringify({media_type: 'movie', media_id: movieDetails.id, watchlist: newWatchlist})
          };
          
          fetch('https://api.themoviedb.org/3/account/21498597/watchlist', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        var newUserMovieDetails = userMovieDetails
        newUserMovieDetails.watchlist = newWatchlist
        setUserMovieDetails(newUserMovieDetails)
        watchlistAddedOpen()
    }

    function removeMovieRating() {
        const options = {
            method: 'DELETE',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcwZDJlYWU4NGQyMWNhYjRhZWUzZjc5MjJjNDI5NiIsIm5iZiI6MTcyNTcxMDQwNi44MzQ3MDMsInN1YiI6IjY2ZDc2OWYyZjU5ZjE2Y2JkODE4MDBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ivIBfrIjGNqBH58YGdrNmISJUsdzjomvAVXxUQUQoGU'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${movieDetails.id}/rating`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

    function setMovieRating(newRating) {
        setUserRating(newRating)
        if (newRating === null) {
            removeMovieRating()
        }
        else {
            const options = {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json;charset=utf-8',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcwZDJlYWU4NGQyMWNhYjRhZWUzZjc5MjJjNDI5NiIsIm5iZiI6MTcyNTcxMDQwNi44MzQ3MDMsInN1YiI6IjY2ZDc2OWYyZjU5ZjE2Y2JkODE4MDBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ivIBfrIjGNqBH58YGdrNmISJUsdzjomvAVXxUQUQoGU'
                },
                body: `{"value":${newRating * 2}}`
              };
              
              fetch(`https://api.themoviedb.org/3/movie/${movieDetails.id}/rating`, options)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));
        }
        
        
        var newUserMovieDetails = userMovieDetails
        const rating = {value: newRating*2}
        newUserMovieDetails.rated = rating
        setUserMovieDetails(newUserMovieDetails);
        ratingSubmittedOpen()
        // console.log(userMovieDetails)
        
    }


    return (

            <div className='info'>
            {movieDetails &&
                <div className='info'>
                    <Typography level="h2">{movieDetails.title}</Typography>
                    <div className='detail-row'>
                    <Typography display="inline" paddingRight={"0.5em"} textAlign={"center"} level="body-xs">{new Date(movieDetails.release_date).getFullYear()} · {toHoursAndMinutes(movieDetails.runtime).hours}hr {toHoursAndMinutes(movieDetails.runtime).minutes}mins</Typography>
                    <Rating
                        size="small"
                        display="inline"
                        name="simple-controlled"
                        defaultValue={userMovieDetails.rated ? (userMovieDetails.rated.value/2) : 0}
                        value={userRating}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setMovieRating(newValue)
                        }}
                    />
                    {watchlist &&
                    <IconButton size="s" onClick={(e) => {toggleWatchlist(e)}} sx={{paddingLeft: 1 }} >
                        <FaPlusSquare />
                    </IconButton>
                    }
                    {!watchlist &&
                    <IconButton size="s" onClick={(e) => {toggleWatchlist(e)}} sx={{paddingLeft: 1 }} >
                        <FaRegPlusSquare />
                    </IconButton>
                    }
                        

                        </div>
                    
                    <Typography level="body-sm">{movieDetails.overview}</Typography>
                    
                    <div>
        
      </div>
                    {imddbRating &&
                    <div className='rating'>
                        <a href={imdbLink} target="_blank"><img className='rating-icon' src={imdbLogo} width="22px" height="22px" /></a> <div className='rating-text'>{imddbRating}</div> <FaStar className='star' style={{color: "#FFD43B",}} /> 
                    </div>
                    }
                    {letterboxdRating &&
                    <div className='rating'>
                        <img className='rating-icon' src={letterboxdLogo} width="22px" height="22px" /> <div className='rating-text'>{letterboxdRating}</div> <FaStar className='star' style={{color: "#FFD43B",}} /> 
                    </div>
                    }
                    {tomatoesRating &&
                    <div className='rating'>
                        <img className='rating-icon' src={tomatoesLogo} width="22px" height="22px" /> <div className='rating-text'>{tomatoesRating}%</div>
                    </div>
                    }
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>{renderedGenres}</Box>
                    

{/* 
                    <div onLoad={(e) => fetchRatingData(movie.imdbid)}> </div>
                    {imddbRating != "" &&
                        <div>
                            {imddbRating.rating_type}
                        </div>
                    } */}
                </div>
                // {"search": [{"id": "tt0073195", "title": "Jaws", "year": 1975, "score": 86, "score_average": 86, "type": "movie", "imdbid": "tt0073195", "tmdbid": 578, "traktid": 457, "malid": null}
            }
            <Snackbar
                open={ratingOpen}
                autoHideDuration={2000}
                onClose={ratingSubmittedClose}
                // message="Rating submitted"
                animationDuration={animationDuration}
                sx={[
                    open && {
                      animation: `${inAnimation} ${animationDuration}ms forwards`,
                    },
                    !open && {
                      animation: `${outAnimation} ${animationDuration}ms forwards`,
                    },
                  ]}
            >
                <SnackbarContent style={{
      backgroundColor:'white',
      color:'black',
      outline: '1px inset royalblue'
    }}
    message={<span id="client-snackbar">{userRating ? "Rating submitted" : "Rating removed"}</span>}
  />
            </Snackbar>    
            <Snackbar
                open={watchlistOpen}
                autoHideDuration={2000}
                onClose={watchlistAddedClose}
                // message={watchlist ? "Added to watchlist" : "Removed from watchlist"}
                animationDuration={animationDuration}
                color='primary'
                sx={[
                    open && {
                      animation: `${inAnimation} ${animationDuration}ms forwards`,
                    },
                    !open && {
                      animation: `${outAnimation} ${animationDuration}ms forwards`,
                    },
                  ]}
            >
                <SnackbarContent style={{
      backgroundColor:'white',
      color:'black',
      outline: '1px inset royalblue'
    }}
    message={<span id="client-snackbar">{watchlist ? "Added to watchlist" : "Removed from watchlist"}</span>}
  />
            </Snackbar>
        </div>
        
        
    )
}