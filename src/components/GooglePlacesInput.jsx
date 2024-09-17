import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {setLocation} from '../redux/slices/addProduct/addProductSlice';
import {useDispatch} from 'react-redux';

const GooglePlacesInput = () => {
  const dispatch = useDispatch();
  return (
      <GooglePlacesAutocomplete
        placeholder="Location"
        onPress={(data, details = null) => {
          console.log(data);
          dispatch(setLocation(data.description));
        }}
        enablePoweredByContainer={false}
        query={{
          key: process.env.GOOGLE_API,
          language: 'en',
          components: 'country:in',
        }}
        debounce={200}
      />
  );
};

export default GooglePlacesInput;
