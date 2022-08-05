const TimelineEntry = ({
  start,
  startPercent,
  endTimeText,
  end,
  endPercent,
  duration,
  setTooltipData,
  title,
  bgColor,
  textColor,
}) => {
  return (
    <div>
      <div
        className="timeline-entry"
        style={{
          width: `${(endPercent - startPercent) * 100}%`,
          left: `${startPercent * 100}%`,
          backgroundColor: bgColor,
          color: textColor,
          overflow: "hidden",
        }}
        onMouseMove={(e) => {
          console.log(e);
          setTooltipData({
            text: `${title} - ${start} - ${endTimeText} - ${duration}`,
            left: e.pageX + 15,
            top: e.pageY,
          });
        }}
        onMouseLeave={(e) => {
          console.log(e);
          setTooltipData({ text: "", left: 0, top: 0 });
        }}
      >
        {title}-{(duration / 1000).toFixed(3)}
      </div>
    </div>
  );
};

export default TimelineEntry;
