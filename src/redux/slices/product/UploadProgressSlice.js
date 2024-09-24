import {createSlice} from '@reduxjs/toolkit';

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    progress: 0,
  },
  reducers: {
    setUploadProgress: (state, action) => {
      state.progress = action.payload;
    },
    resetUploadProgress: state => {
      state.progress = 0;
    },
  },
});

export const {setUploadProgress, resetUploadProgress} = uploadSlice.actions;
export default uploadSlice;
