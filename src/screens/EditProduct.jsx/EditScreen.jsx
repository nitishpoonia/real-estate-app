import {View, Text, ScrollView, Pressable, Image} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPropertyById} from '../../redux/slices/product/ProductThunk';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FlatList} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';

const EditScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {_id} = route.params;

  const fetchProperties = useCallback(() => {
    dispatch(fetchPropertyById(_id));
  }, [_id, dispatch]);

  useEffect(() => {
    fetchProperties();
  }, [_id, dispatch, isFocused]);
  const {selectedProperty, loading} = useSelector(state => state.product);
  const formatPriceInIndianStyle = price => {
    return new Intl.NumberFormat('en-IN').format(price);
  };
  const renderAllPhotos = ({item}) => {
    return (
      <Image source={{uri: item}} className="w-[200px] h-[200px] rounded-lg" />
    );
  };
  if (loading) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center items-center">
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100 pt-3">
      <ScrollView className="mx-2">
        <View className="mb-2 flex-row items-center justify-between w-[65%]">
          <Pressable
            onPress={() => navigation.goBack()}
            className="bg-[#16a34a] rounded-full">
            <Icon name={'chevron-left'} color="white" size={30} />
          </Pressable>
          <Text className="text-[#16a34a]  font-psemibold text-lg">
            Edit Property
          </Text>
        </View>
        <View>
          <View className="flex-row justify-between items-baseline">
            <Text className="font-pmedium text-lg text-black">
              General Details
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('EditGeneralDetails', {
                  _id: selectedProperty?.data?._id,
                })
              }
              className="bg-[#16a34a] p-2 rounded-xl">
              <Icon name={'edit'} size={18} color={'white'} />
            </Pressable>
          </View>
          <View className="bg-white px-2 py-2 rounded-lg mt-3">
            <View className="mb-2 border-b border-gray-400 pb-1">
              <Text className="font-pmedium text-base text-black">Title</Text>
              <Text className="font-pregular text-sm text-gray-500">
                {selectedProperty?.data?.title}
              </Text>
            </View>
            <View className="mb-2 border-b border-gray-400 pb-1">
              <Text className="font-pmedium text-base text-black">
                Location
              </Text>
              <View className="flex-row items-center">
                <Icon name={'location-on'} size={15} />
                <Text className="font-pregular text-sm text-gray-500">
                  {selectedProperty?.data?.location}
                </Text>
              </View>
            </View>
            <View className="mb-2 border-b border-gray-400 pb-1">
              <Text className="font-pmedium text-base text-black">
                Description
              </Text>
              <Text className="font-pregular text-sm text-gray-500">
                {selectedProperty?.data?.description}
              </Text>
            </View>
            <View className="mb-2 border-b border-gray-400 pb-1">
              <Text className="font-pmedium text-base  text-black">Price</Text>
              <Text className="font-pregular text-sm text-gray-500">
                {formatPriceInIndianStyle(selectedProperty?.data?.price)}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="font-pmedium text-base text-black">Type</Text>
              <Text className="font-pregular text-sm text-gray-500">
                {selectedProperty?.data?.type.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View className="flex-row justify-between items-baseline mt-3">
            <Text className="font-pmedium text-lg text-black">
              Property Specification
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('EditPropertySpecifications', {
                  _id: selectedProperty?.data?._id,
                })
              }
              className="bg-[#16a34a] p-2 rounded-xl">
              <Icon name={'edit'} size={18} color={'white'} />
            </Pressable>
          </View>
          <View className="bg-white px-2 py-2 rounded-lg mt-3">
            <View className="mb-2 border-b border-gray-400 pb-1">
              <Text className="font-pmedium text-base text-black">
                Category
              </Text>
              <View className="flex-row items-center">
                <Text className="font-pregular text-sm text-gray-500">
                  {selectedProperty?.data?.category}
                </Text>
              </View>
            </View>
            {selectedProperty?.data?.category === 'plot' ? null : (
              <View>
                <View className="mb-2 border-b border-gray-400 pb-1">
                  <Text className="font-pmedium text-base text-black ">
                    Bedrooms
                  </Text>
                  <Text className="font-pregular text-sm text-gray-500">
                    {selectedProperty?.data?.bedrooms}
                  </Text>
                </View>
                <View className="mb-2 border-b border-gray-400 pb-1">
                  <Text className="font-pmedium text-base text-black">
                    Bathrooms
                  </Text>
                  <Text className="font-pregular text-sm text-gray-500">
                    {selectedProperty?.data?.bathrooms}
                  </Text>
                </View>
                <View className="mb-2 border-b border-gray-400 pb-1">
                  <Text className="font-pmedium text-base text-black">
                    Furnished
                  </Text>
                  <Text className="font-pregular text-sm text-gray-500">
                    {selectedProperty?.data?.furnished}
                  </Text>
                </View>
              </View>
            )}

            <View className="mb-2 pb-1">
              <Text className="font-pmedium text-base text-black">
                Carpet Area
              </Text>
              <Text className="font-pregular text-sm text-gray-500">
                {selectedProperty?.data?.carpetArea} sq.ft
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View className="flex-row justify-between items-baseline mt-3">
            <Text className="font-pmedium text-lg text-black">
              Property Images
            </Text>
            <Pressable
              className="bg-[#16a34a] p-2 rounded-xl"
              onPress={() =>
                navigation.navigate('EditPropertyImages', {
                  _id: selectedProperty?.data?._id,
                })
              }>
              <Icon name={'edit'} size={18} color={'white'} />
            </Pressable>
          </View>
          <View className="bg-white px-2 py-2 rounded-lg mt-3">
            <View>
              <Text className=" mb-1 text-base font-pregular">Main Image</Text>
              <Image
                source={{uri: selectedProperty?.data?.mainImage}}
                className="w-[200px] h-[200px] rounded-lg"
              />
            </View>
            <View>
              <Text className="mb-1 mt-2 text-base font-pregular">
                Other Images
              </Text>
              <FlatList
                data={selectedProperty?.data?.images}
                horizontal
                renderItem={renderAllPhotos}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditScreen;
