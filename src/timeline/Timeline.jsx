import { useState, useMemo } from "react";
import Tooltip from "./components/Tooltip";
import TimelineEntry from "./components/TimelineEntry";

const getPercentOfMax = (num, max, base) => {
  return num / (max - base);
};

const getEndPercentOfMax = (num, max, base) => {
  console.log(num, max, base, num / (max - base));
  return num / (max - base);
};

function Timeline({ data, title, minTime, maxTime, secondWidth }) {
  const [tooltipData, setTooltipData] = useState({ text: "", left: 0, top: 0 });

  const secondSections = useMemo(() => {
    let sections = [];
    for (let i = 0; i < secondWidth.sections; i++) {
      sections.push(
        <div
          className="second-sections"
          style={{ width: `${secondWidth.width * 100}%` }}
        >
          {i + 1}&nbsp;
        </div>
      );
    }
    return sections;
  }, [secondWidth]);

  return (
    <>
      <h3>{title}</h3>
      <div className="timeline">
        <div className="section-markers">
          {secondSections}
          <div className="second-sections" style={{ flex: 1 }}>
            {(maxTime/1000).toFixed(3)}&nbsp;
          </div>
        </div>
        <div className="timeline-entry-list">
          {data
            .filter((item) => {
              console.log(item, minTime);
              if (item.startTime >= minTime) {
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
                  key={entry.name}
                  baseTime={minTime}
                  endTimeText={entry.startTime + entry.duration}
                  start={entry.startTime}
                  end={endTime}
                  duration={entry.duration}
                  startPercent={start}
                  endPercent={end}
                  // bgColor={bgColor}
                  textColor={textColor}
                  title={entry.name}
                  setTooltipData={setTooltipData}
                />
              );
            })}
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
