// src/screens/UserTypeSelectionPage.js

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUserType} from '../redux/slices/auth/authSlice';
import {useNavigation} from '@react-navigation/native';



const UserTypeSelectionPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSelection = type => {
    dispatch(setUserType(type));
    // Navigate to the main app or a specific home screen based on type
    navigation.replace('MainApp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome! What would you like to do today?
      </Text>
      <View style={styles.optionsContainer}>
        {/* Buyer Option */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleSelection('buyer')}>
          {/* <Image source={BuyerIcon} style={styles.icon} /> */}
          <Text style={styles.optionText}>Buy</Text>
        </TouchableOpacity>

        {/* Renter Option */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleSelection('renter')}>
          {/* <Image source={RenterIcon} style={styles.icon} /> */}
          <Text style={styles.optionText}>Rent</Text>
        </TouchableOpacity>

        {/* Seller Option */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleSelection('seller')}>
          {/* <Image source={SellerIcon} style={styles.icon} /> */}
          <Text style={styles.optionText}>Sell</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
    color: '#003366',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    width: 100,
    height: 120,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#003366',
  },
});

export default UserTypeSelectionPage;
