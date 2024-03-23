import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import DashboardLayout from 'src/layouts/dashboard';

import PrivateRoute from './private-route';

export const IndexPage = lazy(() => import('src/pages/app'));
export const MoviesPage = lazy(() => import('src/pages/movies'));
export const MovieDetailPage = lazy(() => import('src/pages/movie-detail'));
export const FavouritePage = lazy(() => import('src/pages/favourite'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <PrivateRoute>
          <DashboardLayout>
            <Suspense
              fallback={
                <Box
                  sx={{
                    display: 'flex',
                    height: '600px',
                    width: '600px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
              }
            >
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </PrivateRoute>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'movies', element: <MoviesPage /> },
        { path: 'movies/:movieId', element: <MovieDetailPage /> },
        { path: 'my-favourite', element: <FavouritePage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
