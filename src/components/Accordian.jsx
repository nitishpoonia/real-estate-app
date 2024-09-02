import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const Accordion = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const height = useSharedValue(0);
  const rotate = useSharedValue(0);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    height.value = isOpen
      ? withTiming(0, {duration: 300})
      : withTiming(contentHeight, {duration: 300});
    rotate.value = isOpen
      ? withTiming(0, {duration: 300})
      : withTiming(1, {duration: 300});
  };

  const animatedHeightStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden',
  }));

  const animatedIconStyle = useAnimatedStyle(() => {
    const rotation = interpolate(rotate.value, [0, 1], [0, 90]);
    return {
      transform: [{rotate: `${rotation}deg`}],
    };
  });

  const handleLayout = event => {
    // Measure the height of the content
    const {height: measuredHeight} = event.nativeEvent.layout;
    if (contentHeight !== measuredHeight) {
      setContentHeight(measuredHeight);
      if (isOpen) {
        height.value = withTiming(measuredHeight, {duration: 300});
      }
    }
  };

  return (
    <View>
      <Pressable
        onPress={toggleAccordion}
        className="shadow-md bg-white px-4 py-3 mb-1 flex-row justify-between rounded-md">
        <Text className="text-green-600 text-base font-psemibold">{title}</Text>
        <Animated.View style={animatedIconStyle}>
          <Icon name={'chevron-forward-outline'} size={20} color={'#19a24a'} />
        </Animated.View>
      </Pressable>
      <Animated.View
        style={[animatedHeightStyle, {backgroundColor: '#f1f1f1'}]}>
        <View onLayout={handleLayout} className="p-2">
          {children}
        </View>
      </Animated.View>
    </View>
  );
};



export default Accordion;
