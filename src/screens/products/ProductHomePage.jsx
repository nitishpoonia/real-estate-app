import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import SmallCard from '../../components/SmallCard';
import BasicProperties from '../../components/properties/BasicProperties';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductHomePage = ({navigation}) => {
  const userJSONString = useSelector(state => state.auth.user);
  const [user, setUser] = useState(null);

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
  console.log(imageUri);

  //   const imageUri = 'https://picsum.photos/200/300';
  const inputRef = useRef(null);
  const handleNavigationOnFocus = () => {
    inputRef.current.blur();
    navigation.navigate('SearchScreen');
  };

  return (
    <ScrollView className="flex-1">
      <View className="bg-[#16a34a] justify-center px-2 pt-4 rounded-b-lg h-[200px]">
        <View className="flex-row items-center justify-between">
          <Pressable className="flex flex-row gap-2">
            <Text className="font-pextrabold text-white text-2xl ">Home</Text>
          </Pressable>
          <Image
            source={{uri: imageUri}}
            resizeMode="cover"
            onError={error => console.log(error)}
            className="w-10 h-10 rounded-full"
          />
        </View>
        <View>
          <Text className="font-psemibold text-white text-xl mt-2">
            Welcome, {user?.username}
          </Text>
        </View>
        <View className="mt-3">
          <TextInput
            ref={inputRef}
            placeholder="Search here"
            placeholderTextColor={'black'}
            className="border-2 border-white rounded-lg px-3 bg-white font-pregular h-[40px]"
            onFocus={handleNavigationOnFocus}
          />
        </View>
      </View>
      <View className="mx-2 mt-2">
        <Text className="font-psemibold text-xl mb-1 text-black">
          What you are looking for?
        </Text>
        <View className="flex-row w-[45%] justify-between">
          <Pressable className="border-2 px-3 py-1 rounded-xl border-[#16a34a]">
            <Text className="font-pmedium text-[#16a34a] ">Buying</Text>
          </Pressable>
          <Pressable className="border-2 px-3 py-1 rounded-xl border-[#16a34a]">
            <Text className="font-pmedium text-[#16a34a]">Renting</Text>
          </Pressable>
        </View>
      </View>
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
      {/* <View>
        <View className="px-2 flex-row items-center justify-between mt-4">
          <Text className="text-xl text-black font-psemibold ">
            Recently Posted
          </Text>

          <Text className="text-black font-psemibold text-sm ">View All</Text>
        </View>
        <View className="mx-2">
          <SmallCard
            name={'House 1'}
            location={'New Location'}
            price={'2,000,00'}
            handleCardPress={() => navigation.navigate('ProductDetailPage')}
            handleHeartPress={() => console.log('Heart Pressed')}
          />
          <SmallCard
            name={'House 1'}
            location={'New Location'}
            price={'2,000,00'}
            handleCardPress={() => navigation.navigate('ProductDetailPage')}
            handleHeartPress={() => console.log('Heart Pressed')}
          />
          <SmallCard
            name={'House 1'}
            location={'New Location'}
            price={'2,000,00'}
            handleCardPress={() => navigation.navigate('ProductDetailPage')}
            handleHeartPress={() => console.log('Heart Pressed')}
          />
        </View>
      </View> */}
    </ScrollView>
  );
};

export default ProductHomePage;
