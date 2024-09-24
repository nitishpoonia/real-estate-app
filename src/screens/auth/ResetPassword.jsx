import React, {useState} from 'react';
import {View, Text, Alert, Pressable} from 'react-native';
import {resetPasswordAction} from '../../redux/slices/auth/authActions';
import {useDispatch} from 'react-redux';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ResetPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleResetPassword = async () => {
    // Validate new password and confirm password
    if (newPassword.trim() === '' || confirmPassword.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      console.log('Resetting password...');

      // Await the result of the dispatch
      const resultAction = await dispatch(
        resetPasswordAction({token, newPassword}),
      );

      console.log('Result action:', resultAction);

      // Check if the action was fulfilled
      if (resetPasswordAction.fulfilled.match(resultAction)) {
        // Navigate to the Login screen on success
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Password reset failed.');
      }
    } catch (error) {
      console.error('Unexpected error occurred:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <View className="mx-3">
      <View className="flex-row items-center justify-between max-w-[67%] my-4">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-[#16a34a] rounded-full">
          <Icon name={'chevron-left'} color="white" size={30} />
        </Pressable>
        <View>
          <Text className="text-[#16a34a] font-psemibold text-lg">
            Reset Password
          </Text>
        </View>
      </View>
      <Text className="text-black text-base font-pregular">
        Enter the code received in mail here
      </Text>
      <CustomTextInput
        placeholder="Verification Code"
        value={token}
        keyboardType={'numeric'}
        onChangeText={setToken}
        className="text-black"
      />
      <CustomTextInput
        placeholder="New Password"
        value={newPassword}
        secureTextEntry={true}
        onChangeText={setNewPassword}
        className="text-black"
      />
      <CustomTextInput
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        className="text-black"
      />

      <CustomButton title="Reset Password" handlePress={handleResetPassword} />
    </View>
  );
};

export default ResetPassword;
