import axios from 'axios';
import {Platform} from 'react-native';

const getBaseURL = () => {
  if (Platform.OS === 'android') {
    // return 'http://10.0.2.2:6000/api/v1/property';
    return 'http://192.168.0.246:6000/api/v1/property';
  } else if (Platform.OS === 'ios') {
    return 'http://localhost:6000/api/v1/property';
  }
};
const ProductApiManager = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default ProductApiManager;
