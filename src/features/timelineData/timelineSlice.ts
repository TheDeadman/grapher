import {
  createSlice,
  createAction,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "redux/store";

import data from "./exampleData/data";
import data2 from "./exampleData/data2";
import data3 from "./exampleData/data3";

import data4 from "./exampleData/data4";
import data5 from "./exampleData/data5";
import data6 from "./exampleData/data6";

const setMinTimePosition = createAction<
  number,
  "timeControls/setMinTimePosition"
>("timeControls/setMinTimePosition");
const setMaxTimePosition = createAction<
  number,
  "timeControls/setMaxTimePosition"
>("timeControls/setMaxTimePosition");
const resetTimePositions = createAction("timeControls/resetTimePositions");
const saveNewEntry = createAction<{ entryName: string; performanceJsonString: string, startTime: string }, "listPage/saveNewEntry">(
  "listPage/saveNewEntry"
);

// Types
export type TimelineEntry = {
  name: string;
  entryType: string;
  startTime: number;
  duration: number;
  id?: string;
};

export type TimelineDataSet = {
  name: string;
  data: TimelineEntry[];
  id?: string;
  startTime?: number;
};

const getMaxTime = (arr: TimelineEntry[]) => {
  let maxTime = 0;
  arr.forEach((entry) => {
    const endTime = entry.startTime + entry.duration;
    if (endTime > maxTime) {
      maxTime = endTime;
    }
  });
  return maxTime;
};

const addIdtoArrayItems = (arr: TimelineEntry[]) => {
  arr.forEach((entry) => {
    if (!entry.id) {
      entry.id = nanoid();
    }
  });
  return arr;
};

export type SecondWidthData = {
  width: number;
  sections: number;
  remainder: number;
};

export type TooltipData = {
  text: string;
  left: number;
  top: number;
};

export type TimelineSliceState = {
  isUsingExampleData: boolean;
  dataSets: TimelineDataSet[];
  maxTime: number;
  baseMaxTime: number;
  minTime: number;
  secondWidthData: SecondWidthData;
  tooltipData: TooltipData;
};

const initialState: TimelineSliceState = {
  isUsingExampleData: true,
  dataSets: [],
  maxTime: 0,
  baseMaxTime: 0,
  minTime: 0,
  secondWidthData: {
    width: 0,
    sections: 0,
    remainder: 0,
  },
  tooltipData: { text: "", left: 0, top: 0 },
};

export const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    resetTimelineEntrys: (state) => {
      state.isUsingExampleData = true;
      const dataSets = [
        { name: "Zebra Tablet", data: data },
        { name: "Mac - Low End Device Mode", data: data2 },
        { name: "Mac", data: data3 },
      ];

      dataSets.forEach((dataSet: TimelineDataSet) => {
        if (!dataSet.id) {
          dataSet.id = nanoid();
        }
        addIdtoArrayItems(dataSet.data);
      });
      state.dataSets = dataSets;

      let entries: TimelineEntry[] = [];
      state.dataSets.forEach((dataSet) => {
        entries = [...entries, ...dataSet.data];
      });
      state.maxTime = getMaxTime(entries);
      state.minTime = 0;
      state.baseMaxTime = state.maxTime;
      state.secondWidthData = {
        width: 1000 / (state.maxTime - state.minTime),
        sections: parseInt(`${(state.maxTime - state.minTime) / 1000}`),
        remainder: (state.maxTime - state.minTime) % 1000,
      };
    },
    setTimelineEntries: (state, action: PayloadAction<TimelineDataSet[]>) => {
      console.debug("DEBUG", action);
      action.payload.forEach((dataSet) => {
        if (!dataSet.id) {
          dataSet.id = nanoid();
        }
        addIdtoArrayItems(dataSet.data);
      });
      state.dataSets = action.payload;

      let entries: TimelineEntry[] = [];
      state.dataSets.forEach((dataSet) => {
        entries = [...entries, ...dataSet.data];
      });
      state.maxTime = getMaxTime(entries);
      state.minTime = 0;
      state.baseMaxTime = state.maxTime;
      state.secondWidthData = {
        width: 1000 / (state.maxTime - state.minTime),
        sections: parseInt(`${(state.maxTime - state.minTime) / 1000}`),
        remainder: (state.maxTime - state.minTime) % 1000,
      };
    },
    deleteEntryById: (state, action) => {
      const index = state.dataSets.findIndex(
        (dataSet) => dataSet.id === action.payload
      );
      state.dataSets.splice(index, 1);
      return state;
    },
    // EXAMPLE - 1A
    setMaxTime: (
      state,
      action: PayloadAction<{
        maxTime: number;
        baseMaxTime: number;
      }>
    ) => {
      state.maxTime = action.payload.maxTime;
      state.secondWidthData = {
        width: 1000 / (state.maxTime - state.minTime),
        sections: parseInt(`${(state.maxTime - state.minTime) / 1000}`),
        remainder: (state.maxTime - state.minTime) % 1000,
      };
    },
    // EXAMPLE - 1B
    // setMaxTime: (state, action) => {
    //   state.maxTime = action.payload;
    //   state.secondWidthData = {
    //     width: 1000 / state.maxTime,
    //     sections: parseInt(state.maxTime / 1000),
    //     remainder: state.maxTime % 1000,
    //   };
    // },

    setMinTime: (state, action) => {
      state.minTime = action.payload;
    },
    setTimelineEntryByName: (state, action) => {
      state.dataSets[action.payload.name] = action.payload.entries;
    },
    setTooltipData: (state, action) => {
      state.tooltipData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setMinTimePosition, (state, action: PayloadAction<number>) => {
        state.minTime = (action.payload / 100) * state.baseMaxTime;
        state.secondWidthData = {
          width: 1000 / (state.maxTime - state.minTime),
          sections: parseInt(`${(state.maxTime - state.minTime) / 1000}`),
          remainder: (state.maxTime - state.minTime) % 1000,
        };
      })
      .addCase(setMaxTimePosition, (state, action) => {
        state.maxTime = (action.payload / 100) * state.baseMaxTime;
        state.secondWidthData = {
          width: 1000 / (state.maxTime - state.minTime),
          sections: parseInt(`${(state.maxTime - state.minTime) / 1000}`),
          remainder: (state.maxTime - state.minTime) % 1000,
        };
      })
      .addCase(resetTimePositions, (state) => {
        state.maxTime = state.baseMaxTime;
        state.minTime = 0;
        state.secondWidthData = {
          width: 1000 / (state.maxTime - state.minTime),
          sections: parseInt(`${(state.maxTime - state.minTime) / 1000}`),
          remainder: (state.maxTime - state.minTime) % 1000,
        };
      })
      .addCase(saveNewEntry, (state, action) => {
        console.debug("DEBUG", action);
        if (state.isUsingExampleData) {
          state.dataSets = [];
        }
        state.isUsingExampleData = false;
        state.dataSets = [
          ...state.dataSets,
          {
            name: action.payload.entryName,
            id: nanoid(),
            data: addIdtoArrayItems(JSON.parse(action.payload.performanceJsonString)),
            startTime: parseInt(action.payload.startTime)
          },
        ];

        let entries: TimelineEntry[] = [];
        state.dataSets.forEach((dataSet) => {
          entries = [...entries, ...dataSet.data];
        });
        state.maxTime = getMaxTime(entries);
        state.minTime = 0;
        state.baseMaxTime = state.maxTime;
        state.secondWidthData = {
          width: 1000 / (state.maxTime - state.minTime),
          sections: parseInt(`${(state.maxTime - state.minTime) / 1000}`),
          remainder: (state.maxTime - state.minTime) % 1000,
        };
      })
      .addDefaultCase((state, action) => { });
  },
});

// Action creators are generated for each case reducer function
export const {
  deleteEntryById,
  setTimelineEntries,
  setTooltipData,
  setMaxTime,
  setMinTime,
  resetTimelineEntrys,
} = timelineSlice.actions;

export const selectSecondWidthData = (state: RootState) => {
  return state.timeline.secondWidthData;
};
export const selectMinTime = (state: RootState) => {
  return state.timeline.minTime;
};

export const selectMaxTime = (state: RootState) => {
  return state.timeline.maxTime;
};

export const selectBaseMaxTime = (state: RootState) => {
  return state.timeline.baseMaxTime;
};

export const selectDataSetById = (id: string) => (state: RootState) => {
  console.log(
    "SELECTING BY NAME NORMAL",
    state,
    id,
    state.timeline.dataSets.find((dataSet) => dataSet.id === id)
  );

  return state.timeline.dataSets.find((dataSet) => dataSet.id === id);
};

export const selectTooltipData = (state: RootState) => {
  console.log("Selecting tooltip data");
  return state.timeline.tooltipData;
};

// EXAMPLE 4 A
export const selectEntryIds = createSelector(
  [(state: RootState) => state.timeline.dataSets],
  (dataSets) => {
    console.log("Selecting entry Ids", dataSets);
    return dataSets.map((dataSet) => dataSet.id) as string[];
  }
);

// EXAMPLE 4 B
// export const selectEntryIds = (state) => {
//   console.log("Selecting entry Ids", state);
//   return state.timeline.dataSets.map(dataSet => dataSet.id);
// };

export const selectDataSets = (state: RootState) => {
  return state.timeline.dataSets;
};

export default timelineSlice.reducer;
