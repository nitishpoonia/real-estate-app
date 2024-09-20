import axios from 'axios';
import {Platform} from 'react-native';

const getBaseURL = () => {
  if (Platform.OS === 'android') {
    // return 'http://10.0.2.2:6000/api/v1/property';
    return 'https://realestate-backend-bosp.onrender.com/api/v1/favorite';
  } else if (Platform.OS === 'ios') {
    return 'https://realestate-backend-bosp.onrender.com/api/v1/favorite';
  }
};
const FavoritePropertyManager = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const saveToFavorite = (userId, itemId) => {
  return FavoritePropertyManager.post('/addfavorite', {userId, itemId});
};

export const removeFromFavorite = (userId, itemId) => {
  return FavoritePropertyManager.delete('/removefavorite', {userId, itemId});
};

export const getFavorites = (userId, itemId) => {
  return FavoritePropertyManager.get('/status', {userId, itemId});
};

export default FavoritePropertyManager;
