import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
const PropertyTypeCard = ({category}) => {
  switch (category) {
    case 'villa':
      return (
        <View className="flex-row rounded-2xl bg-[#c8e3d2] items-center py-1 justify-center">
          <View className="mb-1">
            <Icon name="house" size={20} color={'#16a34a'} />
          </View>
          <Text className="text-[#16a34a] text-base font-pmedium">Villa</Text>
        </View>
      );
    case 'flat':
      return (
        <View className="flex-row rounded-2xl bg-[#c8e3d2] items-center py-1 justify-center">
          <View className="mb-1">
            <Icon name="apartment" size={20} color={'#16a34a'} />
          </View>
          <Text className="text-[#16a34a] text-base font-pmedium">Flat</Text>
        </View>
      );
    case 'plot':
      return (
        <View className="flex-row rounded-2xl bg-[#c8e3d2] items-center py-1 justify-center">
          <View className="mb-1">
            <Icon name="landscape" size={20} color={'#16a34a'} />
          </View>
          <Text className="text-[#16a34a] text-base font-pmedium">Plot</Text>
        </View>
      );
    case 'house':
      return (
        <View className="flex-row rounded-2xl bg-[#c8e3d2] items-center py-1 justify-center">
          <View className="mb-1">
            <Icon name="house" size={20} color={'#16a34a'} />
          </View>
          <Text className="text-[#16a34a] text-base font-pmedium">House</Text>
        </View>
      );
  }
};

export default PropertyTypeCard;
