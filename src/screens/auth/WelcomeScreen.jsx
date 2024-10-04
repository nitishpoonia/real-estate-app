import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import CustomButton from '../../components/CustomButton';
import LandingPageImage from '../../assets/images/LandnigScreenImage.svg';
import WelcomeScreenBottomImage from '../../assets/images/WelcomeScreenBottom.svg';

const WelcomeScreen = ({navigation}) => {
  return (
    <ScrollView className="flex-1">
      <View className="flex-1 justify-center mt-5">
        <View className="flex justify-center items-center">
          <LandingPageImage />
        </View>

        <View className="mt-4">
          <Text className="text-black text-center mt-4 text-4xl font-psemibold">
            Welcome
          </Text>
          <Text className="text-black text-center text-4xl font-psemibold">
            to
          </Text>
          <Text className="text-[#16a34a] text-center text-[36px] font-psemibold">
            NextAssets
          </Text>
          <Text className="text-black text-center text-[17px] font-psemibold ">
            Connecting You to Exclusive Properties
          </Text>
        </View>

        <View>
          <CustomButton
            title="Sign Up"
            containerStyles={
              'max-w-[100%] w-96 z-20 mx-auto bg-[#16a34a] border-[#16a34a]'
            }
            textStyles={'text-white'}
            handlePress={() => navigation.navigate('SignUp')}
          />
        </View>

        <View className="z-30">
          <Text className="text-black font-medium text-[17px] text-center px-4 font-psemibold">
            If You already have an account you can login from here
          </Text>

          <CustomButton
            title="Login"
            containerStyles={
              'max-w-[100%] w-96 mx-auto bg-white border-2 border-[#16a34a]'
            }
            textStyles={'text-[#16a34a]'}
            handlePress={() => navigation.navigate('Login')}
          />
        </View>

        <View className="absolute bottom-0 right-0 z-[-1]">
          <WelcomeScreenBottomImage />
        </View>
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen;
