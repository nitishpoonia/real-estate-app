import {createAsyncThunk} from '@reduxjs/toolkit';
import {authStart, authSuccess, authFailure, logout} from './authSlice';
import {createUser, signIn, signOut} from '../../../api/AuthApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({email, password}, {dispatch}) => {
    try {
      dispatch(authStart());
      const response = await signIn(email, password);
      const {user, refreshToken} = response.data.data;
      console.log(response.data.data);

      await AsyncStorage.setItem('accessToken', user);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      dispatch(authSuccess(response.data));
    } catch (error) {
      dispatch(authFailure(error.response?.data?.message || error.message));
    }
  },
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (data, {dispatch}) => {
    try {
      dispatch(authStart());
      const {email, password} = data;
      console.log(data.email, data.password);

      const response = await createUser(data);
      dispatch(loginUser(email, password));

      dispatch(authSuccess(response.data));
    } catch (error) {
      dispatch(authFailure(error.response?.data?.message || error.message));
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, {dispatch}) => {
    try {
      await signOut();
      dispatch(logout());
    } catch (error) {
      dispatch(authFailure(error.response?.data?.message || error.message));
    }
  },
);
