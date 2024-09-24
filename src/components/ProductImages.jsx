import {FlatList, Image, Dimensions, Pressable} from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width;
const renderImage = ({item}, imageStyles, handlePress) => {
  return (
    <Pressable onPress={handlePress}>
      <Image
        source={{uri: item}}
        className={`${imageStyles}`}
        width={screenWidth}
      />
    </Pressable>
  );
};

const ProductImages = ({
  numColumns,
  horizontal,
  imageStyles,
  handlePress,
  images,
}) => {
  return (
    <FlatList
      key={numColumns}
      horizontal={horizontal}
      renderItem={props => renderImage(props, imageStyles, handlePress)}
      data={images}
      keyExtractor={(item, index) => index.toString()}
      className="mt-2"
      numColumns={numColumns}
    />
  );
};
export default ProductImages;
