import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';

const PropertyType = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const propertyTypes = ['House', 'Flat', 'Plot', 'Villa'];

  const handlePress = type => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const isSelected = type => selectedTypes.includes(type);

  return (
    <View className='my-3'>
      <Text className="text-black font-psemibold text-base">
        Property Type
      </Text>
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
