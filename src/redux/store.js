/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import movieReducer from './slices/movieSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
  },
});
