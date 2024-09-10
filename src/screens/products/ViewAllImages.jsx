import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProductImages from '../../components/ProductImages';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const ViewAllImages = ({navigation}) => {
  const route = useRoute();
  const images = route.params?.images || [];

  return (
    <SafeAreaView className="mx-2 mt-2">
      <View className="flex-row max-w-[65%] justify-between">
        <Pressable onPress={() => navigation.pop()}>
          <Icon name={'arrow-back'} color={'black'} size={30} />
        </Pressable>
        <Text className="text-2xl font-psemibold text-black">
          Explore Property
        </Text>
      </View>
      <View className="items-center">
        <ProductImages
          images={images}
          numColumns={1}
          imageStyles={'m-1 min-w-[300px] h-[200px]'}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewAllImages;
