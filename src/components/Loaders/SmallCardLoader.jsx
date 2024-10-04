import {View} from 'react-native';
import React from 'react';
import {MotiView} from 'moti';
import {Easing} from 'react-native-reanimated';

const SmallCardLoader = () => {
  return (
    <MotiView
      from={{opacity: 0.5, scale: 0.95}}
      animate={{opacity: 1, scale: 1}}
      transition={{
        type: 'timing',
        duration: 1000,
        loop: true,
        easing: Easing.inOut(Easing.ease),
      }}
      style={{
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
      }}>
      <View className="items-center">
        <View
          style={{
            width: '100%',
            height: 150,
            backgroundColor: '#e0e0e0', // Placeholder color
            borderRadius: 10,
          }}
        />
      </View>

      <View className="mx-2 my-2">
        <View className="flex-row mb-2">
          <View
            style={{
              width: '33%',
              height: 20,
              backgroundColor: '#e0e0e0', // Placeholder color
              borderRadius: 5,
            }}
          />
        </View>

        <View
          style={{
            width: '30%',
            height: 20,
            backgroundColor: '#e0e0e0', // Placeholder color
            borderRadius: 5,
          }}
        />

        <View className="flex-row items-center my-2">
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: '#e0e0e0', // Placeholder color for the icon
              borderRadius: 10,
              marginRight: 5,
            }}
          />
          <View
            style={{
              width: '40%',
              height: 20,
              backgroundColor: '#e0e0e0', // Placeholder color
              borderRadius: 5,
            }}
          />
        </View>

        <View className="flex-row justify-between">
          <View
            style={{
              width: '30%',
              height: 20,
              backgroundColor: '#e0e0e0', // Placeholder color
              borderRadius: 5,
            }}
          />
          <View
            style={{
              width: '30%',
              height: 20,
              backgroundColor: '#e0e0e0', // Placeholder color
              borderRadius: 5,
            }}
          />
          <View
            style={{
              width: '30%',
              height: 20,
              backgroundColor: '#e0e0e0', // Placeholder color
              borderRadius: 5,
            }}
          />
        </View>

        <View className="mt-2">
          <View
            style={{
              width: '40%',
              height: 20,
              backgroundColor: '#e0e0e0', // Placeholder color
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    </MotiView>
  );
};

export default SmallCardLoader;
