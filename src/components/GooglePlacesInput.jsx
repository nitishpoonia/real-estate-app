import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useDispatch, useSelector} from 'react-redux';
import {setLocation} from '../redux/slices/ManageProductSlice/addProductSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

const GooglePlacesInput = ({navigation}) => {
  const dispatch = useDispatch();
  const googlePlacesRef = useRef(null);
  const [readableAddress, setReadableAddress] = useState('');
  const {location} = useSelector(state => state.addProduct);
  console.log(location);

  const handleLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        try {
          const {latitude, longitude} = position.coords;
          const response = await Geocoder.from(latitude, longitude);
          const addressComponent = response.results[0].formatted_address;
          setReadableAddress(addressComponent);
          dispatch(setLocation(addressComponent));
          if (googlePlacesRef.current) {
            googlePlacesRef.current.setAddressText(readableAddress);
          }
        } catch (error) {
          console.warn('Error fetching address:', error);
        }
      },
      error => {
        console.log('Geolocation error:', error.code, error.message);
        Alert.alert('Error', 'Failed to get location. Please try again.');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  useEffect(() => {
    if (googlePlacesRef.current) {
      googlePlacesRef.current.focus();
    }
  }, []);
  return (
    <SafeAreaView className="flex-1 px-2">
      <Text className="text-black font-psemibold text-lg">Search Location</Text>
      <GooglePlacesAutocomplete
        ref={googlePlacesRef}
        placeholder="Location"
        onPress={(data, details = null) => {
          dispatch(setLocation(data.description));
          navigation.goBack();
        }}
        value={location}
        styles={styles}
        enablePoweredByContainer={false}
        query={{
          key: process.env.GOOGLE_API,
          language: 'en',
          components: 'country:in',
        }}
        debounce={200}
      />
      <View className="flex-row my-4 justify-between px-4 py-2 rounded-lg ">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={handleLocation}>
          <Icon name="my-location" size={20} color="blue" />
          <Text className="text-blue-500 text-base ml-2">Current Location</Text>
        </TouchableOpacity>

        {location && (
          <TouchableOpacity className="bg-[#16a34a] m-auto px-4 py-2 rounded-lg">
            <Text className="text-white text-base">Done</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Make the background transparent
  },
  textInputContainer: {
    backgroundColor: 'white', // Minimalist white background
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 10,
    marginTop: 10,
    height: 45, // Keep the text input slim
  },
  textInput: {
    color: 'black', // Black text
    fontSize: 16, // Normal font size for readability
    height: 40, // Small input height
  },
  listView: {
    backgroundColor: 'white', // White list background for minimalism
    marginHorizontal: 10,
    borderRadius: 5,
  },
  row: {
    padding: 10, // Add some padding for easier touch input
    borderBottomWidth: 0.5,
    borderColor: '#ccc', // Light separator for rows
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 20,
  },
  description: {
    color: 'black', // Black text for descriptions
    fontSize: 14,
  },
  predefinedPlacesDescription: {
    color: 'black', // Black text for predefined places
  },
  separator: {
    height: 0.5,
    backgroundColor: '#ccc', // Minimal separator
  },
  poweredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  powered: {
    width: 100,
    height: 20,
  },
});
export default GooglePlacesInput;
