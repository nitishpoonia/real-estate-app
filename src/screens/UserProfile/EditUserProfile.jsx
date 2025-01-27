import {View, Text, Alert, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomTextInput from '../../components/CustomTextInput';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {images} from '../../constants';

const EditUserProfile = ({navigation}) => {
  const isFocused = useIsFocused();
  const [data, setData] = useState({
    phone: '',
    username: '',
    email: '',
  });
  const [imageUri, setImageUri] = useState('');

  const [loading, setLoading] = useState(false);

  const getAccessToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      return accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };
  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const fetchCurrentUser = async () => {
    try {
      console.log('Fetching current user');

      const token = await getAccessToken();
      if (token) {
        const response = await axios.get(
          'https://realestate-backend-bosp.onrender.com/api/v1/users/current-user',
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );
        const userData = response.data.data;
        setData({
          phone: userData.phone.toString(),
          username: userData.username,
          email: userData.email,
        });
        setImageUri(userData.avatar);
      } else {
        console.log('No token found');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const handleInputChange = (name, value) => {
    setData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = await getAccessToken();

      if (token) {
        // Update user text details
        const textResponse = await axios.patch(
          'https://realestate-backend-bosp.onrender.com/api/v1/users/update-account',
          {
            phone: data.phone,
            username: data.username,
            email: data.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Check if there is an image to update
        if (imageUri) {
          const formData = new FormData();
          formData.append('avatar', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'profile-avatar.jpg',
          });

          const avatarResponse = await axios.patch(
            'https://realestate-backend-bosp.onrender.com/api/v1/users/avatar',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `${token}`,
              },
            },
          );

          console.log(avatarResponse);

          if (avatarResponse.status === 200) {
            Alert.alert('Success', 'User profile updated successfully');
            navigation.goBack();
          }
        } else {
          // Handle case where no avatar is provided
          if (textResponse.status === 200) {
            Alert.alert('Success', 'User profile updated successfully');
            navigation.goBack();
          }
        }
      }
    } catch (error) {
      console.error(
        'Error updating user profile:',
        error.response ? error.response.data : error.message,
      );
      Alert.alert('Error', 'Failed to update user profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [isFocused]);

  return (
    <SafeAreaView>
      <View className="mx-2">
        <View className="flex-row items-center justify-between mx-2 my-2 w-[62%]">
          <Pressable
            onPress={() => navigation.goBack()}
            className="bg-[#16a34a] rounded-full">
            <Icon name={'chevron-left'} color="white" size={30} />
          </Pressable>
          <View className="">
            <Text className="text-[#16a34a] font-psemibold text-lg">
              Edit Profile
            </Text>
          </View>
        </View>

        <Pressable onPress={pickImage} className="items-center mt-5">
          <View className="mb-1">
            {imageUri ? (
              <Image
                source={{uri: imageUri}}
                className="h-[100px] w-[100px] rounded-full"
              />
            ) : (
              <Image
                source={images.userProfilePlaceholder}
                className="h-[100px] w-[100px] rounded-full"
              />
            )}
          </View>
          <Text className="text-black text-xl font-psemibold text-center mb-5">
            Edit Photo
          </Text>
        </Pressable>

        <CustomTextInput
          value={data.email}
          onChangeText={value => handleInputChange('email', value)}
          placeholder="Email"
        />
        <CustomTextInput
          value={data.username}
          onChangeText={value => handleInputChange('username', value)}
          placeholder="Username"
        />
        <CustomTextInput
          value={data.phone}
          onChangeText={value => handleInputChange('phone', value)}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />

        <CustomButton
          title={loading ? 'Updating...' : 'Update Profile'}
          handlePress={handleSubmit}
          disabled={loading}
          containerStyles={'h-[40px]'}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditUserProfile;
