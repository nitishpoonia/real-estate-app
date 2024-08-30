import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
const CustomUserInfoCard = ({iconL, title, iconR, handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="flex-row justify-between drop-shadow-lg px-2 items-center py-4 bg-[#fff] rounded-md">
        <View className="flex-row items-center">
          <Icon name={iconL} size={25} color={'black'} />
          <Text className="text-xl text-black font-pregular ml-3">{title}</Text>
        </View>

        <Icon name={iconR} size={25} color={'black'} />
      </View>
    </TouchableOpacity>
  );
};

export default CustomUserInfoCard;
