import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createProperty} from '../../redux/slices/product/ProductThunk';
import Toast from 'react-native-toast-message';
import {resetForm} from '../../redux/slices/addProduct/addProductSlice';
import * as Progress from 'react-native-progress';

const ReviewDetails = ({navigation}) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const dispatch = useDispatch();
  const {
    title,
    description,
    price,
    location,
    type,
    category,
    bedrooms,
    bathrooms,
    furnished,
    images,
    mainImage,
    listedBy,
    carpetArea,
  } = useSelector(state => state.addProduct);
  const {loading} = useSelector(state => state.product);
  const {progress} = useSelector(state => state.uploadProgress);
  const [modalVisible, setModalVisible] = useState(false);
  const handleConfirmation = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleAddAnotherProperty = () => {
    setModalVisible(false);
    console.log('handle add anotehr');

    navigation.navigate('ApScreen1');
  };

  const handleGoToHomePage = () => {
    setModalVisible(false);
    navigation.navigate('ProductHomePage');
  };
  const addProperty = async () => {
    // Dispatch loading action
    dispatch(createProperty.pending());

    const data = new FormData();
    const numericPrice = Number(price);
    const numericCarpetArea = Number(carpetArea);
    const numericBedrooms = Number(bedrooms);
    const numericBathrooms = Number(bathrooms);

    // Append the property details to the FormData
    data.append('title', title);
    data.append('description', description);
    data.append('price', numericPrice);
    data.append('location', location);
    data.append('type', type.toLowerCase());
    data.append('category', category.toLowerCase());
    data.append('carpetArea', numericCarpetArea);
    data.append('listedBy', listedBy?._id);

    if (category !== 'Plot') {
      data.append('bedrooms', numericBedrooms);
      data.append('bathrooms', numericBathrooms);
      data.append('furnished', furnished.toLowerCase());
    }

    if (mainImage) {
      data.append('mainImage', {
        uri: mainImage,
        type: 'image/jpeg',
        name: 'mainImage.jpg',
      });
    }

    if (images && images.length > 0) {
      images.forEach((imageUri, index) => {
        data.append('images', {
          uri: imageUri,
          type: 'image/jpeg',
          name: `image_${index}.jpg`,
        });
      });
    }

    try {
      // Dispatch the thunk
      await dispatch(createProperty(data)).unwrap();

      // Success handling
      Toast.show({
        type: 'success',
        text1: 'Property Added',
        text2: 'Property has been added successfully',
      });

      dispatch(resetForm());
      handleConfirmation();
    } catch (error) {
      // Error handling
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add property',
      });
    }
  };

  return (
    <ScrollView className="flex-1 mx-2" showsVerticalScrollIndicator={false}>
      <View className="flex-row items-center justify-between mx-2 my-2 max-w-[65%]">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-[#16a34a] rounded-full">
          <Icon name={'chevron-left'} color="white" size={30} />
        </Pressable>
        <View>
          <Text className="text-[#16a34a] font-psemibold text-lg">
            Review Details
          </Text>
        </View>
      </View>
      {title && (
        <Text className="font-pregular text-base text-black mt-3">
          Title: <Text className="text-base  font-pmedium">{title}</Text>
        </Text>
      )}
      {description && (
        <Text className="font-pregular text-base text-black mt-3">
          Description:{' '}
          <Text className="text-base font-pmedium">{description}</Text>
        </Text>
      )}

      {price && (
        <Text className="font-pregular text-base text-black mt-3">
          Price: <Text className="text-base font-pmedium">{price}</Text>
        </Text>
      )}
      {location && (
        <Text className="font-pregular text-base text-black mt-3">
          Location:
          <Text className="text-base font-pmedium">
            {location ?? 'Location not available'}
          </Text>
        </Text>
      )}
      {type && (
        <Text className="font-pregular text-base text-black mt-3">
          Type: <Text className="text-base font-pmedium">{type}</Text>
        </Text>
      )}
      {category && (
        <Text className="font-pregular text-base text-black mt-3">
          Category: <Text className="text-base font-pmedium">{category}</Text>
        </Text>
      )}
      {selectedCategoryIndex !== 0 && (
        <View>
          {/* Only show this if selectedCategoryIndex is not 0 */}

          {bedrooms && (
            <Text className="font-pregular text-base text-black mt-3">
              Bedrooms:{' '}
              <Text className="text-base font-pmedium">{bedrooms}</Text>
            </Text>
          )}

          {bathrooms && (
            <Text className="font-pregular text-base text-black mt-3">
              Bathrooms:{' '}
              <Text className="text-base font-pmedium">{bathrooms}</Text>
            </Text>
          )}

          {furnished && (
            <Text className="font-pregular text-base text-black mt-3">
              Furnished:{' '}
              <Text className="text-base font-pmedium">{furnished}</Text>
            </Text>
          )}
        </View>
      )}
      {carpetArea && (
        <Text className="font-pregular text-base text-black mt-3">
          Carpet Area:{' '}
          <Text className="text-base font-pmedium">{carpetArea} sq.ft</Text>
        </Text>
      )}
      {listedBy && (
        <Text className="font-pregular text-base text-black mt-3">
          Listed By:{' '}
          <Text className="text-base font-pmedium">{listedBy?.username}</Text>
        </Text>
      )}
      {mainImage && (
        <View className="mt-3">
          <Text className="font-pregular text-base text-black">
            Main Image:
          </Text>
          {mainImage ? (
            <Image
              source={{uri: mainImage}}
              width={100}
              height={100}
              className="rounded-md w-[200px] h-[200px] mt-3"
            />
          ) : null}
        </View>
      )}
      {images && (
        <View className="mt-3">
          <Text className="font-pregular text-base text-black">
            Product Images:
          </Text>
          <FlatList
            data={images}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View className="p-2">
                <Image
                  source={{uri: item}}
                  className="rounded-lg w-[200px] h-[200px] mx-auto"
                />
              </View>
            )}
            contentContainerStyle="px-2"
            horizontal
          />
        </View>
      )}
      {loading && (
        <View>
          <Progress.Bar
            progress={progress / 100}
            color="#16a34a"
            className="w-full"
            style={{marginVertical: 10}}
          />
          <Text className="text-[#16a34a] text-base font-pregular text-right">
            {progress}%
          </Text>
        </View>
      )}

      <View className="flex-row justify-end my-3">
        <Pressable
          onPress={addProperty}
          disabled={loading}
          className={`relative flex-row items-center my-3 justify-center bg-[#16a34a] rounded-md ${
            loading ? 'px-0' : 'px-4'
          } py-1 min-w-[50px]`}>
          {loading && (
            <ActivityIndicator
              size="small"
              color="white"
              className="absolute left-3"
            />
          )}
          <Text
            className={`text-white font-psemibold text-base ${
              loading ? 'opacity-50' : 'opacity-100'
            }`}>
            {loading ? '' : 'Submit Property'}
          </Text>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}>
        <View className="flex-1 justify-center items-center bg-green-100 rounded-md">
          <View className="bg-white w-[80%] p-6 rounded-md shadow-lg">
            <Text className="text-lg font-pbold text-black text-center mb-4">
              Add Another Property?
            </Text>
            <Text className="text-center mb-6 text-black-100">
              Do you want to add another property or go back to the homepage?
            </Text>

            <View className="flex-row justify-between">
              <Pressable
                onPress={handleGoToHomePage}
                className="bg-gray-300 px-4 py-2 rounded-md">
                <Text className="text-black">No</Text>
              </Pressable>

              <Pressable
                onPress={handleAddAnotherProperty}
                className="bg-green-600 px-4 py-2 rounded-md">
                <Text className="text-white">Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ReviewDetails;
