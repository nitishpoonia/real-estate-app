import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
// import {images} from '../constants';
// import Icon from 'react-native-vector-icons/Ionicons';
const LongCard = ({
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
      className=" shadow-lg rounded-lg flex-row  bg-white justify-between mb-2">
      <View className=" flex-row rounded-xl">
        <Image
          source={{uri: imageUri}}
          className="w-[170px] mr-2 h-[130px] rounded-l-md"
        />

        <View className="mt-2">
          <Text className="font-pbold text-black">{name}</Text>
          <Text className="font-pregular text-black-200">{location}</Text>
          <Text className="font-psemibold text-black-200">{price}</Text>
        </View>
      </View>

      {/* <View className="">
        <Pressable onPress={handleHeartPress} className="mt-2 mr-2">
          <Icon name="heart" size={30} color={'black'} />
        </Pressable>
      </View> */}
    </Pressable>
  );
};

export default LongCard;
