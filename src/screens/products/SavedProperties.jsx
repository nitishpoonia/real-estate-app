import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LongCard from '../../components/LongCard';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fetchFavorites} from '../../redux/slices/favoriteSlice';

const SavedProperties = ({navigation}) => {
  const dispatch = useDispatch();
  const {favorites, status, error} = useSelector(state => state.favorites);
  const {user} = useSelector(state => state.auth);
  const userId = user?._id;
  console.log(favorites);

  useEffect(() => {
    dispatch(fetchFavorites(userId));
  }, [userId, dispatch]);

  if (status === 'loading') {
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
        handleCardPress={() =>
          navigation.navigate('ProductDetailPage', {_id: item?._id})
        }
      />
    );
  };
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
        <FlatList
          data={favorites}
          renderItem={renderCard}
          keyExtractor={item => item._id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default SavedProperties;
