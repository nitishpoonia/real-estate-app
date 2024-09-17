import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {images} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
const SmallCard = ({
  name,
  location,
  price,
  handleCardPress,
  handleHeartPress,
  ukey,
  imageUri,
}) => {

  return (
    <Pressable
      key={ukey}
      onPress={handleCardPress}
      className="w-[240px] rounded-lg shadow-lg bg-white mr-3">
      <View className=" items-center">
        <Image
          source={{uri: imageUri}}
          resizeMode="cover"
          className="w-full h-[150px] items-center rounded-t-md"
        />
      </View>
      <View className="mx-3 my-2">
        <Text className="font-pbold  text-black ">{name}</Text>
        <Text className="font-pregular text-black-200">{location}</Text>
        <View className="flex-row justify-between items-center ">
          <Text className="font-psemibold text-black-200">{price}</Text>
          {/* <Pressable onPress={handleHeartPress}>
            <Icon name="heart" size={30} color={'black'} />
          </Pressable> */}
        </View>
      </View>
    </Pressable>
  );
};

export default SmallCard;
