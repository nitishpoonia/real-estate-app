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
    try {
      const response = await ProductServices.createProperty(propertyData);
      const data = await response.data;
      console.log(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
