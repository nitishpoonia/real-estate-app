import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GeneralDetails from './GeneralDetails';
import {View} from 'react-native';

const ApScreen1 = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <GeneralDetails navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};

export default ApScreen1;
