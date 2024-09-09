import {createSlice} from '@reduxjs/toolkit';
const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    date: null,
    name: '',
    number: '',
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setNumber: (state, action) => {
      state.number = action.payload;
    },
  },
});

export const {setDate, setName, setNumber} = bookingSlice.actions;
export default bookingSlice;
