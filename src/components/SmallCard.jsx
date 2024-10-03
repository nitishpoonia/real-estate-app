import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import LocationPin from '../assets/images/LocationPinIcon.svg';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import FacilitiesCard from './FacilitesCard';
import moment from 'moment';
import PropertyTypeCard from './PropertyTypeCard';
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
  category,
  containerStyles,
}) => {
  const daysSinceListed = moment().diff(createdAt, 'days');

  const formatPriceInIndianStyle = () => {
    return new Intl.NumberFormat('en-IN').format(price);
  };
  return (
    <Pressable
      key={ukey}
      onPress={handleCardPress}
      className={` rounded-lg shadow-lg bg-white border border-[#d6d6d6] ${containerStyles}`}>
      <View className="bg-[#d1eddb] px-3 rounded-md top-2 left-2  absolute z-10">
        <Text className="text-[#16a34a]">
          {type?.charAt(0)?.toUpperCase() + type?.slice(1)}
        </Text>
      </View>
      <View className=" items-center">
        <Image
          source={{uri: imageUri}}
          resizeMode="cover"
          className="w-full h-[150px] items-center rounded-t-md"
        />
      </View>
      <View className="mx-2 my-2">
        <View className="">
          <PropertyTypeCard
            category={category}
            containerStyles={'mx-1 rounded-md w-1/3'}
            textStyles={'text-sm'}
          />
        </View>
        <Text className="font-pbold  text-black">
          ₹ {formatPriceInIndianStyle(price)}
        </Text>
        <View className="flex-row items-center">
          <View className="mb-1 mr-1">
            <LocationPin />
          </View>
          <Text className="font-pregular text-black-200 my-1">{location}</Text>
        </View>
        {category !== 'plot' ? (
          <View className="flex-row justify-between">
            <FacilitiesCard iconName={'bed'} text={bedroom} />
            <FacilitiesCard iconName={'shower'} text={bathroom} />
            <FacilitiesCard iconName={'square-foot'} text={carpetArea} />
          </View>
        ) : null}

        <View className="mt-2">
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
