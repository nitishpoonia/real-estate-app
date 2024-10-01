import {View, FlatList} from 'react-native';
import React from 'react';
import PriceFilter from '../../components/filters/PriceFilter';
import PropertyType from '../../components/filters/PropertyType';
import Bedrooms from '../../components/filters/Bedrooms';
import Bathrooms from '../../components/filters/Bathrooms';
import Furnishing from '../../components/filters/Furnishing';
// import Amenities from '../../components/filters/Amenities';

const FILTER_COMPONENTS = [
  {component: <PropertyType />, key: 'PropertyType'},
  {component: <PriceFilter />, key: 'PriceFilter'},
  {component: <Bedrooms />, key: 'Bedrooms'},
  {component: <Bathrooms />, key: 'Bathrooms'},
  {component: <Furnishing />, key: 'Furnishing'},
  // {component: <Amenities />, key: 'Amenities'},
];

const FilterModel = () => {
  return (
    <View>
      <FlatList
        data={FILTER_COMPONENTS}
        renderItem={({item}) => <View>{item.component}</View>}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

export default FilterModel;
