import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomUserInfoCard from '../components/CustomUserInfoCard';
const SupportScreen = ({navigation}) => {
  return (
    <View className="flex-1 bg-[#EEF7FE] px-2 pt-4">
      <View className="flex-row items-center justify-between max-w-[230px]">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#003366" />
        </Pressable>
        <Text className="font-semibold text-black text-2xl">Support</Text>
      </View>
      <View className="items-center">
        <Icon name={'help-circle'} size={120} color={'#003366'} />
        <Text className="text-2xl text-black font-pregular">
          We're here to help!
        </Text>
      </View>
      <View className="mt-4 min-h-[300px] justify-evenly">
        <CustomUserInfoCard
          title={'Mail Us'}
          iconL={'mail'}
          iconR={'arrow-forward-circle'}
        />
        <CustomUserInfoCard
          title={'Call Us'}
          iconL={'call'}
          iconR={'arrow-forward-circle'}
        />
      </View>
      <View>
        <Text className="text-2xl text-black font-pregular text-center">
          We're just a message away!
        </Text>
      </View>
    </View>
  );
};

export default SupportScreen;
