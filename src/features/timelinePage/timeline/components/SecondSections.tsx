import { useMemo } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectMaxTime,
  selectMinTime,
  selectSecondWidthData,
} from "../../../timelineData/timelineSlice";

export const SecondSections = () => {
  const secondWidthData = useAppSelector(selectSecondWidthData);
  const minTime = useAppSelector(selectMinTime);
  const maxTime = useAppSelector(selectMaxTime);

  const secondSectionMarkers = useMemo(() => {
    console.debug("SECONDSECTIONS");
    let sections = [];
    for (let i = 0; i < secondWidthData.sections; i++) {
      sections.push(
        <div
          key={`seconds-marker-${i}`}
          className="second-sections"
          style={{ width: `${secondWidthData.width * 100}%` }}
        >
          {(minTime + i + 1).toFixed(2)}&nbsp;
        </div>
      );
    }
    return sections;
  }, [secondWidthData, minTime]);

  return (
    <div className="section-markers">
      {secondSectionMarkers}
      <div className="second-sections" style={{ flex: 1 }}>
        {maxTime.toFixed(2)}&nbsp;
      </div>
    </div>
  );
};
