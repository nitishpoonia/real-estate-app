import {ScrollView, View, Text, Image, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import AmenitiesCard from '../../components/AmenitiesCard';
// import CustomButton from '../../components/CustomButton';
import ProductImages from '../../components/ProductImages';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPropertyById} from '../../redux/slices/product/ProductThunk.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../constants/images.js';
import DescriptionComponent from '../../components/DescriptionComponent.jsx';
import PropertyTypeCard from '../../components/PropertyTypeCard.jsx';
import {clearSelectedProperty} from '../../redux/slices/product/ProductSlice.js';
// import {
//   addFavorite,
//   removeFavorite,
//   fetchFavorites,
// } from '../../redux/slices/favoriteSlice.js';
import ProductDetailLoader from '../../components/Loaders/ProductDetailLoader.jsx';

// import {getListedBy} from '../../app/api/AuthApiManager.js';
const ProductDetailPage = ({navigation}) => {
  // const [userWhoListed, setUserWhoListed] = useState('');
  const route = useRoute();
  const dispatch = useDispatch();
  const {_id} = route.params;
  const {selectedProperty, selectedPropertyLoading, error} = useSelector(
    state => state.product,
  );

  // const userId = selectedProperty?.data?.listedBy?._id;
  // const itemId = selectedProperty?.data?._id;
  // const {favorites} = useSelector(state => state.favorites);
  // const [isFavorite, setIsFavorite] = useState(false);
  const formatPriceInIndianStyle = price => {
    return new Intl.NumberFormat('en-IN').format(price);
  };
  useEffect(() => {
    dispatch(fetchPropertyById(_id));
    // dispatch(fetchFavorites(userId, itemId));
    return () => {
      dispatch(clearSelectedProperty());
    };
  }, [_id, dispatch]);
  // useEffect(() => {
  //   if (selectedProperty) {
  //     const isInFavorites = favorites.some(
  //       fav => fav.id === selectedProperty.data._id,
  //     );
  //     setIsFavorite(isInFavorites);
  //   }
  // }, [selectedProperty, favorites]);

  // const handleFavorite = async () => {
  //   try {
  //     if (isFavorite) {
  //       dispatch(
  //         removeFavorite({
  //           userId: selectedProperty.data.listedBy._id,
  //           itemId: selectedProperty.data._id,
  //         }),
  //       );
  //     } else {
  //       dispatch(
  //         addFavorite({
  //           userId: selectedProperty.data.listedBy._id,
  //           itemId: selectedProperty.data._id,
  //         }),
  //       );
  //     }
  //     setIsFavorite(!isFavorite);
  //   } catch (error) {
  //     Alert.alert('Error', 'error');
  //   }
  // };
  if (selectedPropertyLoading || !selectedProperty) {
    return <ProductDetailLoader />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView>
      <SafeAreaView className="mb-3 bg-white flex-1">
        <View className="flex-row items-center justify-between z-10 w-[67%]">
          <Pressable
            onPress={() => navigation.goBack()}
            className="bg-[#16a34a] rounded-full my-2 mx-2">
            <Icon name={'chevron-left'} color="white" size={30} />
          </Pressable>
          <Text className="text-lg font-pmedium text-[#16a34a]">
            Property Details
          </Text>
          {/* <Pressable
            onPress={handleFavorite}
            className=" bg-white rounded-full p-1">
            <Icon
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={30}
              color="#16a34a"
            />
          </Pressable> */}
        </View>
        <Image
          source={{uri: selectedProperty?.data?.mainImage}}
          className={'w-[100%] m-auto h-[200px]'}
          resizeMode="cover"
        />
        <View className="mx-2 mt-2 w-[20%]">
          <PropertyTypeCard category={selectedProperty?.data?.category} />
        </View>
        <View className="flex-row justify-between py-2  rounded-b-xl mx-2">
          <View>
            <Text className="font-psemibold text-black text-lg">
              {selectedProperty?.data?.title}
            </Text>
            <View className="flex-row">
              <Icon name={'location-on'} size={20} color={'#5F6368'} />
              <Text className="font-pregular text-base text-black text-md mr-2">
                {selectedProperty?.data?.location}
              </Text>
            </View>
          </View>
        </View>

        <View className="p-2  bg-white rounded-lg mx-1 shadow-black-100">
          <View className="flex-row items-baseline justify-between">
            <Text className="text-black text-lg font-pregular">Images</Text>
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
        <View className="mx-2 mt-3 rounded-lg bg-white">
          <Text className="text-black text-lg font-pregular mb-1">
            Facilities
          </Text>
          <View className="flex-row">
            <AmenitiesCard
              icon={'bed'}
              title={selectedProperty?.data?.bedrooms + ' Bedrooms'}
            />
            <AmenitiesCard
              icon={'shower'}
              title={selectedProperty?.data?.bathrooms + ' Bathrooms'}
            />
            <AmenitiesCard
              icon={'square-foot'}
              title={selectedProperty?.data?.carpetArea + ' Sq.ft'}
            />
          </View>
        </View>
        <View className="mx-2 mt-4 rounded-lg bg-white">
          <DescriptionComponent selectedProperty={selectedProperty} />
        </View>
        <View className="py-2 rounded-md flex-row justify-between items-center mx-2">
          <View className="flex-row items-center">
            {selectedProperty?.data?.listedBy?.avatar ? (
              <Image
                source={{uri: selectedProperty?.data?.listedBy?.avatar}}
                height={50}
                width={50}
                className="rounded-full h-[50px] w-[50px] mr-2"
              />
            ) : (
              <Image
                source={images.userProfilePlaceholder}
                height={50}
                width={50}
                className="rounded-full h-[50px] w-[50px] mr-2"
              />
            )}

            <View>
              <Text className="text-black text-base font-pmedium mb-1">
                {selectedProperty?.data?.listedBy?.username}
              </Text>
              <Text className="text-base font-pregular text-[#aaa]">
                Listed By
              </Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <Pressable>
              <View className="bg-[#16a34a] p-2 rounded-full">
                <Icon name={'message'} size={30} color={'white'} />
              </View>
            </Pressable>
            <Pressable>
              <View className="bg-[#16a34a] p-2 rounded-full">
                <Icon name={'phone'} size={30} color={'white'} />
              </View>
            </Pressable>
          </View>
        </View>
        <View className="flex-row px-2 py-2 justify-between items-center mt-2">
          <Text className="text-black font-psemibold text-lg">
            ₹​ {formatPriceInIndianStyle(selectedProperty?.data?.price)}
          </Text>
          <Pressable
            onPress={() => navigation.navigate('BookingForm')}
            className="w-[139px] py-3 bg-[#16a34a] items-center justify-center rounded-3xl">
            <Text className="text-white text-base font-psemibold">
              Schedule Visit
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ProductDetailPage;
