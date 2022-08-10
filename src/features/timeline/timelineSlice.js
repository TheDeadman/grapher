import { createSlice, createAction } from "@reduxjs/toolkit";
import { createSelector} from 'reselect'

const setMinTimePosition = createAction('timeControls/setMinTimePosition');
const setMaxTimePosition = createAction('timeControls/setMaxTimePosition');

const getMaxTime = (arr) => {
  let maxTime = 0;
  arr.forEach((entry) => {
    const endTime = entry.startTime + entry.duration;
    if (endTime > maxTime) {
      maxTime = endTime;
    }
  });
  console.log("MAX TIME IS:", maxTime);
  return maxTime;
};

const initialState = {
  data: {},
  maxTime: 0,
  baseMaxTime: 0,
  minTime: 0,
  secondWidthData: {
    width: 0,
    sections: 0,
    remainder: 0,
  },
  tooltipData: { text: "", left: 0, top: 0 },
  isCompareMode: false,
};



export const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    toggleCompareMode: (state) => {
      console.log("SETTING STATE", state.isCompareMode)
      state.isCompareMode = !state.isCompareMode;
    },
    setTimelineEntries: (state, action) => {
      state.data = action.payload;
      let entries = [];
      Object.entries(action.payload).forEach(([key, val]) => {
        entries = [...entries, ...val];
      });
      state.maxTime = getMaxTime(entries);
      state.minTime = 0;
      state.baseMaxTime = state.maxTime;
      state.secondWidthData = {
        width: 1000 / state.maxTime,
        sections: parseInt(state.maxTime / 1000),
        remainder: state.maxTime % 1000,
      };
    },
    deleteEntryByName: (state, action) => {
      delete state.data[action.payload];
      return state;
    },
    // EXAMPLE - 1A
    setMaxTime: (state, action) => {
      state.maxTime = action.payload.maxTime;
      state.secondWidthData = {
        width: 1000 / state.maxTime,
        sections: parseInt(state.maxTime / 1000),
        remainder: state.maxTime % 1000,
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
      state.data[action.payload.name] = action.payload.entries;
    },
    setTooltipData: (state, action) => {
      state.tooltipData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setMinTimePosition, (state, action) => {
        state.minTime = action.payload / 100 * state.baseMaxTime;
      })
      .addCase(setMaxTimePosition, (state, action) => {
        state.maxTime = action.payload / 100 * state.baseMaxTime;
      })
      .addDefaultCase((state, action) => { })
  }
});

// Action creators are generated for each case reducer function
export const { deleteEntryByName, setTimelineEntries, setTooltipData, setMaxTime, setMinTime, toggleCompareMode } =
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

export const selectEntriesByName = 
  name => (state) => {
    console.log("SELECTING BY NAME NORMAL", state, name)

    return state.timeline.data[name]
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

export const selectEntryNames = (state) => {
  console.log("Selecting entry names", state);
  return Object.keys(state.timeline.data);

  //   return state.timeline.data;
  if (state && state.timeline) {
    return Object.keys(state.timeline.data);
  }
  return [];
};

// export const selectEntriesByName = createSelector(
//     [
//       // Usual first input - extract value from `state`
//       state => state.items,
//       // Take the second arg, `category`, and forward to the output selector
//       (state, category) => category
//     ],
//     // Output selector gets (`items, category)` as args
//     (items, category) => items.filter(item => item.category === category)
//   );

export default timelineSlice.reducer;
