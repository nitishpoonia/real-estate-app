import {View, Text, Pressable, FlatList} from 'react-native';
import React from 'react';
import {setAmenities} from '../../redux/slices/filter/filterOptionsSlice';
import {useDispatch, useSelector} from 'react-redux';

const Amenities = () => {
  const dispatch = useDispatch();
  const selectedAmenities = useSelector(
    state => state.filterOptions.filterOptions.amenities,
  );
  const ameniteis = [
    'Swimming Pool',
    'Parking',
    'Gym',
    'Security',
    'Power Backup',
  ];

  const handlePress = type => {
    let updatedAmenities;
    if (selectedAmenities.includes(type)) {
      updatedAmenities = selectedAmenities.filter(t => t !== type);
    } else {
      updatedAmenities = [...selectedAmenities, type];
    }
    dispatch(setAmenities(updatedAmenities));
  };

  const isSelected = type => selectedAmenities.includes(type);

  // Updated renderItem to correctly extract `item`
  const renderItem = ({item}) => (
    <Pressable
      key={item}
      onPress={() => handlePress(item)}
      className={`px-4 py-2 rounded-lg mr-2 mb-2  ${
        isSelected(item)
          ? 'bg-green-600 border border-[#16a34a]'
          : 'border border-[#16a34a]'
      }`}>
      <Text
        className={`text-sm font-pregular ${
          isSelected(item) ? 'text-white' : 'text-black'
        } `}>
        {item}
      </Text>
    </Pressable>
  );

  return (
    <View className="my-3">
      <Text className="text-black font-psemibold text-base">Amenites</Text>
      <FlatList
        data={ameniteis}
        horizontal
        renderItem={renderItem}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Amenities;
