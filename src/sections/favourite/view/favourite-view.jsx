import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { FAVOURITE_MOVIE_KEY } from 'src/constants/movie.constant';

import PosterMovie from 'src/sections/movies/poster-movie';

// ----------------------------------------------------------------------

export default function FavouriteView() {
  const [movies] = useLocalStorage(FAVOURITE_MOVIE_KEY, []);

  useEffect(() => {
    console.log('movies', movies);
  }, [movies]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">My favourite movies</Typography>
      </Stack>

      <Grid container spacing={3}>
        {movies.map((movie, index) => (
          <PosterMovie key={movie.id} movie={movie} index={3} />
        ))}
      </Grid>
    </Container>
  );
}
