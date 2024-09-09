import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PriceFilter from '../../components/filters/PriceFilter';
import PropertyType from '../../components/filters/PropertyType';
import Bedrooms from '../../components/filters/Bedrooms';
import Bathrooms from '../../components/filters/Bathrooms';
import Furnishing from '../../components/filters/Furnishing';
import Amenities from '../../components/filters/Amenities';
import CustomButton from '../../components/CustomButton';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

const FILTER_COMPONENTS = [
  {component: <PropertyType />, key: 'PropertyType'},
  {component: <PriceFilter />, key: 'PriceFilter'},
  {component: <Bedrooms />, key: 'Bedrooms'},
  {component: <Bathrooms />, key: 'Bathrooms'},
  {component: <Furnishing />, key: 'Furnishing'},
  {component: <Amenities />, key: 'Amenities'},
];

Geocoder.init('AIzaSyDQ5-YOrrKT4n7FUDhJYd1dLvOzBEq3eHw');

const SearchScreen = ({navigation}) => {
  const [readableAddress, setReadableAddress] = useState('');

  const handleLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        try {
          const {latitude, longitude} = position.coords;
          const response = await Geocoder.from(latitude, longitude);
          const addressComponent = response.results[0].formatted_address;
          setReadableAddress(addressComponent);
          console.log('Address Component:', addressComponent);
        } catch (error) {
          console.warn('Error fetching address:', error);
        }
      },
      error => {
        console.log('Geolocation error:', error.code, error.message);
        Alert.alert('Error', 'Failed to get location. Please try again.');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const renderItem = ({item}) => item.component;

  return (
    <SafeAreaView className="flex-1 mx-2 mt-2">
      <FlatList
        ListHeaderComponent={
          <>
            <Pressable onPress={() => navigation.pop()} className="mb-2">
              <Icon name={'arrow-back'} size={25} color={'black'} />
            </Pressable>
            <View className="mt-2">
              <Text className="font-semibold text-black text-lg">
                You are looking to buy in
              </Text>
              <Text className="font-semibold text-black text-lg">
                {readableAddress && <Text>{readableAddress}</Text>}
              </Text>
            </View>
            <View className="mt-3">
              <TextInput
                placeholder="Search for flats, apartments, plots"
                placeholderTextColor={'black'}
                className="border-2 border-white rounded-lg px-3 bg-white text-base h-10"
              />
            </View>
            <TouchableOpacity
              className="flex-row items-center mt-1"
              onPress={handleLocation}>
              <Icon name={'my-location'} size={20} color={'blue'} />
              <Text className="text-blue-800 text-lg ml-2">
                Current Location
              </Text>
            </TouchableOpacity>
            <Text className="text-green-600 text-2xl mt-2 font-semibold">
              Filters
            </Text>
          </>
        }
        data={FILTER_COMPONENTS}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        ListFooterComponent={
          <View className="mt-4">
            <CustomButton title={'Search'} />
          </View>
        }
        contentContainerStyle={{flexGrow: 1}}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
