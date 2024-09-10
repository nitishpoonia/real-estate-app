import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  filterOptions: {
    location: '',
    type: [],
    category: [],
    bedrooms: [],
    bathrooms: [],
    furnished: [],
    amenities: [],
    minPrice: '',
    maxPrice: '',
  },
};

const filterOptionsSlice = createSlice({
  name: 'filterOptions',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.filterOptions.location = action.payload;
    },
    setType: (state, action) => {
      state.filterOptions.type = action.payload;
    },
    setCategory: (state, action) => {
      state.filterOptions.category = action.payload;
    },
    setBedrooms: (state, action) => {
      state.filterOptions.bedrooms = action.payload;
    },
    setBathrooms: (state, action) => {
      state.filterOptions.bathrooms = action.payload;
    },
    setFurnished: (state, action) => {
      state.filterOptions.furnished = action.payload;
    },
    setMinPrice: (state, action) => {
      state.filterOptions.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.filterOptions.maxPrice = action.payload;
    },
    setAmenities: (state, action) => {
      state.filterOptions.amenities = action.payload;
    },
    clearFilters: state => {
      state.filterOptions = initialState.filterOptions;
    },
  },
});

export const {
  setLocation,
  setType,
  setCategory,
  setBedrooms,
  setBathrooms,
  setFurnished,
  setMinPrice,
  setMaxPrice,
  clearFilters,
  setAmenities,
} = filterOptionsSlice.actions;

export default filterOptionsSlice;
