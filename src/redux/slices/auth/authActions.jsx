import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  authStart,
  authSuccess,
  authFailure,
  logout,
  authTokenFound,
  currentUserDetails,
  newAccessAndRefreshToken,
} from './authSlice';
import {
  createUser,
  signIn,
  signOut,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
} from '../../../app/api/AuthApiManager';

import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCurrentUserDetails = createAsyncThunk(
  'auth/currentUser',
  async (token, {dispatch}) => {
    try {
      const response = await getCurrentUser(token);
      dispatch(currentUserDetails({user: response.data.data}));
    } catch (error) {
      console.log(error.response);
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
    console.log(email, password);

    try {
      dispatch(authStart());
      const response = await signIn(email, password);
      console.log(response);

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
      });
      dispatch(authSuccess(response.data));
    } catch (error) {
      // Log detailed error information
      if (error.response) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: `Error: ${
            error.response.data.message || 'Something went wrong.'
          }`,
        });

        dispatch(authFailure(error.response.data.message || 'Login failed.'));
      } else if (error.request) {
        console.log('Error request:', error.request);
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2:
            'No response from server. Please check your network connection.',
        });

        dispatch(authFailure('No response from server.'));
      } else {
        console.log('Error message:', error.message);
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: error.message,
        });
        dispatch(authFailure(error.message));
      }
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

export const getNewAccessToken = createAsyncThunk(
  'auth/newTokens',
  async (token, {dispatch}) => {
    try {
      const response = await refreshAccessToken(token);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  },
);
