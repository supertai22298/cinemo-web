import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fetchAllMovies } from 'src/redux/slices/movieSlice';

import MovieSort from '../movie-sort';
import PosterMovie from '../poster-movie';
import MovieSearch from '../movie-search';

// ----------------------------------------------------------------------

export default function MoviesView() {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.data);

  useEffect(() => {
    console.log('movies', movies);
  }, [movies]);

  useEffect(() => {
    dispatch(fetchAllMovies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Movies Finder</Typography>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <MovieSearch movies={movies} />
        <MovieSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {movies.map((movie, index) => (
          <PosterMovie key={movie.id} movie={movie} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
