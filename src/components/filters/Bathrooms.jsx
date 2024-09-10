import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setBathrooms} from '../../redux/slices/filter/filterOptionsSlice';
const Bathrooms = () => {
  const selectedBathrooms = useSelector(
    state => state.filterOptions.filterOptions.bathrooms,
  );
  const bathrooms = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();
  const handlePress = type => {
    let bathroomsNumber;
    if (selectedBathrooms.includes(type)) {
      bathroomsNumber = selectedBathrooms.filter(t => t !== type);
    } else {
      bathroomsNumber = [...selectedBathrooms, type];
    }
    dispatch(setBathrooms(bathroomsNumber));
  };

  const isSelected = type => selectedBathrooms.includes(type);

  return (
    <View className="my-3">
      <Text className="text-black font-psemibold text-base">Bathrooms</Text>
      <View className="flex-row items-center flex-wrap">
        {bathrooms.map(type => (
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

export default Bathrooms;
