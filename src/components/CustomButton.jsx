import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  innerContainerStyles,
  textStyles,
  isLoading,
  iconColor,
  iconName,
  iconSize,
}) => {
  return (
    <View
      className={`bg-secondary rounded-xl h-12 px-4 my-4 flex-row
      items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      style={{elevation: 10}}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`w-full flex-row justify-around items-center ${innerContainerStyles}`}
        disabled={isLoading}>
        {iconName && (
          <Icon
            name={iconName}
            size={iconSize}
            color={iconColor}
            className="pb-2"
          />
        )}

        <Text className={`text-white font-psemibold text-lg ${textStyles} `}>
          {title}
        </Text>

        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            color="#fff"
            size="small"
            className="ml-2"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
