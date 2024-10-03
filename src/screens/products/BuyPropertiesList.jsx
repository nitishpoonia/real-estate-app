import {View, Text, FlatList, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import SmallCard from '../../components/SmallCard';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BuyPropertiesList = ({navigation}) => {
  const {properties} = useSelector(state => state.product);
  const onlySellTypeProperties = properties.filter(
    property => property.type === 'sell',
  );

  console.log(onlySellTypeProperties);

  const renderSellProperties = ({item}) => (
    <SmallCard
      category={item?.category}
      bedroom={item?.bedrooms}
      bathroom={item?.bathrooms}
      carpetArea={item?.carpetArea}
      ukey={item?._id}
      name={item?.title}
      location={item?.location}
      price={item?.price}
      imageUri={item?.mainImage}
      createdAt={item?.createdAt}
      navigation={navigation}
      type={item?.type}
      handleCardPress={() =>
        navigation.navigate('ProductDetailPage', {_id: item?._id})
      }
      containerStyles={'w-[380px]'}
    />
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between mx-2 my-2">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-[#16a34a] rounded-full">
          <Icon name={'chevron-left'} color="white" size={30} />
        </Pressable>
        <View>
          <Text className="text-[#16a34a] font-psemibold text-lg">
            Buy Properties
          </Text>
        </View>
        <Pressable onPress={() => navigation.navigate('EditUserProfile')}>
          {/* <Text className="text-[#16a34a] font-pmedium text-base"></Text> */}
        </Pressable>
      </View>
      <View className="flex-1 items-center w-[100%] ">
        <FlatList
          data={onlySellTypeProperties}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          renderItem={renderSellProperties}
          keyExtractor={item => item?._id}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
      </View>
    </SafeAreaView>
  );
};

export default BuyPropertiesList;
