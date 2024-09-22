import React, {useState, useEffect} from "react";
import {FaArrowRight} from "react-icons/fa"
import "./SimilarFilms.css"
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { FaSquareArrowUpRight } from 'react-icons/fa6';
import Chip from '@mui/joy/Chip';
// import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import { applySolidInversion, applySoftInversion } from '@mui/joy/colorInversion';
import ReactCardFlip from 'react-card-flip';
import Link from '@mui/joy/Link';

import IconButton from '@mui/joy/IconButton';
import { Icon } from "@mui/material";
// import Typography from '@mui/joy/Typography';
// import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

export const SimilarFilms = ({ movieDetails, setVidsrcLink, setMovieDetails, setUserMovieDetails }) => {
    const [films, setFilms] = useState("")
    const [loading, setLoading] = useState(true)
    const [config, setConfig] = useState("")
    const [flip, setFlip] = useState(0);
    useEffect(() => {
        setLoading(true)
        handleLoad();
    },[]);

    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes }
      }

    const handleLoad = () => {

      const opt = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcwZDJlYWU4NGQyMWNhYjRhZWUzZjc5MjJjNDI5NiIsIm5iZiI6MTcyNTcxMDQwNi44MzQ3MDMsInN1YiI6IjY2ZDc2OWYyZjU5ZjE2Y2JkODE4MDBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ivIBfrIjGNqBH58YGdrNmISJUsdzjomvAVXxUQUQoGU'
        }
      };

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcwZDJlYWU4NGQyMWNhYjRhZWUzZjc5MjJjNDI5NiIsIm5iZiI6MTcyNTM5NDMxMy4yMzI1NjcsInN1YiI6IjY2ZDc2OWYyZjU5ZjE2Y2JkODE4MDBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pkZ0jEoWHF6KwGxAzqdpCiPzIvgZJ0Xi-JTX5Jp6IcA'
        }
      };
      
      fetch('https://api.themoviedb.org/3/configuration', opt)
        .then(response => response.json())
        .then(response => setConfig(response))
        .then (
          fetch(`https://api.themoviedb.org/3/movie/${movieDetails.id}/similar?language=en-US&page=1`, options)
            .then(async response => {
                const results = await response.json()

                const filteredResults = results.results.filter((film) => {
                    return (
                        film.title.length < 21 &&
                    film.poster_path  
                    )
                });

                const sortedResults = (filteredResults.sort(function (a, b) {
                    return b.popularity - a.popularity;
             }))
             let sortedMap = new Map(Object.entries(sortedResults));
              setFilms(sortedMap)
              setLoading(false)
            })
        ) 
    }

    const getHTML = films => {
        let content = [];
        films.forEach (function(value, key) {
            content.push(getMoviePoster(value));
            })
        return content;
      };

    function handleClick(e, id) {
      e.preventDefault();
      setFlip(flip > 0 ? 0 : id)
    }

    const getMoviePoster = movie => {
        const link = `${config.images.base_url}/w154/${movie.poster_path}.jpg`
        return (
          <ReactCardFlip isFlipped={flip == movie.id}
            flipDirection="vertical">
          <div>
          <Card  sx={{ minHeight: '308px', minWidth: '200px', position: 'relative', margin: 0, padding: 0 }} >
          <div style={{ position: 'absolute', backgroundColor: 'white', height: 13, width: 13, top: 0, right: 0, marginTop: 1, marginRight: 1, zIndex: 2}}>
          </div>
          <IconButton className="flip-icon" size="md" onClick={(e) => {handleClick(e, movie.id)}} style={{ position: 'absolute', margin: 0, padding: 0, right: 0, top: 0, color: 'black', marginTop: -10, marginRight: -10}} sx={{zIndex: 2}} >
            <FaSquareArrowUpRight />
          </IconButton>
            <CardCover>
              <div>
                

              <img
                src={link}
                loading="lazy"
                alt=""
                cross-origin="anonymous"
              />   
              </div> 
              
            
              
            </CardCover>
            <CardCover 
              sx={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
              }}
            >
              {/* <Button onClick={(e) => {selectMovie(movie.id)}}/> */}
              </CardCover>
            <CardContent sx={{ justifyContent: 'flex-end' }}>
            <Link
            onClick={(e) => {selectMovie(movie.id)}}
            overlay
            underline="none"
            sx={{ color: 'text.tertiary' }}
          ></Link>
              <div className="movie-title">
              <Typography display="inline" paddingRight="0.5em" level="title-lg" textColor="#fff">
              {movie.title}
              </Typography>
              <Typography display="inline" textColor="neutral.300">
                {new Date(movie.release_date).getFullYear()}
              </Typography>
              </div>
              
            </CardContent>
          </Card>
          </div>
          <div>
          <Card sx={{ minHeight: '308px', minWidth: '200px', position: 'relative', margin: 0, padding: 0 }} >
          <div style={{ position: 'absolute', backgroundColor: 'white', height: 13, width: 13, top: 0, right: 0, marginTop: 1, marginRight: 1, zIndex: 2}}>
          </div>
          <IconButton className="flip-icon"  size="md" onClick={(e) => {handleClick(e, movie.id)}} style={{ position: 'absolute', margin: 0, padding: 0, right: 0, top: 0, color: 'black', marginTop: -10, marginRight: -10, zIndex: 2 }} >
                  <FaSquareArrowUpRight />
              </IconButton>
            <CardCover>
              <div>

              

              </div>
            
              
            </CardCover>
            <CardCover
              // sx={{
              //   background: 'linear-gradient(360deg, #ffffff, #ebedf7, #d7dbee, #c3c9e6, #9da3d2, #7a7ebe, #5959a8)'

              // }}
            >
              <div className="test" style={{ "--img": `url(${link}), 
      linear-gradient(#e66465, #9198e5)`}}></div>

            </CardCover>
            <CardCover 
              sx={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
              }}
            >
              {/* <Button onClick={(e) => {selectMovie(movie.id)}}/> */}
              </CardCover>

            <CardContent sx={{ justifyContent: 'flex-end' }}>
            <Typography display="inline" padding="0.5em" level="body-md" textColor="#fff">
              {movie.overview}
              </Typography>
            </CardContent>
          </Card>

          </div>
          </ReactCardFlip>

            // <div className="movie-poster">
            //     <img className="poster" key={movie.id} src= {link} onClick={(e) => {selectMovie(movie.id)}} />
            //     <Typography level="h3" className="title">{movie.title}</Typography>
            //     <Typography level="body-xs">{new Date(movie.release_date).getFullYear()}</Typography>
            //     <Typography level="body-sm">{movie.overview}</Typography>
            // </div>
        
        )
    }

    const selectMovie = movieID => {

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcwZDJlYWU4NGQyMWNhYjRhZWUzZjc5MjJjNDI5NiIsIm5iZiI6MTcyNTM5NDMxMy4yMzI1NjcsInN1YiI6IjY2ZDc2OWYyZjU5ZjE2Y2JkODE4MDBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pkZ0jEoWHF6KwGxAzqdpCiPzIvgZJ0Xi-JTX5Jp6IcA'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options)
            .then(response => response.json())
            .then((json) => {
                setMovieDetails(json);
                setVidsrcLink(`https://vidsrc.xyz/embed/movie?imdb=${json.imdb_id}`)
            })
    }
    


    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return (

        <div className="similar-page">
        {!loading &&
        <div className="poster-container">
            {getHTML(films)};
        </div>
        
        
        }
</div>
        
    )
}