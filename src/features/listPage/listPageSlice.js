import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isNewEntryFormOpen: false,
    newEntryData: {
        entryName: "",
        performanceJson: "",
        hasValidationError: {
            entryName: true,
            performanceJson: true
        }
    }
};

export const listPageSlice = createSlice({
    name: "listPage",
    initialState,
    reducers: {
        openNewEntryForm: (state) => {
            state.isNewEntryFormOpen = true;
        },
        closeNewEntryForm: (state) => {
            state.isNewEntryFormOpen = false;
        },
        saveNewEntry: (state, payload) => {
            state = initialState;
            return state;
        },
        setNewEntryName: (state, action) => {
            state.newEntryData.entryName = action.payload;
            if (action.payload) {
                state.newEntryData.hasValidationError.entryName = false;
            } else {
                state.newEntryData.hasValidationError.entryName = true;
            }
        },
        setNewEntryPerformanceJson: (state, action) => {
            state.newEntryData.performanceJson = action.payload;
            if (action.payload) {
                try {
                    let perfDataSet = JSON.parse(action.payload);
                    perfDataSet.forEach(perfData => {
                        if (!perfData.name && !perfData.startTime && !perfData.duration) {
                            console.log("ERROR")
                            throw new Error();
                        }
                    })
                    state.newEntryData.hasValidationError.performanceJson = false;
                } catch (ex) {
                    state.newEntryData.hasValidationError.performanceJson = true;
                }
            } else {
                state.newEntryData.hasValidationError.performanceJson = true;
            }
        }
        // setNewEntryName: (state, action) => {
        //     state.newEntryData.entryName = action.payload;
        // },
        // setNewEntryPerformanceJson: (state, action) => {
        //     state.newEntryData.performanceJson = action.payload;
        // }
    },

});

export const { openNewEntryForm, closeNewEntryForm, setNewEntryName, setNewEntryPerformanceJson, saveNewEntry } = listPageSlice.actions;


export const selectIsNewEntryFormOpen = (state) => state.listPage.isNewEntryFormOpen;
export const selectNewEntryName = (state) => state.listPage.newEntryData.entryName;
export const selectNewEntryPerformanceJson = (state) => state.listPage.newEntryData.performanceJson;
export const selectHasValidationError = (state) => {
    return state.listPage.newEntryData.hasValidationError;
}

export default listPageSlice.reducer;
