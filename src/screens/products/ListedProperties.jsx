import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Modal,
  Button,
} from 'react-native';
import {
  deleteProperty,
  getPropertyListedBy,
} from '../../redux/slices/product/ProductThunk';
import {useDispatch, useSelector} from 'react-redux';
import LongCard from '../../components/LongCard';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

const DeleteConfirmationModal = ({visible, onConfirm, onCancel}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Are you sure you want to delete this property?
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.modalButtons}
              title="Cancel"
              onPress={onCancel}
            />
            <Button
              style={styles.modalButtons}
              title="Delete"
              onPress={onConfirm}
              color="red"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ListedProperties = ({navigation}) => {
  const dispatch = useDispatch();
  const {listedProperties, isLoading, error} = useSelector(
    state => state.product,
  );
  const {user} = useSelector(state => state.auth);
  const userId = user?._id;

  const [modalVisible, setModalVisible] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  useEffect(() => {
    dispatch(getPropertyListedBy(userId));
  }, [userId, dispatch]);

  const handlePropertyDeletion = id => {
    setPropertyToDelete(id);
    setModalVisible(true);
  };

  const confirmDeletion = () => {
    if (propertyToDelete) {
      dispatch(deleteProperty(propertyToDelete)).then(() => {
        Toast.show({
          type: 'success',
          text1: 'Property Deleted',
          text2: 'Property has been successfully deleted.',
        });
        dispatch(getPropertyListedBy(userId));
      });
      setModalVisible(false);
      setPropertyToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  const renderCard = ({item}) => {
    return (
      <LongCard
        key={item?._id}
        name={item?.title}
        location={item?.location}
        price={item?.price}
        imageUri={item?.mainImage}
        type={item?.type}
        category={item?.category}
        bedroom={item?.bedrooms}
        bathroom={item?.bathrooms}
        carpetArea={item?.carpetArea}
        createdAt={item?.createdAt}
        handleEditButtonPress={() =>
          navigation.navigate('EditProperty', {
            screen: 'EditScreen',
            params: {_id: item?._id},
          })
        }
        handleDeleteButtonPress={() => handlePropertyDeletion(item?._id)}
        handleCardPress={() =>
          navigation.navigate('ProductDetailPage', {_id: item?._id})
        }
      />
    );
  };

  const renderEmptyComponent = () => (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold text-gray-600">
        You do not have any properties listed.
      </Text>
      <Pressable
        onPress={() => navigation.navigate('AddProduct')}
        className="mt-4 bg-green-600 rounded-full px-4 py-2">
        <Text className="text-white text-base">Add New Property</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between mx-2 my-2 w-[65%]">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-[#16a34a] rounded-full">
          <Icon name={'chevron-left'} color="white" size={30} />
        </Pressable>
        <View className="">
          <Text className="text-[#16a34a] font-psemibold text-lg">
            Listed Properties
          </Text>
        </View>
      </View>
      <View className="flex-1 items-center">
        {listedProperties?.length > 0 ? (
          <FlatList
            data={listedProperties}
            renderItem={renderCard}
            keyExtractor={item => item._id.toString()}
          />
        ) : (
          renderEmptyComponent()
        )}
      </View>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        visible={modalVisible}
        onConfirm={confirmDeletion}
        onCancel={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = {
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtons: {
    borderRadius: 10,
  },
};

export default ListedProperties;
