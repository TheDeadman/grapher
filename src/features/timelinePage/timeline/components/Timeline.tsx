import { useMemo } from "react";
import Tooltip from "./Tooltip";
import TimelineEntry from "./TimelineEntry";
import {
  selectDataSetById,
  selectMaxTime,
  selectMinTime,
  selectTooltipData,
} from "../../../timelineData/timelineSlice";
import { SecondSections } from "./SecondSections";
import { useAppSelector } from "../../../../redux/hooks";
import { selectRowCount } from "features/timelinePage/controls/timelineControlsSlice";

const getPercentOfMax = (num: number, max: number, base: number) => {
  return num / (max - base);
};

const getEndPercentOfMax = (num: number, max: number, base: number) => {
  return num / (max - base);
};

function Timeline({ id }: { id: string }) {
  const tooltipData = useAppSelector(selectTooltipData);
  const dataSet = useAppSelector(selectDataSetById(id));
  const minTime = useAppSelector(selectMinTime);
  const maxTime = useAppSelector(selectMaxTime);
  const rowCount = useAppSelector(selectRowCount);

  // const timelineEntries = data
  const timelineEntries = useMemo(
    () =>
      dataSet?.data
        .filter((item) => {
          if (item.startTime + item.duration >= minTime) {
            return true;
          }
          return false;
        })
        .sort((a, b) => {
          if (a.startTime < b.startTime) {
            return -1;
          } else if (a.startTime === b.startTime) {
            return 0;
          } else {
            return 1;
          }
        })
        .map((entry, i) => {
          const endTime = entry.startTime + entry.duration - minTime;
          const start = getPercentOfMax(
            entry.startTime - minTime,
            maxTime,
            minTime
          );
          const end = getEndPercentOfMax(endTime, maxTime, minTime);
          const textColor = i % 2 === 0 ? "white" : "black";
          return (
            <TimelineEntry
              key={entry.id}
              endTimeText={entry.startTime + entry.duration}
              start={entry.startTime}
              end={endTime}
              duration={entry.duration}
              startPercent={start}
              endPercent={end}
              textColor={textColor}
              title={entry.name}
            />
          );
        }),
    [dataSet, minTime, maxTime]
  );

  return (
    <>
      <h3>{dataSet?.name}</h3>
      <div className="timeline" style={{ height: `calc(${rowCount * 60}px + 30px)` }}>
        <SecondSections />
        <div className="timeline-entry-list">{timelineEntries}</div>
      </div>
      {tooltipData.text && (
        <Tooltip
          top={tooltipData.top + 5}
          left={tooltipData.left + 5}
          text={tooltipData.text}
        />
      )}
    </>
  );
}

export default Timeline;
