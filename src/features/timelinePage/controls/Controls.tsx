import { ButtonControls } from "./components/ButtonControls";
import "./controls.css";
import { TimeControlFields } from "./components/TimeControlFields";
import { TimeSlider } from "./components/TimeSlider";

export const Controls = () => {
  return (
    <div className="controls">
      <TimeControlFields />
      <TimeSlider />
      <ButtonControls />
    </div>
  );
};
