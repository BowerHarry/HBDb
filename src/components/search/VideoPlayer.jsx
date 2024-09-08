import React, {useState, useEffect}  from 'react';
import "./VideoPlayer.css";
import { MoviePlayerInfo } from './MoviePlayerInfo';
import { SimilarFilms } from './SimilarFilms';
import CircularProgress from '@mui/joy/CircularProgress';import Tabs from '@mui/joy/Tabs';
import TabPanel from '@mui/joy/TabPanel';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';

export const VideoPlayer = ({ movie, movieDetails, setMovieDetails, setMovie, vidsrcLink, setVidsrcLink, userMovieDetails, setUserMovieDetails }) => {

    useEffect(() => {
        handleLoad();
    },[vidsrcLink]);
    const [loading, setLoading] = useState("")
    const [movieLinkExists, setMovieLinkExists] = useState("")
    const [imddbRating, setImdbRating] = useState("")
    const [tomatoesRating, setTomatoesRating] = useState("")
    const [letterboxdRating, setLetterboxdRating] = useState("")
    const [trailerLink, setTrailerLink] = useState("")
    const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    async function fetchRatingData () {
        await fetchRating("imdb")
        await fetchRating("letterboxd")
        await fetchRating("tomatoes")
    }

    async function fetchRating(provider) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ids: [movieDetails.imdb_id], provider: 'imdb'})
        }
        const response = await fetch(`https://mdblist.com/api/rating/movie/${provider}?apikey=pypak0syvvcmct2xh9jgmk5cc`, requestOptions)
        const decodedJson = await response.json();
        switch(provider) {
            case 'imdb':
                setImdbRating(decodedJson.rating[movieDetails.imdb_id])
                break
            case 'letterboxd':
                setLetterboxdRating(decodedJson.rating[movieDetails.imdb_id])
                break
            case 'tomatoes':
                setTomatoesRating(decodedJson.rating[movieDetails.imdb_id])
                break
          }

    }

    async function fetchTrailerLink() {
         const requestOptions = {
             method: 'GET'
        }
        const response = await fetch (`https://www.googleapis.com/youtube/v3/search?key=AIzaSyAvxMuC2Uj5R1m2PBkYcry5jvPpk5A9aJQ&part=snippet&q=${movieDetails.title} ${new Date(movieDetails.release_date).getFullYear()} trailer&maxResults=1`, requestOptions)
        const decodedJson = await response.json();
        setTrailerLink(`https://www.youtube.com/embed/${decodedJson.items[0].id.videoId}?si=BTdMl5AR78MP5CB-`)
    }

     
    async function handleLoad () {
        setMovieLinkExists(false)
        if (movie) {
            setLoading(true)
            const response = await fetch(`https://scraping.narf.ai/api/v1/?api_key=3oOBaxU9pIJZTS2nRsST2sr091x7GoAPpKkkK8PyTJJjhbGu7v8abc9BOq2blsiqfgEpL6UDfmPimYBEQH&url=https://vidsrc.xyz/embed/movie?imdb=${movieDetails.imdb_id}`)
            const decodedJson = await response.text();
            if (decodedJson.includes("<title>404 Not Found</title>")) {
                localStorage.setItem(movie.id, movie.title)
                setMovieDetails()
                setUserMovieDetails()
                setVidsrcLink()
                setMovie()
                setMovieLinkExists(false)
                setLoading(false)
                

            }
            else {
                console.log(userMovieDetails.rated)
                fetchRatingData()
                fetchTrailerLink()
                setMovieLinkExists(true)
                setLoading(false)
            }
        }
        
        
    }

    return (
        <div className='container' >
            {loading==true && <div className='center-screen'> <CircularProgress /> </div>}
            {movieLinkExists==true &&
            <div>

            <div>
                <Tabs aria-label="tabs"  defaultValue={0} sx={{ bgcolor: 'transparent' }}>
                    <TabList
                        // disableUnderline
                        sx={{
                            pt: 1,
                            justifyContent: 'center',
                            [`&& .${tabClasses.root}`]: {
                              flex: 'initial',
                              bgcolor: 'transparent',
                              '&:hover': {
                                bgcolor: 'transparent',
                              },
                              [`&.${tabClasses.selected}`]: {
                                color: 'primary.plainColor',
                                '&::after': {
                                  height: 2,
                                  borderTopLeftRadius: 3,
                                  borderTopRightRadius: 3,
                                  bgcolor: 'primary.500',
                                },
                              },
                            },
                          }}
                    >
                        <Tab disableIndicator value={0}>Film</Tab>
                        <Tab disableIndicator value={1}>Trailer</Tab>
                        <Tab disableIndicator value={2}>Similar Films</Tab>
                    </TabList>
                    <TabPanel value={0}>
                        <div>
                        <div className='video-player'>
                            <iframe className='video-player' id="video-player" src={vidsrcLink} frameborder="0" allowFullScreen ></iframe>
                        </div>
                        <div className='movie-info-container'>
                            <MoviePlayerInfo movieDetails={movieDetails} imddbRating={imddbRating} tomatoesRating={tomatoesRating} letterboxdRating={letterboxdRating} userMovieDetails={userMovieDetails} setUserMovieDetails={setUserMovieDetails} />
                        </div>
                        </div>
                    </TabPanel>

                    <TabPanel value={1}>
                        <div>
                        <div className='video-player'>
                            <iframe className='video-player' src={trailerLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                        <div className='movie-info-container'>
                            <MoviePlayerInfo movieDetails={movieDetails} imddbRating={imddbRating} tomatoesRating={tomatoesRating} letterboxdRating={letterboxdRating} userMovieDetails={userMovieDetails} setUserMovieDetails={setUserMovieDetails} />
                        </div>
                        </div>
                    </TabPanel>

                    <TabPanel value={2}>
                        <SimilarFilms movieDetails={movieDetails} setVidsrcLink={setVidsrcLink} setMovieDetails={setMovieDetails} />
                    </TabPanel>
                </Tabs>


                
            </div>
            
            
            </div>
            }
            
        </div>
        
    )
}
