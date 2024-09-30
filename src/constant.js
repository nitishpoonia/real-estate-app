import {Dimensions} from 'react-native';

// Get the device width and height once
const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

// Export constants
export const WIDTH = DEVICE_WIDTH;
export const HEIGHT = DEVICE_HEIGHT;
