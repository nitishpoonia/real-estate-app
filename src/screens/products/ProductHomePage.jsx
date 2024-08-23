import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../redux/slices/auth/authActions';
const ProductHomePage = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {});

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.replace('Login');
  };
  return (
    <View>
      <Text>ProductHomePage</Text>
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-400 w-[150px] rounded-md py-2">
        <Text className="text-center text-white text-xl">Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductHomePage;
