import {View, TextInput, Text} from 'react-native';
import React, {useState} from 'react';

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
  const [isFocused, setIsFocused] = useState(false);

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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
        className={`border rounded-xl px-4 py-2 font-pregular bg-white h-[40px] ${
          isFocused ? 'border-green-600' : 'border-gray-300'
        }`}
      />
      {error && (
        <Text className="text-red-500 px-4 mt-1 font-pregular">{error}</Text>
      )}
    </View>
  );
};

export default CustomTextInput;
