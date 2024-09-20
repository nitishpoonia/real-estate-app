import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getCurrentUserDetails,
  logoutUser,
} from '../../redux/slices/auth/authActions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {images} from '../../constants';
import PodcastIcon from '../../assets/images/podcast.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  openInstagramProfile,
  openWebsite,
  openWhatsApp,
  openYouTubeProfile,
} from '../../components/SocialLinking';
import {useIsFocused} from '@react-navigation/native';
import GooglePlacesInput from '../../components/GooglePlacesInput';

const UserProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getCurrentUserDetails());
  }, [isFocused]);
  const {user} = useSelector(state => state.auth);

  return (
    <SafeAreaView className="flex-1">
      <View className="mt-2 flex-1">
        <View className="h-[40%]">
          <View className="flex-row items-center justify-between mx-2">
            <Pressable
              onPress={() => navigation.goBack()}
              className="bg-[#16a34a] rounded-full">
              <Icon name={'chevron-left'} color="white" size={30} />
            </Pressable>
            <View>
              <Text className="text-[#16a34a] font-psemibold text-lg">
                User Profile
              </Text>
            </View>
            <Pressable onPress={() => navigation.navigate('EditUserProfile')}>
              <Text className="text-[#16a34a] font-pmedium text-base">
                Edit
              </Text>
            </Pressable>
          </View>
          <View className="items-center mt-4 justify-center h-[100%]">
            <View className="mb-1">
              {user?.avatar ? (
                <Image
                  source={{uri: user?.avatar}}
                  className="h-[100px] w-[100px] rounded-full"
                />
              ) : (
                <Image
                  source={images.userProfilePlaceholder}
                  className="h-[100px] w-[100px] rounded-full"
                />
              )}
            </View>
            <View className="items-center">
              <Text className="text-black font-psemibold text-lg">
                {user?.username}
              </Text>
              <Text className="text-[#16a34a] font-pmedium text-base bg-[#D0EDDB] py-2 rounded-lg px-4">
                {user?.email}
              </Text>
            </View>
          </View>
        </View>
        <View className="bg-[#D0EDDB] h-[60%] px-2 rounded-t-3xl justify-evenly mt-3">
          <Pressable className="flex-row items-center justify-between bg-[#16a34a] rounded-full px-3 py-3">
            <View className="flex-row items-center gap-2">
              <Icon
                name={'favorite'}
                size={24}
                color={'white'}
                className="pb-1"
              />
              <Text className="text-lg font-psemibold text-white">
                Saved Properties
              </Text>
            </View>
            <Icon name={'chevron-right'} size={24} color={'white'} />
          </Pressable>
          <Pressable className="flex-row items-center justify-between bg-[#16a34a] rounded-full px-3 py-3">
            <View className="flex-row items-center gap-2">
              <Icon
                name={'real-estate-agent'}
                size={24}
                color={'white'}
                className="pb-1"
              />
              <Text className="text-lg font-psemibold text-white">
                Your Listings
              </Text>
            </View>
            <Icon name={'chevron-right'} size={24} color={'white'} />
          </Pressable>
          <Pressable className="flex-row items-center justify-between bg-[#16a34a] rounded-full px-3 py-3">
            <View className="flex-row items-center gap-2">
              <Icon
                name={'support'}
                size={24}
                color={'white'}
                className="pb-1"
              />
              <Text className="text-lg font-psemibold text-white">Support</Text>
            </View>
            <Icon name={'chevron-right'} size={24} color={'white'} />
          </Pressable>
          <Pressable
            onPress={() => dispatch(logoutUser())}
            className="flex-row items-center justify-between bg-[#16a34a] rounded-full px-3 py-3">
            <View className="flex-row items-center gap-2">
              <Icon
                name={'logout'}
                size={24}
                color={'white'}
                className="pb-1"
              />
              <Text className="text-lg font-psemibold text-white">Logout</Text>
            </View>
            <Icon name={'chevron-right'} size={24} color={'white'} />
          </Pressable>
          <View className="items-center">
            <Text className="font-psemibold text-[#16a34a] text-2xl mb-2">
              Connect with us
            </Text>
            <View>
              <View className="flex-row items-center gap-2">
                <Pressable
                  onPress={openWebsite}
                  className="p-3 bg-[#16a34a] rounded-full items-center justify-center">
                  <Icon name={'public'} size={24} color={'white'} />
                </Pressable>
                <Pressable
                  onPress={openInstagramProfile}
                  className="px-4 py-3 bg-[#16a34a] rounded-full items-center justify-center">
                  <FontAwesomeIcon
                    name={'instagram'}
                    size={25}
                    color={'white'}
                  />
                </Pressable>

                <Pressable
                  onPress={openWhatsApp}
                  className="px-[14px] py-3 bg-[#16a34a] rounded-full">
                  <FontAwesomeIcon
                    name={'whatsapp'}
                    size={24}
                    color={'white'}
                  />
                </Pressable>
                <Pressable
                  onPress={openYouTubeProfile}
                  className="p-3 bg-[#16a34a] rounded-full">
                  <FontAwesomeIcon name={'youtube'} size={24} color={'white'} />
                </Pressable>
                <View className="p-[14px] bg-[#16a34a] rounded-full">
                  <PodcastIcon />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;
