import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser} from '../../redux/slices/auth/authActions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import CustomUserInfoCard from '../../components/CustomUserInfoCard';
import {images} from '../../constants';
import PodcastIcon from '../../assets/images/podcast.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
const UserProfile = ({navigation}) => {
  const userJSONString = JSON.parse(useSelector(state => state.auth.user));
  const dispatch = useDispatch();
  // useEffect(() => {
  //   let parsedUser;
  //   try {
  //     if (typeof userJSONString === 'string') {
  //       // Attempt to parse JSON only if it's a string
  //       parsedUser = JSON.parse(userJSONString);
  //     } else {
  //       // If it's not a string, use it directly
  //       parsedUser = userJSONString;
  //     }
  //     setUser(parsedUser);
  //   } catch (error) {
  //     console.error('Error parsing JSON:', error);
  //     setUser(null);
  //   }
  // }, [userJSONString]);
  console.log(userJSONString.id);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const screenWidth = Dimensions.get('window').width;
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
            <Pressable>
              <Text className="text-[#16a34a] font-pmedium text-base">
                Edit
              </Text>
            </Pressable>
          </View>
          <View className="items-center mt-4 justify-center h-[100%]">
            <View className="mb-1">
              {userJSONString?.avatar ? (
                <Image
                  source={{uri: userJSONString?.avatar}}
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
                {userJSONString?.username}
              </Text>
              <Text className="text-[#16a34a] font-pmedium text-base bg-[#D0EDDB] py-2 rounded-lg px-4">
                {userJSONString?.email}
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
                <View className="p-3 bg-[#16a34a] rounded-full items-center justify-center">
                  <Icon name={'public'} size={24} color={'white'} />
                </View>
                <View className="px-4 py-3 bg-[#16a34a] rounded-full items-center justify-center">
                  <FontAwesomeIcon
                    name={'instagram'}
                    size={25}
                    color={'white'}
                  />
                </View>

                <View className="px-[14px] py-3 bg-[#16a34a] rounded-full">
                  <FontAwesomeIcon name={'twitter'} size={24} color={'white'} />
                </View>
                <View className="p-3 bg-[#16a34a] rounded-full">
                  <FontAwesomeIcon name={'youtube'} size={24} color={'white'} />
                </View>
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
