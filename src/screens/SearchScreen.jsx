import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
const SearchScreen = ({navigation}) => {
  const hello = 'hi';
  return (
    <SafeAreaView className="mx-2">
      <Icon name={'arrow-back'} size={30} color={'black'} />
      <View>
        {/* //TODO: Add a variable here which changes from buy rent according to selection on main page */}
        <Text>You are looking to variable in </Text>

      </View>
      <View className="mt-3">
        <TextInput
          placeholder="Search for flats, appartments, plots"
          placeholderTextColor={'black'}
          className="border-2 border-white rounded-lg px-3 bg-white font-pregular h-[40px]"
          autoFocus
        />
      </View>
      <View>
        <Text>BHK</Text>
        <Text>1RK</Text>
        <Text>2BHK</Text>
        <Text>3BHK</Text>
        <Text>4BHK</Text>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
