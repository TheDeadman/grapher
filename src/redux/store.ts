import { configureStore } from "@reduxjs/toolkit";
import timelineReducer from "features/timelineData/timelineSlice";
import timeControlsReducer from "features/timelinePage/controls/timelineControlsSlice";
import drawerMenuReducer from "features/drawerMenu/drawerMenuSlice";
import listPageReducer from "features/listPage/listPageSlice";
import reduxExampleReducer from "examples/commonStateAndRendering/reduxExample/reduxExampleSlice";

export const store = configureStore({
  reducer: {
    timeline: timelineReducer,
    timeControls: timeControlsReducer,
    drawerMenu: drawerMenuReducer,
    listPage: listPageReducer,
    reduxExample: reduxExampleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
