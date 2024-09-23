const {createSlice} = require('@reduxjs/toolkit');
import {
  fetchProperties,
  fetchPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyListedBy,
} from './ProductThunk';

const ProductSlice = createSlice({
  name: 'properties',
  initialState: {
    properties: [],
    selectedProperty: null,
    loading: false,
    error: null,
    listedProperties: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // all properties
      .addCase(fetchProperties.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // by Id
      .addCase(fetchPropertyById.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProperty = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Property
      .addCase(createProperty.pending, state => {
        state.loading = true;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.push(action.payload);
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update property
      .addCase(updateProperty.fulfilled, (state, action) => {
        const index = state.properties.findIndex(
          prop => prop.id === action.payload.id,
        );
        if (index !== -1) {
          state.properties[index] = action.payload;
        }
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.properties = state.properties.filter(
          prop => prop.id !== action.payload.id,
        );
      })
      .addCase(getPropertyListedBy.pending, state => {
        state.loading = true;
      })
      .addCase(getPropertyListedBy.fulfilled, (state, action) => {
        state.loading = false;
        state.listedProperties = action.payload.data;
      })
      .addCase(getPropertyListedBy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ProductSlice;
