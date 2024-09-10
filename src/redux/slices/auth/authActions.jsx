import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  authStart,
  authSuccess,
  authFailure,
  logout,
  authTokenFound,
} from './authSlice';
import {createUser, signIn, signOut} from '../../../app/api/AuthApiManager';

import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkLoggedIn = createAsyncThunk(
  'auth/checkLoggedIn',
  async (_, {dispatch}) => {
    try {
      dispatch(authStart());
      const token = await AsyncStorage.getItem('accessToken');
      const user = await AsyncStorage.getItem('user');
      if (token) {
        dispatch(authTokenFound(user));
      } else {
        dispatch(authFailure('No token found'));
      }
    } catch (error) {
      dispatch(authFailure(error.response?.data?.message || error.message));
    }
  },
);
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({email, password}, {dispatch}) => {
    try {
      dispatch(authStart());
      const response = await signIn(email, password);
      dispatch(authSuccess(response.data));
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
      });
    } catch (error) {
      dispatch(authFailure(error.response?.data?.message || error.message));
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.response?.data?.message || error.message,
      });
    }
  },
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (data, {dispatch}) => {
    try {
      dispatch(authStart());
      const response = await createUser(data);
      dispatch(authSuccess(response.data));
      Toast.show({
        type: 'success',
        text1: 'Signup Successful',
        text2: 'Your account has been created successfully!',
      });
    } catch (error) {
      dispatch(authFailure(error.response?.data?.message || error.message));
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error.response?.data?.message || error.message,
      });
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
