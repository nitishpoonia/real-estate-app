import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import BasicProperties from '../../components/properties/BasicProperties';
import LoctionIcon from '../../assets/images/LocationPinIcon.svg';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';
Geocoder.init(process.env.GOOGLE_API);

const ProductHomePage = ({navigation}) => {
  const userJSONString = useSelector(state => state.auth.user);
  const [user, setUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState('');
  useEffect(() => {
    let parsedUser;
    try {
      if (typeof userJSONString === 'string') {
        parsedUser = JSON.parse(userJSONString);
      } else {
        parsedUser = userJSONString;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setUser(null);
    }
  }, [userJSONString]);
  const imageUri = user?.avatar;
  const inputRef = useRef(null);
  const handleNavigationOnFocus = () => {
    inputRef.current.blur();
    navigation.navigate('SearchScreen');
  };
  const requestLocationPermission = async () => {
    let permission;

    // Check for platform and assign the proper permission type
    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    }

    // Check if permission is already granted
    const result = await check(permission);

    switch (result) {
      case RESULTS.GRANTED:
        console.log('Location permission already granted');
        return true;

      case RESULTS.DENIED:
        // Request the permission if it's denied
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          console.log('Location permission granted');
          return true;
        } else {
          console.log('Location permission denied');
          return false;
        }

      case RESULTS.BLOCKED:
        Alert.alert(
          'Permission Blocked',
          'Location permission is blocked. Please enable it from settings.',
          [
            {
              text: 'Go to Settings',
              onPress: () => openSettings(),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          {cancelable: true},
        );
        return false;

      case RESULTS.UNAVAILABLE:
        console.log('Location permission is unavailable on this device');
        return false;
    }
  };
  const handleLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        try {
          const {latitude, longitude} = position.coords;
          const response = await Geocoder.from(latitude, longitude);
          const addressComponent =
            response.results[0].address_components[3].long_name;
          setCurrentLocation(addressComponent);
        } catch (error) {
          console.warn('Error fetching address:', error);
        }
      },
      error => {
        console.log('Geolocation error:', error.code, error.message);
        Alert.alert('Error', 'Failed to get location. Please try again.');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  useEffect(() => {
    requestLocationPermission()
      .then(() => {
        handleLocation();
      })
      .catch(error => console.log('Error getting current location', error));
  }, []);
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="bg-[#d1eddb] justify-center px-2 rounded-b-lg h-[200px]">
          <View className="flex-row items-center justify-between">
            <Pressable className="flex flex-row gap-2">
              <Text className="font-pextrabold text-[#16a34a] text-2xl">
                NextAssets
              </Text>
            </Pressable>
            {/* <Pressable onPress={() => navigation.navigate('Profile')}>
              <Image
                source={{uri: imageUri}}
                resizeMode="cover"
                onError={error => console.log(error)}
                className="w-10 h-10 rounded-full"
              />
            </Pressable> */}
            <View className="flex-row items-center border border-[#16a34a] px-2 rounded-md bg-white py-1">
              <View className="mb-1">
                <LoctionIcon width-={19} height={19} />
              </View>
              <Text className="text-black font-pmedium">{currentLocation}</Text>
            </View>
          </View>
          <View>
            <Text className="font-psemibold text-black text-xl mt-2">
              Welcome, {user?.username}
            </Text>
            <Text className="font-pregular text-[#545454]">
              Your journey to homeownsership starts here, explore awesome houses
              now
            </Text>
          </View>
          <View className="mt-3">
            <TextInput
              ref={inputRef}
              placeholder="Search property"
              placeholderTextColor={'black'}
              className="border-2 border-white rounded-lg px-3 bg-white font-pregular h-[40px]"
              onFocus={handleNavigationOnFocus}
            />
          </View>
        </View>
        {/* <View className="mx-2 mt-2">
          <Text className="font-psemibold text-xl mb-1 text-black">
            You are looking to?
          </Text>
          <View className="flex-row w-[55%] justify-between">
            <Pressable
              className="border-2 px-3 py-1 rounded-xl border-[#16a34a]"
              onPress={() => navigation.navigate('SearchScreen')}>
              <Text className="font-pmedium text-[#16a34a] ">Buy</Text>
            </Pressable>
            <Pressable className="border-2 px-3 py-1 rounded-xl border-[#16a34a]">
              <Text className="font-pmedium text-[#16a34a]">Rent</Text>
            </Pressable>
            <Pressable className="border-2 px-3 py-1 rounded-xl border-[#16a34a]">
              <Text className="font-pmedium text-[#16a34a]">Sell</Text>
            </Pressable>
          </View>
        </View> */}
        <View>
          <View className="px-2 flex-row items-center justify-between mt-4">
            <Text className="text-xl text-black font-psemibold ">
              Popular Choices
            </Text>

            <Text className="text-black font-psemibold text-sm">View All</Text>
          </View>
          <View className="mx-2 my-3">
            <BasicProperties navigation={navigation} />
          </View>
        </View>
        <View className="my-3">
          <View className="px-2 flex-row items-center justify-between mt-4">
            <Text className="text-xl text-black font-psemibold ">
              Recently Posted
            </Text>

            <Text className="text-black font-psemibold text-sm ">View All</Text>
          </View>
          <View className="mx-2">
            <BasicProperties navigation={navigation} useSorted={true} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductHomePage;
