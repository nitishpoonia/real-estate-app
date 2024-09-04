import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import {images} from '../../constants';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
const OnboardingScreenTemplate = ({navigation}) => {
  const [index, setIndex] = useState(0);

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
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      className="p-4 items-center flex-1 b">
      <View className="self-end">
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-green-500 text-xl text-right font-pregular">
            Skip
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-center items-center">
        <Image
          source={details[index].image}
          className="h-80 w-80"
          resizeMode="contain"
        />
      </View>
      <View>
        <View>
          <Text className="font-psemibold text-3xl text-black text-center mb-2">
            {details[index].mainHeading}
          </Text>
        </View>

        <View className="mb-7">
          <Text className="font-pregular text-center text-lg text-gray-700">
            {details[index].subHeading}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-center gap-3 mb-7">
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
      <View className="mb-7">
        <CustomButton
          title="Next"
          handlePress={() => {
            if (index > details.length - 2) {
              navigation.navigate('Login');
              return;
            }
            setIndex(prevIndex => prevIndex + 1);
          }}
          containerStyles={'w-[145px]'}
        />
      </View>
      <View>
        <Text className="text-black text-lg text-center">
          Don't have an account? <Text className="font-psemibold">Sign Up</Text>
        </Text>
      </View>
    </Animated.View>
  );
};

export default OnboardingScreenTemplate;
