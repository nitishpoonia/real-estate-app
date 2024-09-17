import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

const getBaseURL = () => {
  if (Platform.OS === 'android') {
    return (
      //   'http://10.0.2.2:6000/api/v1/users' ||
      'http://192.168.0.246:6000/api/v1/users'
    ); // Android emulator
  } else if (Platform.OS === 'ios') {
    return 'http://localhost:6000/api/v1/users';
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

export const signIn = (email, password) => {
  return _post('/login', {email, password});
};

export const forgotPassword = email => {
  return _post('/forgotpassword', {email});
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
