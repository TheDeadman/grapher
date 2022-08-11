import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const initialState = {
    name: '',
};

export const reduxExampleSlice = createSlice({
    name: "reduxExample",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        }
    },
});

export const { setName } = reduxExampleSlice.actions;

export const selectName = (state: RootState) =>
    state.reduxExample.name;

export default reduxExampleSlice.reducer;