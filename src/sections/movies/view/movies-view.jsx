import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { selectMovies, fetchAllMovies, selectLoadingMovies } from 'src/redux/slices/movieSlice';

import Loading from 'src/components/loading/loading';

import MovieSort from '../movie-sort';
import PosterMovie from '../poster-movie';
import MovieSearch from '../movie-search';

// ----------------------------------------------------------------------

export default function MoviesView() {
  const dispatch = useDispatch();

  const movies = useSelector(selectMovies);
  const loading = useSelector(selectLoadingMovies);

  useEffect(() => {
    dispatch(fetchAllMovies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

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

      {movies.length > 0 && (
        <Grid container spacing={3}>
          {movies.map((movie, index) => (
            <PosterMovie key={movie.id} movie={movie} index={index} />
          ))}
        </Grid>
      )}
    </Container>
  );
}
