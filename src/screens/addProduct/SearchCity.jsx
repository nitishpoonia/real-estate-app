import {View, Text, Pressable} from 'react-native';
import React from 'react';
import GooglePlacesInput from '../../components/GooglePlacesInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
const SearchCity = ({navigation}) => {
  return (
    <View className="flex-1">
      <View className="my-3 flex-row items-center w-[62%] justify-between mx-2">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-[#16a34a] rounded-full">
          <Icon name={'chevron-left'} color="white" size={30} />
        </Pressable>
        <View>
          <Text className="text-[#16a34a] font-psemibold text-lg">
            Search Here
          </Text>
        </View>
      </View>
      <GooglePlacesInput navigation={navigation} />
    </View>
  );
};

export default SearchCity;
