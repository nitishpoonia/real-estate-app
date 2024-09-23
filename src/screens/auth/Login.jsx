import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkEmail,
  checkPassword,
  resetFields,
} from '../../redux/slices/formSlice';
import {
  forgotPasswordAction,
  loginUser,
} from '../../redux/slices/auth/authActions';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginScreenImage from '../../assets/images/LoginScreenImage.svg';
import LoginPageDown from '../../assets/images/LoginPageDownImage.svg';
const Login = ({navigation}) => {
  const [submitError, setSubmitError] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
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
    dispatch(resetFields());
    navigation.navigate('ResetPassword');
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // Keyboard is visible
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // Keyboard is hidden
      },
    );

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior="padding" // Adjust this based on your needs (e.g., 'height' or 'position')
        style={{flex: 1}}>
        <View>
          {/* <Image source={images.LoginScreenImage} width={100} height={100} /> */}
          {!keyboardVisible && ( // Conditionally render image when keyboard is not visible
            <View>
              <LoginScreenImage />
            </View>
          )}
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
              autoCapitalize="none"
              autoCompleteType="email"
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
            <Text className="text-red-600 ml-6 font-pregular">
              {submitError}
            </Text>
          ) : null}
          <View className="items-center mt-4">
            <CustomButton
              title={loading ? 'Logging In..' : 'Login'}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
