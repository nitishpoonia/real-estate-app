import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, Pressable} from 'react-native';
import {getPropertyListedBy} from '../../redux/slices/product/ProductThunk';
import {useDispatch, useSelector} from 'react-redux';
import LongCard from '../../components/LongCard';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListedProperties = ({navigation}) => {
  const dispatch = useDispatch();
  const {listedProperties, isLoading, error} = useSelector(
    state => state.product,
  );
  const {user} = useSelector(state => state.auth);
  const userId = user?._id;

  useEffect(() => {
    dispatch(getPropertyListedBy(userId));
  }, [userId, dispatch]);

  if (isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  const renderCard = ({item}) => {
    return (
      <LongCard
        key={item?._id}
        name={item?.title}
        location={item?.location}
        price={item?.price}
        imageUri={item?.mainImage}
        type={item?.type}
        category={item?.category}
        bedroom={item?.bedrooms}
        bathroom={item?.bathrooms}
        carpetArea={item?.carpetArea}
        createdAt={item?.createdAt}
        handleEditButtonPress={() =>
          navigation.navigate('EditProperty', {
            screen: 'EditScreen',
            params: {_id: item?._id},
          })
        }
        handleCardPress={() =>
          navigation.navigate('ProductDetailPage', {_id: item?._id})
        }
      />
    );
  };

  const renderEmptyComponent = () => (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold text-gray-600">
        You do not have any properties listed.
      </Text>
      <Pressable
        onPress={() => navigation.navigate('AddProduct')}
        className="mt-4 bg-green-600 rounded-full px-4 py-2">
        <Text className="text-white text-base">Add New Property</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center mx-2 my-3">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-white rounded-full p-1">
          <Icon name="arrow-back" size={30} color="#16a34a" />
        </Pressable>
        <Text className="text-lg text-black font-bold ml-2">Property List</Text>
      </View>
      <View className="flex-1 items-center">
        {listedProperties?.length > 0 ? (
          <FlatList
            data={listedProperties}
            renderItem={renderCard}
            keyExtractor={item => item._id.toString()}
          />
        ) : (
          renderEmptyComponent()
        )}
      </View>
    </SafeAreaView>
  );
};

export default ListedProperties;
