import React from 'react';
import {View, Text} from 'react-native';
import {MotiView} from 'moti';

const EditPropertyLoader = () => {
  return (
    <View className="flex-1 bg-white">
      {/* Loader for header */}
      <View className="flex-row items-center justify-between z-10 w-[67%] mx-2 my-2">
        <MotiView
          from={{opacity: 0.6}}
          animate={{opacity: 1}}
          transition={{loop: true, duration: 600}}
          className="bg-gray-300 rounded-full h-8 w-8"
        />
        <MotiView
          from={{opacity: 0.6}}
          animate={{opacity: 1}}
          transition={{loop: true, duration: 600}}
          className="bg-gray-300 rounded h-6 w-2/3"
        />
        <MotiView
          from={{opacity: 0.6}}
          animate={{opacity: 1}}
          transition={{loop: true, duration: 600}}
          className="bg-gray-300 rounded-full h-8 w-8"
        />
      </View>

      {/* Loader for image */}
      <View className="m-auto h-[200px]">
        <MotiView
          from={{opacity: 0.6}}
          animate={{opacity: 1}}
          transition={{loop: true, duration: 600}}
          className="bg-gray-300 h-full rounded"
        />
      </View>

      {/* Loader for title and location */}
      <View className="mx-2 mt-2">
        <MotiView
          from={{opacity: 0.6}}
          animate={{opacity: 1}}
          transition={{loop: true, duration: 600}}
          className="bg-gray-300 h-6 rounded"
        />
        <MotiView
          from={{opacity: 0.6}}
          animate={{opacity: 1}}
          transition={{loop: true, duration: 600}}
          className="bg-gray-300 h-4 rounded mt-1"
        />
      </View>

      {/* Loader for facilities */}
      <View className="mx-2 mt-4">
        <View className="flex-row">
          <MotiView
            from={{opacity: 0.6}}
            animate={{opacity: 1}}
            transition={{loop: true, duration: 600}}
            className="bg-gray-300 h-20 w-20 rounded mx-1"
          />
          <MotiView
            from={{opacity: 0.6}}
            animate={{opacity: 1}}
            transition={{loop: true, duration: 600}}
            className="bg-gray-300 h-20 w-20 rounded mx-1"
          />
          <MotiView
            from={{opacity: 0.6}}
            animate={{opacity: 1}}
            transition={{loop: true, duration: 600}}
            className="bg-gray-300 h-20 w-20 rounded mx-1"
          />
        </View>
      </View>

      {/* Loader for description */}
      <View className="mx-2 mt-4 rounded-lg bg-white">
        <MotiView
          from={{opacity: 0.6}}
          animate={{opacity: 1}}
          transition={{loop: true, duration: 600}}
          className="bg-gray-300 h-20 rounded"
        />
      </View>

      {/* Loader for listed by */}
      <View className="mx-2 mt-4 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <MotiView
            from={{opacity: 0.6}}
            animate={{opacity: 1}}
            transition={{loop: true, duration: 600}}
            className="bg-gray-300 rounded-full h-12 w-12 mr-2"
          />
          <View>
            <MotiView
              from={{opacity: 0.6}}
              animate={{opacity: 1}}
              transition={{loop: true, duration: 600}}
              className="bg-gray-300 h-4 rounded w-24"
            />
            <MotiView
              from={{opacity: 0.6}}
              animate={{opacity: 1}}
              transition={{loop: true, duration: 600}}
              className="bg-gray-300 h-3 rounded w-16 mt-1"
            />
          </View>
        </View>
        <View className="flex-row gap-2">
          <MotiView
            from={{opacity: 0.6}}
            animate={{opacity: 1}}
            transition={{loop: true, duration: 600}}
            className="bg-gray-300 rounded-full h-10 w-10"
          />
          <MotiView
            from={{opacity: 0.6}}
            animate={{opacity: 1}}
            transition={{loop: true, duration: 600}}
            className="bg-gray-300 rounded-full h-10 w-10"
          />
        </View>
      </View>

      {/* Loader for price */}
      <View className="flex-row px-2 py-2 justify-between items-center mt-2">
        <MotiView
          from={{opacity: 0.6}}
          animate={{opacity: 1}}
          transition={{loop: true, duration: 600}}
          className="bg-gray-300 h-6 rounded w-32"
        />
        <MotiView
          from={{opacity: 0.6}}
          animate={{opacity: 1}}
          transition={{loop: true, duration: 600}}
          className="bg-gray-300 h-8 rounded-full w-32"
        />
      </View>
    </View>
  );
};

export default EditPropertyLoader;
