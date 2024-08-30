import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
const AmenitiesCard = ({icon, title}) => {
  return (
    <View className="bg-[#2E8B57] flex-row w-[85px] justify-evenly items-center rounded-full px-2 py-2 mr-2">
      <Icon name={icon} size={20} color={'#fff'} />
      <Text className="text-white">{title}</Text>
    </View>
  );
};

export default AmenitiesCard;
