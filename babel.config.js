module.exports = function (api) {
  api.cache(false); // Caching is disabled

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
      'module:react-native-dotenv',
    ],
  };
};
