import "./FilmDetails.css";
import { FilmInfo } from './FilmInfo';
import { SimilarFilms } from './SimilarFilms';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabPanel from '@mui/joy/TabPanel';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';

export const FilmDetails = ({ film, loading, error, onOpenFilm, onUserChange }) => {

    if (loading) {
        return <div className='film-details'><div className='center-screen'> <CircularProgress /> </div></div>
    }
    if (error) {
        return <div className='film-details'><div className='center-screen'> <Typography level="body-md">{error}</Typography> </div></div>
    }
    if (!film) {
        return <div className='film-details' />
    }

    return (
        <div className='film-details' >
            {/* Keyed by film so the tabs return to Overview when another film opens */}
            <Tabs key={film.id} aria-label="tabs"  defaultValue={0} sx={{ bgcolor: 'transparent' }}>
                <TabList
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
                    <Tab disableIndicator value={0}>Overview</Tab>
                    <Tab disableIndicator value={1}>Similar Films</Tab>
                </TabList>
                <TabPanel value={0}>
                    {film.trailer &&
                    <div className='trailer'>
                        <iframe className='trailer' src={`https://www.youtube.com/embed/${film.trailer}`} title={`${film.title} trailer`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    }
                    <div className='movie-info-container'>
                        <FilmInfo film={film} onUserChange={onUserChange} />
                    </div>
                </TabPanel>

                <TabPanel value={1}>
                    <SimilarFilms filmId={film.id} onOpenFilm={onOpenFilm} />
                </TabPanel>
            </Tabs>
        </div>
    )
}
