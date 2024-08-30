const {createSlice} = require('@reduxjs/toolkit');
import {
  fetchProperties,
  fetchPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from './ProductThunk';

const ProductSlice = createSlice({
  name: 'properties',
  initialState: {
    properties: [],
    selectedProperty: null,
    loading: false,
    error: null,
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

      .addCase(createProperty.fulfilled, (state, action) => {
        state.properties.push(action.payload);
      })
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
      });
  },
});

export default ProductSlice;