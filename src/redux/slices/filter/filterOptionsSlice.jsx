import {createSlice} from '@reduxjs/toolkit';

const computeAllFilters = filterOptions => {
  const {type, category, bedrooms, bathrooms, furnished} = filterOptions;
  return [type, category, bedrooms, bathrooms, furnished]
    .map(filter => (filter.length > 0 ? filter : null))
    .filter(filter => filter !== null);
};

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
    allFilters: [],
  },
};

const filterOptionsSlice = createSlice({
  name: 'filterOptions',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.filterOptions.location = action.payload;
      state.filterOptions.allFilters = computeAllFilters(state.filterOptions);
    },
    setType: (state, action) => {
      state.filterOptions.type = action.payload;
      state.filterOptions.allFilters = computeAllFilters(state.filterOptions);
    },
    setCategory: (state, action) => {
      state.filterOptions.category = action.payload;
      state.filterOptions.allFilters = computeAllFilters(state.filterOptions);
    },
    setBedrooms: (state, action) => {
      state.filterOptions.bedrooms = action.payload;
      state.filterOptions.allFilters = computeAllFilters(state.filterOptions);
    },
    setBathrooms: (state, action) => {
      state.filterOptions.bathrooms = action.payload;
      state.filterOptions.allFilters = computeAllFilters(state.filterOptions);
    },
    setFurnished: (state, action) => {
      state.filterOptions.furnished = action.payload;
      state.filterOptions.allFilters = computeAllFilters(state.filterOptions);
    },
    setMinPrice: (state, action) => {
      state.filterOptions.minPrice = action.payload;
      state.filterOptions.allFilters = computeAllFilters(state.filterOptions);
    },
    setMaxPrice: (state, action) => {
      state.filterOptions.maxPrice = action.payload;
      state.filterOptions.allFilters = computeAllFilters(state.filterOptions);
    },
    setAmenities: (state, action) => {
      state.filterOptions.amenities = action.payload;
      state.filterOptions.allFilters = computeAllFilters(state.filterOptions);
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
