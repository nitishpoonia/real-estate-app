import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProperties} from '../../redux/slices/product/ProductThunk.js';
import SmallCard from '../SmallCard.jsx';

const BasicProperties = ({navigation}) => {
  const dispatch = useDispatch();
  const {properties, loading, error} = useSelector(state => state?.product);
  useEffect(() => {
    dispatch(fetchProperties());
  }, []);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <FlatList
        data={properties}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        renderItem={({item}) => (
          <SmallCard
            ukey={item?._id}
            name={item?.title}
            location={item?.location}
            price={item?.price}
            imageUri={item?.mainImage}
            navigation={navigation}
            handleCardPress={() =>
              navigation.navigate('ProductDetailPage', {_id: item?._id})
            }
          />
        )}
        keyExtractor={item => item?._id}
      />
    </View>
  );
};

export default BasicProperties;
