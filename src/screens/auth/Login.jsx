import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {checkEmail, checkPassword} from '../../redux/slices/formSlice';
import {loginUser} from '../../redux/slices/auth/authActions';
import {images} from '../../constants';
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
  return (
    <View className="bg-white flex-1 justify-center ">
      <View className="mt-5 items-center">
        <Image
          source={images.logo2}
          className="w-[120px] h-[120px] mb-3"
          resizeMode="contain"
        />
        <Text className="text-3xl text-black font-psemibold text-center mb-4">
          Sign in
        </Text>
      </View>
      <View>
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
      </View>
      <View>
        <TouchableOpacity>
          <Text className="text-right font-psemibold text-blue-700 text-xl mr-4">
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>
      {submitError ? (
        <Text className="text-red-600 font-pregular">{submitError}</Text>
      ) : null}
      <View className="items-center mt-4">
        <CustomButton
          title={loading ? 'Submitting...' : 'Login'}
          handlePress={onSubmit}
          disabled={loading}
          containerStyles={'w-[370px]'}
          isLoading={loading}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text className="text-lg text-center mt-5 text-black font-pregular">
          Don't have account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
