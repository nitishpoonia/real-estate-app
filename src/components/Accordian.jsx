import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  interpolate,
  Easing,
  Layout,
  LinearTransition,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const Accordion = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const rotation = useDerivedValue(() => {
    return withTiming(isOpen ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(prev => !prev);
  };

  const animatedIconStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(rotation.value, [0, 1], [0, 90]);
    return {
      transform: [{rotate: `${rotateZ}deg`}],
    };
  });

  return (
    <View>
      <Pressable
        onPress={toggleAccordion}
        className="shadow-md bg-white px-4 py-3 mb-1 flex-row justify-between rounded-md">
        <Text className="text-green-600 text-base font-semibold">{title}</Text>
        <Animated.View style={animatedIconStyle}>
          <Icon name={'chevron-forward-outline'} size={20} color={'#19a24a'} />
        </Animated.View>
      </Pressable>
      <Animated.View layout={LinearTransition.springify()}>
        {isOpen && <View className="p-2">{children}</View>}
      </Animated.View>
    </View>
  );
};

export default Accordion;
