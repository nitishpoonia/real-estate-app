import {createAsyncThunk} from '@reduxjs/toolkit';

import ProductServices from '../../../app/services/ProductServices';
export const fetchProperties = createAsyncThunk(
  'properties/fetchAll',
  async (_, {rejectWithValue}) => {
    try {
      const response = await ProductServices.getAllProperties();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchPropertyById = createAsyncThunk(
  'properties/fetchById',
  async (id, {rejectWithValue}) => {
    try {
      const response = await ProductServices.getPropertyById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createProperty = createAsyncThunk(
  'properties/create',
  async (propertyData, {rejectWithValue}) => {
    console.log(propertyData);

    try {
      const response = await ProductServices.createProperty(propertyData);
      return response.data;
    } catch (error) {
      console.log('Error from thunk:', error.message); // Log error message
      if (error.response) {
        // If the server responded with an error
        console.log('Error Response Data:', error.response.data);
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // If the request was made but no response received
        console.log('No Response, Network error:', error.request);
      } else {
        // If something else happened
        console.log('Other error:', error.message);
      }
    }
  },
);

export const updateProperty = createAsyncThunk(
  'properties/update',
  async ({id, updatedData}, {rejectWithValue}) => {
    try {
      const response = await ProductServices.updateProperty(id, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteProperty = createAsyncThunk(
  'properties/delete',
  async (id, {rejectWithValue}) => {
    try {
      const response = await ProductServices.deleteProperty(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
