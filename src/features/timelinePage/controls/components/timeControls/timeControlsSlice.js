import { createSlice, createAction } from "@reduxjs/toolkit";

const setTimelineEntries = createAction('timeline/setTimelineEntries');
const resetTimelineEntries = createAction('timeline/resetTimelineEntrys');
const setMaxTime = createAction('timeline/setMaxTime');
const setMinTime = createAction('timeline/setMinTime');

const initialState = {
    isMovingMinPosition: false,
    isMovingMaxPosition: false,
    minTimePosition: 0,
    maxTimePosition: 0
};

export const timeControlsSlice = createSlice({
    name: "timeControls",
    initialState,
    reducers: {
        setIsMovingMinPosition: (state, action) => {
            state.isMovingMinPosition = action.payload
        },
        setIsMovingMaxPosition: (state, action) => {
            state.isMovingMaxPosition = action.payload
        },
        setMinTimePosition: (state, action) => {
            state.minTimePosition = action.payload
        },
        setMaxTimePosition: (state, action) => {
            state.maxTimePosition = action.payload
        },
        resetTimePositions: (state) => {
            state.minTimePosition = 0
            state.maxTimePosition = 100
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setTimelineEntries, (state, action) => {
                console.log("EXTRA", state, action)
                state.maxTimePosition = 100;
                state.minTimePosition = 0;
            })
            .addCase(resetTimelineEntries, (state, action) => {
                console.log("EXTRA", state, action)
                state.maxTimePosition = 100;
                state.minTimePosition = 0;
            })
            .addCase(setMaxTime, (state, action) => {
                console.log("EXTRA", state, state.maxTimePosition, state.maxTime, action)
                state.maxTimePosition = (action.payload.maxTime / action.payload.baseMaxTime) * 100;
            })
            .addCase(setMinTime, (state, action) => {
                console.log("EXTRA", state, action)

                state.maxTimePosition = 100;
                state.minTimePosition = 0;
            })
            .addDefaultCase((state, action) => {
                console.log("EXTRA default", state, action)
            })
    }
});

export const { setMinTimePosition, setMaxTimePosition, setIsMovingMaxPosition, setIsMovingMinPosition, resetTimePositions } =
    timeControlsSlice.actions;

// EXAMPLE 3 B - rendering of time components
// export const selectTimePositions = createSelector([
//     (state) =>  state.timeControls.maxTimePosition,
//     (state) =>  state.timeControls.minTimePosition
// ], (maxTimePosition, minTimePosition) => {
//     return {maxTimePosition, minTimePosition}
// });


export const selectTimePositions = (state) => {
    return state.timeControls;
};

export const selectIsMovingMinPosition = (state) => {
    return state.timeControls.isMovingMinPosition;
};

export const selectIsMovingMaxPosition = (state) => {
    return state.timeControls.isMovingMaxPosition;
};

export default timeControlsSlice.reducer;
