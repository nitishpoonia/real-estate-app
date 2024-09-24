import {createAsyncThunk} from '@reduxjs/toolkit';

import ProductServices from '../../../app/services/ProductServices';
import {setUploadProgress, resetUploadProgress} from './UploadProgressSlice';
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
  async (propertyData, {rejectWithValue, dispatch}) => {
    try {
      const response = await ProductServices.createproperty(
        propertyData,
        progressEvent => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          dispatch(setUploadProgress(percentage));
        },
      );
      dispatch(resetUploadProgress());
      return response.data;
    } catch (error) {
      console.log(error);

      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
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

export const getPropertyListedBy = createAsyncThunk(
  'properties/getListedBy',
  async (id, {rejectWithValue}) => {
    try {
      const response = await ProductServices.getPropertyListedByUser(id);

      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        // Handle other error cases (e.g., network issues)
        return rejectWithValue('An unexpected error occurred.');
      }
    }
  },
);
