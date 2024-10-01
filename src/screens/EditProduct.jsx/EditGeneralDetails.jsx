import {
  View,
  Text,
  SafeAreaView,
  Button,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {updateProperty} from '../../redux/slices/product/ProductThunk'; // Ensure updateProperty is imported
import {useDispatch, useSelector} from 'react-redux';
import CustomTextInput from '../../components/CustomTextInput';
import {
  setTitle,
  setDescription,
  setPrice,
  setLocation,
  setType,
} from '../../redux/slices/ManageProductSlice/addProductSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
const EditGeneralDetails = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {_id} = route.params;

  const {selectedProperty} = useSelector(state => state.product);
  const {title, description, price, location, type} = useSelector(
    state => state.addProduct,
  );
  useEffect(() => {
    dispatch(setTitle(selectedProperty?.data?.title));
    dispatch(setDescription(selectedProperty?.data?.description));
    dispatch(setPrice(selectedProperty?.data?.price));
    dispatch(setLocation(selectedProperty?.data?.location));
    dispatch(setType(selectedProperty?.data?.type));
  }, [selectedProperty, dispatch]);
  const [localType, setTypeState] = useState('');

  const handleSelect = selectedType => {
    setTypeState(selectedType);
    dispatch(setType(selectedType));
  };
  // Submit updated property details
  const handleUpdate = () => {
    const updatedData = {
      title,
      description,
      price,
      location,
      type,
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
      <View className="mb-2 flex-row items-center justify-between w-[73%] mt-2">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-[#16a34a] rounded-full">
          <Icon name={'chevron-left'} color="white" size={30} />
        </Pressable>
        <Text className="text-[#16a34a] font-psemibold text-lg">
          Edit General Details
        </Text>
      </View>
      <View>
        <View>
          <Text className="text-black text-base font-pregular">Title</Text>
          <CustomTextInput
            value={title}
            onChangeText={text => dispatch(setTitle(text))}
            placeholder="Title"
          />
        </View>
        <View>
          <Text className="text-black text-base font-pregular">
            Description
          </Text>
          <CustomTextInput
            value={description}
            multiline={true}
            numberOfLines={4}
            style={{height: 100}}
            onChangeText={text => dispatch(setDescription(text))}
            placeholder="Description"
          />
        </View>
        <View>
          <Text className="text-black text-base font-pregular">Price</Text>
          <CustomTextInput
            value={price.toString()} // Ensure price is converted to string for the TextInput
            onChangeText={text => {
              const parsedPrice = parseFloat(text); // Convert to number
              dispatch(setPrice(isNaN(parsedPrice) ? '' : parsedPrice)); // Dispatch price action
            }}
            placeholder="Price"
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text className="text-black text-base font-pregular">Location</Text>
          <CustomTextInput
            value={location}
            handlePress={() => navigation.navigate('EditCity')}
            placeholder="Location"
          />
        </View>
        <View>
          <Text className="text-black text-base font-pregular">Type</Text>
          <View style={styles.container}>
            <Text style={styles.label}>Select Property Type:</Text>

            <TouchableOpacity
              style={
                localType === 'sell' ? styles.selectedButton : styles.button
              }
              onPress={() => handleSelect('sell')}>
              <Text style={styles.buttonText}>Sell</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                localType === 'rent' ? styles.selectedButton : styles.button
              }
              onPress={() => handleSelect('rent')}>
              <Text style={styles.buttonText}>Rent</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Button title="Update Property" onPress={handleUpdate} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  selectedButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
  },
});
export default EditGeneralDetails;
