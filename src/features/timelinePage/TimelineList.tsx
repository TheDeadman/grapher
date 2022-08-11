import { useEffect } from "react";
import Timeline from "./timeline/components/Timeline";
import { Controls } from "./controls/Controls";
import { selectEntryIds } from "features/timelineData/timelineSlice";
import { useAppSelector } from "redux/hooks";

export const TimelineList = () => {
  const entryIds = useAppSelector(selectEntryIds);

  useEffect(() => {
    console.log("TIMELINELIST");
  });

  return (
    <>
      <Controls />
      {entryIds.map((id) => {
        console.log("TIMELINE", id);
        return <Timeline key={`timeline-${id}`} id={id} />;
      })}
    </>
  );
};
