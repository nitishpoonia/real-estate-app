import {configureStore} from '@reduxjs/toolkit';
import formSlice from './slices/formSlice';
import authSlice from './slices/auth/authSlice';
const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
