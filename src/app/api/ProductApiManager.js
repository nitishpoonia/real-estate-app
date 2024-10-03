import axios from 'axios';
import {Platform} from 'react-native';

const getBaseURL = () => {
  if (Platform.OS === 'android') {
    // return 'http://10.0.2.2:6000/api/v1/property';
    return 'https://realestate-backend-bosp.onrender.com/api/v1/property';
    // return 'http://192.168.0.169:6000/api/v1/property';
  } else if (Platform.OS === 'ios') {
    return 'https://realestate-backend-bosp.onrender.com/api/v1/property';
  }
};
const ProductApiManager = axios.create({
  baseURL: getBaseURL(),
});

export default ProductApiManager;
