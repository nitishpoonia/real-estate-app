import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

const DescriptionComponent = ({selectedProperty}) => {
  const [isReadMore, setIsReadMore] = useState(false);

  // Define your character limit
  const charLimit = 100;

  // Truncate description
  const description = selectedProperty?.data?.description || '';
  const truncatedDescription =
    description.length > charLimit
      ? description.slice(0, charLimit) + '...'
      : description;

  return (
    <View className="mt-4 rounded-lg pb-4 bg-white">
      <Text className="text-black text-lg font-pregular">Description</Text>
      <Text className="text-neutral-600 text-base">
        {isReadMore ? description : truncatedDescription}
      </Text>
      {description.length > charLimit && (
        <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
          <Text className="text-[#16a34a] mt-2">
            {isReadMore ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DescriptionComponent;
