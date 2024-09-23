import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  authStart,
  authSuccess,
  authFailure,
  logout,
  authTokenFound,
  currentUserDetails,
} from './authSlice';
import {
  createUser,
  signIn,
  signOut,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} from '../../../app/api/AuthApiManager';

import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCurrentUserDetails = createAsyncThunk(
  'auth/currentUser',
  async (_, {dispatch}) => {
    try {
      const response = await getCurrentUser();
      dispatch(currentUserDetails({user: response.data.data}));
    } catch (error) {
      console.log(error);
    }
  },
);

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

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
      });
      dispatch(authSuccess(response.data));
    } catch (error) {
      console.log(error.response);
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
      console.log(error);
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

export const forgotPasswordAction = createAsyncThunk(
  'auth/forgotPassword',
  async ({email}, {dispatch}) => {
    try {
      await forgotPassword(email);
      Toast.show({
        type: 'success',
        text1: 'Password Reset Email Sent',
        text2: 'Please check your email to reset your password',
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to send reset password email. Please try again.',
      });
    }
  },
);

export const resetPasswordAction = createAsyncThunk(
  'auth/resetPassword',
  async ({token, newPassword}, {dispatch}) => {
    try {
      await resetPassword(token, newPassword);
      Toast.show({
        type: 'success',
        text1: 'Password Reset Successful',
        text2: 'Your password has been reset successfully!',
      });
    } catch (err) {
      console.log(err.response);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${err.message}`,
      });
    }
  },
);
