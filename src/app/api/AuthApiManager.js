import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

const getBaseURL = () => {
  if (Platform.OS === 'android') {
    return (
      // 'http://10.0.2.2:6000/api/v1/users' ||
      'https://realestate-backend-bosp.onrender.com/api/v1/users'
      // 'http://192.168.0.248:6000/api/v1/users'
    ); // Android emulator
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

export const getCurrentUser = () => {
  return AuthApiManager.get('/current-user');
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

export default AuthApiManager;
