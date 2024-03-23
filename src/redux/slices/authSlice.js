/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authService } from 'src/services/auth.service';
import { AUTHENTICATE_KEY } from 'src/constants/auth.constant';
import sessionStorageService from 'src/services/session-storage.service';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  errorMsg: null,
};

export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  const response = await authService.login(username, password);
  return response;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAlready(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errorMsg = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { success, user, error } = action.payload;
        state.loading = false;
        if (success) {
          state.errorMsg = null;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          // Store only necessary data in session storage
          sessionStorageService.set(AUTHENTICATE_KEY, {
            isAuthenticated: true,
            user,
          });
        } else {
          state.errorMsg = error;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        sessionStorageService.delete(AUTHENTICATE_KEY);
      });
  },
});

export const authActions = { ...authSlice.actions, login, logout };

export default authSlice.reducer;

export const selectLoginedUser = (state) => state.auth.user;
export const selectAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoading = (state) => state.auth.loading;
export const selectErrorMsg = (state) => state.auth.errorMsg;
