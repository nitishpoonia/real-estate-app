import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createProperty} from '../../redux/slices/product/ProductThunk';
import Toast from 'react-native-toast-message';
import {resetForm} from '../../redux/slices/addProduct/addProductSlice';
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
  const addProperty = () => {
    const data = new FormData();
    const numericPrice = Number(price);
    const numericCarpetArea = Number(carpetArea);
    const numericBedrooms = Number(bedrooms);
    const numericBathrooms = Number(bathrooms);
    console.log('listedBy', listedBy);

    // Append the property details to the FormData
    data.append('title', title);
    data.append('description', description);
    data.append('price', numericPrice); // Convert to number
    data.append('location', location);
    data.append('type', type.toLowerCase());
    data.append('category', category.toLowerCase());
    data.append('carpetArea', numericCarpetArea); // Convert to number
    data.append('listedBy', listedBy);
    // Conditionally append additional fields
    if (category !== 'Plot') {
      data.append('bedrooms', numericBedrooms); // Convert to number
      data.append('bathrooms', numericBathrooms); // Convert to number
      data.append('furnished', furnished.toLowerCase());
    }

    // Handle main image
    if (mainImage) {
      data.append('mainImage', {
        uri: mainImage,
        type: 'image/jpeg',
        name: 'mainImage.jpg',
      });
    }

    // Handle additional images
    if (images && images.length > 0) {
      images.forEach((imageUri, index) => {
        data.append('images', {
          uri: imageUri,
          type: 'image/jpeg',
          name: `image_${index}.jpg`,
        });
      });
    }

    // Dispatch the thunk with FormData
    dispatch(createProperty(data))
      .unwrap()
      .then(responseData => {
        console.log(responseData);

        Toast.show({
          type: 'success',
          text1: 'Property Added',
          text2: 'Property has been added successfully',
        });
        Alert.alert(
          'Add More Properties?',
          'Do you want to add another property?',
          [
            {
              text: 'Yes',
              onPress: () => {
                // Navigate to GeneralDetails
                navigation.navigate('GeneralDetails');
              },
            },
            {
              text: 'No',
              onPress: () => {
                // Navigate to Home page
                navigation.navigate('ProductHomePage');
              },
              style: 'cancel',
            },
          ],
        );
        dispatch(resetForm());
      })
      .catch(error => {
        console.log(error);

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to add property',
        });
      });
  };

  return (
    <ScrollView className="flex-1 mx-2">
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
          Listed By: <Text className="text-base font-pmedium">{listedBy}</Text>
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
      <View className="flex-row justify-end gap-2 my-3">
        <Pressable
          onPress={() => navigation.goBack()}
          className=" flex-row self-end items-center my-3 justify-center bg-[#16a34a] rounded-full  w-[60px] h-[60px]">
          <Icon name={'chevron-left'} size={30} color={'white'} />
        </Pressable>
        <Pressable
          onPress={addProperty}
          className=" flex-row self-end items-center my-3 justify-center bg-[#16a34a] rounded-md px-4 h-[60px]">
          <Text className="text-white font-psemibold text-base">
            Submit Property
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ReviewDetails;
