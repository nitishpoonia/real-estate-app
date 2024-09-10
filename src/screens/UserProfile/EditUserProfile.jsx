import {View, Text, Alert, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomTextInput from '../../components/CustomTextInput';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
const EditUserProfile = ({navigation}) => {
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
      const token = await getAccessToken();
      if (token) {
        const response = await axios.get(
          'http://10.0.2.2:6000/api/v1/users/current-user',
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
        const response = await axios.patch(
          'http://10.0.2.2:6000/api/v1/users/update-account',
          {
            phone: data.phone,
            username: data.username,
            email: data.email,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );
        if (response.status === 200) {
          Alert.alert('Success', 'User profile updated successfully');
        }
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      Alert.alert('Error', 'Failed to update user profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <View className="mx-2">
      <View className="flex-row items-center justify-between max-w-[250px] mt-2">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#003366" />
        </Pressable>
        <Text className="font-semibold text-black text-2xl">Edit Profile</Text>
      </View>

      <Pressable onPress={pickImage} className="items-center mt-5">
        {imageUri ? (
          <Image
            source={{uri: imageUri}}
            width={100}
            height={100}
            className="rounded-full w-[100px] h-[100px]"
          />
        ) : null}
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
        onPress={handleSubmit}
        disabled={loading}
        containerStyles={'h-[40px]'}
      />
    </View>
  );
};

export default EditUserProfile;
