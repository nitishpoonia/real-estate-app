// favoritesSlice.js
// TODO: Fix the favorite slice
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  saveToFavorite,
  removeFromFavorite,
  getFavorites,
} from '../../app/api/FavoritePropertyApiManager';

const initialState = {
  favorites: [],
  status: 'idle',
  error: null,
};

export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async ({userId, itemId}, {rejectWithValue}) => {
    try {
      const response = await saveToFavorite(userId, itemId);
      console.log(response.data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  },
);

export const removeFavorite = createAsyncThunk(
  'favorites/removeFavorite',
  async ({userId, itemId}, {rejectWithValue}) => {
    try {
      const response = await removeFromFavorite(userId, itemId);
      return response.data; // Assuming response contains the updated favorite list
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  },
);

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await getFavorites(userId);
      return response.data; // Assuming response contains the list of favorite items
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  },
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addFavorite.pending, state => {
        state.status = 'loading';
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload; // Update state with the new list
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeFavorite.pending, state => {
        state.status = 'loading';
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload; // Update state with the new list
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchFavorites.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload; // Update state with the fetched list
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default favoritesSlice;
