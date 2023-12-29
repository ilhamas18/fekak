import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./reducer";

const dataSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStoreKodeOPD: (state, action: PayloadAction<any>) => {
      state.storeKodeOPD = action.payload;
    },
    setStoreYear: (state, action: PayloadAction<any>) => {
      state.storeYear = action.payload;
    }
  }
})

export const {
  setStoreKodeOPD,
  setStoreYear
} = dataSlice.actions;
const profile = dataSlice.reducer;
export default profile;