import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

const PriceFilter = () => {
  return (
    <View>
      <Text className="font-psemibold text-black text-base">Price</Text>
      <View className="flex-row justify-between w-[60%]">
        <View className="flex-row  items-center">
          <TextInput
            placeholder="Min Price"
            style={styles.textInput}
            keyboardType="number-pad"
            placeholderTextColor={'#16a34a'}
          />
        </View>
        <View className="flex-row  items-center">
          <TextInput
            placeholder="Max Price"
            style={styles.textInput}
            keyboardType="number-pad"
            placeholderTextColor={'#16a34a'}
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
