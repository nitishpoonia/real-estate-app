import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {setType} from '../../redux/slices/filter/filterOptionsSlice';
import {useDispatch, useSelector} from 'react-redux';
const PropertyType = () => {
  const dispatch = useDispatch();
  const selectedTypes = useSelector(
    state => state.filterOptions.filterOptions.type,
  );
  const propertyTypes = ['House', 'Flat', 'Plot', 'Villa'];

  const handlePress = type => {
    let updatedTypes;
    if (selectedTypes.includes(type)) {
      updatedTypes = selectedTypes.filter(t => t !== type);
    } else {
      updatedTypes = [...selectedTypes, type];
    }
    dispatch(setType(updatedTypes));
  };
  const isSelected = type => selectedTypes.includes(type);

  return (
    <View className="my-3">
      <Text className="text-black font-psemibold text-base">Property Type</Text>
      <View className="flex-row items-center flex-wrap">
        {propertyTypes.map(type => (
          <Pressable
            key={type}
            onPress={() => handlePress(type)}
            className={`px-4 py-2 rounded-lg mr-2 mb-2  ${
              isSelected(type)
                ? 'bg-green-600 border border-[#16a34a]'
                : 'border border-[#16a34a]'
            }`}>
            <Text
              className={`text-sm font-pregular ${
                isSelected(type) ? 'text-white' : 'text-black'
              } `}>
              {type}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default PropertyType;
