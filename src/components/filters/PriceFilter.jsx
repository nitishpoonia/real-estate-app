import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {
  setMinPrice,
  setMaxPrice,
} from '../../redux/slices/filter/filterOptionsSlice';
import {useDispatch, useSelector} from 'react-redux';
const PriceFilter = () => {
  const dispatch = useDispatch();
  const {minPrice, maxPrice} = useSelector(
    state => state.filterOptions.filterOptions,
  );
  return (
    <View>
      <Text className="font-psemibold text-black text-base">Price</Text>
      <View className="flex-row justify-between w-[70%]">
        <View className="flex-row ">
          <TextInput
            placeholder="Min Price"
            style={styles.textInput}
            keyboardType="number-pad"
            placeholderTextColor={'#16a34a'}
            value={minPrice}
            onChangeText={text => dispatch(setMinPrice(text))}
          />
        </View>
        <View className="flex-row  items-center">
          <TextInput
            value={maxPrice}
            placeholder="Max Price"
            style={styles.textInput}
            keyboardType="number-pad"
            placeholderTextColor={'#16a34a'}
            onChangeText={text => dispatch(setMaxPrice(text))}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#16a34a',
    borderRadius: 5,
    width: 100,
    height: 35,
    padding: 10,
  },
});

export default PriceFilter;
