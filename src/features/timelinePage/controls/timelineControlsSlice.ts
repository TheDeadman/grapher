import { createSlice, createAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { TimelineDataSet } from "features/timelineData/timelineSlice";

const setTimelineEntries = createAction<
  TimelineDataSet[],
  "timeline/setTimelineEntries"
>("timeline/setTimelineEntries");
const resetTimelineEntries = createAction("timeline/resetTimelineEntrys");
const setMaxTime = createAction<{
  maxTime: number;
  minTime: number;
  baseMaxTime: number;
}>("timeline/setMaxTime");
const setMinTime = createAction("timeline/setMinTime");

const initialState = {
  isMovingMinPosition: false,
  isMovingMaxPosition: false,
  minTimePosition: 0,
  maxTimePosition: 0,
  rowCount: 10,
};

export const timeControlsSlice = createSlice({
  name: "timeControls",
  initialState,
  reducers: {
    setIsMovingMinPosition: (state, action) => {
      state.isMovingMinPosition = action.payload;
    },
    setIsMovingMaxPosition: (state, action) => {
      state.isMovingMaxPosition = action.payload;
    },
    setMinTimePosition: (state, action) => {
      state.minTimePosition = action.payload;
    },
    setMaxTimePosition: (state, action) => {
      state.maxTimePosition = action.payload;
    },
    resetTimePositions: (state) => {
      state.minTimePosition = 0;
      state.maxTimePosition = 100;
    },
    increaseRowCount: (state) => {
      state.rowCount = state.rowCount + 1;
    },
    decreaseRowCount: (state) => {
      state.rowCount = state.rowCount - 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTimelineEntries, (state, action) => {
        state.maxTimePosition = 100;
        state.minTimePosition = 0;
      })
      .addCase(resetTimelineEntries, (state, action) => {
        state.maxTimePosition = 100;
        state.minTimePosition = 0;
      })
      .addCase(setMaxTime, (state, action) => {
        state.maxTimePosition =
          (action.payload.maxTime / action.payload.baseMaxTime) * 100;
      })
      .addCase(setMinTime, (state, action) => {
        state.maxTimePosition = 100;
        state.minTimePosition = 0;
      })
      .addDefaultCase((state, action) => { });
  },
});

export const {
  setMinTimePosition,
  setMaxTimePosition,
  setIsMovingMaxPosition,
  setIsMovingMinPosition,
  resetTimePositions,
  increaseRowCount,
  decreaseRowCount
} = timeControlsSlice.actions;

// EXAMPLE 3 B - rendering of time components
// export const selectTimePositions = createSelector([
//     (state) =>  state.timeControls.maxTimePosition,
//     (state) =>  state.timeControls.minTimePosition
// ], (maxTimePosition, minTimePosition) => {
//     return {maxTimePosition, minTimePosition}
// });

export const selectTimePositions = (state: RootState) => {
  return state.timeControls;
};

export const selectIsMovingMinPosition = (state: RootState) => {
  return state.timeControls.isMovingMinPosition;
};

export const selectIsMovingMaxPosition = (state: RootState) => {
  return state.timeControls.isMovingMaxPosition;
};

export const selectRowCount = (state: RootState) => {
  return state.timeControls.rowCount;
};

export default timeControlsSlice.reducer;
