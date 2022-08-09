import { useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Routes,
  Route,
} from "react-router-dom";

import Stack from '@mui/material/Stack';

import Header from './features/header/Header';
import { Controls } from "./features/controls/Controls";
import Timeline from "./features/timeline/components/Timeline";
import "./App.css";

import data from "./features/timeline/data/data";
import data2 from "./features/timeline/data/data2";
import data3 from "./features/timeline/data/data3";

import data4 from "./features/timeline/data/data4";
import data5 from "./features/timeline/data/data5";
import data6 from "./features/timeline/data/data6";
import { useDispatch } from "react-redux";
import { setTimelineEntries, setMaxTime } from "./features/timeline/timelineSlice";
import { TimelineList } from "./features/timeline/TimelineList";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const baseTime = 0;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setTimelineEntries({
        "Zebra Tablet": data,
        "Mac - Low End Device Mode": data2,
        Mac: data3,
      })
    );
  }, []);
  const [minTime, setMinTime] = useState(baseTime);
  const [compareMode, setCompareMode] = useState(false);

  useEffect(() => {
    performance.measure("app rendered");
  }, []);
  return (
    <>
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<>
              <Controls />
              <TimelineList />
            </>} />
          </Routes>



        </div>
      </ThemeProvider>
    </Stack>
    </>
  );
}

export default App;
