import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  title: '',
  titleError: '',
  description: '',
  descriptionError: '',
  price: '',
  priceError: '',
  location: '',
  locationError: '',
  type: '',
  typeError: '',
  category: '',
  categoryError: '',
  bedrooms: '',
  bedroomsError: '',
  bathrooms: '',
  bathroomsError: '',
  furnished: '',
  furnishedError: '',
  images: [],
  imagesError: '',
  mainImage: '',
  mainImageError: '',
  listedBy: '',
  listedByError: '',
  carpetArea: '',
  carpetAreaError: '',
};

const addProductSlice = createSlice({
  name: 'addProduct',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      const title = action.payload;
      state.title = title;
      // state.title = 'demo title';
      state.titleError =
        title?.length >= 5 ? '' : 'Title must be at least 5 characters long';
    },
    setDescription: (state, action) => {
      const description = action.payload;
      state.description = description;
      // state.description = 'demo description this is';
      state.descriptionError =
        description?.length >= 10
          ? ''
          : 'Description must be at least 10 characters long';
    },
    setPrice: (state, action) => {
      const price = action?.payload;
      state.price = price;
      // state.price = 3400;
      state.priceError = price > 0 ? '' : 'Price must be greater than 0';
    },
    setLocation: (state, action) => {
      state.location = action.payload;
      // state.location = 'Delhi, India';
      state.locationError =
        state.location?.length >= 5
          ? ''
          : 'Location must be at least 5 characters long';
    },
    setType: (state, action) => {
      const type = action?.payload;
      state.type = type;
      // state.type = 'rent';
      state.typeError = type ? '' : 'Please select a type';
    },
    setCategory: (state, action) => {
      const category = action?.payload;
      state.category = category;
      state.categoryError = category ? '' : 'Please select a category';
    },
    setBedrooms: (state, action) => {
      const bedrooms = action?.payload;
      state.bedrooms = bedrooms;
      state.bedroomsError =
        bedrooms > 0 ? '' : 'Bedrooms must be greater than 0';
    },
    setBathrooms: (state, action) => {
      const bathrooms = action?.payload;
      state.bathrooms = bathrooms;
      state.bathroomsError =
        bathrooms > 0 ? '' : 'Bathrooms must be greater than 0';
    },
    setFurnished: (state, action) => {
      const furnished = action?.payload;
      state.furnished = furnished;
      state.furnishedError = furnished
        ? ''
        : 'Please select a furnished option';
    },
    setImages: (state, action) => {
      const images = action?.payload;
      state.images = images;
      state.imagesError =
        images.length > 0 ? '' : 'Please upload at least one image';
    },
    setMainImage: (state, action) => {
      const mainImage = action?.payload;
      state.mainImage = mainImage;
      state.mainImageError = mainImage ? '' : 'Please select a main image';
    },
    setListedBy: (state, action) => {
      const listedBy = action?.payload;
      state.listedBy = listedBy;
      state.listedByError = listedBy ? '' : 'Please select a listed by option';
    },
    setCarpetArea: (state, action) => {
      const carpetArea = action?.payload;
      state.carpetArea = carpetArea;
      state.carpetAreaError =
        carpetArea > 0 ? '' : 'Carpet area must be greater than 0';
    },
    resetForm: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setTitle,
  setDescription,
  setPrice,
  setLocation,
  setType,
  setCategory,
  setBedrooms,
  setBathrooms,
  setFurnished,
  setImages,
  setMainImage,
  setListedBy,
  setCarpetArea,
  resetForm,
} = addProductSlice.actions;

export default addProductSlice;
