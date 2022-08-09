import { useSelector } from "react-redux";
import Timeline from "./components/Timeline";
import { selectEntryNames } from "./timelineSlice";

export const TimelineList = () => {
  const entries = useSelector(selectEntryNames);
  
  return (
    <>
      {entries.map((timeline) => {
        console.log("TIMELINE", timeline);
        return (
          <Timeline key={timeline} title={timeline} />
        )
      })}
      {/* <Timeline
        // data={data}
        title="Zebra Tablet"
        // minTime={minTime}
        // maxTime={maxTime}
        // secondWidth={secondWidthData}
      /> */}
      {/* {!compareMode && (
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
      )} */}
    </>
  );
};
