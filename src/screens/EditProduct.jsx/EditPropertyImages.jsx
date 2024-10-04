import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Pressable,
  ScrollView,
  Alert,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  setImages,
  setMainImage,
} from '../../redux/slices/ManageProductSlice/addProductSlice';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import {updateProperty} from '../../redux/slices/product/ProductThunk';
const {width} = Dimensions.get('window');

const EditPropertyImages = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {_id} = route.params;
  const {selectedProperty} = useSelector(state => state.product);
  const {mainImage, images} = useSelector(state => state.addProduct);
  const [selectedImages, setSelectedImages] = useState(false);
  const [selectedMainImage, setSelectedMainImage] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [indexOfSelectedImages, setIndexOfSelectedImages] = useState([]);
  useEffect(() => {
    dispatch(setImages(selectedProperty?.data?.images));
    dispatch(setMainImage(selectedProperty?.data?.mainImage));
  }, []);
  const handleOtherImages = index => {
    setIndexOfSelectedImages((prevIndexes = []) => {
      let updatedIndexes;
      if (prevIndexes.includes(index)) {
        updatedIndexes = prevIndexes.filter(i => i !== index);
      } else {
        updatedIndexes = [...prevIndexes, index];
      }
      if (updatedIndexes.length === 0) {
        setModalVisible(false);
      } else {
        setModalVisible(true);
      }
      return updatedIndexes;
    });
  };
  const renderAllPhotos = ({item, index}) => {
    const isSelected = indexOfSelectedImages.includes(index);
    return (
      <Pressable
        className="relative mr-3"
        onLongPress={() => {
          handleOtherImages(index);
        }}>
        <Image
          source={{uri: item}}
          className="w-48 h-48 rounded-lg"
          style={{
            borderWidth: isSelected ? 5 : 0, // Apply border if selected
            borderColor: isSelected ? '#16a34a' : 'transparent', // Apply green color if selected
            padding: isSelected ? 5 : 0, // Apply padding if selected
          }}
        />
      </Pressable>
    );
  };
  const handleMainImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      response => {
        if (response.didCancel) {
          Alert.alert('User cancelled image picker');
        } else if (response.errorCode) {
          Alert.alert('ImagePicker Error: ', response.errorMessage);
        } else {
          dispatch(setMainImage(response.assets[0].uri));
          setModalVisible(!modalVisible);
          setSelectedMainImage(!selectedMainImage);
        }
      },
    );
  };

  const handleSelectAllImages = () => {
    if (selectedImages) {
      // Deselect all images
      setIndexOfSelectedImages([]);
    } else {
      // Select all images
      const allIndexes = images.map((_, index) => index);
      setIndexOfSelectedImages(allIndexes);
    }

    // Toggle select all state and modal visibility
    setSelectedImages(!selectedImages);
    setModalVisible(!modalVisible);
  };
const handleEditSelectedImages = () => {
  const maxImageLimit = 10;
  const remainingSlots = maxImageLimit - images.length; // Calculate how many images can still be added
  const selectionLimit = remainingSlots > 0 ? remainingSlots : 0;

  launchImageLibrary(
    {
      mediaType: 'photo',
      quality: 0.5,
      selectionLimit,
    },
    response => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedUris = response.assets.map(asset => asset.uri);

        // Combine existing images with the newly selected images up to the max limit
        const updatedImages = [...images, ...selectedUris].slice(
          0,
          maxImageLimit,
        );

        // Dispatch and reset state as needed
        dispatch(setImages(updatedImages));
        setModalVisible(false);
        setIndexOfSelectedImages([]);
      }
    },
  );
};


  // Function to delete selected images
  const handleDeleteSelectedImages = () => {
    const remainingImages = images.filter(
      (_, index) => !indexOfSelectedImages.includes(index),
    );
    dispatch(setImages(remainingImages));
    setIndexOfSelectedImages([]);
    setModalVisible(false);
  };
  const handleImageUpdate = () => {
    const updatedData = new FormData();

    if (mainImage) {
      updatedData.append('mainImage', {
        uri: mainImage,
        type: 'image/jpeg',
        name: 'mainImage.jpg',
      });
    }

    if (images && images.length > 0) {
      images.forEach((imageUri, index) => {
        updatedData.append('images', {
          uri: imageUri,
          type: 'image/jpeg',
          name: `image_${index}.jpg`,
        });
      });
    }
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
    <SafeAreaView className="mx-2 flex-1">
      <View className="mb-2 flex-row items-center justify-between w-[65%] mt-2">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-[#16a34a] rounded-full">
          <Icon name={'chevron-left'} color="white" size={30} />
        </Pressable>
        <Text className="text-[#16a34a] font-psemibold text-lg">
          Edit Images
        </Text>
      </View>
      <View>
        <View className="flex-row items-center justify-between">
          <Text className="text-black text-lg font-pregular">Main Image</Text>
          <Pressable
            onPress={() => {
              setSelectedMainImage(!selectedMainImage);
              setModalVisible(!modalVisible);
            }}>
            <Icon
              name={
                selectedMainImage ? 'check-circle' : 'radio-button-unchecked'
              }
              size={30}
              color="#16a34a"
            />
          </Pressable>
        </View>
        <View>
          <Pressable
            onLongPress={() => {
              setSelectedMainImage(!selectedMainImage);
              setModalVisible(!modalVisible);
            }}
            onPress={() => {
              if (selectedMainImage) {
                setSelectedMainImage(!selectedMainImage);
                setModalVisible(!modalVisible);
              }
            }}>
            <Image
              source={{uri: mainImage}}
              className="w-[200px] h-[200px] rounded-lg "
              style={{
                borderWidth: selectedMainImage ? 5 : 0,
                borderColor: selectedMainImage ? '#16a34a' : 'transparent',
                padding: selectedMainImage ? 5 : 0,
              }}
            />
          </Pressable>
        </View>
      </View>
      <View className="mt-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-black text-lg font-pregular">Other Images</Text>
          <Pressable
            onPress={() => {
              handleSelectAllImages();
              setModalVisible(!modalVisible);
            }}>
            <Icon
              name={selectedImages ? 'check-circle' : 'radio-button-unchecked'}
              size={30}
              color="#16a34a"
            />
          </Pressable>
        </View>
        <View>
          <FlatList
            data={images}
            renderItem={renderAllPhotos}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{padding: 10}}
          />
        </View>
      </View>
      <Modal
        isVisible={modalVisible}
        coverScreen={false}
        onBackButtonPress={() => {
          setModalVisible(!modalVisible);
          setSelectedMainImage(!mainImage);
        }}
        hasBackdrop={false}
        style={styles.modalStyles}>
        <View>
          {selectedMainImage ? (
            <Pressable
              className="bg-[#16a34a] m-auto px-4 py-1 rounded-lg"
              onPress={() => handleMainImage()}>
              <View className="self-center">
                <Icon name={'edit'} size={30} color={'white'} />
              </View>
              <Text className="text-white font-pmedium text-center text-base">
                Edit
              </Text>
            </Pressable>
          ) : (
            <View className="flex-row">
              <Pressable
                onPress={handleEditSelectedImages}
                className="bg-[#16a34a] m-auto px-7 py-1 rounded-lg">
                <View className="self-center">
                  <Icon name={'edit'} size={30} color={'white'} />
                </View>
                <Text className="text-white font-pmedium text-center text-base">
                  Edit
                </Text>
              </Pressable>
              <Pressable
                onPress={handleDeleteSelectedImages}
                className="bg-[#16a34a] m-auto px-4 py-1 rounded-lg">
                <View className="self-center">
                  <Icon name={'delete'} size={30} color={'white'} />
                </View>
                <Text className="text-white font-pmedium text-center text-base">
                  Delete
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>
      <View className="flex-row gap-4 justify-end mt-4">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-[#d1eddb] px-4 py-1 border-[#16a34a] border-2 rounded-lg">
          <Text className="text-[#16a34a] font-pmedium text-lg">Cancel</Text>
        </Pressable>
        <Pressable
          onPress={handleImageUpdate}
          className="bg-[#d1eddb] px-4 py-1 rounded-lg border-[#16a34a] border-2">
          <Text className="text-[#16a34a] font-pmedium text-lg">Save</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  modalStyles: {
    position: 'absolute',
    bottom: 0,
    margin: 0,
    width: width - 15,
    backgroundColor: '#d1eddb',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 100,
  },
});
export default EditPropertyImages;
