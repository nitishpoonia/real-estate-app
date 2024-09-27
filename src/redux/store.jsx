import {configureStore} from '@reduxjs/toolkit';
import formSlice from './slices/formSlice';
import authSlice from './slices/auth/authSlice';
import bookingSlice from './slices/bookingSlice';
import ProductSlice from './slices/product/ProductSlice';
import addProductSlice from './slices/ManageProductSlice/addProductSlice';
import filterOptionsSlice from './slices/filter/filterOptionsSlice';
import favoritesSlice from './slices/favoriteSlice';
import uploadSlice from './slices/product/UploadProgressSlice';

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    auth: authSlice.reducer,
    booking: bookingSlice.reducer,
    product: ProductSlice.reducer,
    addProduct: addProductSlice.reducer,
    filterOptions: filterOptionsSlice.reducer,
    favorites: favoritesSlice.reducer,
    uploadProgress: uploadSlice.reducer,
  },
});

export default store;
