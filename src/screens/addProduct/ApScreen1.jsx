import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Accordion from '../../components/Accordian';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextInput from '../../components/CustomTextInput';
import {useDispatch, useSelector} from 'react-redux';

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
} from '../../redux/slices/addProduct/addProductSlice';
const ApScreen1 = () => {
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
  } = useSelector(state => state.addProduct);

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 mx-2">
        <Text className="font-psemibold text-lg text-black">Add Property</Text>
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
            />
            <CustomTextInput
              placeholder={'Location'}
              onChangeText={text => dispatch(setLocation(text))}
              value={location}
              error={locationError}
            />
          </Accordion>
          <Accordion title={'Property Specification'}>
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-base font-pregular">Type</Text>
            </View>
            <View className="flex-row items-center justify-between mb-2 mt-2">
              <Text className="text-base font-pregular">Category</Text>
            </View>
            <View className="flex-row items-center justify-between my-2">
              <Text className="text-base font-pregular">Bedrooms</Text>
            </View>
            <View className="flex-row items-center justify-between my-2">
              <Text className="text-base font-pregular">Bathrooms</Text>
            </View>
            <View className="flex-row items-center justify-between my-2">
              <Text className="text-base font-pregular">Furnished</Text>
            </View>
          </Accordion>
          <Accordion title={'Upload Image'}></Accordion>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ApScreen1;
