import { useAppDispatch } from "../../../../redux/hooks";
import { setTooltipData } from "../../../timelineData/timelineSlice";

type TimelineEntryProps = {
  start: number;
  startPercent: number;
  endTimeText: number;
  end: number;
  endPercent: number;
  duration: number;
  title: string;
  textColor: string;
};

const TimelineEntry = ({
  start,
  startPercent,
  endTimeText,
  endPercent,
  duration,
  title,
  textColor,
}: TimelineEntryProps) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div
        className="timeline-entry"
        style={{
          width: `${
            (endPercent - startPercent) * 100 > 0.15
              ? (endPercent - startPercent) * 100
              : 0.15
          }%`,
          left: `${startPercent * 100}%`,
          color: textColor,
          overflow: "hidden",
        }}
        onMouseMove={(e) => {
          console.log(e);
          dispatch(
            setTooltipData({
              text: `${title} - ${start} - ${endTimeText} - ${duration}`,
              left: e.pageX + 15,
              top: e.pageY,
            })
          );
        }}
        onMouseLeave={(e) => {
          console.log(e);
          dispatch(setTooltipData({ text: "", left: 0, top: 0 }));
        }}
      >
        {title}-{(duration / 1000).toFixed(3)}
      </div>
    </div>
  );
};

export default TimelineEntry;
