import {configureStore} from '@reduxjs/toolkit';
import formSlice from './slices/formSlice';
import authSlice from './slices/auth/authSlice';
import bookingSlice from './slices/bookingSlice';
import ProductSlice from './slices/product/ProductSlice';
import addProductSlice from './slices/addProduct/addProductSlice';

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    auth: authSlice.reducer,
    booking: bookingSlice.reducer,
    product: ProductSlice.reducer,
    addProduct: addProductSlice.reducer,
  },
});

export default store;
