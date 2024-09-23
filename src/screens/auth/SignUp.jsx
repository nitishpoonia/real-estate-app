// All the code realted to image upload is not being used
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
// import {launchImageLibrary} from 'react-native-image-picker';
import {
  checkPhone,
  checkPassword,
  matchPassword,
  checkUserName,
  checkEmail,
} from '../../redux/slices/formSlice';
// import {images} from '../../constants';
import {signupUser} from '../../redux/slices/auth/authActions';
import TopImage from '../../assets/images/TopVectorImage.svg';
import BottomImage from '../../assets/images/BottomSignUpImage.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
const SignUp = ({navigation}) => {
  const [submitError, setSubmitError] = useState('');
  // const [imageUri, setImageUri] = useState('');
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.auth);

  // const pickImage = () => {
  //   launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.errorCode) {
  //       console.log('ImagePicker Error: ', response.errorMessage);
  //     } else {
  //       setImageUri(response.assets[0].uri);
  //     }
  //   });
  // };
  const {
    email,
    emailError,
    password,
    phone,
    phoneError,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    userName,
    userNameError,
    isUppercase,
    isLowercase,
    hasNumber,
    hasSpecialChar,
    isPasswordLongEnough,
  } = useSelector(state => state.form);
  const handleInputChange = (field, value) => {
    switch (field) {
      case 'email':
        dispatch(checkEmail(value));
        break;
      case 'phone':
        dispatch(checkPhone(value));
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

      default:
        break;
    }
  };

  const validateForm = () => {
    setSubmitError('');
    if (!phone || !password || !email || !userName) {
      setSubmitError('All fields are required');
      return false;
    }
    if (phoneError || passwordError || emailError || userNameError) {
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
      data.append('username', userName);
      data.append('phone', phone);
      // if (imageUri) {
      //   const image = {
      //     uri: imageUri,
      //     type: 'image/jpeg',
      //     name: `${userName}-avatar`,
      //   };
      //   data.append('avatar', image);
      // }
      dispatch(signupUser(data));
    }
  };

  return (
    <View className="flex-1 bg-white justify-center">
      <View className="absolute right-0 top-0">
        <TopImage />
      </View>
      <View>
        <Text className="text-[#16a34a] text-center text-[36px] font-psemibold">
          NextAssets
        </Text>
        <Text className="text-black text-center text-[17px] font-psemibold ">
          Connecting You to Exclusive Properties
        </Text>
      </View>
      <View className="mt-5">
        <Text className="text-3xl text-black font-psemibold text-center">
          Create Account
        </Text>
      </View>
      <View>
        {/* <Pressable onPress={pickImage} className="items-center mt-5">
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
        </Text> */}
        <View className="mx-5">
          <CustomTextInput
            placeholder={'Enter your User Name'}
            onChangeText={text => handleInputChange('userName', text)}
            value={userName}
            error={userNameError}
            style={{color: 'black'}}
          />
          <CustomTextInput
            placeholder="Enter your email"
            onChangeText={text => handleInputChange('email', text)}
            value={email}
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            accessibilityLabel="Email Input"
            accessibilityHint="Enter your email address"
            style={{color: 'black'}}
          />

          <CustomTextInput
            placeholder={'Enter your mobile number'}
            onChangeText={text => handleInputChange('phone', text)}
            value={phone}
            error={phoneError}
            keyboardType="phone-pad"
            style={{color: 'black'}}
          />
          {/* <CustomTextInput
            placeholder={'Your Email Address'}
            keyboardType={'email-address'}
            onChangeText={text => handleInputChange('email', text)}
            value={email}
            error={emailError}
            style={{color: 'black'}}
          /> */}
          <View>
            <CustomTextInput
              placeholder={'Your Password'}
              secureTextEntry={true}
              onChangeText={text => handleInputChange('password', text)}
              value={password}
              style={{color: 'black'}}
            />

            <View className=" mb-2">
              <View className="flex-row items-center">
                <Icon
                  name={hasNumber ? 'check' : 'close'}
                  size={16}
                  color={hasNumber ? 'green' : '#9ca3af'}
                />
                <Text
                  className={`font-pregular ${
                    hasNumber ? 'text-green-600' : 'text-gray-400'
                  } text-base`}>
                  Atleast One number
                </Text>
              </View>
              <View className="flex-row items-center">
                <Icon
                  name={isUppercase ? 'check' : 'close'}
                  size={16}
                  color={isUppercase ? 'green' : '#9ca3af'}
                />
                <Text
                  className={`font-pregular ${
                    isUppercase ? 'text-green-600' : 'text-gray-400'
                  } text-base`}>
                  Atleast One uppercase letter
                </Text>
              </View>
              <View className="flex-row items-center">
                <Icon
                  name={isLowercase ? 'check' : 'close'}
                  size={16}
                  color={isLowercase ? 'green' : '#9ca3af'}
                />
                <Text
                  className={`font-pregular ${
                    isLowercase ? 'text-green-600' : 'text-gray-400'
                  } text-base`}>
                  Atleast One lowercase letter
                </Text>
              </View>
              <View className="flex-row items-center">
                <Icon
                  name={hasSpecialChar ? 'check' : 'close'}
                  size={16}
                  color={hasSpecialChar ? 'green' : '#9ca3af'}
                />
                <Text
                  className={`font-pregular ${
                    hasSpecialChar ? 'text-green-600' : 'text-gray-400'
                  } text-base`}>
                  Atleast One special character
                </Text>
              </View>
              <View className="flex-row items-center">
                <Icon
                  name={isPasswordLongEnough ? 'check' : 'close'}
                  size={16}
                  color={isPasswordLongEnough ? 'green' : '#9ca3af'}
                />
                <Text
                  className={`font-pregular ${
                    isPasswordLongEnough ? 'text-green-600' : 'text-gray-400'
                  } text-base`}>
                  Atleast 8 character long
                </Text>
              </View>
            </View>
          </View>
          {/* <CustomTextInput
            placeholder={'Confirm Password'}
            keyboardType={'password-visible'}
            onChangeText={text => handleInputChange('confirmPassword', text)}
            value={confirmPassword}
            error={confirmPasswordError}
            style={{color: 'black'}} 
          />*/}
        </View>
      </View>
      {submitError ? (
        <Text className="text-red-600 ml-5">{submitError}</Text>
      ) : null}
      <View className="items-center mt-4">
        <CustomButton
          title={loading ? 'Submitting...' : 'Sign Up'}
          handlePress={onSubmit}
          disabled={loading}
          containerStyles={'max-w-[100%] w-96 mx-auto bg-[#16a34a]'}
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
      <View className="absolute bottom-0 z-[-1]">
        <BottomImage />
      </View>
    </View>
  );
};

export default SignUp;
