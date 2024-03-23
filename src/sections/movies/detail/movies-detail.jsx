import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Card, Alert, Button, Divider, Snackbar } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { selectMovieById } from 'src/redux/slices/movieSlice';
import localStorageService from 'src/services/local-storage.service';
import { ALL_MOVIES_KEY, FAVOURITE_MOVIE_KEY } from 'src/constants/movie.constant';

import PosterMovie from '../poster-movie';

// ----------------------------------------------------------------------

export default function MovieDetailView() {
  const params = useParams('movieId');
  const router = useRouter()

  const [snackBarState, setSnackBarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = snackBarState;

  const handleSnackbarClose = () => {
    setSnackBarState((pre) => ({ ...pre, open: false }));
  };

  const [movies] = useLocalStorage(ALL_MOVIES_KEY, []);
  let movie = useSelector((state) => selectMovieById(state, +params.movieId));

  if (!movie) {
    movie = movies.find((mv) => +mv.id === +params.movieId);
  }

  const [favouriteMovies] = useLocalStorage(FAVOURITE_MOVIE_KEY, []);
  const addToFavourite = () => {
    const existMovie = favouriteMovies?.findIndex((mv) => +mv.id === +movie.id);
    if (existMovie === -1) {
      favouriteMovies.push(movie);
      localStorageService.set(FAVOURITE_MOVIE_KEY, favouriteMovies);
      setSnackBarState((pre) => ({ ...pre, open: true }));
    }
  };
  return (
    movie && (
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
         <Button target="_blank" variant="contained" color="secondary" onClick={() => {router.back()}}>
            Back
          </Button>
          <Typography variant="h4">{movie.title_en}</Typography>
          <Button target="_blank" variant="contained" color="secondary" onClick={addToFavourite}>
            Add to Favourite
          </Button>
        </Stack>

        <Grid container spacing={3}>
          <PosterMovie key={movie.id} movie={movie} index={0} />

          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <Stack spacing={2}>
                <Typography p>Title: {movie.title_en}</Typography>
                <Typography p>{movie.synopsis_en}</Typography>
                <Divider />
                <Typography p>Director: {movie.director}</Typography>
                <Typography p>Actor: {movie.actor.replace('/', ', ')}</Typography>
                <Divider />
                <Typography p>Genre: {movie.genre}</Typography> <Divider />
                <Typography p>Rating: {movie.rating}</Typography> <Divider />
                <Typography p>Duration: {movie.duration} minutes</Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleSnackbarClose}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Added to favourite
          </Alert>
        </Snackbar>
      </Container>
    )
  );
}
