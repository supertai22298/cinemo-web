import { Helmet } from 'react-helmet-async';

import MoviesView from 'src/sections/movies/view/movies-view';

// ----------------------------------------------------------------------

export default function MoviesPage() {
  return (
    <>
      <Helmet>
        <title> Movies Finder | Cinemo web </title>
      </Helmet>

      <MoviesView />
    </>
  );
}
