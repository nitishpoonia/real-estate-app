import React, {useState, useEffect, useMemo} from 'react';
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
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProperties} from '../../redux/slices/product/ProductThunk.js';
import LongCard from '../../components/LongCard.jsx';
import FilterModel from '../../components/filters/FilterModel.jsx';
import Modal from 'react-native-modal';
import {clearFilters} from '../../redux/slices/filter/filterOptionsSlice.jsx';
Geocoder.init(process.env.GOOGLE_API);

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    type,
    category,
    bedrooms,
    bathrooms,
    furnished,
    amenities,
    minPrice,
    maxPrice,
    allFilters,
    location,
  } = useSelector(state => state.filterOptions.filterOptions);
  const {properties, loading} = useSelector(state => state?.product);
  const [readableAddress, setReadableAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const flattenedFilters = allFilters.flat();
  const handleLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        try {
          const {latitude, longitude} = position.coords;
          const response = await Geocoder.from(latitude, longitude);
          const addressComponent =
            response.results[0].address_components[3].long_name;
          setReadableAddress(addressComponent);
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

  useEffect(() => {
    // handleLocation();
    dispatch(fetchProperties());
  }, [dispatch]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const renderItem = ({item}) => (
    <View className="border px-2 mr-1 rounded-lg border-[#16a34a]">
      <Text className="font-pregular text-base text-black">{item}</Text>
    </View>
  );

  const applyFilter = () => {
    let filteredProperties = properties;
    const typeLowerCase = type.map(item => item.toLowerCase());
    const furnishedLowerCase = furnished.map(item => item.toLowerCase());
    // Apply location filter
    if (searchTerm || readableAddress) {
      filteredProperties = filteredProperties.filter(property =>
        property.location
          .toLowerCase()
          .includes(searchTerm.toLowerCase() || readableAddress.toLowerCase()),
      );
    }

    // Apply property type filter
    if (typeLowerCase.length) {
      filteredProperties = filteredProperties.filter(property =>
        typeLowerCase.includes(property.category.toLowerCase()),
      );
    }

    // Apply category filter
    if (category.length) {
      filteredProperties = filteredProperties.filter(property =>
        category.includes(property.category.toLowerCase()),
      );
    }

    // Apply bedrooms filter
    if (bedrooms.length) {
      filteredProperties = filteredProperties.filter(property =>
        bedrooms.includes(property.bedrooms),
      );
    }

    // Apply bathrooms filter
    if (bathrooms.length) {
      filteredProperties = filteredProperties.filter(property =>
        bathrooms.includes(property.bathrooms),
      );
    }

    // Apply furnished filter
    if (furnishedLowerCase.length) {
      filteredProperties = filteredProperties.filter(property =>
        furnishedLowerCase.includes(property.furnished.toLowerCase()),
      );
    }

    // Apply price range filter
    if (minPrice || maxPrice) {
      const minPriceNumber = parseFloat(minPrice) || 0;
      const maxPriceNumber = parseFloat(maxPrice) || Infinity;
      filteredProperties = filteredProperties.filter(property => {
        const price = parseFloat(property.price) || 0;
        return price >= minPriceNumber && price <= maxPriceNumber;
      });
    }

    // Apply amenities filter
    if (amenities.length) {
      filteredProperties = filteredProperties.filter(property => {
        return amenities.every(amenity =>
          property.amenities
            ?.map(a => a.toLowerCase())
            .includes(amenity.toLowerCase()),
        );
      });
    }

    // Return filtered properties or a message if no properties match
    return filteredProperties.length > 0 ? filteredProperties : [];
  };
  const clearLocation = () => {
    setReadableAddress('');
  };
  const filterProperty = useMemo(() => {
    return applyFilter();
  }, [
    properties,
    searchTerm,
    type,
    category,
    bedrooms,
    bathrooms,
    furnished,
    amenities,
    minPrice,
    maxPrice,
  ]);

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
              {readableAddress && (
                <View className="flex-row items-baseline">
                  <Text className="font-semibold text-black text-lg mr-1">
                    {readableAddress}
                  </Text>
                  <Pressable onPress={clearLocation}>
                    <View className="bg-gray-500 rounded-full">
                      <Icon name={'close'} size={15} color={'white'} />
                    </View>
                  </Pressable>
                </View>
              )}
            </View>
            <View className="mt-3 flex-row items-center justify-between">
              <TextInput
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
                placeholder="Search for that place"
                placeholderTextColor={'black'}
                className="border-2 border-white rounded-lg px-3 bg-white  text-black text-base h-10 w-[90%]"
              />
              <Pressable onPress={toggleModal}>
                <Icon name={'tune'} size={28} color={'green'} />
              </Pressable>
            </View>

            <TouchableOpacity
              className="flex-row items-center mt-1"
              onPress={handleLocation}>
              <Icon name={'my-location'} size={20} color={'blue'} />
              <Text className="text-blue-800 text-lg ml-2">
                Current Location
              </Text>
            </TouchableOpacity>
            <View>
              <Text className="font-psemibold text-xl mt-2 text-[#16a34a]">
                Filters
              </Text>
              <View>
                <FlatList
                  data={flattenedFilters}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            <Text className="text-green-600 text-2xl mt-2 font-semibold">
              Properties
            </Text>
          </>
        }
        data={filterProperty.length > 0 ? filterProperty : []}
        ListEmptyComponent={
          <Text className="text-center text-red-600">No results found</Text>
        }
        renderItem={({item}) =>
          item === 'No results found' ? (
            <Text className="text-center text-red-600">No results found</Text>
          ) : (
            <LongCard
              ukey={item?._id}
              name={item?.title}
              location={item?.location}
              price={item?.price}
              imageUri={item?.mainImage}
              type={item?.type}
              category={item?.category}
              navigation={navigation}
              handleCardPress={() =>
                navigation.navigate('ProductDetailPage', {_id: item?._id})
              }
            />
          )
        }
        keyExtractor={item => item.key}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      />

      <Modal isVisible={modalVisible}>
        <View className="flex-1 justify-end items-center bg-opacity-100">
          <View className="bg-white w-[100%] rounded-2xl p-6 shadow-lg">
            <View className="flex-row justify-between">
              <Text className="text-xl font-bold mb-4 text-gray-800 ">
                Filter Options
              </Text>
              <Pressable onPress={() => dispatch(clearFilters())}>
                <Text className="text-white rounded-md  bg-[#16a34a] px-3 py-1">
                  Clear All
                </Text>
              </Pressable>
            </View>

            <FilterModel />
            <View className="flex-row justify-end mt-6">
              <TouchableOpacity
                className="px-4 py-2 bg-green-600 rounded-lg mr-2"
                onPress={toggleModal}>
                <Text className="text-white font-semibold">Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-4 py-2 bg-green-600 rounded-lg"
                onPress={toggleModal}>
                <Text className="text-white font-semibold">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SearchScreen;
