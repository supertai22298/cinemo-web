/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import movieService from 'src/services/movies.service';
import { ALL_MOVIES_KEY } from 'src/constants/movie.constant';
import localStorageService from 'src/services/local-storage.service';

export const fetchAllMovies = createAsyncThunk('movies/fetchAllMovies', async () => {
  const movies = await movieService.getAllMovie();
  return movies;
});

const initialState = {
  loading: false,
  data: [],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // Handling the pending state
      .addCase(fetchAllMovies.pending, (state) => {
        state.loading = true;
      })
      // Handling the fulfilled state
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        localStorageService.set(ALL_MOVIES_KEY, action.payload)
      });
  },
});

export const movieActions = { ...movieSlice.actions, fetchAllMovies };

export default movieSlice.reducer;

export const selectMovieById = (state, id) => state.movies.data.find((movie) => movie.id === id);
