import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useDispatch} from 'react-redux';
import {setLocation} from '../redux/slices/addProduct/addProductSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const GooglePlacesInput = ({navigation}) => {
  const dispatch = useDispatch();
  const googlePlacesRef = useRef(null);
  const [readableAddress, setReadableAddress] = useState('');

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
    <View className="flex-1 px-2">
      <Text className="text-black font-psemibold text-lg">Search Location</Text>
      <GooglePlacesAutocomplete
        ref={googlePlacesRef}
        placeholder="Location"
        onPress={(data, details = null) => {
          dispatch(setLocation(data.description));
          navigation.goBack();
        }}
        enablePoweredByContainer={false}
        query={{
          key: process.env.GOOGLE_API,
          language: 'en',
          components: 'country:in',
        }}
        debounce={200}
        styles={{
          placeholder: {
            color: 'black',
          },
          textInputContainer: {
            borderColor: '#ddd',
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: '#fff',
          },
          textInput: {
            color: 'black',
          },
          listView: {
            backgroundColor: '#fff',
          },
          description: {
            fontSize: 16,
            color: 'black',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
      />
      <TouchableOpacity
        className={'flex-row items-center'}
        onPress={handleLocation}>
        <Icon name="my-location" size={20} color="blue" />
        <Text className={'text-blue-500 text-base ml-2'}>Current Location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GooglePlacesInput;
