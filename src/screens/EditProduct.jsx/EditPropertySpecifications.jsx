import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBathrooms,
  setBedrooms,
  setCarpetArea,
  setCategory,
  setFurnished,
} from '../../redux/slices/ManageProductSlice/addProductSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import CustomTextInput from '../../components/CustomTextInput';
import {updateProperty} from '../../redux/slices/product/ProductThunk';
const EditPropertySpecifications = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {_id} = route.params;

  const {selectedProperty} = useSelector(state => state.product);
  const {category, bedrooms, bathrooms, furnished, carpetArea} = useSelector(
    state => state.addProduct,
  );
  useEffect(() => {
    dispatch(setCategory(selectedProperty?.data?.category));
    dispatch(setBedrooms(selectedProperty?.data?.bedrooms));
    dispatch(setBathrooms(selectedProperty?.data?.bathrooms));
    dispatch(setFurnished(selectedProperty?.data?.furnished));
    dispatch(setCarpetArea(selectedProperty?.data?.carpetArea));
  }, [selectedProperty, dispatch]);

  const [localCategory, setCategoryState] = useState('');
  const [localFurnished, setFurnishedState] = useState('');
  const handleSelectCategory = selectedCategory => {
    setCategoryState(selectedCategory);
    dispatch(setCategory(selectedCategory));
  };
  const handleSelectFurnished = selectedFurnished => {
    setFurnishedState(selectedFurnished);
    dispatch(setFurnished(selectedFurnished));
  };
  const handleUpdate = () => {
    const updatedData = {
      category,
      bedrooms,
      bathrooms,
      carpetArea,
      furnished,
    };

    dispatch(updateProperty({id: _id, updatedData}))
      .unwrap()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Property details updated successfully!',
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        });
        navigation.goBack();
      })
      .catch(err => {
        console.log(updatedData);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to update property details. Please try again.',
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        });
        console.error('Update failed:', err);
      });
  };
  return (
    <SafeAreaView className="mx-2">
      <View className="mb-2 flex-row items-center justify-between w-[80%] mt-2">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-[#16a34a] rounded-full">
          <Icon name={'chevron-left'} color="white" size={30} />
        </Pressable>
        <Text className="text-[#16a34a] font-psemibold text-lg">
          Edit Property Specifications
        </Text>
      </View>
      <View>
        <View>
          <Text className="font-pmedium text-lg text-black">
            Property Category
          </Text>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            style={
              localCategory === 'flat' ? styles.selectedButton : styles.button
            }
            onPress={() => handleSelectCategory('flat')}>
            <Text
              style={
                localCategory === 'flat'
                  ? styles.selectedButtonText
                  : styles.buttonText
              }>
              Flat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              localCategory === 'villa' ? styles.selectedButton : styles.button
            }
            onPress={() => handleSelectCategory('villa')}>
            <Text
              style={
                localCategory === 'villa'
                  ? styles.selectedButtonText
                  : styles.buttonText
              }
              className="font-pregular">
              Villa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              localCategory === 'apartment'
                ? styles.selectedButton
                : styles.button
            }
            onPress={() => handleSelectCategory('apartment')}>
            <Text
              style={
                localCategory === 'apartment'
                  ? styles.selectedButtonText
                  : styles.buttonText
              }>
              Apartment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              localCategory === 'house' ? styles.selectedButton : styles.button
            }
            onPress={() => handleSelectCategory('house')}>
            <Text
              style={
                localCategory === 'house'
                  ? styles.selectedButtonText
                  : styles.buttonText
              }>
              House
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text className="font-pmedium text-lg text-black">Bedrooms</Text>
        <CustomTextInput
          value={bedrooms?.toString()}
          onChangeText={text => dispatch(setBedrooms(text))}
          placeholder="Bedrooms"
        />
      </View>
      <View>
        <Text className="font-pmedium text-lg text-black">Bathrooms</Text>
        <CustomTextInput
          value={bathrooms?.toString()}
          onChangeText={text => dispatch(setBathrooms(text))}
          placeholder="Bathrooms"
        />
      </View>
      <View>
        <Text className="font-pmedium text-lg text-black">Carpert Area</Text>
        <CustomTextInput
          value={carpetArea?.toString()}
          onChangeText={text => dispatch(setCarpetArea(text))}
          placeholder="Carpet Area"
        />
      </View>
      <View>
        <View>
          <Text className="font-pmedium text-lg text-black">
            Property Furnishing
          </Text>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            style={
              localFurnished === 'furnished'
                ? styles.selectedButton
                : styles.button
            }
            onPress={() => handleSelectFurnished('furnished')}>
            <Text
              style={
                localFurnished === 'furnished'
                  ? styles.selectedButtonText
                  : styles.buttonText
              }>
              Furnished
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              localFurnished === 'semi-furnished'
                ? styles.selectedButton
                : styles.button
            }
            onPress={() => handleSelectFurnished('semi-furnished')}>
            <Text
              style={
                localFurnished === 'semi-furnished'
                  ? styles.selectedButtonText
                  : styles.buttonText
              }
              className="font-pregular">
              Semi Furnished
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              localFurnished === 'unfurnished'
                ? styles.selectedButton
                : styles.button
            }
            onPress={() => handleSelectFurnished('unfurnished')}>
            <Text
              style={
                localFurnished === 'unfurnished'
                  ? styles.selectedButtonText
                  : styles.buttonText
              }>
              Unfurnished
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button title="Update Property" onPress={handleUpdate} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#16a34a',
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#D0EDDB', 
  },
  selectedButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#16a34a', // Background color when selected
  },
  buttonText: {
    color: '#16a34a', // Text color when not selected
    textAlign: 'center',
  },
  selectedButtonText: {
    color: 'white', // Text color when selected
    textAlign: 'center',
  },
});

export default EditPropertySpecifications;
