import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, FlatList, Pressable, Image} from 'react-native';
import Accordion from '../../components/Accordian';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextInput from '../../components/CustomTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {createProperty} from '../../redux/slices/product/ProductThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import * as Progress from 'react-native-progress';
// States from add product slice
import {
  setTitle,
  setDescription,
  setPrice,
  setLocation,
  setType,
  setCategory,
  setBedrooms,
  setBathrooms,
  setFurnished,
  setImages,
  setMainImage,
  setListedBy,
  setCarpetArea,
  resetForm,
} from '../../redux/slices/addProduct/addProductSlice';
import PillComponentForTags from '../../components/PillComponentForTags';
import propertyOptions from '../../services/AddProductFormServices';
import CustomButton from '../../components/CustomButton';
const ApScreen1 = () => {
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [selectedBedroomIndex, setSelectedBedroomIndex] = useState(null);
  const [selectedBathroomIndex, setSelectedBathroomIndex] = useState(null);
  const [selectedFurnishingIndex, setSelectedFurnishingIndex] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const {loading} = useSelector(state => state?.product);
  const dispatch = useDispatch();
  const {
    title,
    titleError,
    description,
    descriptionError,
    price,
    priceError,
    location,
    locationError,
    type,
    typeError,
    category,
    categoryError,
    bedrooms,
    bedroomsError,
    bathrooms,
    bathroomsError,
    furnished,
    furnishedError,
    images,
    imagesError,
    mainImage,
    mainImageError,
    listedBy,
    listedByError,
    carpetArea,
  } = useSelector(state => state.addProduct);
  const {
    listingType,
    propertyCategory,
    propertyFurnishing,
    numberOfBathrooms,
    numberOfBedrooms,
  } = propertyOptions;

  const handlePress = (
    index,
    item,
    selectedIndex,
    setSelectedIndex,
    action,
  ) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
      dispatch(action(null));
    } else {
      setSelectedIndex(index);
      dispatch(action(item.value));
    }
  };

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

  const getUser = async () => {
    const userWithParse = await AsyncStorage.getItem('user');
    const user = JSON.parse(userWithParse);
    dispatch(setListedBy(user._id));
  };
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let completedFields = 0;
    if (title) completedFields += 1;
    if (description) completedFields += 1;
    if (price) completedFields += 1;
    if (location) completedFields += 1;
    if (type) completedFields += 1;
    if (category) completedFields += 1;
    if (bedrooms) completedFields += 1;
    if (bathrooms) completedFields += 1;
    if (furnished) completedFields += 1;
    if (mainImage) completedFields += 1;
    if (images.length > 0) completedFields += 1;
    if (carpetArea) completedFields += 1;

    const totalFields = 12;
    const progressPercent = (completedFields / totalFields) * 100;
    setProgress(progressPercent / 100);
  }, [
    title,
    description,
    price,
    location,
    type,
    category,
    bedrooms,
    bathrooms,
    furnished,
    mainImage,
    images,
    carpetArea,
    listedBy,
  ]);
  useEffect(() => {
    getUser();
    if (selectedCategoryIndex == 0) {
      dispatch(setBathrooms(null));
      dispatch(setBedrooms(null));
      dispatch(setFurnished(null));
    }
  }, []);

  const validateForm = () => {
    if (
      !title ||
      !description ||
      !location ||
      !price ||
      !type ||
      !category ||
      !bedrooms ||
      !bathrooms ||
      !furnished ||
      !mainImage ||
      !images
    ) {
      setSubmitError('All fields are required');
      return false;
    }
    return true; // Add this to return true when validation passes
  };

  const submitDetails = () => {
    if (validateForm()) {
      setSubmitError('');

      const data = new FormData();
      data.append('title', title);
      data.append('description', description);
      data.append('price', price);
      data.append('location', location.toLowerCase());
      data.append('type', type.toLowerCase());
      data.append('category', category.toLowerCase());
      data.append('bedrooms', bedrooms);
      data.append('bathrooms', bathrooms);
      data.append('furnished', furnished.toLowerCase());
      data.append('carpetArea', carpetArea);

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

      console.log(data);

      dispatch(createProperty(data))
        .unwrap()
        .then(responseData => {
          Toast.show({
            type: 'success',
            text1: 'Property Added',
            text2: 'Property has been added successfully',
          });
          dispatch(resetForm());
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to add property',
          });
        });
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className=" mx-2 ">
        <Text className="font-pbold text-2xl text-black my-3">
          Add Property
        </Text>
        <View>
          <Accordion title={'General'}>
            <CustomTextInput
              placeholder={'Title'}
              onChangeText={text => dispatch(setTitle(text))}
              value={title}
              error={titleError}
            />
            <CustomTextInput
              placeholder={'Description'}
              multiline={true}
              numberOfLines={4}
              style={{height: 100}}
              onChangeText={text => dispatch(setDescription(text))}
              value={description}
              error={descriptionError}
            />
            <CustomTextInput
              placeholder={'Price'}
              onChangeText={text => dispatch(setPrice(text))}
              value={price}
              error={priceError}
              keyboardType="numeric"
            />
            <CustomTextInput
              placeholder={'Location'}
              onChangeText={text => dispatch(setLocation(text))}
              value={location}
              error={locationError}
            />
          </Accordion>
          <Accordion title={'Property Specification'}>
            <View className="flex-row w-[100%] justify-between my-2">
              <Text className="text-base font-pregular w-[30%]">Type</Text>
              <FlatList
                data={listingType}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                className="w-1/2 bg-red-300x"
                renderItem={({item, index}) => (
                  <View className="flex-row items-center justify-between mr-2">
                    <PillComponentForTags
                      title={item.label}
                      selected={index === selectedTypeIndex}
                      handlePress={() =>
                        handlePress(
                          index,
                          item,
                          selectedTypeIndex,
                          setSelectedTypeIndex,
                          setType,
                        )
                      }
                    />
                  </View>
                )}
              />
            </View>

            <View className="flex-row items-center justify-between my-2">
              <Text className="text-base font-pregular w-[30%]">Category</Text>
              <FlatList
                data={propertyCategory}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                className="w-1/2 bg-red-300x"
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <View className="flex-row items-center justify-between mr-2">
                    <PillComponentForTags
                      title={item.label}
                      selected={index === selectedCategoryIndex}
                      handlePress={() => {
                        handlePress(
                          index,
                          item,
                          selectedCategoryIndex,
                          setSelectedCategoryIndex,
                          setCategory,
                        );
                      }}
                    />
                  </View>
                )}
              />
            </View>
            {selectedCategoryIndex !== 0 && (
              <>
                {/* Bedrooms */}
                {(selectedCategoryIndex === 1 ||
                  selectedCategoryIndex === 2 ||
                  selectedCategoryIndex === 3) && (
                  <View className="flex-row items-center justify-between my-2">
                    <Text className="text-base font-pregular w-[30%]">
                      Bedrooms
                    </Text>
                    <FlatList
                      data={numberOfBedrooms}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => (
                        <View className="flex-row items-center justify-between mr-2">
                          <PillComponentForTags
                            title={item.label}
                            containerStyles={'w-[70px]'}
                            selected={index === selectedBedroomIndex}
                            handlePress={() => {
                              handlePress(
                                index,
                                item,
                                selectedBedroomIndex,
                                setSelectedBedroomIndex,
                                setBedrooms,
                              );
                            }}
                          />
                        </View>
                      )}
                    />
                  </View>
                )}

                {/* Bathrooms */}
                {(selectedCategoryIndex === 1 ||
                  selectedCategoryIndex === 2 ||
                  selectedCategoryIndex === 3) && (
                  <View className="flex-row items-center justify-between my-2">
                    <Text className="text-base font-pregular w-[30%]">
                      Bathrooms
                    </Text>
                    <FlatList
                      data={numberOfBathrooms}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => (
                        <View className="flex-row items-center justify-between mr-2">
                          <PillComponentForTags
                            title={item.label}
                            containerStyles={'w-[70px]'}
                            selected={index === selectedBathroomIndex}
                            handlePress={() => {
                              handlePress(
                                index,
                                item,
                                selectedBathroomIndex,
                                setSelectedBathroomIndex,
                                setBathrooms,
                              );
                            }}
                          />
                        </View>
                      )}
                    />
                  </View>
                )}

                {/* Furnished */}
                {(selectedCategoryIndex === 1 ||
                  selectedCategoryIndex === 2 ||
                  selectedCategoryIndex === 3) && (
                  <View className="flex-row items-center justify-between my-2">
                    <Text className="text-base font-pregular w-[30%]">
                      Furnished
                    </Text>
                    <FlatList
                      data={propertyFurnishing}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => (
                        <View className="flex-row items-center justify-between mr-2">
                          <PillComponentForTags
                            title={item.label}
                            selected={index === selectedFurnishingIndex}
                            handlePress={() => {
                              handlePress(
                                index,
                                item,
                                selectedFurnishingIndex,
                                setSelectedFurnishingIndex,
                                setFurnished,
                              );
                            }}
                          />
                        </View>
                      )}
                    />
                  </View>
                )}
              </>
            )}
            <View className="flex-row items-center justify-between my-2">
              <Text className="text-base font-pregular">Carpet Area</Text>
              <View className="flex-row items-center">
                <CustomTextInput
                  placeholder={'Sq ft'}
                  onChangeText={text => dispatch(setCarpetArea(text))}
                  containerStyles={'w-[50%]'}
                />
                <Text>Sq.ft</Text>
              </View>
            </View>
          </Accordion>
          <Accordion title={'Upload Images'}>
            <View className="flex w-[100%] justify-between my-2">
              <View>
                <Text className="text-base font-psemibold text-black">
                  Main Image
                </Text>
                <Text>This image will be seen by the user fist</Text>
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
                <Text className="mt-1">
                  You can select another photo by choosing take photo or choose
                  photos
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
              </View>
            </View>
            <View className="w-[100%] justify-between my-2">
              <View>
                <Text className="text-base font-psemibold text-black">
                  Product Images
                </Text>
                <Text>More images, more trust, more engagement</Text>
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
              </View>
            </View>
          </Accordion>
          <Accordion title={'Review Details'}>
            <Text className="font-pregular text-base text-black mt-3">
              Title: <Text className="text-base font-pmedium">{title}</Text>
            </Text>
            <Text className="font-pregular text-base text-black mt-3">
              Description:{' '}
              <Text className="text-base font-pmedium">{description}</Text>
            </Text>
            <Text className="font-pregular text-base text-black mt-3">
              Price: <Text className="text-base font-pmedium">{price}</Text>
            </Text>
            <Text className="font-pregular text-base text-black mt-3">
              Location:{' '}
              <Text className="text-base font-pmedium">{location}</Text>
            </Text>
            <Text className="font-pregular text-base text-black mt-3">
              Type: <Text className="text-base font-pmedium">{type}</Text>
            </Text>
            <Text className="font-pregular text-base text-black mt-3">
              Category:{' '}
              <Text className="text-base font-pmedium">{category}</Text>
            </Text>
            {selectedCategoryIndex !== 0 && (
              <View>
                {/* Only show this if selectedCategoryIndex is not 0 */}
                <Text className="font-pregular text-base text-black mt-3">
                  Bedrooms:{' '}
                  <Text className="text-base font-pmedium">{bedrooms}</Text>
                </Text>

                <Text className="font-pregular text-base text-black mt-3">
                  Bathrooms:{' '}
                  <Text className="text-base font-pmedium">{bathrooms}</Text>
                </Text>

                <Text className="font-pregular text-base text-black mt-3">
                  Furnished:{' '}
                  <Text className="text-base font-pmedium">{furnished}</Text>
                </Text>
              </View>
            )}
            <Text className="font-pregular text-base text-black mt-3">
              Carpet Area:{' '}
              <Text className="text-base font-pmedium">{carpetArea} sq.ft</Text>
            </Text>
            <Text className="font-pregular text-base text-black mt-3">
              Listed By:{' '}
              <Text className="text-base font-pmedium">{listedBy}</Text>
            </Text>
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
          </Accordion>
          {submitError && (
            <Text className="text-red-800 mt-2 font-pmedium">
              {submitError}
            </Text>
          )}
          <CustomButton
            title={loading ? 'Adding...' : 'Add Property'}
            handlePress={submitDetails}
            disabled={loading}
          />
        </View>
      </ScrollView>
      {progress > 0 && <Progress.Bar progress={progress} width={null} />}
    </SafeAreaView>
  );
};

export default ApScreen1;
