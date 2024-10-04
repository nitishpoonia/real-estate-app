module.exports = function (api) {
  api.cache(false); // Caching is disabled

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      'nativewind/babel',
      'module:react-native-dotenv',
      'react-native-reanimated/plugin',
    ],
  };
};
