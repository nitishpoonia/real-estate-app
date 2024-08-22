import { configureStore } from "@reduxjs/toolkit";
import basicReducer from "./slices/basicSlice";
const store = configureStore({
  reducer: {
    basicReducer: basicReducer,
  },
});

export default store;
