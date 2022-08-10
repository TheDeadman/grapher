import { createSlice } from "@reduxjs/toolkit";

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


export const selectIsDrawerOpen = (state) => state.drawerMenu.isDrawerOpen;

export default drawerMenuSlice.reducer;
