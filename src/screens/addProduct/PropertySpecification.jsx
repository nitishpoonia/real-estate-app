import {View, Text, FlatList, Pressable} from 'react-native';
import React, {useState} from 'react';
import propertyOptions from '../../services/AddProductFormServices';
import PillComponentForTags from '../../components/PillComponentForTags';
import {useDispatch, useSelector} from 'react-redux';
import CustomTextInput from '../../components/CustomTextInput';
import {
  setType,
  setCategory,
  setBedrooms,
  setBathrooms,
  setFurnished,
  setCarpetArea,
} from '../../redux/slices/addProduct/addProductSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PropertySpecification = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    listingType,
    propertyCategory,
    propertyFurnishing,
    numberOfBathrooms,
    numberOfBedrooms,
  } = propertyOptions;
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [selectedBedroomIndex, setSelectedBedroomIndex] = useState(null);
  const [selectedBathroomIndex, setSelectedBathroomIndex] = useState(null);
  const [selectedFurnishingIndex, setSelectedFurnishingIndex] = useState(null);
  const handlePress = (
    index,
    item,
    selectedIndex,
    setSelectedIndex,
    action,
  ) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
      dispatch(action(null));
    } else {
      setSelectedIndex(index);
      dispatch(action(item.value));
    }
  };

  const {
    type,
    category,
    bedrooms,
    bathrooms,
    carpetArea,
    furnished,
    typeError,
    carpetAreaError,
    categoryError,
    bedroomsError,
    bathroomsError,
    furnishedError,
  } = useSelector(state => state.addProduct);
  console.log('typeError', typeError);
  const goToNextScreen = () => {
    let hasErrors = false;
    if (!type) {
      dispatch(setType(null));
      hasErrors = true;
    }

    // Category validation
    if (!category) {
      dispatch(setCategory(null));
      hasErrors = true;
    }

    if (category !== 'Plot') {
      // Bedrooms validation
      if (!bedrooms) {
        dispatch(setBedrooms(null));
        hasErrors = true;
      }

      // Bathrooms validation
      if (!bathrooms) {
        dispatch(setBathrooms(null));
        hasErrors = true;
      }

      // Furnished validation
      if (!furnished) {
        dispatch(setFurnished(null));
        hasErrors = true;
      }
    }

    // Carpet area validation
    if (!carpetArea || carpetArea <= 0) {
      dispatch(setCarpetArea(null));
      hasErrors = true;
    }

    // If there are errors, prevent navigation
    if (hasErrors) {
      return;
    }

    // If all validations pass, navigate to the next screen
    navigation.navigate('PropertyImages');
  };

  return (
    <View className="px-2 flex-1">
      <View>
        <Text className="text-black font-psemibold text-xl">
          Add New Property
        </Text>
      </View>
      <View>
        <Text className="text-black font-pmedium text-lg">
          Property Specification
        </Text>
      </View>
      <View className="flex-1 bg-white p-2 rounded-lg ">
        <View>
          <View className="flex-row w-[100%] justify-between my-2">
            <Text className="text-base font-pregular w-[30%] text-black">
              Type
            </Text>
            <FlatList
              data={listingType}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              className="w-1/2 bg-red-300x"
              renderItem={({item, index}) => (
                <View className="flex-row items-center justify-between mr-2">
                  <PillComponentForTags
                    title={item.label}
                    selected={index === selectedTypeIndex}
                    handlePress={() =>
                      handlePress(
                        index,
                        item,
                        selectedTypeIndex,
                        setSelectedTypeIndex,
                        setType,
                      )
                    }
                  />
                </View>
              )}
            />
          </View>
          {typeError && <Text className="text-red-600">{typeError}</Text>}
        </View>
        <View>
          <View className="flex-row items-center justify-between my-2">
            <Text className="text-base font-pregular w-[30%] text-black">
              Category
            </Text>
            <FlatList
              data={propertyCategory}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              className="w-1/2 bg-red-300x"
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View className="flex-row items-center justify-between mr-2">
                  <PillComponentForTags
                    title={item.label}
                    selected={index === selectedCategoryIndex}
                    handlePress={() => {
                      handlePress(
                        index,
                        item,
                        selectedCategoryIndex,
                        setSelectedCategoryIndex,
                        setCategory,
                      );
                    }}
                  />
                </View>
              )}
            />
          </View>
          {categoryError && (
            <Text className="text-red-600">{categoryError}</Text>
          )}
        </View>
        {selectedCategoryIndex !== 0 && (
          <>
            {/* Bedrooms */}
            {(selectedCategoryIndex === 1 ||
              selectedCategoryIndex === 2 ||
              selectedCategoryIndex === 3) && (
              <View>
                <View className="flex-row items-center justify-between my-2">
                  <Text className="text-base font-pregular w-[30%] text-black">
                    Bedrooms
                  </Text>
                  <FlatList
                    data={numberOfBedrooms}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => (
                      <View className="flex-row items-center justify-between mr-2">
                        <PillComponentForTags
                          title={item.label}
                          containerStyles={'w-[70px]'}
                          selected={index === selectedBedroomIndex}
                          handlePress={() => {
                            handlePress(
                              index,
                              item,
                              selectedBedroomIndex,
                              setSelectedBedroomIndex,
                              setBedrooms,
                            );
                          }}
                        />
                      </View>
                    )}
                  />
                </View>
                {bedroomsError && (
                  <Text className="text-red-600">{bedroomsError}</Text>
                )}
              </View>
            )}

            {/* Bathrooms */}
            {(selectedCategoryIndex === 1 ||
              selectedCategoryIndex === 2 ||
              selectedCategoryIndex === 3) && (
              <View>
                <View className="flex-row items-center justify-between my-2">
                  <Text className="text-base font-pregular w-[30%] text-black">
                    Bathrooms
                  </Text>
                  <FlatList
                    data={numberOfBathrooms}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => (
                      <View className="flex-row items-center justify-between mr-2">
                        <PillComponentForTags
                          title={item.label}
                          containerStyles={'w-[70px]'}
                          selected={index === selectedBathroomIndex}
                          handlePress={() => {
                            handlePress(
                              index,
                              item,
                              selectedBathroomIndex,
                              setSelectedBathroomIndex,
                              setBathrooms,
                            );
                          }}
                        />
                      </View>
                    )}
                  />
                </View>
                {bathroomsError && (
                  <Text className="text-red-600">{bathroomsError}</Text>
                )}
              </View>
            )}

            {/* Furnished */}
            {(selectedCategoryIndex === 1 ||
              selectedCategoryIndex === 2 ||
              selectedCategoryIndex === 3) && (
              <View>
                <View className="flex-row items-center justify-between my-2">
                  <Text className="text-base font-pregular w-[30%] text-black">
                    Furnished
                  </Text>
                  <FlatList
                    data={propertyFurnishing}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => (
                      <View className="flex-row items-center justify-between mr-2">
                        <PillComponentForTags
                          title={item.label}
                          selected={index === selectedFurnishingIndex}
                          handlePress={() => {
                            handlePress(
                              index,
                              item,
                              selectedFurnishingIndex,
                              setSelectedFurnishingIndex,
                              setFurnished,
                            );
                          }}
                        />
                      </View>
                    )}
                  />
                </View>
                {furnishedError && (
                  <Text className="text-red-600">{furnishedError}</Text>
                )}
              </View>
            )}
          </>
        )}
        <View>
          <View className="flex-row items-center justify-between my-2">
            <Text className="text-base font-pregular text-black">
              Carpet Area
            </Text>
            <View className="flex-row items-center">
              <CustomTextInput
                placeholder={'Sq ft'}
                onChangeText={text => dispatch(setCarpetArea(text))}
                containerStyles={'w-[50%]'}
                keyboardType={'numeric'}
                style={{color: 'black'}}
              />
            </View>
          </View>
          {carpetAreaError && (
            <Text className="text-red-600">{carpetAreaError}</Text>
          )}
        </View>
      </View>
      <View className="flex-row justify-end gap-2 my-3">
        <Pressable
          onPress={() => navigation.goBack()}
          className=" flex-row self-end items-center my-3 justify-center bg-[#16a34a] rounded-full  w-[60px] h-[60px]">
          <Icon name={'chevron-left'} size={30} color={'white'} />
        </Pressable>
        <Pressable
          onPress={goToNextScreen}
          className=" flex-row self-end items-center my-3 justify-center bg-[#16a34a] rounded-full  w-[60px] h-[60px]">
          <Icon name={'chevron-right'} size={30} color={'white'} />
        </Pressable>
      </View>
    </View>
  );
};

export default PropertySpecification;
