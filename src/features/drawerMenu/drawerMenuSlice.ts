import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const initialState = {
  isDrawerOpen: false,
};

export const drawerMenuSlice = createSlice({
  name: "drawerMenu",
  initialState,
  reducers: {
    openDrawerMenu: (state) => {
      state.isDrawerOpen = true;
    },
    closeDrawerMenu: (state) => {
      state.isDrawerOpen = false;
    },
  },
});

export const { openDrawerMenu, closeDrawerMenu } = drawerMenuSlice.actions;

export const selectIsDrawerOpen = (state: RootState) =>
  state.drawerMenu.isDrawerOpen;

export default drawerMenuSlice.reducer;
