import { createSlice } from "@reduxjs/toolkit";

const basicSlice = createSlice({
  name: "basicSlice",
  initialState: {
    value: "hello this is default value",
  },
  reducers: {
    addTo: (state, action) => {
      state.value = action.payload;
    },
    removeFrom: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addTo, removeFrom } = basicSlice.actions;
export default basicSlice.reducer;
