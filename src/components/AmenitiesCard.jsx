import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
const AmenitiesCard = ({icon, title}) => {
  return (
    <View className="flex w-[95px] rounded-lg border border-[#d6d6d6] pl-2 py-2 mr-2">
      <Icon name={icon} size={20} color={'#5F6368'} />
      <Text className="text-[#5F6368]">{title}</Text>
    </View>
  );
};

export default AmenitiesCard;
