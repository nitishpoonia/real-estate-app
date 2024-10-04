import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProperties} from '../../redux/slices/product/ProductThunk.js';
import SmallCard from '../SmallCard.jsx';
import SmallCardLoader from '../Loaders/SmallCardLoader.jsx';

const BasicProperties = ({navigation, useSorted = false}) => {
  const dispatch = useDispatch();
  const {properties, loading, error} = useSelector(state => state?.product);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // Sort properties by createdAt in descending order
  const sortedProperties = useMemo(() => {
    return properties
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [properties]);

  const data = useSorted ? sortedProperties : properties;

  if (loading) return <SmallCardLoader />;
  if (error)
    return <Text>Error: {error.message || 'An unknown error occurred'}</Text>;

  return (
    <View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        renderItem={({item}) => (
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
            containerStyles={'w-[263px]'}
          />
        )}
        ItemSeparatorComponent={<View className="mr-2"></View>}
        keyExtractor={item => item?._id}
      />
    </View>
  );
};

export default BasicProperties;
