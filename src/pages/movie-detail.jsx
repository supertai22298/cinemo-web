import { Helmet } from 'react-helmet-async';

import { MovieDetailView } from 'src/sections/movies/detail';


// ----------------------------------------------------------------------

export default function MoviesPage() {
  return (
    <>
      <Helmet>
        <title> Movies Detail | Cinemo web </title>
      </Helmet>

      <MovieDetailView />
    </>
  );
}
