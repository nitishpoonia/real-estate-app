import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {setBedrooms} from '../../redux/slices/filter/filterOptionsSlice';
import {useDispatch, useSelector} from 'react-redux';
const Bedrooms = () => {
  const selectedBedrooms = useSelector(
    state => state.filterOptions.filterOptions.bedrooms,
  );
  const bedrooms = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();
  const handlePress = type => {
    let bedroomsNumber;
    if (selectedBedrooms.includes(type)) {
      bedroomsNumber = selectedBedrooms.filter(t => t !== type);
    } else {
      bedroomsNumber = [...selectedBedrooms, type];
    }

    dispatch(setBedrooms(bedroomsNumber));
  };

  const isSelected = type => selectedBedrooms.includes(type);

  return (
    <View className="my-3">
      <Text className="text-black font-psemibold text-base">Bedrooms</Text>
      <View className="flex-row items-center flex-wrap">
        {bedrooms.map(type => (
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

export default Bedrooms;
