import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00a63e" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light gray background
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#333', // Darker text color
  },
});

export default LoadingScreen;
