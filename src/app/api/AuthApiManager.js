import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
const getBaseURL = () => {
  if (Platform.OS === 'android') {
    // return 'http://10.0.2.2:6000/api/v1/users';
    // return 'https://realestate-backend-bosp.onrender.com/api/v1/users';
    return 'http://192.168.0.169:6000/api/v1/users';
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
export const refreshAccessToken = refreshToken => {
  return _post('/refresh-token', {refreshToken});
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

AuthApiManager.interceptors.response.use(
  response => response,
  async error => {
    console.log('inside interceptors');
    const originalRequest = error.config;
    if (error.response) {
      const {status, data} = error.response;
      if (
        status === 500 &&
        data.message === 'jwt expired' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `${newAccessToken}`;
          return AuthApiManager(originalRequest);
        } catch (refreshError) {
          console.error('Unauthorized: Token refresh failed', refreshError);
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default AuthApiManager;
