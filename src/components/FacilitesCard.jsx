import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // or any other icon library you are using

const FacilitiesCard = ({iconName, text}) => {
  return (
    <View className="flex-row items-center border px-2 border-[#d9d9d9] rounded-md">
      <Icon name={iconName} size={20} color="black" />
      <Text className="ml-1 text-black">{text}</Text>
    </View>
  );
};

export default FacilitiesCard;
