import { useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Routes,
  Route,
} from "react-router-dom";

import Stack from '@mui/material/Stack';

import Header from './features/header/Header';
import "./App.css";

import { useDispatch } from "react-redux";
import { resetTimelineEntrys } from "./features/timelineData/timelineSlice";
import { TimelineList } from "./features/timelinePage/TimelineList";
import { ListPage } from "./features/listPage/ListPage";


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
      resetTimelineEntrys()
    );
  }, []);

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
              <Route path="/" exact element={<>

                <TimelineList />
              </>} />
              <Route path="/list" element={<ListPage />} />
            </Routes>



          </div>
        </ThemeProvider>
      </Stack>
    </>
  );
}

export default App;
