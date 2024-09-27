import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  console.log('singin');

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

// Add a response interceptor to handle token refresh
AuthApiManager.interceptors.response.use(
  response => response, // If the response is successful, just return it
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // Prevent retry loops
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken(); // Attempt to refresh token
        originalRequest.headers['Authorization'] = `${newAccessToken}`; // Add new token to the original request
        return AuthApiManager(originalRequest); // Retry the original request
      } catch (err) {
        // Token refresh failed, log the user out or take other action
        console.error('Unauthorized: token refresh failed', err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error); // Pass other errors through
  },
);

export default AuthApiManager;
