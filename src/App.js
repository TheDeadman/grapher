import { useEffect, useMemo, useState } from "react";
import Timeline from "./timeline/Timeline";
import "./App.css";

import data from "./timeline/data";
import data2 from "./timeline/data2";
import data3 from "./timeline/data3";

import data4 from "./timeline/data4";
import data5 from "./timeline/data5";
import data6 from "./timeline/data6";

const baseTime = 0;
// const baseTime = 520541;

const getMaxTime = (arr) => {
  let maxTime = 0;
  arr.forEach((entry) => {
    console.log(entry);
    const endTime = entry.startTime + entry.duration;
    if (endTime > maxTime) {
      maxTime = endTime;
    }
  });
  return maxTime;
};

function App() {
  const [maxTime, setMaxTime] = useState(
    getMaxTime([...data, ...data2, ...data3])
  );
  const [minTime, setMinTime] = useState(baseTime);
  const [compareMode, setCompareMode] = useState(false);

  const secondWidthData = useMemo(() => {
    return {
      width: 1000 / maxTime,
      sections: parseInt(maxTime / 1000),
      remainder: maxTime % 1000,
    };
  }, [maxTime]);

  useEffect(() => {
    performance.measure("app rendered");
  }, []);
  return (
    <div className="App">
      <div>
        <div>
          <label>Min Time: </label>
          <input
            type="number"
            id="fname"
            name="fname"
            onChange={(e) =>
              e.target.value ? setMinTime(parseInt(e.target.value)) : 0
            }
          />
          &nbsp;&nbsp;&nbsp;
          <label>Max Time:</label>
          <input
            type="number"
            id="fname"
            name="fname"
            onChange={(e) =>
              e.target.value ? setMaxTime(parseInt(e.target.value)) : 0
            }
          />
        </div>
        <div>
          <button onClick={() => setCompareMode(!compareMode)}>
            {!compareMode ? "Compare" : "List"}
          </button>

          <button
            onClick={() =>
              setMaxTime(getMaxTime([...data, ...data2, ...data3]))
            }
          >
            Reset Max Time
          </button>
        </div>
      </div>

      <Timeline
        data={data}
        title="Zebra Tablet"
        minTime={minTime}
        maxTime={maxTime}
        secondWidth={secondWidthData}
      />
      {!compareMode && (
        <>
          <Timeline
            data={data3}
            title="Mac - Low End Device Mode"
            minTime={minTime}
            maxTime={maxTime}
            secondWidth={secondWidthData}
          />
          <Timeline
            data={data2}
            title="Mac"
            minTime={minTime}
            maxTime={maxTime}
            secondWidth={secondWidthData}
          />

          <Timeline
            data={data4}
            title="Zebra on app 4% size of ticketing"
            minTime={minTime}
            maxTime={maxTime}
            secondWidth={secondWidthData}
          />

          <Timeline
            data={data5}
            title="Mac - Low End Mode  on app 4% size of ticketing"
            minTime={minTime}
            maxTime={maxTime}
            secondWidth={secondWidthData}
          />

          <Timeline
            data={data6}
            title="Mac on app 4% size of ticketing"
            minTime={minTime}
            maxTime={maxTime}
            secondWidth={secondWidthData}
          />
        </>
      )}
    </div>
  );
}

export default App;
