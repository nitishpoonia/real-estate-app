import {View, Text, Pressable} from 'react-native';
import React from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import {
  setTitle,
  setDescription,
  setPrice,
  setLocation,
} from '../../redux/slices/addProduct/addProductSlice';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
const GeneralDetails = ({navigation}) => {
  const {
    title,
    titleError,
    description,
    descriptionError,
    price,
    priceError,
    location,
    locationError,
  } = useSelector(state => state.addProduct);
  const goToNextScreen = () => {
    if (title.length < 5) {
      dispatch(setTitle(title));
    }
    if (description.length < 10) {
      dispatch(setDescription(description));
    }
    if (price < 1) {
      dispatch(setPrice(price));
    }
    if (location.length < 5) {
      dispatch(setLocation(location));
    }
    if (
      title.length >= 5 &&
      description.length >= 10 &&
      price > 0 &&
      location.length >= 5
    ) {
      navigation.navigate('PropertySpecification');
    }
  };
  const dispatch = useDispatch();
  return (
    <View className="flex-1 h-auto mx-2">
      <View>
        <Text className="text-black font-psemibold text-xl">
          Add New Property
        </Text>
      </View>
      <View>
        <Text className="text-black font-pmedium text-lg">General Details</Text>
      </View>
      <View className="flex-1 bg-white p-2 rounded-lg">
        <View>
          <Text className="text-black font-pregular text-base">
            Property Title
          </Text>
          <CustomTextInput
            placeholder={'Title'}
            onChangeText={text => dispatch(setTitle(text))}
            value={title}
            error={titleError}
          />
        </View>
        <View>
          <Text className="text-black font-pregular text-base">
            Description
          </Text>
          <CustomTextInput
            placeholder={'Description'}
            multiline={true}
            numberOfLines={4}
            style={{height: 100}}
            onChangeText={text => dispatch(setDescription(text))}
            value={description}
            error={descriptionError}
          />
        </View>
        <View>
          <Text className="text-black font-pregular text-base">Price</Text>
          <CustomTextInput
            placeholder={'Price'}
            onChangeText={text => dispatch(setPrice(text))}
            value={price}
            error={priceError}
            keyboardType="numeric"
          />
        </View>
        <View className="flex-1">
          <Text className="text-black font-pregular text-base">Location</Text>
          <CustomTextInput
            placeholder={'Search Location'}
            value={location}
            error={locationError}
            handlePress={() => navigation.navigate('SearchCity')}
          />
        </View>
      </View>
      <Pressable
        onPress={goToNextScreen}
        className=" flex-row self-end items-center my-3 justify-center bg-[#16a34a] rounded-full  w-[60px] h-[60px]">
        <Icon name={'chevron-right'} size={30} color={'white'} />
      </Pressable>
    </View>
  );
};

export default GeneralDetails;
