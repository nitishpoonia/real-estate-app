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
      <View className="flex-row items-center justify-between z-10 w-[65%]">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-[#16a34a] rounded-full my-2 mx-2">
          <Icon name={'chevron-left'} color="white" size={30} />
        </Pressable>
        <Text className="text-lg font-pmedium text-[#16a34a]">
          Explore Images
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
