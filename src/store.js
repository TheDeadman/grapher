import { configureStore } from "@reduxjs/toolkit";
import timelineReducer from "./features/timeline/timelineSlice";
import timeControlsReducer from "./features/controls/components/timeControls/timeControlsSlice";

export const store = configureStore({
  reducer: {
    timeline: timelineReducer,
    timeControls: timeControlsReducer,
  },
});
