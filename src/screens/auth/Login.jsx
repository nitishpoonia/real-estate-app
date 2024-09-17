import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {checkEmail, checkPassword} from '../../redux/slices/formSlice';
import {
  forgotPasswordAction,
  loginUser,
} from '../../redux/slices/auth/authActions';
import {images} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginScreenImage from '../../assets/images/LoginScreenImage.svg';
import LoginPageDown from '../../assets/images/LoginPageDownImage.svg';
const Login = ({navigation}) => {
  const [submitError, setSubmitError] = useState('');
  const dispatch = useDispatch();
  const {email, password, passwordError, emailError} = useSelector(
    state => state.form,
  );
  const {loading} = useSelector(state => state.auth);

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'email':
        dispatch(checkEmail(value));
        break;
      case 'password':
        dispatch(checkPassword(value));
        break;
      default:
        break;
    }
  };
  const validateForm = () => {
    if (!email || !password) {
      setSubmitError('All fields are required');
      return false;
    }
    if (emailError || passwordError) {
      setSubmitError('Please fix the errors above');
      return false;
    }
    return true;
  };
  const onSubmit = async () => {
    if (validateForm()) {
      setSubmitError('');
      dispatch(loginUser({email, password}));
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setSubmitError('Please enter your email address to reset your password');
      return;
    }
    dispatch(forgotPasswordAction({email}));
  };
  return (
    <SafeAreaView className="flex-1">
      <View>
        {/* <Image source={images.LoginScreenImage} width={100} height={100} /> */}
        <LoginScreenImage />
      </View>
      <View>
        <Text className="text-[#16a34a] text-center text-[36px] font-psemibold">
          NextAssets
        </Text>
        <Text className="text-black text-center text-[17px] font-psemibold ">
          Connecting You to Exclusive Properties
        </Text>
      </View>
      <View className="justify-center flex-1">
        <View className="items-center">
          <Text className="text-3xl text-black font-psemibold text-center mb-4">
            Login
          </Text>
        </View>
        <View className="mx-5">
          <CustomTextInput
            placeholder={'Your Email Address'}
            keyboardType={'email-address'}
            onChangeText={text => handleInputChange('email', text)}
            value={email}
            style={{color: 'black'}}
            containerStyles={''}
          />
          <CustomTextInput
            placeholder={'Your Password'}
            secureTextEntry={true}
            onChangeText={text => handleInputChange('password', text)}
            value={password}
            style={{color: 'black'}}
          />
        </View>
        <View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text className="text-right font-pregular text-black text-lg mr-5">
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
        {submitError ? (
          <Text className="text-red-600 ml-6 font-pregular">{submitError}</Text>
        ) : null}
        <View className="items-center mt-4">
          <CustomButton
            title={loading ? 'Submitting...' : 'Login'}
            handlePress={onSubmit}
            disabled={loading}
            containerStyles={'max-w-[100%] w-96 mx-auto bg-[#16a34a]'}
            isLoading={loading}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text className="text-lg text-center mt-5 text-black font-pregular">
            Don't have account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-0 left-0 z-[-1]">
        {/* <Image
          className="realtive"
          source={images.bgimg}
          height={100}
          width={100}
        /> */}
        <LoginPageDown />
      </View>
    </SafeAreaView>
  );
};

export default Login;
