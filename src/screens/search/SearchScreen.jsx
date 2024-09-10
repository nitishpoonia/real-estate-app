import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProperties} from '../../redux/slices/product/ProductThunk.js';
import LongCard from '../../components/LongCard.jsx';
import FilterModel from '../../components/filters/FilterModel.jsx';
Geocoder.init('AIzaSyDQ5-YOrrKT4n7FUDhJYd1dLvOzBEq3eHw');

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {type} = useSelector(state => state.filterOptions.filterOptions);
  const {properties, loading} = useSelector(state => state?.product);
  const [readableAddress, setReadableAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  console.log('Type:', type);

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
    handleLocation();
    dispatch(fetchProperties());
  }, [dispatch]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Function to filter properties based on the location or search term
  const filteredProperties = useMemo(() => {
    if (!readableAddress) {
      return properties;
    }

    return properties.filter(property => {
      const propertyLocation = property?.location?.toLowerCase();
      const address = readableAddress.toLowerCase();
      const searchQuery = searchTerm.toLowerCase();
      return (
        propertyLocation.includes(address) ||
        propertyLocation.includes(searchQuery)
      );
    });
  }, [properties, readableAddress, searchTerm]);

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
            <View className="mt-3 flex-row items-center justify-between">
              <TextInput
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
                placeholder="Search for flats, apartments, plots"
                placeholderTextColor={'black'}
                className="border-2 border-white rounded-lg px-3 bg-white text-base h-10 w-[90%]"
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
            <Text className="text-green-600 text-2xl mt-2 font-semibold">
              Properties
            </Text>
          </>
        }
        data={filteredProperties} // Use the filtered properties for the FlatList
        renderItem={({item}) => (
          <LongCard
            key={item?._id}
            name={item?.title}
            location={item?.location}
            price={item?.price}
            imageUri={item?.mainImage}
            navigation={navigation}
            handleCardPress={() =>
              navigation.navigate('ProductDetailPage', {_id: item?._id})
            }
          />
        )}
        keyExtractor={item => item.key}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal for Filters */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View className="flex-1 justify-end items-center bg-opacity-100">
          <View className="bg-white w-[100%] rounded-2xl p-6 shadow-lg">
            <Text className="text-xl font-bold mb-4 text-gray-800">
              Filter Options
            </Text>
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
