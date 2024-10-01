import {View, Text, Pressable, Linking, Alert} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {openWhatsApp} from '../components/SocialLinking';
const SupportScreen = ({navigation}) => {
  const handlePress = async () => {
    Linking.openURL(
      'mailto:support@nextworktechnologies.com?subject=Help Regarding Next Assets&body=I need help with...',
    ).catch(err => console.error('An error occurred', err));
  };
  return (
    <View className="flex-1 bg-[#D0EDDB] px-2 pt-3">
      <View className="flex-row items-center justify-between w-[62%] mb-3">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-[#16a34a] rounded-full">
          <Icon name={'chevron-left'} color="white" size={30} />
        </Pressable>
        <View className="">
          <Text className="text-[#16a34a] font-psemibold text-2xl">
            Support
          </Text>
        </View>
      </View>
      <View className="items-center">
        <Icon name={'support'} size={120} color={'#16a34a'} />
        <Text className="text-2xl text-black font-pregular">
          We're here to help!
        </Text>
      </View>
      <View className="mt-4 min-h-[300px] justify-evenly">
        <Pressable
          onPress={handlePress}
          className="flex-row items-center justify-between bg-[#16a34a] rounded-full px-3 py-3">
          <View className="flex-row items-center gap-2">
            <Icon name={'mail'} size={24} color={'white'} />
            <Text className="text-lg font-psemibold text-white">Mail Us</Text>
          </View>
          <Icon name={'chevron-right'} size={24} color={'white'} />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('ListedProperties')}
          className="flex-row items-center justify-between bg-[#16a34a] rounded-full px-3 py-3">
          <Pressable
            onPress={openWhatsApp}
            className="flex-row items-center gap-2">
            <FontAwesomeIcon
              name={'whatsapp'}
              size={24}
              color={'white'}
              className="pb-1"
            />
            <Text className="text-lg font-psemibold text-white">
              Connect on Whatsapp
            </Text>
          </Pressable>
          <Icon name={'chevron-right'} size={24} color={'white'} />
        </Pressable>
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
