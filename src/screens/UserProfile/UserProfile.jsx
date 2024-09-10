import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser} from '../../redux/slices/auth/authActions';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomUserInfoCard from '../../components/CustomUserInfoCard';
import {images} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
const UserProfile = ({navigation}) => {
  const userJSONString = useSelector(state => state.auth.user);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let parsedUser;
    try {
      if (typeof userJSONString === 'string') {
        // Attempt to parse JSON only if it's a string
        parsedUser = JSON.parse(userJSONString);
      } else {
        // If it's not a string, use it directly
        parsedUser = userJSONString;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setUser(null);
    }
  }, [userJSONString]);

  const imageUri = user?.avatar;

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const screenWidth = Dimensions.get('window').width;
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <View
          style={{width: screenWidth}}
          className={`flex-row items-center justify-between absolute z-10`}>
          <Text className="font-semibold text-white text-2xl pl-2 pt-3">
            Profile
          </Text>
          <TouchableOpacity
            onPress={handleLogout}
            className={`pr-1 pt-3 relative left-0`}>
            <Icon name="log-out" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={images.backgroundUserProfile}
          resizeMode="cover"
          className="flex-1 justify-center">
          <View className=" items-center">
            <View>
              <Image
                source={{uri: imageUri}}
                resizeMode="cover"
                onError={error => console.log(error)}
                className="w-28 h-28 rounded-full"
              />
            </View>
            <Text className="font-psemibold text-white text-lg mt-2">
              {user?.username}
            </Text>
          </View>
        </ImageBackground>
        <View className="bg-white rounded-t-[28px] w-full pt-5 px-2 bottom-6">
          <CustomUserInfoCard
            title={user?.username}
            iconR={'create'}
            iconL={'person'}
            handlePress={() => navigation.navigate('EditUserProfile')}
          />
          <CustomUserInfoCard
            title={user?.email}
            iconR={'create'}
            iconL={'mail'}
            handlePress={() => navigation.navigate('EditUserProfile')}
          />
          <CustomUserInfoCard
            title={user?.phone}
            iconR={'create'}
            iconL={'phone-portrait'}
            handlePress={() => navigation.navigate('EditUserProfile')}
          />
          <CustomUserInfoCard
            title={'Change Password'}
            iconR={'create'}
            iconL={'lock-closed'}
            handlePress={() => navigation.navigate('EditUserProfile')}
          />
          <CustomUserInfoCard
            title={'Support'}
            iconR={'arrow-forward-circle'}
            iconL={'help-circle'}
            handlePress={() => navigation.navigate('SupportScreen')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;
