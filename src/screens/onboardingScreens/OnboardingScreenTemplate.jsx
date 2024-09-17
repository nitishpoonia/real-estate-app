import {View, Text, TouchableOpacity, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {images} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
const OnboardingScreenTemplate = ({navigation}) => {
  const [index, setIndex] = useState(0);
  console.log(index);

  const details = [
    {
      image: images.house1,
      mainHeading: 'Explore world class smart real estate',
      subHeading:
        'Discover real estate for sale, new homes shop mortages, find property records, condos & appartments',
    },
    {
      image: images.hosue2,
      mainHeading: 'Find Your Dream Home with Us',
      subHeading:
        'Find your place with an immersive experience and the most listings, including things you wont find anywhere else',
    },
    {
      image: images.house1,
      mainHeading: 'The perfect choice for your future',
      subHeading:
        'Find the luxury residency that suits you, we will help you to find the most suitable residence for you',
    },
  ];
  return (
    <SafeAreaView className="flex-1">
      <View className="p-4 items-center flex-1">
        <View className="flex-row justify-center items-center">
          <Image
            source={details[index].image}
            className="h-[300px] w-[300px]"
            resizeMode="contain"
          />
        </View>
        <View>
          <View>
            <Text className="font-psemibold text-2xl text-black text-center mb-2">
              {details[index].mainHeading}
            </Text>
          </View>

          <View className="mb-7">
            <Text className="font-pregular text-center text-sm text-gray-700">
              {details[index].subHeading}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-center gap-3">
          <View
            className="w-[10px] h-[10px] bg-black rounded-full"
            style={{
              backgroundColor: index === 0 ? 'black' : 'gray',
            }}
          />
          <View
            className="w-[10px] h-[10px] bg-gray-300 rounded-full"
            style={{
              backgroundColor: index === 1 ? 'black' : 'gray',
            }}
          />
          <View
            className="w-[10px] h-[10px] bg-gray-300 rounded-full"
            style={{
              backgroundColor: index === 2 ? 'black' : 'gray',
            }}
          />
        </View>
        <View className="flex-1 mt-3">
          <CustomButton
            title="Next"
            handlePress={() => {
              if (index > details.length - 2) {
                navigation.navigate('Login');
                return;
              }
              setIndex(prevIndex => prevIndex + 1);
            }}
            containerStyles={'max-w-[100%]'}
          />
          <CustomButton
            title="Skip"
            containerStyles={'max-w-[100%] bg-white border border-[#16a34a]'}
            textStyles={'text-[#16a34a]'}
            handlePress={() => navigation.navigate('Login')}
          />
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text className="text-black text-lg text-center">
              Don't have an account?{' '}
              <Text className="font-psemibold">Sign Up</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreenTemplate;
