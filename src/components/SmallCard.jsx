import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import LocationPin from '../assets/images/LocationPinIcon.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FacilitiesCard from './FacilitesCard';
import moment from 'moment';
const SmallCard = ({
  // name,
  location,
  price,
  handleCardPress,
  handleHeartPress,
  ukey,
  imageUri,
  bedroom,
  bathroom,
  carpetArea,
  createdAt,
  type,
}) => {
  const daysSinceListed = moment().diff(createdAt, 'days');

  const formatPriceInIndianStyle = () => {
    return new Intl.NumberFormat('en-IN').format(price);
  };
  return (
    <Pressable
      key={ukey}
      onPress={handleCardPress}
      className="w-[260px] rounded-lg shadow-lg bg-white border border-[#d6d6d6] mr-3">
      <View className="bg-[#d1eddb] px-3 rounded-md top-2 left-2  absolute z-10">
        <Text className="text-[#16a34a]">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Text>
      </View>
      <View className=" items-center">
        <Image
          source={{uri: imageUri}}
          resizeMode="cover"
          className="w-full h-[150px] items-center rounded-t-md"
        />
      </View>
      <View className="mx-3 my-2">
        <Text className="font-pbold  text-black ">
          ₹ {formatPriceInIndianStyle(price)}
        </Text>
        <View className="flex-row items-center">
          <View className="mb-1 mr-1">
            <LocationPin />
          </View>
          <Text className="font-pregular text-black-200">{location}</Text>
        </View>
        <View className="flex-row justify-between">
          <FacilitiesCard iconName={'bed'} text={bedroom} />
          <FacilitiesCard iconName={'shower'} text={bathroom} />
          <FacilitiesCard iconName={'square-foot'} text={carpetArea} />
        </View>
        <View className="mt-1">
          <Text className="font-pregular text-[#aaaaaa]">
            Listed {daysSinceListed} days ago
          </Text>
        </View>

        <View className="flex-row justify-between items-center ">
          {/* <Pressable onPress={handleHeartPress}>
            <Icon name="heart" size={30} color={'black'} />
          </Pressable> */}
        </View>
      </View>
    </Pressable>
  );
};

export default SmallCard;
