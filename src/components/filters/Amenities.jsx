import {View, Text, Pressable, FlatList} from 'react-native';
import React from 'react';

const Amenities = () => {
  const [selectedAmenities, setSelectedAmenities] = React.useState([]);
  const ameniteis = [
    'Swimming Pool',
    'Parking',
    'Gym',
    'Security',
    'Power Backup',
  ];

  const handlePress = type => {
    if (selectedAmenities.includes(type)) {
      setSelectedAmenities(selectedAmenities.filter(t => t !== type));
    } else {
      setSelectedAmenities([...selectedAmenities, type]);
    }
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
