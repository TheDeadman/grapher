import { useDispatch } from "react-redux";
import { setTooltipData } from "../timelineSlice";

const TimelineEntry = ({
  start,
  startPercent,
  endTimeText,
  end,
  endPercent,
  duration,
  title,
  textColor,
}) => {
  const dispatch = useDispatch();
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
