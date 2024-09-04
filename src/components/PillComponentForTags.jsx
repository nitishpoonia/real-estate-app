import {View, Text, Pressable} from 'react-native';
import React from 'react';

const PillComponentForTags = ({
  title,
  containerStyles,
  handlePress,
  selected,
}) => {
  return (
    <Pressable className={`items-center justify-center`} onPress={handlePress}>
      <View
        className={`border border-[#19a24a] rounded-2xl px-4 py-1 items-center justify-center ${
          selected ? 'bg-[#19a24a]' : 'bg-transparent'
        } ${containerStyles}`}>
        <Text
          className={`font-psemibold text-center ${
            selected ? 'text-white' : 'text-[#19a24a]'
          }`}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export default PillComponentForTags;
