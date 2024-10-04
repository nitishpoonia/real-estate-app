import {View, Text, Image, Pressable, Dimensions} from 'react-native';
import React from 'react';
import LocationPin from '../assets/images/LocationPinIcon.svg';
import FacilitiesCard from './FacilitesCard';
import moment from 'moment';
import PropertyTypeCard from './PropertyTypeCard';
const {width: screenWidth} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from './CustomButton';
const LongCard = ({
  name,
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
  handleEditButtonPress,
  handleDeleteButtonPress,
  showEditAndDelete,
}) => {
  const daysSinceListed = moment().diff(createdAt, 'days');

  const formatPriceInIndianStyle = () => {
    return new Intl.NumberFormat('en-IN').format(price);
  };
  const cardWidth = screenWidth * 0.95;
  return (
    <Pressable
      key={ukey}
      onPress={handleCardPress}
      style={{width: cardWidth}}
      className=" rounded-lg shadow-lg bg-white border border-[#d6d6d6] mb-2">
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
        <View className="self-start">
          <PropertyTypeCard
            category={category}
            containerStyles={'py-1 rounded-md'}
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
        {category === 'plot' ? (
          <View className="w-[120px] justify-center my-1">
            <FacilitiesCard
              iconName={'square-foot'}
              text={`${carpetArea} sq. ft`}
            />
          </View>
        ) : (
          <View className="flex-row justify-between my-1">
            <FacilitiesCard iconName={'bed'} text={bedroom} />
            <FacilitiesCard iconName={'shower'} text={bathroom} />
            <FacilitiesCard iconName={'square-foot'} text={carpetArea} />
          </View>
        )}

        <View className="mt-2">
          <Text className="font-pregular text-[#aaaaaa]">
            Listed {daysSinceListed} days ago
          </Text>
        </View>

        {/* <View className="flex-row justify-between items-center ">
          <Pressable onPress={handleHeartPress}>
            <Icon name="heart" size={30} color={'black'} />
          </Pressable>
        </View> */}
        {showEditAndDelete && (
          <View className="">
            <CustomButton
              title={'Delete'}
              containerStyles={'bg-red-500 mr-3 h-10'}
              textStyles={'text-base font-pregular'}
              handlePress={handleDeleteButtonPress}
            />
            <CustomButton
              title={'Edit'}
              containerStyles={'px-2 bg-blue-500 h-10'}
              textStyles={'text-base font-pregular'}
              handlePress={handleEditButtonPress}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default LongCard;
