import {View, TextInput, Text} from 'react-native';
import React from 'react';

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  error,
  ...props
}) => {
  return (
    <View className="mx-3 mb-3">
      <TextInput
        style={[style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor="#AEAEB2"
        {...props}
        className="border border-gray-300 rounded-xl px-4 py-2 font-pregular bg-white"
      />
      {error && (
        <Text className="text-red-500 px-4 mt-1 font-pregular">{error}</Text>
      )}
    </View>
  );
};

export default CustomTextInput;
