import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reset} from './NavigationService';
import {logout} from '../../redux/slices/auth/authSlice'; 

let dispatch;

export const setDispatch = dispatchFunction => {
  dispatch = dispatchFunction;
};

export const logoutUser = () => {
  if (dispatch) {
    dispatch(logout());
    reset('Login');
  } else {
    console.error('Dispatch function is not set. Logout failed.');
  }
};
const getRefreshTokenFromStorage = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    return refreshToken;
  } catch (error) {
    console.error('Error retrieving refresh token from Async Storage', error);
  }
};

getRefreshTokenFromStorage();

import {Platform} from 'react-native';
const getBaseURL = () => {
  if (Platform.OS === 'android') {
    // return 'http://10.0.2.2:6000/api/v1/users';
    return 'https://realestate-backend-bosp.onrender.com/api/v1/users';
    // return 'http://192.168.0.169:6000/api/v1/users';
  } else if (Platform.OS === 'ios') {
    return 'https://realestate-backend-bosp.onrender.com/api/v1/users';
  }
};

const AuthApiManager = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

const _post = (url, data, config = {}) => {
  return AuthApiManager.post(url, data, config);
};

export const getListedBy = id => {
  return AuthApiManager.get(`/getusers/${id}`);
};

export const createUser = data => {
  return _post('/register', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getCurrentUser = accessToken => {
  return AuthApiManager.get('/current-user', {
    headers: {
      Authorization: `${accessToken}`,
    },
  });
};

export const signIn = (email, password) => {
  return _post('/login', {email, password});
};

export const forgotPassword = email => {
  return _post('/forgot-password', {email});
};

export const resetPassword = (token, password) => {
  return _post(`/reset-password?token=${token}`, {token: '', password});
};

export const signOut = async () => {
  try {
    const success = true;
    await AsyncStorage.removeItem('accessToken');
    return success;
  } catch (error) {
    console.error('Error in signOut function:', error);
    throw error;
  }
};

const refreshAccessToken = async refreshToken => {
  console.log('refresh token', refreshToken);

  try {
    const response = await _post('/refresh-token', {refreshToken});
    console.log('refresh access token function log', response);
    return response.data.data;
  } catch (error) {
    console.error('Failed to refresh access token:', error.response);
    throw error;
  }
};

const storeNewAccessToken = async newAccessToken => {
  try {
    await AsyncStorage.setItem('accessToken', newAccessToken);
    console.log('Access token updated in storage.');
  } catch (error) {
    console.error('Error storing new access token:', error);
  }
};

AuthApiManager.interceptors.response.use(
  response => response,
  async error => {
    if (error.response) {
      const {status, data} = error.response;
      if (
        status === 500 &&
        data.message === 'Refresh token is expired or used'
      ) {
        logoutUser();
        return Promise.reject(
          new Error('Refresh token expired or used. Logging out.'),
        );
      }

      if (status === 500 && data.message === 'jwt expired') {
        try {
          const refreshToken = await getRefreshTokenFromStorage();

          if (refreshToken) {
            const {accessToken} = await refreshAccessToken(refreshToken);
            console.log('Refreshed Access Token:', accessToken);
            await storeNewAccessToken(accessToken);
            error.config.headers.Authorization = `${accessToken}`;
            return AuthApiManager.request(error.config);
          } else {
            throw new Error('No refresh token available');
          }
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default AuthApiManager;
