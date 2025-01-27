import {View, Text, Pressable, FlatList} from 'react-native';
import React from 'react';
import {setFurnished} from '../../redux/slices/filter/filterOptionsSlice';
import {useDispatch, useSelector} from 'react-redux';
const Furnishing = () => {
  const dispatch = useDispatch();
  const selectedFurnishing = useSelector(
    state => state.filterOptions.filterOptions.furnished,
  );
  const furnishing = ['Furnished', 'Semi-Furnished', 'Unfurnished'];

  const handlePress = type => {
    let updatedFurnishing;
    if (selectedFurnishing.includes(type)) {
      updatedFurnishing = selectedFurnishing.filter(t => t !== type);
    } else {
      updatedFurnishing = [...selectedFurnishing, type];
    }
    dispatch(setFurnished(updatedFurnishing));
  };

  const isSelected = type => selectedFurnishing.includes(type);

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
      <Text className="text-black font-psemibold text-base">Furnishing</Text>

      {/* Removed the previous map function and only used FlatList */}
      <FlatList
        data={furnishing}
        horizontal
        renderItem={renderItem}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Furnishing;
