import { createSlice, createAction, nanoid } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';

import data from "./exampleData/data";
import data2 from "./exampleData/data2";
import data3 from "./exampleData/data3";

import data4 from "./exampleData/data4";
import data5 from "./exampleData/data5";
import data6 from "./exampleData/data6";

const setMinTimePosition = createAction('timeControls/setMinTimePosition');
const setMaxTimePosition = createAction('timeControls/setMaxTimePosition');
const resetTimePositions = createAction('timeControls/resetTimePositions');
const saveNewEntry = createAction('listPage/saveNewEntry');

const getMaxTime = (arr) => {
  let maxTime = 0;
  arr.forEach((entry) => {
    const endTime = entry.startTime + entry.duration;
    if (endTime > maxTime) {
      maxTime = endTime;
    }
  });
  return maxTime;
};

const addIdtoArrayItems = (arr) => {
  arr.forEach((entry) => {
    if (!entry.id) {
      entry.id = nanoid()
    }
  });
  return arr;
}

const initialState = {
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
        { name: "Mac", data: data3 }
      ]

      dataSets.forEach(dataSet => {
        if (!dataSet.id) {
          dataSet.id = nanoid();
        }
        addIdtoArrayItems(dataSet.data);

      })
      state.dataSets = dataSets;

      let entries = [];
      state.dataSets.forEach((dataSet) => {
        entries = [...entries, ...dataSet.data];
      });
      state.maxTime = getMaxTime(entries);
      state.minTime = 0;
      state.baseMaxTime = state.maxTime;
      state.secondWidthData = {
        width: 1000 / (state.maxTime - state.minTime),
        sections: parseInt((state.maxTime - state.minTime) / 1000),
        remainder: (state.maxTime - state.minTime) % 1000,
      };
    },
    toggleCompareMode: (state) => {
      console.log("SETTING STATE", state.isCompareMode)
      state.isCompareMode = !state.isCompareMode;
    },
    setTimelineEntries: (state, action) => {
      console.debug("DEBUG", action)
      action.payload.forEach(dataSet => {
        if (!dataSet.id) {
          dataSet.id = nanoid();
        }
        addIdtoArrayItems(dataSet.data);
      })
      state.dataSets = action.payload;

      let entries = [];
      state.dataSets.forEach((dataSet) => {
        entries = [...entries, ...dataSet.data];
      });
      state.maxTime = getMaxTime(entries);
      state.minTime = 0;
      state.baseMaxTime = state.maxTime;
      state.secondWidthData = {
        width: 1000 / (state.maxTime - state.minTime),
        sections: parseInt((state.maxTime - state.minTime) / 1000),
        remainder: (state.maxTime - state.minTime) % 1000,
      };
    },
    deleteEntryById: (state, action) => {
      const index = state.dataSets.findIndex(dataSet => dataSet.id === action.payload);
      state.dataSets.splice(index, 1);
      return state;
    },
    // EXAMPLE - 1A
    setMaxTime: (state, action) => {
      state.maxTime = action.payload.maxTime;
      state.secondWidthData = {
        width: 1000 / (state.maxTime - state.minTime),
        sections: parseInt((state.maxTime - state.minTime) / 1000),
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
      .addCase(setMinTimePosition, (state, action) => {
        state.minTime = action.payload / 100 * state.baseMaxTime;
        state.secondWidthData = {
          width: 1000 / (state.maxTime - state.minTime),
          sections: parseInt((state.maxTime - state.minTime) / 1000),
          remainder: (state.maxTime - state.minTime) % 1000,
        };
      })
      .addCase(setMaxTimePosition, (state, action) => {
        state.maxTime = action.payload / 100 * state.baseMaxTime;
        state.secondWidthData = {
          width: 1000 / (state.maxTime - state.minTime),
          sections: parseInt((state.maxTime - state.minTime) / 1000),
          remainder: (state.maxTime - state.minTime) % 1000,
        };
      })
      .addCase(resetTimePositions, (state) => {
        state.maxTime = state.baseMaxTime;
        state.minTime = 0;
        state.secondWidthData = {
          width: 1000 / (state.maxTime - state.minTime),
          sections: parseInt((state.maxTime - state.minTime) / 1000),
          remainder: (state.maxTime - state.minTime) % 1000,
        };
      })
      .addCase(saveNewEntry, (state, action) => {
        console.debug("DEBUG", action)
        if (state.isUsingExampleData) {
          state.dataSets = [];
        }
        state.isUsingExampleData = false;
        state.dataSets = [...state.dataSets, { name: action.payload.entryName, id: nanoid(), data: addIdtoArrayItems(JSON.parse(action.payload.performanceJsonString)) }];

        let entries = [];
        state.dataSets.forEach((dataSet) => {
          entries = [...entries, ...dataSet.data];
        });
        state.maxTime = getMaxTime(entries);
        state.minTime = 0;
        state.baseMaxTime = state.maxTime;
        state.secondWidthData = {
          width: 1000 / (state.maxTime - state.minTime),
          sections: parseInt((state.maxTime - state.minTime) / 1000),
          remainder: (state.maxTime - state.minTime) % 1000,
        };
      })
      .addDefaultCase((state, action) => { })
  }
});

// Action creators are generated for each case reducer function
export const { deleteEntryById, setTimelineEntries, setTooltipData, setMaxTime, setMinTime, toggleCompareMode, resetTimelineEntrys } =
  timelineSlice.actions;

export const selectIsCompareMode = (state) => {
  return state.timeline.isCompareMode;
};

export const selectSecondWidthData = (state) => {
  return state.timeline.secondWidthData;
};
export const selectMinTime = (state) => {
  return state.timeline.minTime
}

export const selectMaxTime = (state) => {
  return state.timeline.maxTime
}

export const selectBaseMaxTime = (state) => {
  return state.timeline.baseMaxTime
}

export const selectDataSetById =
  id => (state) => {
    console.log("SELECTING BY NAME NORMAL", state, id, state.timeline.dataSets.find(dataSet => dataSet.id === id))

    return state.timeline.dataSets.find(dataSet => dataSet.id === id)
  }

const makeSelectItemsByCategory = () => {
  const selectItemsByCategory = createSelector(
    [state => state.items, (state, category) => category],
    (items, category) => items.filter(item => item.category === category)
  )
  return selectItemsByCategory
}

export const selectTooltipData = (state) => {
  console.log("Selecting tooltip data");
  return state.timeline.tooltipData;
};

// EXAMPLE 4 A
export const selectEntryIds = createSelector([(state) => state.timeline.dataSets], (dataSets) => {
  console.log("Selecting entry Ids", dataSets);
  return dataSets.map(dataSet => dataSet.id);
});

// EXAMPLE 4 B
// export const selectEntryIds = (state) => {
//   console.log("Selecting entry Ids", state);
//   return state.timeline.dataSets.map(dataSet => dataSet.id);
// };

export const selectDataSets = (state) => {
  return state.timeline.dataSets;
}

export default timelineSlice.reducer;
