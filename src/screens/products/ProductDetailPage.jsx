import {ScrollView, View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import AmenitiesCard from '../../components/AmenitiesCard';
import CustomButton from '../../components/CustomButton';
import ProductImages from '../../components/ProductImages';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPropertyById} from '../../redux/slices/product/ProductThunk.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getListedBy} from '../../app/api/AuthApiManager.js';
const ProductDetailPage = ({navigation}) => {
  const [userWhoListed, setUserWhoListed] = useState();
  const route = useRoute();
  const dispatch = useDispatch();
  const {_id} = route.params;
  const {selectedProperty, loading, error} = useSelector(
    state => state.product,
  );
  const listedByUser = () => {
    getListedBy(selectedProperty?.data?.listedBy)
      .then(response => {
        setUserWhoListed(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  console.log();

  useEffect(() => {
    listedByUser();
    dispatch(fetchPropertyById(_id));
  }, []);
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  return (
    <ScrollView>
      <SafeAreaView className="mb-3 bg-white flex-1">
        <View className="flex-row items-center justify-between max-w-[230px] z-10">
          <Pressable onPress={() => navigation.goBack()} className="mr-2">
            <Icon name="arrow-back" size={30} color="black" />
          </Pressable>
          <Text className="font-semibold text-black text-2xl">
            Property Details
          </Text>
        </View>
        <Image
          source={{uri: selectedProperty?.data?.mainImage}}
          className={`w-[100%] m-auto h-[200px]`}
          resizeMode="cover"
        />
        <View className="">
          <View className="flex-row justify-between bg-[#2E8B57] py-2  rounded-b-xl shadow-sm shadow-black-100 px-2">
            <View>
              <Text className="font-pregular text-white text-lg">
                {selectedProperty?.data?.title}
              </Text>
              <Text className="font-pregular text-white text-md">
                {selectedProperty?.data?.location}
              </Text>
            </View>
            <View>
              <Text className="font-pregular text-white text-lg mr-5">
                {selectedProperty?.data?.price}
              </Text>
            </View>
          </View>
        </View>
        <View className="p-2 mt-4 bg-white rounded-lg mx-1 shadow-black-100">
          <View className="flex-row items-baseline justify-between">
            <Text className="text-black text-2xl font-psemibold">Images</Text>
            <Pressable
              onPress={() =>
                navigation.navigate('ViewAllImages', {
                  images: selectedProperty?.data?.images,
                })
              }>
              <Text className="text-black text-base">View all</Text>
            </Pressable>
          </View>
          <ProductImages
            images={selectedProperty?.data?.images}
            handlePress={() =>
              navigation.navigate('ViewAllImages', {
                images: selectedProperty?.data?.images,
              })
            }
            horizontal={true}
            imageStyles={'mr-2 rounded-lg w-[200px] h-[200px]'}
          />
        </View>
        <View className="flex-row justify-around mt-4 mx-1">
          <CustomButton
            title={'Call'}
            containerStyles={'h-[54px] bg-[#2E8B57] w-[45%] rounded-md '}
            innerContainerStyles={'justify-center gap-2'}
            handlePress={() => navigation.navigate('BookingForm')}
            iconName={'call'}
            textStyles={'font-pbold'}
            iconSize={20}
            iconColor={'#fff'}
          />
          <CustomButton
            title={'Chat'}
            containerStyles={
              'h-[54px] bg-[#fff] border-[#2E8B57] border-2 w-[45%] rounded-md'
            }
            innerContainerStyles={'justify-center gap-2'}
            textStyles={'font-pbold text-[#2E8B57]'}
            handlePress={() => navigation.navigate('BookingForm')}
            iconName={'chatbox'}
            iconSize={20}
            iconColor={'#2E8B57'}
          />
        </View>
        <View className="mx-2 rounded-lg bg-white">
          <Text className="text-black text-2xl font-psemibold mb-1">
            Details
          </Text>
          <View className="flex-row">
            <AmenitiesCard
              icon={'bed'}
              title={selectedProperty?.data?.bedrooms}
            />
            <AmenitiesCard
              icon={'shower'}
              title={selectedProperty?.data?.bathrooms}
            />
          </View>
        </View>
        <View className="mx-2 mt-4 rounded-lg pb-4 bg-white">
          <Text className="text-black text-2xl font-psemibold">
            Description
          </Text>
          <Text className="text-neutral-800 text-base">
            {selectedProperty?.data?.description}
          </Text>
        </View>
        <View className="bg-gray-50 py-2 rounded-md">
          <Text className="text-black  text-2xl font-psemibold mb-1 mx-2">
            Listed By
          </Text>
          <View className="flex-row items-center mx-2">
            <Image
              source={{uri: userWhoListed?.avatar}}
              height={50}
              width={50}
              className="rounded-full mr-2"
            />
            <Text className="text-black text-base font-pregular mb-1">
              {userWhoListed?.username}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ProductDetailPage;
