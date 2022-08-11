import { TooltipData } from "features/timelineData/timelineSlice";

function Tooltip({ text, left, top }: TooltipData) {
  const calcLeft =
    left > window.innerWidth - 250 ? window.innerWidth - 250 : left;
  return (
    <div style={{ left: calcLeft, top: top }} className="tooltip">
      {text}
    </div>
  );
}

export default Tooltip;
