import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  user: null,
  userType: null,
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
        AsyncStorage.setItem('refreshToken', action.payload.data.refreshToken);
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
    refreshTokenSuccess(state, action) {
      state.loading = false;
      state.token = action.payload.accessToken;
      AsyncStorage.setItem('accessToken', state.token);
    },
    currentUserDetails(state, action) {
      state.user = action.payload.user;
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    newAccessAndRefreshToken(state, action) {
      state.loading = false;
      const accessToken = action.payload.accessToken;
      const refreshToken = action.payload.refreshToken;
      AsyncStorage.setItem('accessToken', accessToken);
      AsyncStorage.setItem('refreshToken', refreshToken);
    },
    logout(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('user');
      AsyncStorage.removeItem('refreshToken');
    },
    setUserType(state, action) {
      state.userType = action.payload;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  logout,
  authTokenFound,
  setUserType,
  currentUserDetails,
  newAccessAndRefreshToken,
} = authSlice.actions;
export default authSlice;
