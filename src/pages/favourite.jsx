import { Helmet } from 'react-helmet-async';

import { FavouriteView } from 'src/sections/favourite/view';

// ----------------------------------------------------------------------

export default function FavouritePage() {
  return (
    <>
      <Helmet>
        <title> User | Cinemo web </title>
      </Helmet>

      <FavouriteView />
    </>
  );
}
