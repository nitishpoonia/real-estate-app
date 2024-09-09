import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  checkEmail,
  checkPassword,
  matchPassword,
  checkFullName,
  checkUserName,
} from '../../redux/slices/formSlice';
import {images} from '../../constants';
import {signupUser} from '../../redux/slices/auth/authActions';

const SignUp = ({navigation}) => {
  const [submitError, setSubmitError] = useState('');
  const [imageUri, setImageUri] = useState('');
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.auth);

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
  const {
    email,
    password,
    confirmPassword,
    passwordError,
    emailError,
    confirmPasswordError,
    fullName,
    userName,
    fullNameError,
    userNameError,
  } = useSelector(state => state.form);
  const handleInputChange = (field, value) => {
    switch (field) {
      case 'email':
        dispatch(checkEmail(value));
        break;
      case 'password':
        dispatch(checkPassword(value));
        break;
      case 'confirmPassword':
        dispatch(matchPassword(value));
        break;
      case 'userName':
        dispatch(checkUserName(value));
        break;
      case 'fullName':
        dispatch(checkFullName(value));
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    if (!email || !password || !confirmPassword || !fullName || !userName) {
      setSubmitError('All fields are required');
      return false;
    }
    if (
      emailError ||
      passwordError ||
      confirmPasswordError ||
      fullNameError ||
      userNameError
    ) {
      setSubmitError('Please fix the errors above');
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    setSubmitError('');
    if (validateForm()) {
      const data = new FormData();
      data.append('email', email);
      data.append('password', password);
      data.append('fullName', fullName);
      data.append('username', userName);
      if (imageUri) {
        const image = {
          uri: imageUri,
          type: 'image/jpeg',
          name: `${userName}-avatar`,
        };
        data.append('avatar', image);
      }
      dispatch(signupUser(data));
    }
  };

  return (
    <View className="flex-1 bg-white justify-center">
      <View className="mt-5">
        <Text className="text-3xl text-black font-psemibold text-center">
          Sign up
        </Text>
      </View>
      <View>
        <Pressable onPress={pickImage} className="items-center mt-5">
          {imageUri ? (
            <Image
              source={{uri: imageUri}}
              width={100}
              height={100}
              className="rounded-full w-[100px] h-[100px]"
            />
          ) : (
            <Image
              source={images.userProfilePlaceholder}
              className="rounded-full w-[100px] h-[100px]"
            />
          )}
        </Pressable>
        <Text className="text-black text-xl font-psemibold text-center mb-5">
          Add Photo
        </Text>
        <View className="mx-2">
          <CustomTextInput
            placeholder={'Enter your full name'}
            onChangeText={text => handleInputChange('fullName', text)}
            value={fullName}
            error={fullNameError}
            style={{color: 'black'}}
          />
          <CustomTextInput
            placeholder={'Enter your user name'}
            onChangeText={text => handleInputChange('userName', text)}
            value={userName}
            error={userNameError}
            style={{color: 'black'}}
          />

          <CustomTextInput
            placeholder={'Your Email Address'}
            keyboardType={'email-address'}
            onChangeText={text => handleInputChange('email', text)}
            value={email}
            error={emailError}
            style={{color: 'black'}}
          />
          <CustomTextInput
            placeholder={'Your Password'}
            secureTextEntry={true}
            onChangeText={text => handleInputChange('password', text)}
            value={password}
            error={passwordError}
            style={{color: 'black'}}
          />
          <CustomTextInput
            placeholder={'Confirm Password'}
            keyboardType={'password-visible'}
            onChangeText={text => handleInputChange('confirmPassword', text)}
            value={confirmPassword}
            error={confirmPasswordError}
            style={{color: 'black'}}
          />
        </View>
      </View>
      {submitError ? <Text className="text-red-600">{submitError}</Text> : null}
      <View className="items-center mt-4">
        <CustomButton
          title={loading ? 'Submitting...' : 'Sign Up'}
          handlePress={onSubmit}
          disabled={loading}
          containerStyles={'w-[370px]'}
        />
      </View>

      {/* <Pressable
        onPress={() => navigation.navigate('OnboardingScreenTemplate')}>
        <Text className="bg-secondary w-[80] py-4 text-center rounded-md">
          Go back
        </Text>
      </Pressable> */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text className="text-lg text-center mt-5 text-black font-pregular">
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
