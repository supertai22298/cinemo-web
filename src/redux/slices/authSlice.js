/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';
import { AUTHENTICATE_KEY } from 'src/constants/auth.constant';
import sessionStorageService from 'src/services/session-storage.service';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      sessionStorageService.set(AUTHENTICATE_KEY, state);
    },
    logout(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      sessionStorageService.delete(AUTHENTICATE_KEY);
    },
  },
});

export const { login, loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
