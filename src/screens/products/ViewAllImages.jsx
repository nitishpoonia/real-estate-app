import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProductImages from '../../components/ProductImages';
import {useRoute} from '@react-navigation/native';

const ViewAllImages = ({navigation}) => {
  const route = useRoute();
  console.log(route);

  const images = route.params?.images || [];
  console.log(images);

  return (
    <SafeAreaView className="mx-2 mt-2">
      <View>
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
