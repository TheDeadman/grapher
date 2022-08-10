import { useEffect } from "react";
import { useSelector } from "react-redux";
import Timeline from "./timeline/components/Timeline";
import { Controls } from './controls/Controls'
import { selectEntryIds } from "../timelineData/timelineSlice";

export const TimelineList = () => {
  const entryIds = useSelector(selectEntryIds);

  useEffect(() => {
    console.log("TIMELINELIST")
  })

  return (
    <>
      <Controls />
      {entryIds.map((id) => {
        console.log("TIMELINE", id);
        return (

          <Timeline key={`timeline-${id}`} id={id} />
        )
      })}
    </>
  );
};
