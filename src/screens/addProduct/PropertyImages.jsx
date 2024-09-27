import {View, Text, Image, Pressable, FlatList, ScrollView} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  setImages,
  setMainImage,
} from '../../redux/slices/ManageProductSlice/addProductSlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
const PropertyImages = ({navigation}) => {
  const dispatch = useDispatch();
  const {images, mainImage, imagesError, mainImageError} = useSelector(
    state => state.addProduct,
  );
  const handleCameraOpen = () => {
    launchCamera({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log(response.assets[0].uri);
        dispatch(setMainImage(response.assets[0].uri));
      }
    });
  };

  const handleSingleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          console.log(response.assets[0].uri);
          dispatch(setMainImage(response.assets[0].uri));
        }
      },
    );
  };

  const handleImagePickerOpen = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 1, selectionLimit: 20},
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const imageUris = response.assets.map(asset => asset.uri);
          dispatch(setImages(imageUris));
        }
      },
    );
  };
  const goToNextScreen = () => {
    if (images.length <= 0) {
      dispatch(setImages(0));
    }
    if (!mainImage) {
      dispatch(setMainImage(null));
    }
    if (mainImage && images) {
      navigation.navigate('ReviewDetails');
    }
  };
  return (
    <ScrollView className="flex-1 mx-2">
      <View>
        <View>
          <Text className="text-black font-psemibold text-lg mt-3">
            Add Property Images
          </Text>
        </View>
      </View>
      <View className="flex-1 bg-white p-2 rounded-lg">
        <View className="w-[100%] justify-between my-2">
          <View>
            <Text className="text-base font-psemibold text-black">
              Add Main Image
            </Text>
            <Text className="text-gray-700 font-pregular">
              This image will be seen by the user first
            </Text>
          </View>
          <View>
            {mainImage ? (
              <Image
                source={{uri: mainImage}}
                width={100}
                height={100}
                className="rounded-md w-[200px] h-[200px] mt-3"
              />
            ) : null}
            <Text className="mt-1 text-gray-700 font-pregular">
              You can either select a photo or click a new photo
            </Text>
            <View className="flex-row">
              <Pressable
                className="bg-[#19a24a] py-2 rounded-lg mt-3 w-[28%] mr-3"
                onPress={() => handleCameraOpen()}>
                <Text className="text-white  font-pregular text-center">
                  Take Photo
                </Text>
              </Pressable>
              <Pressable
                className="bg-[#19a24a] py-2 rounded-lg mt-3 w-[32%]"
                onPress={() => handleSingleImagePicker()}>
                <Text className="text-white  font-pregular text-center">
                  Choose Photo
                </Text>
              </Pressable>
            </View>
            {mainImageError && (
              <Text className="text-red-600">{mainImageError}</Text>
            )}
          </View>
        </View>
        <View className="w-[100%] justify-between my-2">
          <View>
            <Text className="text-base font-psemibold text-black">
              Product Images
            </Text>
            <Text className="text-gray-700">
              More images, more trust, more engagement
              <Text className="text-gray-500">(Max 10 Photos)</Text>
            </Text>
          </View>
          <View>
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
            <Pressable
              onPress={() => handleImagePickerOpen()}
              className="bg-[#19a24a] py-2 rounded-lg mt-3 w-[35%]">
              <Text className="text-white  font-pregular text-center">
                Choose Photos
              </Text>
            </Pressable>
            {imagesError && <Text className="text-red-600">{imagesError}</Text>}
          </View>
        </View>
      </View>

      <View className="flex-row justify-end gap-2 my-3">
        <Pressable
          onPress={() => navigation.goBack()}
          className=" flex-row self-end items-center my-3 justify-center bg-[#16a34a] rounded-full  w-[60px] h-[60px]">
          <Icon name={'chevron-left'} size={30} color={'white'} />
        </Pressable>
        <Pressable
          onPress={goToNextScreen}
          className=" flex-row self-end items-center my-3 justify-center bg-[#16a34a] rounded-full  w-[60px] h-[60px]">
          <Icon name={'chevron-right'} size={30} color={'white'} />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default PropertyImages;
