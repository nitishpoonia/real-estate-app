import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
      state.error = null;
    },
    authSuccess(state, action) {
      state.loading = false;
      if (action.payload.data.user) {
        state.isAuthenticated = true;
        state.token = action.payload.data.user;
        AsyncStorage.setItem('accessToken', action.payload.data.user);
        state.user = action.payload.data.loggedInUser;
      }
      state.user = action.payload.data.loggedInUser;
      const JSONUser = JSON.stringify(state.user);
      AsyncStorage.setItem('user', JSONUser);
    },
    authTokenFound(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    authFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('user');
    },
  },
});

export const {authStart, authSuccess, authFailure, logout, authTokenFound} =
  authSlice.actions;
export default authSlice;