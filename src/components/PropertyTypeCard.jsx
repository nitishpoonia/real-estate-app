import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
const PropertyTypeCard = ({category, containerStyles, textStyles}) => {
  switch (category) {
    case 'villa':
      return (
        <View
          className={`flex-row items-center rounded-full my-1 bg-[#c8e3d2] justify-center ${containerStyles}`}>
          <View className="mr-2">
            <Icon name="villa" size={20} color="#16a34a" />
          </View>
          <Text
            className={`text-[#16a34a] text-base font-pmedium ${textStyles}`}>
            Villa
          </Text>
        </View>
      );
    case 'flat':
      return (
        <View
          className={`flex-row rounded-2xl my-1 bg-[#c8e3d2] px-3 w-[60px] justify-center items-center ${containerStyles}`}>
          <View className="">
            <Icon name="apartment" size={20} color={'#16a34a'} />
          </View>
          <Text
            className={`text-[#16a34a] text-base  font-pmedium ml-1 ${textStyles}`}>
            Flat
          </Text>
        </View>
      );
    case 'plot':
      return (
        <View
          className={`flex-row rounded-2xl my-1 bg-[#c8e3d2] w-[60px] justify-center items-center ${containerStyles}`}>
          <View className="">
            <Icon name="landscape" size={20} color={'#16a34a'} />
          </View>
          <Text
            className={`text-[#16a34a] text-base  font-pmedium ml-1 ${textStyles}`}>
            Plot
          </Text>
        </View>
      );
    case 'house':
      return (
        <View
          className={`flex-row rounded-2xl my-1 bg-[#c8e3d2] px-1 w-[80px] justify-center items-center ${containerStyles}`}>
          <View className="">
            <Icon name="house" size={20} color={'#16a34a'} />
          </View>
          <Text
            className={`text-[#16a34a] text-base  font-pmedium ml-1 ${textStyles}`}>
            House
          </Text>
        </View>
      );
  }
};

export default PropertyTypeCard;
