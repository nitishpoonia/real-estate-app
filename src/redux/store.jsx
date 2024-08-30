import {configureStore} from '@reduxjs/toolkit';
import formSlice from './slices/formSlice';
import authSlice from './slices/auth/authSlice';
import bookingSlice from './slices/bookingSlice';
import ProductSlice from './slices/product/ProductSlice';

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    auth: authSlice.reducer,
    booking: bookingSlice.reducer,
    product: ProductSlice.reducer,
  },
});

export default store;
