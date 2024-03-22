/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
