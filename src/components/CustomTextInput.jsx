import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  error,
  multiline,
  numberOfLines,
  handlePress,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry); // State to manage password visibility

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className="mb-3">
      <View className="relative">
        <TextInput
          style={[style]} 
          placeholder={placeholder}
          multiline={multiline}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPasswordVisible} // Manage secureTextEntry state
          keyboardType={keyboardType}
          placeholderTextColor="#AEAEB2"
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          textAlignVertical="center"
          onPress={handlePress}
          {...props}
          className={`border rounded-md px-4 py-2 font-pregular bg-white h-[40px] text-black ${
            isFocused ? 'border-green-600' : 'border-gray-300'
          }`}
        />

        {/* Eye Icon to toggle password visibility */}
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="absolute right-4 top-2">
            <Icon
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={24}
              color="#AEAEB2"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text className="text-red-500 px-4 mt-1 font-pregular">{error}</Text>
      )}
    </View>
  );
};

export default CustomTextInput;
