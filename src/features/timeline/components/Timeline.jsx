import { useState, useMemo, useEffect } from "react";
import Tooltip from "./Tooltip";
import TimelineEntry from "./TimelineEntry";
import { useSelector } from "react-redux";
import { selectEntriesByName,  selectMaxTime, selectMinTime, selectTooltipData } from "../timelineSlice";
import { SecondSections } from "./SecondSections";

const getPercentOfMax = (num, max, base) => {
  return num / (max - base);
};

const getEndPercentOfMax = (num, max, base) => {
  return num / (max - base);
};

function Timeline({ title }) {
  const tooltipData = useSelector(selectTooltipData);
  const data = useSelector(selectEntriesByName(title));
  const minTime = useSelector(selectMinTime)
  const maxTime = useSelector(selectMaxTime)

  // const timelineEntries = data
  const timelineEntries = useMemo(() => data
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
              const bgColor = i % 2 === 0 ? "green" : "yellow";
              const textColor = i % 2 === 0 ? "white" : "black";
              return (
                <TimelineEntry
                  key={`${title}-${entry.name}-${entry.startTime}`}
                  baseTime={minTime}
                  endTimeText={entry.startTime + entry.duration}
                  start={entry.startTime}
                  end={endTime}
                  duration={entry.duration}
                  startPercent={start}
                  endPercent={end}
                  bgColor={bgColor}
                  textColor={textColor}
                  title={entry.name}
                />
              );
            }), [data]);

  return (
    <>
      <h3>{title}</h3>
      <div className="timeline">
        <SecondSections />
        <div className="timeline-entry-list">
          {timelineEntries}
        </div>
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
