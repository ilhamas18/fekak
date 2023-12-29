import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./reducer";

const dataSlice = createSlice({
  name: "payload",
  initialState,
  reducers: {
    setStorePayload: (state, action: PayloadAction<any>) => {
      state.storePayload = action.payload;
    },
  }
})

export const {
  setStorePayload,
} = dataSlice.actions;
const payload = dataSlice.reducer;
export default payload;