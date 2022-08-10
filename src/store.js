import { combineReducers, configureStore } from "@reduxjs/toolkit";
import timelineReducer from "./features/timelineData/timelineSlice";
import timeControlsReducer from "./features/timelinePage/controls/components/timeControls/timeControlsSlice";
import drawerMenuReducer from './features/drawerMenu/drawerMenuSlice';
import listPageReducer from './features/listPage/listPageSlice';

export const store = configureStore({
  reducer: {
    timeline: timelineReducer,
    timeControls: timeControlsReducer,
    drawerMenu: drawerMenuReducer,
    listPage: listPageReducer
  },
});
