import {View, Text} from 'react-native';
import React from 'react';
import GooglePlacesInput from '../../components/GooglePlacesInput';

const SearchCity = ({navigation}) => {
  return (
    <View className="flex-1">
      <GooglePlacesInput navigation={navigation} />
    </View>
  );
};

export default SearchCity;
