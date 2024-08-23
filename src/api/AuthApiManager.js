import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthApiManager = axios.create({
    baseURL: 'http://10.0.2.2:6000/api/v1/users',
//   baseURL: 'http://192.168.0.246/api/v1/users',
  headers: {
    'Content-Type': 'application/json',
  },
});

const _post = (url, data, config = {}) => {
  return AuthApiManager.post(url, data, config);
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

// try to implement the api call
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
